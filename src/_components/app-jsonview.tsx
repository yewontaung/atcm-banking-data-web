import JsonView from "@microlink/react-json-view"

export function AppJsonView<T extends Record<string, unknown>>({data, name = "root"}:{data:T, name?:string}) {
    return (
        <JsonView
            src={data}
            name={name}
            enableClipboard={false}
            displayDataTypes={false}
            displayArrayKey={false}
            displayObjectSize={false}
            theme="ocean"
            style={{
                fontFamily: '"JetBrains Mono"',
                fontSize: 12,
                padding: 20,
            }} />
    )
}