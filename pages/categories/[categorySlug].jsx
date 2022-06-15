import { useRouter } from 'next/router';
import useStore from '../../hooks/useStore';
import Blogpost from '../../components/Blogpost';
import Typography from '@mui/material/Typography';

export default function CategoryPage() {
  const { query } = useRouter();
  const { categorySlug } = query;

  const category = useStore(
    state =>
      categorySlug &&
      state.categories.find(category => category.slug === categorySlug)
  );
  const posts = useStore(
    state =>
      categorySlug &&
      state.blogposts.filter(post => post.category === categorySlug)
  );

  return (
    <>
      <Typography
        sx={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}
        variant="h3"
      >
        {category
          ? category.name
          : category === null
          ? 'Loading…'
          : 'Category not found!'}
      </Typography>
      {category && posts.map(post => <Blogpost post={post} key={post.id} />)}
    </>
  );
}
