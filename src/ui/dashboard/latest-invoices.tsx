import { fetchLatestInvoices } from "@/lib/data"
import { lusitana } from "../font";
import Image from "next/image";
import clsx from "clsx";
export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex flex-col ml-2">
      <h2 className={`${lusitana.className} text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx('flex flex-row items-center justify-between py-4', {
                'border-t': i !== 0,
              })}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
