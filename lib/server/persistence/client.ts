import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ['query'],
  })

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
