import prismaClient from "@/lib/prisma/prisma"
import { redirect } from "next/navigation"

export default async function CustomUrlPage({
    params,
}: {
    params: Promise<{ customUrl: string }>
}) {
    const { customUrl } = await params
    console.log(customUrl)
    const url = await prismaClient.url.findFirst({
        where: {
            shortUrl: customUrl,
        },
    })
    console.log(url)
    if (url) {
        redirect(url.originalUrl)
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center font-semibold">
                URL not found
            </div>
        </div>
    )
}
