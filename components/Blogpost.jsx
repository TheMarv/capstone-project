import { Grid, Typography } from '@mui/material';

export default function Blogpost({ post, slice = false }) {
  const { title, content, created } = post;

  function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

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
        <Typography variant="caption">{formatDate(created)}</Typography>
      </Grid>
      <Grid item>
        <Typography paragraph={true}>
          {slice ? `${content.slice(0, 200)}…` : content}
        </Typography>
      </Grid>
    </Grid>
  );
}
