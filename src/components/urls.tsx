import prisma from "@/lib/prisma/prisma"

export async function Urls() {
    const prismaClient = await prisma.url.findMany()

    return (
        <div className="flex flex-col gap-2 p-6 w-full rounded-md border  border-zinc-800 ">
            <table>
                <thead>
                    <tr className="text-sm flex flex-row text-left">
                        <th className="w-1/4 p-2">Hash</th>
                        <th className="w-3/4 p-2">Original URL</th>
                    </tr>
                </thead>
                <tbody>
                    {prismaClient.map((url) => (
                        <tr key={url.id} className="text-sm flex flex-row">
                            <td className="w-1/4 p-2">{url.shortUrl}</td>
                            <td className="w-3/4 p-2">
                                <a
                                    className="text-blue-500 hover:text-blue-600 underline text-xs break-all hover:break-words"
                                    href={url.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url.originalUrl}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
