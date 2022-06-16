import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useStore from '../hooks/useStore';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Send from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

export default function CategoryForm({ slug = null }) {
  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    customSlug: false,
  });

  const currentCategory = useStore(state =>
    state.categories.find(category => category.slug === slug)
  );
  const addCategory = useStore(state => state.addCategory);
  const editCategory = useStore(state => state.editCategory);
  const addAlert = useStore(state => state.addAlert);

  useEffect(() => {
    if (currentCategory) {
      setFormState({
        name: currentCategory.name,
        slug: currentCategory.slug,
        customSlug: currentCategory.slug !== slugify(currentCategory.name),
      });
    }
  }, [currentCategory]);

  function submitForm(event) {
    event.preventDefault();
    if (slug) {
      editCategory({ name: formState.name, slug: formState.slug }, slug);
      addAlert('Category successfully updated!', 'success');
    } else {
      addCategory({ name: formState.name, slug: formState.slug });
      addAlert('Category successfully added!', 'success');
    }
    setFormState({ name: '', slug: '', customSlug: false });
  }

  function slugify(input) {
    return input
      .toLowerCase()
      .replaceAll(' ', '-')
      .replace(/[^a-z0-9-]+/g, '');
  }

  function onNameChange(event) {
    const slug = formState.customSlug
      ? formState.slug
      : slugify(event.target.value);

    setFormState({ ...formState, name: event.target.value, slug });
  }

  return (
    <Container>
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
    </Container>
  );
}
