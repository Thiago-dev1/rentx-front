import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { api } from '../../service/apiClient'

import { CarsPros } from "../../types/CarsProps"

import * as Dialog from '@radix-ui/react-dialog';
import Modal from '../../components/Modal'


const Car = () => {
  const router = useRouter()
  const { license_plate } = router.query


  const [cars, setCars] = useState<CarsPros[]>([])

  useEffect(() => {
    api.get("cars/available", { params: { license_plate: license_plate } })
      .then(response => setCars(response.data))
  }, [license_plate !== undefined])


  return (
    <div className="max-w-[1400px] mx-auto h-screen flex flex-col">
      <Header />
      <div className="flex mt-7 h-full">
        <Sidebar />
        <main className="pl-5 flex flex-col gap-4">
          {cars.map(car => {
            return (
              <>
                <a href='#' key={car.id} className="flex flex-col justify-center bg-blue-600 w-[680px] h-36">
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
                        <p className="text-end font-semibold">{car?.dailyRate} R$</p>
                        <p>Multa por atraso {car.fine_amount}</p>
                      </div>
                    </div>
                  </div>
                </a>
                <Dialog.Root>
                  <Dialog.Trigger>Alugar</Dialog.Trigger>
                  <Modal car_id={car.id} name={car.name} brand={car.brand} dailyRate={car.dailyRate} fine_amount={car.fine_amount}/>
                </Dialog.Root>

              </>
            )
          })}


        </main>
      </div>
    </div>
  )
}

export default Car