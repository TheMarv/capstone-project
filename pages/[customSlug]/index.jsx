import { useRouter } from 'next/router';
import useStore from '../../hooks/useStore';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function CustomSingular() {
  const { query } = useRouter();
  const { customSlug } = query;

  const custom = useStore(state =>
    state.customs.find(custom => custom.name === customSlug)
  );

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
      {custom &&
        custom.entries.map(entry => (
          <Typography key={entry.id} component="p">
            {JSON.stringify(entry, null, 2)}
          </Typography>
        ))}
      <Link href={`${customSlug}/create`}>
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary">
            Add entry
          </Button>
        </Box>
      </Link>
    </>
  );
}
