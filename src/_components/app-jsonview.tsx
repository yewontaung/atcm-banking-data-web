import JsonView from "@microlink/react-json-view"

export function AppJsonView<T extends Record<string, unknown>>({data}:{data:T}) {
    return (
        <JsonView
            src={data}
            name="dataset"
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