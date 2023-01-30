import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function comparePassword(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash)
  return result
}
