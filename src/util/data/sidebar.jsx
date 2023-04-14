export const sidebarData = [
  {
    name: 'RERA project load',
    routepath: '/project_listing',
    iconClass: 'fas fa-home'
  },
  {
    name: 'Users',
    routepath: '/user_master',
    iconClass: 'fas fa-users'
  },
  {
    name: 'Master',
    iconClass: 'fas fa-server',
    child: [
      {
        listname: "Roles",
        routepath: "/role_master",
        shortname: "RL",
        module: "Role",
      },
    ]
  }
];

export const HorizontalSidebarData = [
  {
      name: 'sidebar.intro',
      routepath: '/Intro',
      iconClass: 'fas fa-chalkboard'
  },
  {
    name: 'Project Details',
    routepath: '/project_details',
    iconClass: 'fas fa-chalkboard'
},
];
