const rule = /([#|＃][^\s]+)/g

export function extractHashTags(text: string): string[] {
  const matches = text.match(rule)
  return matches ? matches.map((match) => match.replace(/[#|＃]/g, '')) : []
}
