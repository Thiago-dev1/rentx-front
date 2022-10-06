

function Sidebar() {
    return (
        <aside className="w-52">
            <div className="flex flex-col gap-6 p-6">
                <a href="/dashboard" className="text-lg font-semibold hover:text-blue-600">Dashboard</a>
                <a href="/cars" className="text-lg font-semibold hover:text-blue-600">Carros</a>
            </div>
        </aside>
    )
}

export default Sidebar