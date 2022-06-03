import {
  Article as ArticleIcon,
  Edit as EditIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import useStore from '../hooks/useStore';
import MenuList from './MenuList';

const mainItems = [
  {
    id: 0,
    text: 'All Blogposts',
    href: '/',
    icon: <ArticleIcon />,
  },
];

const adminItems = [
  {
    id: 0,
    text: 'Create Blogpost',
    href: '/blog/create',
    icon: <EditIcon />,
  },
  {
    id: 1,
    text: 'Create Category',
    href: '/categories/create',
    icon: <ClassIcon />,
  },
];

export default function Menu() {
  const categories = useStore(state =>
    state.categories.map(category => {
      return {
        id: category.slug,
        href: `/categories/${category.slug}`,
        text: category.name,
        icon: null,
      };
    })
  );

  return (
    <Box role="presentation" sx={{ minWidth: 250 }}>
      <MenuList menuItems={mainItems} />
      <Divider />
      {categories && <MenuList menuItems={categories} />}
      <Divider />
      <MenuList menuItems={adminItems} />
    </Box>
  );
}
