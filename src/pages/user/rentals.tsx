import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { api } from "../../service/apiClient"

interface RentalsProps {
    id: string,
    user_id: string,
    car_id: string,
    stard_dte: string,
    end_date?: string,
    expected_return_date: string,
    total?: string,
    createdAt: string,
    updatedAt: string,
    Car: {
        id: string,
        name: string,
        description: string,
        dailyRate: number,
        available: boolean,
        license_plate: string,
        fine_amount: number,
        brand: string,
        category_id: string,
        createdAt: string
    }
}

function Rentals() {
    const [rentals, setRentals] = useState<RentalsProps[]>([])

    useEffect(() => {
        api.get("rentals/user")
            .then(response => setRentals(response.data))
    }, [])


    return (
        <div className="max-w-[1400px] mx-auto">
            <Header />
            <div className="flex mt-7">

                <Sidebar />
                <main className="pl-5 flex gap-8">
                    {rentals.map(rental => {
                        return (
                            <div className={`${rental.end_date === null ? "bg-red-400" : "bg-blue-900"} w-72 h-12 flex  pl-3 rounded`}>
                                <div className="flex flex-col justify-between flex-1">
                                    <p className="text-lg font-bold">{rental.Car.name}</p>
                                    <span className="">{rental.Car.fine_amount}</span>
                                </div>
                            </div>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

export default Rentals