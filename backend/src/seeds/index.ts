import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { config } from 'dotenv'
const prisma = new PrismaClient()

config()

async function main() {

    const { ADMIN_PASSWORD, ADMIN_TELEPHONE, ADMIN_EMAIL, ADMIN_NAMES } = process.env

    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: ADMIN_EMAIL as string,
            names: ADMIN_NAMES as string,
            role: "ADMIN",
            telephone: ADMIN_TELEPHONE,
            password: hashSync(ADMIN_PASSWORD as string, 10),
        },
    })
    console.log({ admin })
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