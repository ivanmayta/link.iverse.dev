import prisma from "@/lib/prisma/prisma"

export async function Urls() {
    const prismaClient = await prisma.url.findMany()

    return (
        <div>
            Urls
            {JSON.stringify(prismaClient)}
        </div>
    )
}
