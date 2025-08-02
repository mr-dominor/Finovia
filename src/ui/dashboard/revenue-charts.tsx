// File: RevenueChart.tsx (no 'use client')
import { lusitana } from "../font";
import { fetchRevenue } from "@/lib/data";
import RevenueChartClient from "@/ui/dashboard/generate-rev";

export default async function RevenueChart() {
  const data = await fetchRevenue();

  return (
  <div>
    <h2 className={`${lusitana.className} text-xl md:text-2xl`}>Revenue</h2>
    <div className="bg-gray-50 shadow-sm rounded-xl overflow-hidden  px-4 py-6">
      <RevenueChartClient data={data} />
      </div>
    </div>
    );
}
