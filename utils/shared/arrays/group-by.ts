type Key = string | number

export function groupBy<INPUT>(list: INPUT[], selector: (item: INPUT) => Key): Record<Key, INPUT[]> {
  const mapGroup = new Map<Key, INPUT[]>()

  for (const item of list) {
    const key = selector(item)

    if (!mapGroup.has(key)) {
      mapGroup.set(key, [item])
    } else {
      mapGroup.get(key)?.push(item)
    }
  }

  return Object.fromEntries(mapGroup)
}
