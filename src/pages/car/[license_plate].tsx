import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { api } from '../../service/api'

interface CarsPros {
  id: string,
  name: string,
  description: string,
  dailyRate: number,
  available: boolean
  license_plate: string,
  fine_amount: number,
  brand: string,
  category_id: string,
  createdAt: Date,
  SpecificationsCars: {
    id: string,
    car_id: string,
    specification_id: string,
    createdAt: Date
  }[]
}

interface SpecificationsProps {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

const Car = () => {
  const router = useRouter()
  const { license_plate } = router.query


  const [cars, setCars] = useState<CarsPros[]>([])
  const [specifications, setSpecifications] = useState<SpecificationsProps[]>([])

  useEffect(() => {
    api.get("cars/available", { params: { license_plate: license_plate } })
      .then(response => setCars(response.data))
  }, [license_plate !== undefined])

  useEffect(() => {
    api.get("specifications")
      .then(response => setSpecifications(response.data))
  }, [])



  return (
    <div className="max-w-[1400px] mx-auto h-screen flex flex-col">
      <Header />
      <div className="flex mt-7 h-full">
        <Sidebar />
        <main className="pl-5 flex flex-col gap-4">
          {cars.map(car => {
            return (
              <a href='#' key={car.id} className="flex flex-col justify-center bg-blue-600 w-[680px] h-36">
                <div className="flex justify-between px-4">
                  <div className="flex flex-col">
                    <div><h3 className="text-2xl font-semibold">{car.name}, {car.brand}</h3></div>
                    <div className="flex gap-2 text-sm">
                      {car.SpecificationsCars.map(s => specifications.map(sn => sn.id === s.specification_id ? <p key={sn.id} className='text-gray-300'>{sn.name}</p> : undefined))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col">
                      <span>Preço total por dia</span>
                      <p className="text-end font-semibold">{car?.dailyRate} R$</p>
                      <p>Multa por atraso {car.fine_amount}</p>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}


        </main>
      </div>
    </div>
  )
}

export default Car