import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import useStore from '../../hooks/useStore';

export default function CategoryCreate() {
  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    customSlug: false,
  });

  const addCategory = useStore(state => state.addCategory);
  const addAlert = useStore(state => state.addAlert);

  function submitForm(event) {
    event.preventDefault();
    addCategory({ name: formState.name, slug: formState.slug });
    setFormState({ name: '', slug: '', customSlug: false });
    addAlert('Category successfully added!', 'success');
  }

  function onNameChange(event) {
    const slug = formState.customSlug
      ? formState.slug
      : event.target.value
          .toLowerCase()
          .replaceAll(' ', '-')
          .replace(/[^a-z0-9-]+/g, '');
    setFormState({ ...formState, name: event.target.value, slug });
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
              name="name"
              label="Category Name"
              type="text"
              autoFocus
              fullWidth
              required
              inputProps={{ maxLength: 100, minLength: 5 }}
              value={formState.name}
              onChange={onNameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="slug"
              label="Category slug"
              type="text"
              fullWidth
              required
              inputProps={{ maxLength: 100, minLength: 5 }}
              value={formState.slug}
              onChange={event =>
                setFormState({
                  ...formState,
                  slug: event.target.value,
                  customSlug: event.target.value !== '',
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
