import {FC, memo, ReactNode} from "react";
import {Portal} from "../service-components/Portal/Portal";

type SideBarProps = {
    isOpen: boolean
    children: ReactNode
}
export const SideBar: FC<SideBarProps> = memo(({isOpen, children}) => {

    return (


        <Portal>
            <aside className={isOpen ? 'open sidebar' : 'sidebar'}>

                <div>
                    {children}
                </div>
            </aside>

        </Portal>


    )
})