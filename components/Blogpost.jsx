import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import useStore from '../hooks/useStore';

export default function Blogpost({ post, slice = false }) {
  const { title, content, created, category: categorySlug } = post;

  const category = useStore(
    state =>
      state.categories.find(category => category.slug === categorySlug) || {
        name: 'Uncategorized',
      }
  );

  return (
    <Grid
      container
      rowSpacing={3}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item textAlign="right">
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="caption">
          {format(new Date(created), 'MM/dd/yyyy hh:mm')}
        </Typography>
        <Typography component="p" variant="caption">
          {category && category.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography paragraph={true}>
          {slice
            ? `${content.slice(0, 200)}${content.length > 200 ? '…' : ''}`
            : content}
        </Typography>
      </Grid>
    </Grid>
  );
}
