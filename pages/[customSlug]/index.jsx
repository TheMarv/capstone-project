import { useRouter } from 'next/router';
import useStore from '../../hooks/useStore';
import Typography from '@mui/material/Typography';

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
          <Typography variant="p">{JSON.stringify(entry, null, 2)}</Typography>
        ))}
    </>
  );
}
