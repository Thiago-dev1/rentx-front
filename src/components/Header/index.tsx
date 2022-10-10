import { useContext, useState } from "react"
import { AuthContext, signOut } from "../../context/AuthContext"

function Header() {
    const [open, setOpen] = useState<boolean>(false)

    const { user } = useContext(AuthContext)

    

    return (
        <header className="bg-violet-500 flex justify-between px-8 h-20 items-center">

            <p>Rentx</p>
            <div>
                <div ><button type="button" onClick={open === false? () => setOpen(true): () => setOpen(false)}><p>{user?.name}</p></button>
                    <div className={`absolute flex flex-col   ${open === false ? "invisible": ''}`}>
                        <a href="#" className=" rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 ">Your Profile</a>

                        <a href="#" className=" rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 ">Settings</a>

                        <a onClick={signOut} href="#" className=" rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 ">Sair</a>
                </div>     
                </div>

            </div>
        </header>
    )
}

export default Header