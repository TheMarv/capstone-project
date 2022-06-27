import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore from '../../../hooks/useStore';
import Blogpost from '../../../components/Blogpost';
import Typography from '@mui/material/Typography';
import useHydration from '../../../hooks/useHydration';

export default function SingularPost() {
  const { query } = useRouter();
  const { blogpostId } = query;

  const isHydrated = useHydration();

  const setActivePost = useStore(store => store.setActivePost);
  const activePost = useStore(store => store.activePost);

  useEffect(() => {
    setActivePost(blogpostId);
  }, [setActivePost, blogpostId]);

  return (
    <>
      {isHydrated && (
        <section>
          {!activePost && (
            <Typography
              sx={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}
              variant="h3"
            >
              {activePost === null ? 'Loading…' : 'Post not found!'}
            </Typography>
          )}
          {activePost && <Blogpost post={activePost} />}
        </section>
      )}
    </>
  );
}
