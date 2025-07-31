import { WalletIcon } from "@heroicons/react/24/outline"
import { lusitana } from "./font"
export  function Header() {
    return<div className="flex h-20 shrink-0 bg-blue-500 items-end rounded-lg p-4 md:h-52">
        <WalletIcon className='text-white w-12' />
        <span className={`text-white p-2 font-bold text-3xl ${lusitana.className}`}>Finovia</span>
      </div>
}