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

export default function Menu({ toggleMenu }) {
  const categories = useStore(state => state.categories);

  return (
    <Box
      role="presentation"
      onClick={toggleMenu}
      onKeyDown={toggleMenu}
      sx={{ minWidth: 250 }}
    >
      <List>
        {mainItems.map(item => (
          <ListItem key={item.id} disablePadding>
            <Link href={item.href}>
              <ListItemButton>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {categories &&
          categories.map(category => (
            <ListItem key={category.slug} disablePadding>
              <Link href={`/categories/${category.slug}`}>
                <ListItemButton>
                  {/* TODO: Implement dynamic category icon */}
                  <ListItemIcon />
                  <ListItemText>{category.name}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {adminItems.map(item => (
          <ListItem key={item.id} disablePadding>
            <Link href={item.href}>
              <ListItemButton>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
