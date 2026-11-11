import type { Access } from 'payload'

/**
 * Authenticated users can read all documents (including drafts);
 * public requests can only read published documents.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
