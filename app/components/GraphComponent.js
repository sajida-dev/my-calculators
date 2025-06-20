export default function GraphComponent({ data }) {
    return (
        <div style={{ minHeight: 200, background: '#e0e7ff', borderRadius: 8, padding: 16 }}>
            <strong>Graph Placeholder</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
} 