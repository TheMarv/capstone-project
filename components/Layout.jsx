import { Box, Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <main>{children}</main>
      </Box>
    </Container>
  );
}
