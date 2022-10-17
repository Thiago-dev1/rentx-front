import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { api } from "../../service/apiClient"


interface RentalProps {
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


function ActiveRent() {


    const [rental, setRental] = useState<RentalProps>()

    useEffect(() => {
        api.get("rentals/user/active")
            .then(response => setRental(response.data))
    }, [])

    return (
        <div className="max-w-[1400px] mx-auto">
        <Header />
        <div className="flex mt-7">

            <Sidebar />
            <main className="pl-5 flex gap-8">
            <div className={`bg-red-400 w-72 h-12 flex  pl-3 rounded`}>
                                <div className="flex flex-col justify-between flex-1">
                                    <p className="text-lg font-bold">{rental?.Car?.name}</p>
                                    <span className="">{rental?.Car?.fine_amount}</span>
                                </div>
                            </div>
            </main>
        </div>
    </div>
    )
}

export default ActiveRent