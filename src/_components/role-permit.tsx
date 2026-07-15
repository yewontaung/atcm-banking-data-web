import type { MemberRole } from "../_models/outputs"
import { getAuthProfile } from "../_utils/auth.utils"

export default function RolePermit({roles, children}:{roles:MemberRole[], children:React.ReactNode}) {

    const auth = getAuthProfile()

    return (
        <>
         {roles.filter(i => auth.accountRole === i).length > 0 && children}
        </>
    )
}