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

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6"></Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

                <NavLink end to={'/'}>Todolist</NavLink>
                <NavLink end to={'/login'}>Login</NavLink>
            </AppBar>
        </>
    );
})
