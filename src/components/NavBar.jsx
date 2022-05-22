import { useCallback, useMemo, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import VideoIcon from "@mui/icons-material/OndemandVideo";
import BookIcon from "@mui/icons-material/Book";

import AuthHolder from "./AuthHolder";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";

const routes = [
  { name: "Livros", path: "/livros", icon: <BookIcon /> },
  { name: "Cursos", path: "/cursos", icon: <VideoIcon /> },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { attemptLogin, logout } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname === "/livros") return "Listagem de livros";
    if (pathname === "/cursos") return "Listagem de cursos";
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <AuthHolder
              fallback={() => (
                <Button color="inherit" onClick={attemptLogin}>
                  Login
                </Button>
              )}
            >
              <Button color="inherit" onClick={logout}>
                Sair
              </Button>
            </AuthHolder>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={"left"}
        open={isMenuOpen}
        onClose={toggleMenu}
        variant="temporary"
      >
        <Box
          role="presentation"
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
          sx={{
            width: 300,
          }}
        >
          <List>
            {routes.map(({ name, path, icon }) => (
              <MenuItem
                key={name}
                label={name}
                selected={path === pathname}
                icon={icon}
                onClick={() => navigate(path)}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

const MenuItem = (props) => (
  <ListItem disablePadding onClick={props.onClick}>
    <ListItemButton selected={props.selected}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItemButton>
  </ListItem>
);
