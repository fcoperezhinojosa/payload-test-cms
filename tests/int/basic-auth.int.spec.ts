import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

function makeRequest(path: string, authHeader?: string): NextRequest {
  const headers = new Headers()
  if (authHeader) {
    headers.set('authorization', authHeader)
  }
  return new NextRequest(`http://localhost:3000${path}`, { headers })
}

function basicHeader(user: string, pass: string): string {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
}

describe('Basic Auth proxy blocker', () => {
  it('returns 401 with WWW-Authenticate header when Authorization is missing', () => {
    const res = proxy(makeRequest('/'))
    expect(res.status).toBe(401)
    expect(res.headers.get('www-authenticate')).toContain('Basic realm=')
    expect(res.headers.get('cache-control')).toBe('no-store')
  })

  it('returns 401 on /admin and /en when Authorization is missing', () => {
    expect(proxy(makeRequest('/admin')).status).toBe(401)
    expect(proxy(makeRequest('/en')).status).toBe(401)
  })

  it('returns 401 for non-Basic schemes or malformed credentials', () => {
    expect(proxy(makeRequest('/', 'Bearer some-token')).status).toBe(401)
    expect(proxy(makeRequest('/', 'Basic not-valid-colon')).status).toBe(401)
  })

  it('returns 401 for wrong username or password', () => {
    expect(proxy(makeRequest('/', basicHeader('wrong', 'growth-tech'))).status).toBe(401)
    expect(proxy(makeRequest('/', basicHeader('devuser', 'wrong'))).status).toBe(401)
  })

  it('allows valid credentials (devuser / growth-tech) and preserves locale & bypass routing', () => {
    const rootRes = proxy(makeRequest('/', basicHeader('devuser', 'growth-tech')))
    expect(rootRes.status).toBe(307)
    expect(rootRes.headers.get('location')).toBe('http://localhost:3000/en')

    const enRes = proxy(makeRequest('/en', basicHeader('devuser', 'growth-tech')))
    expect(enRes.status).toBe(200)

    const adminRes = proxy(makeRequest('/admin', basicHeader('devuser', 'growth-tech')))
    expect(adminRes.status).toBe(200)
  })
})
