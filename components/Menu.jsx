import {
  Article as ArticleIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useStore from '../hooks/useStore';

const mainItems = [
  {
    id: 0,
    text: 'Home',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    id: 1,
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

function MenuList(item) {
  const { asPath } = useRouter();
  return (
    <ListItem key={item.id} disablePadding selected={asPath === item.href}>
      <Link href={item.href}>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default function Menu() {
  const categories = useStore(state =>
    state.categories?.map(category => {
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
      <List>{mainItems.map(MenuList)}</List>
      <Divider />
      <List>{categories && categories.map(MenuList)}</List>
      <Divider />
      <List>{adminItems.map(MenuList)}</List>
    </Box>
  );
}
