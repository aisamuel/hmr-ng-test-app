import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: 'patient',
    title: 'Patient List',
    iconType: 'material-icons-two-tone',
    icon: 'threeusers',
    // icon: 'fas fa-users',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [ ],
  },
  {
    path: 'patient/patient-create',
    title: 'Register Patient',
    iconType: 'material-icons-two-tone',
    icon: 'adduser',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [ ],
  },
 
];
