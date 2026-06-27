import { useEffect, useState } from "react";
import { ThemeContext } from "../_hooks/use-themes";

export function ThemeProvider({children}:{children?:React.ReactNode}) {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem(`${import.meta.env.VITE_PROJECT_TITLE}_theme`)
        if(savedTheme === "light" || savedTheme === "dark") {
            document.documentElement.setAttribute("data-bs-theme", savedTheme)
            return savedTheme
        }
        document.documentElement.setAttribute("data-bs-theme", "dark")
        return "dark"
    })
    const toggleTheme = () => {setTheme(prev => prev === "light" ? "dark" : "light")}

    useEffect(() => {
        localStorage.setItem(`${import.meta.env.VITE_PROJECT_TITLE}_theme`, theme)
        document.documentElement.setAttribute("data-bs-theme", theme)
    }, [theme])

    return (
        <ThemeContext value={{
            theme, toggleTheme
        }}>
            {children}
        </ThemeContext>
    )
}