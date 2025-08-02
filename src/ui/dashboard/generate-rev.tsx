'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

type Revenue = {
  month: string;
  revenue: number;
};

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function RevenueChartClient({ data }: { data: Revenue[] }) {
  function getLast12Months(): string[] {
    const result: string[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      result.unshift(monthOrder[now.getMonth()]);
      now.setMonth(now.getMonth() - 1);
    }
    return result;
  }

  const last12Months = getLast12Months();

  const filteredAndSorted = last12Months.map(month =>
    data.find(item => item.month === month)
  ).filter(Boolean);

  return (
    <div className="w-full h-[400px] bg-white px-2 py-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredAndSorted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#93C5FD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
