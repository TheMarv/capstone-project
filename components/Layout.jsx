import { Box, Container } from '@mui/material';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <Container maxWidth="sm">
      <Header />
      <Box sx={{ my: 4 }}>
        <main>{children}</main>
      </Box>
    </Container>
  );
}
