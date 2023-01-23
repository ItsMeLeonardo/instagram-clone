export async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, { ...options, cache: 'no-store' })

  return response
}
