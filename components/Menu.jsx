import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import ClassIcon from '@mui/icons-material/Class';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
    text: 'Manage Blogpost',
    href: '/blog',
    icon: <EditIcon />,
  },
  {
    id: 2,
    text: 'Create Category',
    href: '/categories/create',
    icon: <ClassIcon />,
  },
  {
    id: 3,
    text: 'Manage Categories',
    href: '/categories',
    icon: <ClassIcon />,
  },
  {
    id: 4,
    text: 'Create Custom',
    href: '/custom/create',
    icon: <DashboardCustomizeIcon />,
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

  const customs = useStore(state =>
    state.customs.map(custom => {
      return {
        id: custom.name,
        href: `/${custom.name}`,
        text: custom.name,
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
      {customs && <MenuList menuItems={customs} extended />}
      <Divider />
      <MenuList menuItems={adminItems} />
    </Box>
  );
}
