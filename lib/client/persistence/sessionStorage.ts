export function save<DATA>(data: DATA) {
  const dataString = JSON.stringify(data)
  sessionStorage.setItem('data', dataString)
}

export function get<DATA>(): DATA | null {
  const dataString = sessionStorage.getItem('data')
  if (!dataString) {
    return null
  }
  return JSON.parse(dataString)
}
