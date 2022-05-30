import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Link from 'next/link';
import useStore from '../../hooks/useStore';
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  const addBlogpost = useStore(store => store.addBlogpost);

  function submitForm(event) {
    event.preventDefault();
    const id = nanoid();
    addBlogpost({
      id,
      ...formState,
      created: new Date(),
    });
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
                setFormState({ ...formState, title: event.target.value })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              name="content"
              label="Post content"
              type="text"
              rows={5}
              multiline
              fullWidth
              required
              inputProps={{ maxLength: 5000, minLength: 10 }}
              value={formState.content}
              onChange={event =>
                setFormState({ ...formState, content: event.target.value })
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
