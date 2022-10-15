import { useFormik } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup'
import { api } from '../service/apiClient';

function SignUp() {

    const formik = useFormik({
        initialValues: {
            name: '',
            cnh: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Digite seu nome!"),
            cnh: Yup.string().min(11, "Os 11 digitos da CNH").max(11, "Os 11 digitos da CNH").required("Digite sua CNH"),
            email: Yup.string().email('Email inválido').required("Digite seu email!"),
            password: Yup.string().min(5, "5 carácter").required("Digite uma senha!")
        })
        ,
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                cnh: values.cnh,
                email: values. email,
                password: values.password
            }
            try {
                api.post("users", data)
                    .then(response => {
                        if (response.status === 201) {
                            alert("Sucesso")
                            Router.push("/")
                        }
                    })
                    .catch((err) => {
                        if (err.response.data.message === "User Aldready exists") {
                            return alert("Usuario já cadastrado!")
                        }
                        return alert("Erro interno do servidor")
                    })
            } catch (error) {
                console.warn(error)
            }
        }
    })


    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-slate-500 w-[380px] p-10 rounded-md ">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-lg font-semibold">Nome</label>
                        <input type="text" id="name" name="name" className="p-1 text-black" onChange={formik.handleChange} value={formik.values.name}/>
                        {formik.touched.name && formik.errors.name ? <p className='text-red-300 text-end'>{formik.errors.name}</p> : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cnh" className="text-lg font-semibold">CNH</label>
                        <input type="number" id="cnh" name="cnh" className="p-1 text-black" onChange={formik.handleChange} value={formik.values.cnh}/>
                        {formik.touched.cnh && formik.errors.cnh ? <p className='text-red-300 text-end'>{formik.errors.cnh}</p> : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-semibold">Email</label>
                        <input type="email" id="email" name="email" className="p-1 text-black" onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? <p className='text-red-300 text-end'>{formik.errors.email}</p> : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-lg font-semibold">Senha</label>
                        <input type="password" id="password" name="password" className="p-1 text-black" onChange={formik.handleChange} value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? <p className='text-red-300 text-end'>{formik.errors.password}</p> : null}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 w-40 py-2 rounded cursor-pointer hover:bg-blue-700">Cadastrar</button>
                    </div>
                </form>
                <p className="text-center mt-2">Já possui conta? <a href="/" className="font-bold">Entrar</a></p>
            </div>

        </div>
    )
}

export default SignUp