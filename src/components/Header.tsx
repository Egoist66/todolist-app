import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button, LinearProgress,
} from "@material-ui/core";
import {FC, memo} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {useStore} from "../hooks/useStore";
import {NavLink} from "react-router-dom";

export const Header: FC = memo(() => {
    const {dispatch, useAppSelector} = useStore()

    const {isAuth} = useAppSelector(state => state.auth)


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <NavLink style={{textDecoration: 'none', color: 'white', display: 'flex'}} end to={'/'}>
                            <MenuIcon/>
                        </NavLink>

                    </IconButton>
                    <Typography variant="h6"></Typography>
                    <Button color="inherit"><NavLink style={{textDecoration: 'none', color: 'white'}} end to={isAuth ? '/' : '/login'}>
                        {isAuth ? 'LOGGEDIN': 'LOGIN'}
                    </NavLink></Button>
                </Toolbar>



            </AppBar>
        </>
    );
})
