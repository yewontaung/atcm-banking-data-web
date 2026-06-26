import { Link } from "react-router-dom";

import { BrainCircuitIcon, DatabaseIcon, LayoutDashboardIcon, TagsIcon, Users2Icon } from "lucide-react";
import type { ReactNode } from "react";

const iconSize = 15

type SideBarMenuItem = {
    readonly id:number,
    readonly label:string,
    readonly link:string,
    readonly icon?:ReactNode,
}

const sideBarMenuItems:SideBarMenuItem[] = [
    {
        id:1,
        label:"Dashboard",
        link:"dashboard",
        icon: <LayoutDashboardIcon size={iconSize} />,
    },
    {
        id:2,
        label:"Dataset",
        link:"dataset",
        icon: <DatabaseIcon size={iconSize} />,
    },
    {
        id:3,
        label:"Intents",
        link:"intents",
        icon: <BrainCircuitIcon size={iconSize} />
    },
    {
        id:4,
        label:"Named Entites",
        link:"ners",
        icon: <TagsIcon size={iconSize} />
    },
    {
        id:5,
        label:"Members",
        link:"members",
        icon: <Users2Icon size={iconSize} />,
    },
] 
export default function AppSidebar() {
    return (
        <div className="min-vh-100 d-flex flex-column py-2">
            <div className="border flex-grow-1" style={{
                minWidth: 250,
            }}>
                <div>
                    <h5 className="p-3">{import.meta.env.VITE_PROJECT_TITLE}</h5>
                </div>
                <div className="d-flex flex-column row-gap-1 mt-4">
                    {sideBarMenuItems.map(item => <AppSidebarItem key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    )
}

function AppSidebarItem({label, link, icon}:SideBarMenuItem) {
    return (
        <Link className="d-block py-2 px-3 sidebar-item text-decoration-none" to={link}>{icon ?? icon} <span className="me-2"></span>{label}</Link>
    )
}