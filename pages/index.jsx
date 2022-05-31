import { Grid } from '@mui/material';
import Link from 'next/link';
import Blogpost from '../components/Blogpost';
import useHydration from '../hooks/useHydration';
import useStore from '../hooks/useStore';

export default function Home() {
  const blogposts = useStore(store => store.blogposts);

  const isHydrated = useHydration();

  return (
    <Grid
      container
      rowSpacing={2}
      alignItems="center"
      justify="center"
      direction="column"
    >
      {isHydrated &&
        blogposts
          .sort((a, b) => b.created - a.created)
          .map(post => {
            return (
              <Grid item key={post.id}>
                <Blogpost post={post} slice />
              </Grid>
            );
          })}
      <Link href="/blog/create">Create</Link>
    </Grid>
  );
}
