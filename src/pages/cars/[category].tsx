import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Link from 'next/link'

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { api } from "../../service/api"

import { CarsPros } from "../../types/CarsProps"


function CarsCategory() {
    const router = useRouter()
    const { category } = router.query

    const [cars, setCars] = useState<CarsPros[]>([])

    useEffect(() => {
        api.get("cars/available", {params: {category_id: category}})
            .then(response => setCars(response.data))
    }, [category !== undefined])

    return (
        <div className="max-w-[1400px] mx-auto h-screen flex flex-col">
            <Header />
            <div className="flex mt-7 h-full">
                <Sidebar />
                <main className="pl-5 flex flex-col gap-4">

                    {cars.map(car => {
                        return (
                            <Link href={`/car/${car.license_plate}`} >
                                <a key={car.id} className="flex flex-col bg-blue-600 w-[480px]">
                                    <div className="flex justify-between px-4">
                                        <div className="flex flex-col">
                                            <div><h3 className="text-2xl font-semibold">{car.name}, {car.brand}</h3></div>
                                            <div className="flex gap-2 text-sm">
                                            <p className='text-gray-300'>{car.SpecificationsCars.map(s => s.Specification.name)}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex flex-col">
                                                <span>Preço total por dia</span>
                                                <p className="text-end font-semibold">{car.dailyRate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

export default CarsCategory