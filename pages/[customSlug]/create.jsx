import { useRouter } from 'next/router';
import useStore from '../../hooks/useStore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import RichText from '../../components/Richtext';
import Button from '@mui/material/Button';

export default function CreateCustomEntry() {
  const { query } = useRouter();
  const { customSlug } = query;

  const addCustomEntry = useStore(state => state.addCustomEntry);
  const addAlert = useStore(state => state.addAlert);
  const custom = useStore(state =>
    state.customs.find(custom => custom.name === customSlug)
  );

  const [formState, setFormState] = useState({});

  function submitForm(event) {
    event.preventDefault();
    addCustomEntry(customSlug, formState);
    addAlert(`Added entry to ${customSlug}`, 'success');
    const entries = Object.entries(formState).map(entry => [entry[0], '']);
    setFormState(Object.fromEntries(entries));
  }

  return (
    <>
      <Typography
        sx={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}
        variant="h3"
      >
        {custom
          ? custom.name
          : custom === null
          ? 'Loading…'
          : 'Custom not found!'}
      </Typography>
      {custom && (
        <Box component="form" autoComplete="off" onSubmit={submitForm}>
          <Grid
            container
            rowSpacing={2}
            alignItems="center"
            justify="center"
            direction="column"
          >
            {custom.elements.map(element => {
              if (element.type !== 'richtext') {
                return (
                  <Grid item key={element.name}>
                    <TextField
                      type={element.type === 'text' ? 'text' : 'number'}
                      key={element.name}
                      name={element.name}
                      value={formState[element.name]}
                      label={element.name}
                      required={element.required}
                      inputProps={{
                        minLength: element.minLength,
                        maxLength: element.maxLength,
                        min: element.minLength,
                        max: element.maxLength,
                      }}
                      onChange={event =>
                        setFormState({
                          ...formState,
                          [element.name]: event.target.value,
                        })
                      }
                    />
                  </Grid>
                );
              } else {
                return (
                  <Grid item key={element.name}>
                    <RichText
                      value={formState[element.name]}
                      onChange={input =>
                        setFormState({ ...formState, [element.name]: input })
                      }
                    />
                  </Grid>
                );
              }
            })}
            <Grid item display="flex" justifyContent="flex-end">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
