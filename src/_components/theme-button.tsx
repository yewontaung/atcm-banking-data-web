import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "react-bootstrap";
import { useTheme } from "../_hooks/use-themes";

export default function ThemeButton({className}:{className?:string}) {
    const {theme, toggleTheme} = useTheme()
    return (
        <Button className={className} size="sm" onClick={toggleTheme} variant="link">
            {theme === "light" && <MoonIcon size={20} />}
            {theme === "dark" && <SunIcon size={20} />}
        </Button>
    )
}