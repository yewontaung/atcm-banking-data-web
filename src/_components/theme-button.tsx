import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "react-bootstrap";
import { useTheme } from "../_hooks/use-themes";

export default function ThemeButton() {
    const {theme, toggleTheme} = useTheme()
    return (
        <Button onClick={toggleTheme} variant="link">
            {theme === "light" && <MoonIcon size={"1.1rem"} />}
            {theme === "dark" && <SunIcon size={"1.1rem"} />}
        </Button>
    )
}