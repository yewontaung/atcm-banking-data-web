import { getAuthProfile } from "../_utils/auth.utils"

type MemberRole = "Admin" | "Supervisor" | "Collector"

export default function RolePermit({roles, children}:{roles:MemberRole[], children:React.ReactNode}) {

    const auth = getAuthProfile()

    return (
        <>
         {roles.filter(i => auth.accountRole === i).length > 0 && children}
        </>
    )
}