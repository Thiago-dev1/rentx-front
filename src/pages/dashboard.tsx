import Link from 'next/link'

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function Dashboard() {
    return (
        
       <div className="max-w-[1400px] mx-auto">
        <Header /> 
        <div className="flex mt-7">
            
            <Sidebar /> 
            <main className="pl-5 flex gap-8">
                <div className="bg-blue-900 w-52 h-20 flex  pl-3 rounded">
                    <a href="/cars" className="flex flex-col justify-between flex-1">
                        <p className="text-lg font-bold">Carros disponiveis</p>
                        <span className="">Total 50</span>
                    </a>
                </div>

                <div className="bg-blue-900 w-52 h-20 flex  pl-3 rounded">
                    <Link href="/cars/d67814d4-a17a-47cf-9071-218f83315ead">
                        <a className="flex flex-col justify-between flex-1">
                            <p className="text-lg font-bold">SUV</p>
                            <span className="">Total 5</span>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
       </div>
    )
}

export default Dashboard