import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

export default function Blogpost({ post, slice = false }) {
  const { title, content, created } = post;

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
