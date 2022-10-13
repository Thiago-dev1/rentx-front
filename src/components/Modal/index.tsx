import * as Dialog from '@radix-ui/react-dialog';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { api } from '../../service/api';
import Router from 'next/router';


interface ModalProps {
    car_id: string,
    name: string,
    brand: string,
    dailyRate: number,
    fine_amount: number
}

function Modal({car_id, name, brand, dailyRate, fine_amount}: ModalProps) {

    const formik = useFormik({
        initialValues: {
            expected: ''
        },
        onSubmit: async (values) => {
            const data = {
                car_id,
                expected_return_date: new Date(values.expected)
            }

            console.log(values.expected)

            try {
                api.post("rentals", data)
                    .then(response => {
                        if (response.status === 201) {
                            alert("Sucesso")
                            Router.push("/dashboard")
                        }
                    })
                    .catch((err) => {
                        if (err.response.data.message === "Car is unavailable") {
                            return alert("O carro está indisponível!")
                        } else if(err.response.data.message === "There's a rental in progress for user!") {
                            return alert("Alugeu em andamento!")
                        } else if (err.response.data.message === "Invalid return time!") {
                            return alert("Horário de retorno inválido!")
                        }
                        return alert("Erro interno do servidor")
                    })
            } catch (error) {
                console.warn(error)
            }
        }
    })

    return (
            
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-[380px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-center text-3xl">Alugar</Dialog.Title>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div className="flex justify-around">
                            <p className="text-2xl">{name}</p>
                            <p className="text-2xl">{brand}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Diaria {dailyRate}</p>
                            <p>Multa por atraso {fine_amount}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="expected" className="font-bold">Data de entrega</label>
                            <input className='text-black' type='datetime-local' id='expected' onChange={formik.handleChange} value={formik.values.expected} />
                        </div>
                        
                        <button type="submit" className="bg-blue-600 p-2 rounded transition hover:bg-blue-800">Alugar</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        
    )
}

export default Modal