import Router from "next/router"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { createContext, useEffect, useState } from "react"
import { api } from "../service/apiClient"


type SignInCredentials = {
    email: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    isAuthenticated: boolean,
    user: User | undefined
}

type User = {
    name: string,
    email: string
}

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    destroyCookie(undefined, "login.token")
    destroyCookie(undefined, "login.refresh-token")

    Router.push("/")
}

export function AuthProvaider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>()

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'login.token': token } = parseCookies()
         const { 'login.refresh-token': refresh_token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { email, name } = response.data
                setUser({ email, name }) 
            })
            .catch(() => {
                signOut()
            })
        }
    }, [])

    async function signIn({email, password}: SignInCredentials) {
        console.log(email)

        try {
            const response = await api.post('sessions',{
                email,
                password
            })

            const { token, refresh_token } = response.data
            const { name } = response.data.user


            setCookie(undefined, 'login.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setCookie(undefined, 'login.refresh-token', refresh_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
     
            setUser({
                email,
                name
            })
            
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            alert("Sucesso!")

            Router.push("/dashboard")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, user}} >
            {children}
        </AuthContext.Provider>
    )
}