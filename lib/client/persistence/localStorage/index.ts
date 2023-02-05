export function set<DATA>(key: string, data: DATA) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(key, dataString)
}

export function get<DATA>(key: string): DATA | null {
  const dataString = localStorage.getItem(key)
  if (!dataString) {
    return null
  }
  return JSON.parse(dataString)
}

export function clear(key: string) {
  localStorage.removeItem(key)
}

export function exist(key: string) {
  return !!localStorage.getItem(key)
}
