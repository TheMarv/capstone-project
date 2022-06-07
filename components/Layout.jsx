import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <Container maxWidth="sm" sx={{ padding: '0!important' }}>
      <Header />
      <Box component="main" sx={{ marginTop: 9, px: 1 }}>
        {children}
      </Box>
    </Container>
  );
}
