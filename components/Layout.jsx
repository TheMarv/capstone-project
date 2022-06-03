import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';
import Menu from './Menu';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <Container maxWidth="sm">
      {/* TODO: Move Toggle Menu button to a header */}
      <Button variant="contained" onClick={toggleMenu} startIcon={MenuIcon}>
        Toggle Menu
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={menuOpen}
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
      >
        <Menu toggleMenu={toggleMenu} />
      </SwipeableDrawer>
      <Box component="main" sx={{ my: 4 }}>
        {children}
      </Box>
    </Container>
  );
}
