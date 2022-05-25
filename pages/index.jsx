import { Grid } from '@mui/material';
import Link from 'next/link';
import Blogpost from '../components/Blogpost';

export default function Home() {
  const blogposts = [
    {
      id: '1',
      title: 'First Blog Post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor, felis vel ornare dapibus, turpis sem faucibus mi, nec posuere mi magna non libero. Sed sed risus ut leo facilisis congue in eu magna. Integer euismod massa vel ligula consequat, id sollicitudin orci ultrices. Sed imperdiet porta tempus. Phasellus in metus ullamcorper odio tincidunt scelerisque. Pellentesque eleifend euismod mi. Maecenas efficitur neque eget auctor ornare. Cras facilisis ex non nunc efficitur consectetur id eu lacus. In blandit felis eu neque consequat, ut tempus nunc pulvinar. Praesent interdum nibh dui, nec congue orci eleifend in.',
      created: new Date(),
    },
    {
      id: '2',
      title: 'Another Blog Post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor, felis vel ornare dapibus, turpis sem faucibus mi, nec posuere mi magna non libero. Sed sed risus ut leo facilisis congue in eu magna. Integer euismod massa vel ligula consequat, id sollicitudin orci ultrices. Sed imperdiet porta tempus. Phasellus in metus ullamcorper odio tincidunt scelerisque. Pellentesque eleifend euismod mi. Maecenas efficitur neque eget auctor ornare. Cras facilisis ex non nunc efficitur consectetur id eu lacus. In blandit felis eu neque consequat, ut tempus nunc pulvinar. Praesent interdum nibh dui, nec congue orci eleifend in.',
      created: new Date(),
    },
  ];
  return (
    <Grid
      container
      rowSpacing={2}
      alignItems="center"
      justify="center"
      direction="column"
    >
      {blogposts.map(post => {
        return (
          <Grid item key={post.id}>
            <Blogpost post={post} slice />
          </Grid>
        );
      })}
      <Link href="/blog/create">Create</Link>
    </Grid>
  );
}
