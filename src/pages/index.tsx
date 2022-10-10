import { useFormik } from 'formik';
import type { NextPage } from 'next'
import { useContext } from 'react';

import * as Yup from 'yup'
import { AuthContext } from '../context/AuthContext';



const Home: NextPage = () => {

  const { signIn } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Email inválido').required("Digite seu email!"),
        password: Yup.string().required("Digite uma senha!")
    })
    ,
    onSubmit: async (values) => {
        const data = {
            email: values.email,
            password: values.password
        }
        try {
          await signIn(data)
        } catch (error) {
            console.warn(error)
        }
    }
})

  return (
    <div className='max-w-[380px] h-screen mx-auto flex flex-col justify-center'>
      <div className='bg-slate-500 p-10 rounded-md flex flex-col gap-6'>
        <div className='flex justify-center'>
          <p className='text-3xl font-semibold'>Bem vindo ao Rentx</p>
        </div>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className='p-1 rounded text-gray-600' onChange={formik.handleChange} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? <p className='text-red-300 text-end'>{formik.errors.email}</p> : null}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" className='p-1 rounded text-gray-600' onChange={formik.handleChange} value={formik.values.password}/>
            {formik.touched.password && formik.errors.password ? <p className='text-red-300 text-end'>{formik.errors.password}</p> : null}
          </div>
          <div className='flex justify-center mt-2'>
            <button type="submit" className='bg-blue-500 w-40 py-2 rounded cursor-pointer hover:bg-blue-700'>Entrar</button>
          </div>
          <a href="/sign-up" className='text-center text-sm hover:text-blue-800'>Cadastrar</a>
        </form>
      </div>
    </div>
  )
}

export default Home
