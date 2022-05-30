import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Blogpost from '../../components/Blogpost';
import useStore from '../../hooks/useStore';
import Link from 'next/link';

export default function SingularPost() {
  const { query } = useRouter();
  const { blogpostId } = query;

  const blogposts = useStore(store => store.blogposts);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const postToFind = blogposts.find(post => post.id === blogpostId);
    setPost(postToFind);
  }, [blogpostId, blogposts]);

  return (
    <article>
      {(post === null || post === undefined) && (
        <Typography
          sx={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}
          variant="h3"
        >
          {post === null ? 'Loading…' : 'Post not found!'}
        </Typography>
      )}
      {post && <Blogpost post={post} />}
      <Link href="/">Home</Link> <Link href="/blog/create">Create Post</Link>
    </article>
  );
}
