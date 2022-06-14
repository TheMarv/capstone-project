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
import SendIcon from '@mui/icons-material/Send';
import Richtext from '../../components/Richtext';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

export default function Create() {
  const { push: routerPush } = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [categoryState, setCategoryState] = useState({
    label: 'Uncategorized',
    value: '',
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
    const id = addBlogpost({ ...formState, category: categoryState.value });
    setFormState({
      title: '',
      content: '',
      category: '',
    });
    routerPush(`/blog/${id}`);
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
            <Autocomplete
              disablePortal
              name="category"
              options={[{ label: 'Uncategorised', value: '' }, ...categories]}
              isOptionEqualToValue={(option, value) => option.value === value}
              onChange={(event, newValue) => {
                setCategoryState(newValue);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  defaultValue="Uncategorised"
                  value={categoryState.label}
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
