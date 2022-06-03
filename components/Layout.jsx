import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, Container, SwipeableDrawer } from '@mui/material';
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
      <Button variant="contained" onClick={toggleMenu}>
        <MenuIcon />
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
      <Box sx={{ my: 4 }}>
        <main>{children}</main>
      </Box>
    </Container>
  );
}
