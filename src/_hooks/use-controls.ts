import { useState } from "react";

export type DataControls<T> = {
    data:T,
    setData:React.Dispatch<React.SetStateAction<T>>
    reset: () => void,
}

export function useControls<T>(t:T):DataControls<T> {
    const [data, setData] = useState<T>(t)
    const reset = () => setData(t)
    return {data, setData, reset,}
}