

function Sidebar() {
    return (
        <aside className="w-52">
            <div className="flex flex-col gap-6 p-6">
                <a href="/dashboard" className="text-lg font-semibold hover:text-blue-600">Dashboard</a>
                <a href="/cars" className="text-lg font-semibold hover:text-blue-600">Carros</a>
                <div className="flex flex-col">
                    <a href="/user" className="text-lg font-semibold hover:text-blue-600">Meus</a>
                    <a href="/user/rentals" className="ml-3 hover:text-blue-600">Aluguéis</a>
                    <a href="/user/activeRent" className="ml-3 hover:text-blue-600">Alugeu Ativo</a>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar