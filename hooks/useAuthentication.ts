import { User } from '@/contexts/auth'

/**
 * Provides temporary credentials for a single user.
 * This is sufficient as an authentication method for the current assignment.
 */
export async function useAuthentication(): Promise<User> {
  const username = 'some_username'
  const token = 'some_token'

  await new Promise(res => setTimeout(res, 300))

  return { username, token }
}
