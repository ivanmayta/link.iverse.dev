"use client"

import { useState } from "react"
import { toast } from "sonner"

export function FormUrl() {
    const [originalUrl, setOriginalUrl] = useState("")
    const [customUrl, setCustomUrl] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="originalUrl">Enter the Url to be shortened</label>
            <input
                id="originalUrl"
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1"
            />

            <label htmlFor="customUrl">Enter the custom short url</label>
            <input
                id="customUrl"
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1"
            />
            <button className="bg-gray-200 text-black hover:bg-white rounded-md p-2">
                Submit
            </button>
        </form>
    )
}
