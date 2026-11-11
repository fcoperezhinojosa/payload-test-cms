import type { Access } from 'payload'

/** Allow access only to authenticated users (e.g., for reading version history). */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
