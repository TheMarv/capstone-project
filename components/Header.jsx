import Menu from './Menu';
import Link from 'next/link';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wideScreen = useMediaQuery('(min-width: 600px)');

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <AppBar
      position="fixed"
      sx={
        wideScreen
          ? { maxWidth: 600, right: 'auto', left: 'auto' }
          : { left: 0, paddingRight: 1.5 }
      }
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* TODO: Replace the text with the current page title */}
          CMS App
        </Typography>
        <Link href="/">
          {/* TODO: Replace the adjacent with a proper logo */}
          <Typography variant="h6" sx={{ textDecoration: 'none' }}>
            LOGO
          </Typography>
        </Link>
      </Toolbar>

      <SwipeableDrawer
        anchor="left"
        open={menuOpen}
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
        onOpen={() => {}}
        onClose={() => {}}
      >
        <Menu />
      </SwipeableDrawer>
    </AppBar>
  );
}
