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

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');

  const categories = useStore(state => state.categories);
  const removeCategory = useStore(state => state.removeCategory);
  const addAlert = useStore(state => state.addAlert);
  const isHydrated = useHydration();

  return (
    <>
      <TableContainer>
        <Table aria-label="Category Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell sx={{ width: '112px' }} />
              {/* magic number 112: breakpoint for the icons to be side by side */}
            </TableRow>
          </TableHead>
          <TableBody>
            {isHydrated &&
              categories.map(category => (
                <TableRow key={category.slug}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell sx={{ width: '112px' }} align="right">
                    <Link href={`/categories/${category.slug}/edit`}>
                      <IconButton color="secondary" variant="outlined">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setCategory(category);
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
        <DialogTitle>Do you wish to remove {category.name}?</DialogTitle>
        <DialogContent>
          Please confirm that you are sure to delete the category
          {category.name}. If you are certain, proceed to click the
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
              removeCategory(category.slug);
              addAlert('Category removed!', 'warning');
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
