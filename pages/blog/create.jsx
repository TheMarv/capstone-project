import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BlogpostForm from '../../components/BlogpostForm';

export default function CreateBlogpost() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create a blog post
      </Typography>
      <BlogpostForm />
    </Container>
  );
}
