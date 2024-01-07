import {AppBar, Button, IconButton, Toolbar, Typography,} from "@material-ui/core";
import {FC, useEffect, useState} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {useStore} from "../hooks/useStore";
import {NavLink, useNavigate} from "react-router-dom";
import {SideBar} from "./SideBar";
import Text from "../service-components/Text/Text";
import {View} from "../service-components/View/View";
import {logOutApp} from "../store/async-thunks/auth-thunks/authApp";
import {LS} from "../utils/utils";
import {Label} from "@material-ui/icons";

export const Header: FC = () => {
    const {useAppSelector, dispatch} = useStore()
    const {isAuth, data} = useAppSelector(state => state.auth)
    const [isOpen, setOpen] = useState<boolean>(false)


    const toggleBar = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(isOpen => !isOpen)
        }
    }

    const toggleByClickOutSide = (e: MouseEvent) => {
        // @ts-ignore
        if (e.target.closest('aside')) {

            return
        }
        setOpen(false)

    }


    useEffect(() => {
        window.addEventListener('keydown', toggleBar)
        window.addEventListener('click', toggleByClickOutSide)

        return () => {
            window.removeEventListener('keydown', toggleBar)
            window.removeEventListener('click', toggleByClickOutSide)
        }
    }, [isOpen])


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton disabled={!isAuth} onClick={(e) => {
                        e.stopPropagation()
                        setOpen(isOpen => !isOpen)
                    }} edge="start" color="inherit" aria-label="menu">


                        <MenuIcon/>

                    </IconButton>
                    <Typography variant="h6"></Typography>

                    {!isAuth ?<Button variant={'text'}>
                        <NavLink style={{color: 'white', textDecoration: 'none'}} to={'/login'}>{!isAuth ? 'Log In' : ''}</NavLink>
                    </Button> : null }
                </Toolbar>

            </AppBar>


            {isAuth ? <SideBar isOpen={isOpen}>
                <Typography color={'textSecondary'} variant={'h6'}>
                    <b>{isAuth ? 'LOGGED IN' : null}</b>
                </Typography>
                <View>
                    <Text _color={'#3F51B5'}>User ID - {data.id}</Text>
                    <Text _color={'#3F51B5'}>Login - {data.login}</Text>
                    <Text _color={'#3F51B5'}>Email - {data.email}</Text>
                </View>
                <Button onClick={() => dispatch(logOutApp())} color={'secondary'} variant={'outlined'}>Log Out</Button>

            </SideBar> : null}

        </>
    );
}
