import CardWrapper from "@/ui/dashboard/card";
import RevenueChart from "@/ui/dashboard/revenue-charts";
import { lusitana } from "@/ui/font";
import LatestInvoices from "@/ui/dashboard/latest-invoices";
import { RevenueChartSkeleton,LatestInvoicesSkeleton , CardSkeleton} from '@/ui/skeleton';
import { Suspense } from "react";
export default async function Dashboard(){
    return (
        <main>
            <h1 className={`text-xl md:text-2xl ${lusitana.className} mb-4`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap:6 lg:grid-cols-2 ">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart  /> 
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                  <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}