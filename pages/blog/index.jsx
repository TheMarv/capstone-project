import { useState } from 'react';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import useStore from '../../hooks/useStore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import useHydration from '../../hooks/useHydration';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import Link from 'next/link';

export default function Blogposts() {
  const [open, setOpen] = useState(false);
  const [blogpost, setBlogpost] = useState('');

  const blogposts = useStore(state => state.blogposts);
  const removeBlogpost = useStore(state => state.removeBlogpost);
  const addAlert = useStore(state => state.addAlert);
  const isHydrated = useHydration();

  return (
    <>
      <TableContainer>
        <Table aria-label="Category Table">
          <TableHead>
            <TableRow>
              <TableCell>Post Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={{ width: '112px' }} />
              {/* magic number 112: breakpoint for the icons to be side by side */}
            </TableRow>
          </TableHead>
          <TableBody>
            {isHydrated &&
              blogposts.map(blogpost => (
                <TableRow key={blogpost.id}>
                  <TableCell>{blogpost.id}</TableCell>
                  <TableCell>{blogpost.title}</TableCell>
                  <TableCell sx={{ width: '112px' }} align="right">
                    <IconButton
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        addAlert('Currently not implemented', 'error');
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setBlogpost(blogpost);
                        setOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Do you wish to remove {blogpost.title}?</DialogTitle>
        <DialogContent>
          Please confirm that you are sure to delete the Post
          {blogpost.title}. If you are certain, proceed to click the
          `Delete`-Button. Otherwise, click the `Cancel`-Button.
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
