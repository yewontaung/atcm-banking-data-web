import { createContext, useContext } from "react"

export type ThemeContextType = {
    theme:"light" | "dark",
    toggleTheme:() => void,
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context) throw new Error("useTheme must be inside ThemeContext")
    return context
}