import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphComponent({ data }) {
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }
    return (
        <div style={{ minHeight: 400, width: '100%' }}>
            <h3 className="font-semibold text-gray-700 mb-2">Loan Balance Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={v => `$${v.toLocaleString()}`} tick={{ fontSize: 12 }} label={{ value: 'Balance', angle: -90, position: 'insideLeft', offset: 10 }} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} labelFormatter={l => `Month: ${l}`} />
                    <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 