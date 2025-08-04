"use client"

import { useState } from "react"
import { toast } from "sonner"

export function FormUrl() {
    const [originalUrl, setOriginalUrl] = useState("")
    const [customUrl, setCustomUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const raw = {
            originalUrl,
            customUrl,
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(raw),
            redirect: "follow" as RequestRedirect,
        }

        fetch("/api/generate", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
                setOriginalUrl("")
                setCustomUrl("")
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-2 p-6 rounded-md border  border-zinc-800 "
        >
            <label htmlFor="originalUrl">Enter the Url to be shortened:</label>
            <input
                id="originalUrl"
                type="text"
                placeholder="Example: https://iverse.dev"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-2"
            />

            <label htmlFor="customUrl">
                Enter the custom short url (hash):
            </label>
            <input
                id="customUrl"
                type="text"
                placeholder="Example: iverse"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-2"
            />
            <button
                disabled={isLoading}
                className="bg-gray-200 text-black hover:bg-white rounded-md p-2"
            >
                {isLoading ? "Shortening..." : "Shorten 🔗"}
            </button>
        </form>
    )
}
