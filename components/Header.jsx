import { Menu } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
          >
            <Menu />
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
      </AppBar>
    </Box>
  );
}
