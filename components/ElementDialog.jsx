import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/system/Box';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function ElementDialog({ open, setOpen, addElement }) {
  const [element, setElement] = useState({
    type: '',
    name: '',
    required: false,
  });

  function CheckboxLabel(property, label) {
    return (
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            onChange={event =>
              setElement({
                ...element,
                [property]: event.target.checked,
              })
            }
          />
        }
      />
    );
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
      <DialogTitle>Add a new element</DialogTitle>
      <DialogContent>
        <Box component="form">
          <Grid
            container
            rowSpacing={2}
            alignItems="center"
            justify="center"
            direction="column"
            sx={{ paddingY: 2 }}
          >
            <Grid item>
              <TextField
                fullWidth
                label="Element Name"
                required
                onChange={event =>
                  setElement({ ...element, name: event.target.value })
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Element Type"
                select
                required
                value={element.type}
                onChange={event =>
                  setElement({ ...element, type: event.target.value })
                }
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="richtext">Richtext</MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <FormGroup>
                {CheckboxLabel('required', 'Required')}
                {CheckboxLabel(
                  'minLength',
                  `Min ${element.type !== 'number' ? 'Length' : ''}`
                )}
                {element['minLength'] && (
                  <TextField
                    type="number"
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                    required
                    label={`Min ${
                      element.type !== 'number' ? 'Length' : ''
                    } (1 - 10)`}
                    onChange={event =>
                      setElement({
                        ...element,
                        minLength: Number(event.target.value),
                      })
                    }
                  />
                )}
                {CheckboxLabel(
                  'maxLength',
                  `Max ${element.type !== 'number' ? 'Length' : ''}`
                )}
                {element['maxLength'] && (
                  <TextField
                    type="number"
                    inputProps={{
                      min: 10,
                      max: 5000,
                    }}
                    label={`Max ${
                      element.type !== 'number' ? 'Length' : ''
                    } (10 - 5000)`}
                    required
                    onChange={event =>
                      setElement({
                        ...element,
                        maxLength: Number(event.target.value),
                      })
                    }
                  />
                )}
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="text" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            addElement(element);
            setElement({
              name: '',
              type: '',
              required: false,
              minLength: false,
              maxLength: false,
            });
          }}
          variant="contained"
          color="primary"
          sx={{ paddingX: 6 }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
