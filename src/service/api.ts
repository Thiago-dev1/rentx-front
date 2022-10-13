import axios from "axios"
import { parseCookies } from "nookies"

const cookies = parseCookies()

export const api = axios.create({
    baseURL: "http://localhost:3334",
    headers: {
        Authorization: `Bearer ${cookies['login.refresh-token']}`
    }
})

