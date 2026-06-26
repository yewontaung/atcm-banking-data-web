import type { ReactNode } from "react";
import ThemeButton from "../theme-button";

export default function MainContentDecorator({title, children}:{title:string, children:ReactNode}) {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <span className="fw-semibold fs-5">{title}</span>
                <div className="align-self-start">
                    <ThemeButton />
                </div>
            </div>
            {children}
        </div>
    )
}