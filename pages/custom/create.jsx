import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useStore from '../../hooks/useStore';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableFooter from '@mui/material/TableFooter';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ElementDialog from '../../components/ElementDialog';
import Typography from '@mui/material/Typography';

export default function CreateCustom() {
  const [elements, setElements] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const addAlert = useStore(state => state.addAlert);
  const addCustom = useStore(state => state.addCustom);

  function addElement(element) {
    if (elements.find(_element => element.name === _element.name)) {
      return addAlert('Name has to be unique!', 'warning');
    }
    setOpen(false);
    setElements([...elements, element]);
  }

  function submitCustom() {
    if (name === '' || !name.match(/[A-za-z]+/))
      return addAlert('Please enter a valid name (only letters)!', 'warning');

    if (addCustom({ elements, name })) {
      addAlert('Custom created', 'success');
    } else {
      addAlert(`Custom with name ${name} already exists!`, 'error');
    }
  }

  return (
    <>
      <Typography
        component="h3"
        variant="h4"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Add a custom element
      </Typography>
      <TableContainer>
        <Table aria-label="Category Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>About</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elements.map(element => (
              <TableRow key={element.name}>
                <TableCell>{element.name}</TableCell>
                <TableCell component="pre">
                  {[
                    element.type.charAt(0).toUpperCase() +
                      element.type.slice(1),
                    element.required ? 'required' : undefined,
                    !element.minLength
                      ? undefined
                      : `Min Length: ${element.minLength}`,
                    !element.maxLength
                      ? undefined
                      : `Max Length: ${element.maxLength}`,
                  ]
                    .filter(info => info)
                    .join('\n')}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setElements(
                        [...elements].filter(_element =>
                          element.name === _element.name ? false : true
                        )
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  sx={{
                    borderStyle: 'dashed',
                    height: '50px',
                  }}
                  fullWidth
                  variant="outlined"
                  color="info"
                  onClick={() => setOpen(true)}
                >
                  Add new element
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ borderBottom: 0 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  onChange={event => setName(event.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ borderBottom: 0 }}>
                <Button
                  sx={{
                    height: '50px',
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => submitCustom()}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ElementDialog open={open} setOpen={setOpen} addElement={addElement} />
    </>
  );
}
