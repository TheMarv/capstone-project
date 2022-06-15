import Header from './Header';
import Snackbar from './Snackbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Layout({ children }) {
  return (
    <Container maxWidth="sm" sx={{ padding: '0!important' }}>
      <Header />
      <Box component="main" sx={{ marginTop: 9, px: 1 }}>
        {children}
      </Box>
      <Snackbar />
    </Container>
  );
}
