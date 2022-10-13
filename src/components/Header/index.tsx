import { useContext, useState } from "react"
import { AuthContext, signOut } from "../../context/AuthContext"

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function Header() {
    const [open, setOpen] = useState<boolean>(false)

    const { user } = useContext(AuthContext)

    

    return (
        <header className="bg-violet-500 flex justify-between px-8 h-20 items-center">

            <p>Rentx</p>
            <div>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        {user?.name}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-red-500 w-14">
                        <DropdownMenu.Item>
                        <a onClick={signOut} href="#" className=" rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 ">Sair</a>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                

            </div>
        </header>
    )
}

export default Header