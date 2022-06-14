import Link from 'next/link';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Blogpost({ post, slice = false }) {
  const { title, content, created, id } = post;

  return (
    <Grid
      container
      rowSpacing={3}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item textAlign="right">
        <Typography variant="h3" component={slice ? 'h2' : 'h1'}>
          <Link href={`/blog/${id}`}>{title}</Link>
        </Typography>
        <Typography variant="caption">
          {format(new Date(created), 'MM/dd/yyyy hh:mm')}
        </Typography>
      </Grid>
      <Grid item>
        <StyledContent
          slice={slice}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Grid>
    </Grid>
  );
}

const StyledContent = styled.div`
  ${({ slice }) =>
    slice &&
    `
    max-height: 4ch;
    overflow: hidden;
    margin-bottom: 2rem;
  `}
`;
