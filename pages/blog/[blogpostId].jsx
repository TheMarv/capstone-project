import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Blogpost from '../../components/Blogpost';
import useStore from '../../hooks/useStore';
import Link from 'next/link';

export default function SingularPost() {
  const { query } = useRouter();
  const { blogpostId } = query;

  const setActivePost = useStore(store => store.setActivePost);
  const activePost = useStore(store => store.activePost);

  useEffect(() => {
    setActivePost(blogpostId);
  }, [setActivePost, blogpostId]);

  return (
    <article>
      {(activePost === null || activePost === undefined) && (
        <Typography
          sx={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}
          variant="h3"
        >
          {activePost === null ? 'Loading…' : 'Post not found!'}
        </Typography>
      )}
      {activePost && <Blogpost post={activePost} />}
      <Link href="/">Home</Link> <Link href="/blog/create">Create Post</Link>
    </article>
  );
}
