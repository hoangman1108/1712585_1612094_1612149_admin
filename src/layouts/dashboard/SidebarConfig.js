import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'admin',
    path: '/dashboard/admin',
    icon: getIcon(peopleFill)
  },
  {
    title: 'class',
    path: '/dashboard/class',
    icon: getIcon(shoppingBagFill)
  }
];

export default sidebarConfig;
