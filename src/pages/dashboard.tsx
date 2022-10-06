import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function Dashboard() {
    return (
        
       <div className="max-w-[1400px] mx-auto">
        <Header /> 
        <div className="flex mt-7">
            
            <Sidebar /> 
            <main className="pl-5">
                <div className="bg-blue-900 w-52 h-20 flex flex-col justify-between pl-3 rounded">
                    <p className="text-lg font-bold">Carros disponiveis</p>
                    <span className="">Total 50</span>
                </div>
            </main>
        </div>
       </div>
    )
}

export default Dashboard