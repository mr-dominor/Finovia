import {fetchCardData} from '@/lib/data'
import { BanknotesIcon,UserGroupIcon,InboxIcon,ClockIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../font';

const iconMap = {
    collected:BanknotesIcon,
    customers:UserGroupIcon,
    pending:ClockIcon,
    invoices:InboxIcon,
}
export function Card({title,value,type}:{title:string, value:number|string, type:'invoices'|'customers'|'pending'|'collected';}){
    const Icon = iconMap[type]
    return <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
        <div className='flex p-4'>{Icon?<Icon className='w-5 h-5 text-gray-700' />:null}
        <h3 className='ml-2 text-sm font-medium' >{title}</h3>
        </div>
        <p className={`${lusitana.className} truncate roundedxl bg-white px-4 py-8 text-center text-2xl`}>{value}</p>
    </div>
}
export default async function CardWrapper(){
    const {numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices} = await fetchCardData();
    console.log()
    return <>
    <Card title="Collected" value={totalPaidInvoices} type="collected" />
    <Card title="Pending" value={totalPendingInvoices} type="pending" />
    <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
    <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
}