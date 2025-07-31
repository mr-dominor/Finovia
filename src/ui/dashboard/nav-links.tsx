'use client'
import { HomeIcon, DocumentDuplicateIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
const links = [
    {name:'Home',href:'/dashboard', icon:HomeIcon},
    {name:'Invoices',href:'/dashboard/invoices', icon:DocumentDuplicateIcon},
    {name:'Customers', href:'/dashboard/customers',icon:UserGroupIcon},
]

export default function Links(){
    const pathname = usePathname();
    return(
        <>
        {links.map((link)=>{
            const LinkIcon = link.icon
            return (
                <Link
                key={link.name}
                href={link.href}
                className={clsx(`flex h-[48px] w-full grow bg-gray-50 justify-center gap-2 rounded-md font-medium p-3 text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none  md:justify-start md:p-2 md:px-3 md:items-center`,{'bg-sky-600':pathname===link.href})} 
                >
                    <LinkIcon className="w-6" />
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            )
        })}
        </>
    );
}