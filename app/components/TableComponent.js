export default function TableComponent({ data }) {
    return (
        <div style={{ minHeight: 100, background: '#f1f5f9', borderRadius: 8, padding: 16 }}>
            <strong>Table Placeholder</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
} 