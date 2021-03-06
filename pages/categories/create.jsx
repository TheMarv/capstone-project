import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CategoryForm from '../../components/CategoryForm';

export default function CategoryCreate() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create a new category
      </Typography>
      <CategoryForm />
    </Container>
  );
}
