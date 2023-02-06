export function commentInputId(strings: TemplateStringsArray, postId: number) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
  return `COMMENT-INPUT-${postId}`
}
