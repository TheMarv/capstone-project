import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Richtext from '../../components/Richtext';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableFooter from '@mui/material/TableFooter';
import Box from '@mui/system/Box';

const elementList = [
  {
    name: 'Richtext',
    element: <Richtext />,
  },
  {
    name: 'Textfield',
    element: <TextField />,
  },
];

export default function CreateCustom() {
  const [elements, setElements] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableContainer>
        <Table aria-label="Category Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {elements.map(blogpost => (
            <TableRow key={blogpost}></TableRow>
            // <TableRow key={blogpost.id}>
            //   <TableCell>{blogpost.id}</TableCell>
            //   <TableCell>{blogpost.title}</TableCell>
            //   <TableCell sx={{ width: '112px' }} align="right">
            //     <IconButton color="error" variant="outlined" onClick={() => {}}>
            //       <DeleteIcon />
            //     </IconButton>
            //   </TableCell>
            // </TableRow>
          ))} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} sx={{ borderBottom: 0 }}>
                <Button
                  sx={{
                    borderStyle: 'dashed',
                    width: '100%',
                    height: '50px',
                  }}
                  variant="outlined"
                  color="info"
                  onClick={() => setOpen(true)}
                >
                  Add new element
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a new element</DialogTitle>
        <DialogContent>
          <Box component="form"></Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="text"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              removeBlogpost(blogpost.id);
              addAlert('Blogpost removed!', 'warning');
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
