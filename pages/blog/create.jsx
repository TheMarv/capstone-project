import Link from 'next/link';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Send from '@mui/icons-material/Send';
import useStore from '../../hooks/useStore';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Richtext from '../../components/Richtext';
import Typography from '@mui/material/Typography';

export default function Create() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  const addBlogpost = useStore(store => store.addBlogpost);

  function submitForm(event) {
    event.preventDefault();
    const id = addBlogpost(formState);
    setFormState({
      title: '',
      content: '',
    });
    router.push(`/blog/${id}`);
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create a blog post
      </Typography>
      <Box component="form" autoComplete="off" onSubmit={submitForm}>
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <TextField
              name="title"
              label="Post title"
              type="text"
              autoFocus
              fullWidth
              required
              inputProps={{ maxLength: 100, minLength: 5 }}
              value={formState.title}
              onChange={event =>
                setFormState({
                  title: event.target.value,
                  content: formState.content,
                })
              }
            />
          </Grid>
          <Grid item>
            <Richtext
              value={formState.content}
              onChange={input =>
                setFormState({
                  title: formState.title,
                  content: input,
                })
              }
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Submit
              <Send sx={{ marginLeft: 1 }} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Link href="/">Home</Link>
    </Container>
  );
}
