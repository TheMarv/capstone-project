import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BlogpostForm from '../../../components/BlogpostForm';

export default function EditBlogpost() {
  const { query } = useRouter();
  const { blogpostId } = query;
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Edit a blog post
      </Typography>
      <BlogpostForm id={blogpostId} />
    </Container>
  );
}
