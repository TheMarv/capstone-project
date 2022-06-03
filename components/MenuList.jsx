import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

export default function MenuList({ menuItems }) {
  const { asPath } = useRouter();
  return (
    <List>
      {menuItems.map(item => (
        <ListItem key={item.id} disablePadding selected={asPath === item.href}>
          <Link href={item.href}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
