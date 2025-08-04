import prismaClient from "@/lib/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
    const { originalUrl, customUrl } = await request.json()
    //console.log(originalUrl, customUrl)
    const data = await prismaClient.url.findFirst({
        where: {
            shortUrl: customUrl,
        },
    })
    if (data) {
        //console.log("CustomUrl already exists")
        return Response.json({
            success: false,
            error: true,
            message: "CustomUrl already exists!",
        })
    }
    const url = await prismaClient.url.create({
        data: {
            originalUrl,
            shortUrl: customUrl,
        },
    })
    if (url?.id) {
        revalidatePath("/")
    }
    return Response.json({
        success: true,
        error: false,
        message: "CustomUrl created successfully!",
        url,
    })
}
