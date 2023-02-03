const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const employee = await prisma.employee.create({
    data: {
      name: 'Bernhardus',
      isAdmin: true,
      password: "benfleuri"
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })