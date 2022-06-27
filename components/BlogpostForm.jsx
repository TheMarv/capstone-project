import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import useStore from '../hooks/useStore';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import dynamic from 'next/dynamic';

const Richtext = dynamic(async () => await import('./Richtext'), {
  ssr: false,
});

export default function BlogpostForm({ id = null }) {
  const { push: routerPush } = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [categoryState, setCategoryState] = useState({
    label: 'Uncategorised',
    value: '',
  });

  const currentBlogpost = useStore(state =>
    state.blogposts.find(post => post.id === id)
  );
  const findCategory = useStore(state => state.findCategory);
  const addAlert = useStore(state => state.addAlert);
  const addBlogpost = useStore(state => state.addBlogpost);
  const editBlogpost = useStore(state => state.editBlogpost);
  const categories = useStore(state =>
    state.categories.map(category => {
      return {
        label: category.name,
        value: category.slug,
      };
    })
  );

  useEffect(() => {
    if (currentBlogpost) {
      setFormState({
        title: currentBlogpost.title,
        content: currentBlogpost.content,
      });
      const currentCategory = findCategory(currentBlogpost.category);
      if (currentCategory) {
        setCategoryState({
          label: currentCategory.name,
          value: currentCategory.slug,
        });
      }
    }
  }, [currentBlogpost, findCategory]);

  function submitForm(event) {
    event.preventDefault();
    addAlert(`Post ${id ? 'updated' : 'published'} successfully!`, 'success');
    if (id) {
      editBlogpost({
        ...currentBlogpost,
        ...formState,
        category: categoryState.value,
        id,
      });
      routerPush(`/blog/${id}`);
    } else {
      const newId = addBlogpost({
        ...formState,
        category: categoryState.value,
      });
      routerPush(`/blog/${newId}`);
    }
    setFormState({
      title: '',
      content: '',
      category: '',
    });
  }

  return (
    <>
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
              fullWidth
              required
              autoFocus
              inputProps={{ maxLength: 100, minLength: 5 }}
              value={formState.title}
              onChange={event =>
                setFormState({
                  ...formState,
                  title: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <Richtext
              value={formState.content}
              onChange={input => {
                setFormState({ ...formState, content: input });
              }}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              disablePortal
              name="category"
              options={[{ label: 'Uncategorised', value: '' }, ...categories]}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, newValue) => {
                setCategoryState(
                  newValue !== null
                    ? newValue
                    : {
                        label: 'Uncategorised',
                        value: '',
                      }
                );
              }}
              value={categoryState}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  value={categoryState?.label}
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
    </>
  );
}
