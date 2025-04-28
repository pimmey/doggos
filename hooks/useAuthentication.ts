/**
 * Provides temporary credentials for a single user.
 * This is sufficient as an authentication method for the current assignment.
 */
export async function useAuthentication() {
  const userName = 'some_username'
  const token = 'some_token'

  await new Promise(res => setTimeout(res, 300))

  return { userName, token }
}
