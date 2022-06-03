import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useStore from '../../hooks/useStore';

export default function Create() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    category: '',
  });
  const addBlogpost = useStore(store => store.addBlogpost);
  const categories = useStore(store =>
    store.categories.map(category => {
      return {
        label: category.name,
        value: category.slug,
      };
    })
  );

  function submitForm(event) {
    event.preventDefault();
    return console.log(formState);
    const id = addBlogpost(formState);
    setFormState({
      title: '',
      content: '',
      category: '',
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
            <Autocomplete
              disablePortal
              name="category"
              value={formState.category}
              options={[{ label: 'Uncategorised', value: '' }, ...categories]}
              isOptionEqualToValue={(option, value) => option.value === value}
              onChange={(event, newValue) => {
                setFormState({ ...formState, category: newValue.value });
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  defaultValue="Uncategorised"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Link href="/">Home</Link>
    </Container>
  );
}
