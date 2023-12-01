import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { FC } from "react";
import MenuIcon from "@material-ui/icons/Menu";

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6"></Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
