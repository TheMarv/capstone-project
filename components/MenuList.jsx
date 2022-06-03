import { useRouter } from 'next/router';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
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
