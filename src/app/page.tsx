import { FormUrl } from "@/components/form-url"
import { Urls } from "@/components/urls"

export default function Home() {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen max-w-xl mx-auto">
            <header></header>
            <main className="flex flex-col items-center sm:items-start pt-20 pb-10">
                <FormUrl />
                <Urls />
            </main>
            <footer className="flex items-center justify-center">
                <a
                    className="flex items-center hover:underline hover:underline-offset-4"
                    href="https://iverse.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Go to iverse.dev →
                </a>
            </footer>
        </div>
    )
}
