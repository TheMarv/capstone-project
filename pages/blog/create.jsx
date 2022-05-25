import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import SendIcon from '@mui/icons-material/Send';

export default function Create() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create a blog post
      </Typography>
      <form>
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <TextField name="title" label="Post title" type="text" autoFocus />
          </Grid>
          <Grid item>
            <TextField
              name="content"
              label="Post content"
              type="text"
              multiline
              rows={5}
            />
          </Grid>
          <Grid item>
            <Button variant="contained">
              Submit
              <SendIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Grid>
        </Grid>
      </form>
      <Link href="/">Home</Link>
    </Container>
  );
}
