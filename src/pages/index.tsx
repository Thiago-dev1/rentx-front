import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <div className='max-w-[380px] h-screen mx-auto flex flex-col justify-center'>
      <div className='bg-slate-500 p-10 rounded-md flex flex-col gap-6  '>
        <div className='flex justify-center'>
          <p className='text-3xl font-semibold'>Bem vindo ao Rentx</p>
        </div>
        <form className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className='p-1 rounded text-gray-600'/>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" className='p-1 rounded text-gray-600'/>
          </div>
          <div className='flex justify-center mt-2'>
            <button type="submit" className='bg-blue-500 w-40 py-2 rounded cursor-pointer'>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
