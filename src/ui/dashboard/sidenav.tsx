import Links from "./nav-links"
import { WalletIcon,PowerIcon } from "@heroicons/react/24/outline";
import { lusitana } from "../font";
export default function SideNave(){
    <Links />
    return(
        <div className="h-full flex flex-col px-3 py-4" >
            <div className="flex h-20 mb-2 bg-blue-500 items-end rounded-lg p-4 md:h-40">
                <WalletIcon className='text-white w-12' />
                <span className={`text-white p-2 font-bold text-3xl ${lusitana.className}`}>Finovia</span>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Links />
                <div className="hidden h-auto w-full rounded-md bg-gray-50 md:block "></div>
                    <form>
                        <button type="submit" className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" >
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
        </div>
    );
}