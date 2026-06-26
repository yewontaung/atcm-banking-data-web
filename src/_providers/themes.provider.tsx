import { useEffect, useState } from "react";
import { ThemeContext } from "../_hooks/use-themes";

export function ThemeProvider({children}:{children?:React.ReactNode}) {
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const toggleTheme = () => {setTheme(prev => prev === "light" ? "dark" : "light")}
    useEffect(() => {
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