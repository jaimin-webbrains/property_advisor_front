export const sidebarData = [
  // {
  //   name: 'sidebar.intro',
  //   routepath: '/Intro',
  //   iconClass: 'fas fa-chalkboard'
  // },
  {
    name: 'RERA project load',
    routepath: '/project_listing',
    iconClass: 'fas fa-city'
  },
  {
    name: 'User',
    routepath: '/user_master',
    iconClass: 'far fa-user'
  },
  {
    name: 'Master',
    iconClass: 'fas fa-user-tie',
    child: [
      {
        listname: "Role",
        routepath: "/role_master",
        shortname: "RL",
        module: "Role",
      },
    ]
  }
];

// Comments:::::::

//  If you want one level child then look below example

/*
  {
    name: 'sidebar.forms',
    iconClass: 'fab fa-wpforms',
    child: [
      {
        listname: 'sidebar.regularforms',
        routepath: '/regularform',
        shortname: 'RF'
      }
    ]
  }
*/

//  If you want Second level child then look below example

/*
   {
      name: 'sidebar.pages',
      iconClass: 'fas fa-print',
      child: [
        {
          listname: 'sidebar.authentication',
          iconClass: 'fas fa-user',
          child: [
            {
              listname: 'sidebar.login',
              routepath: '/login',
              shortname: 'L'
            },
          ]
        }
      ]
    }
*/

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

// ### For Horizontal sidebar

//     <!-- Basics -->
//         {
//             name: "sidebar.single",
//             iconClass: "fab fa-stripe-s",
//             routepath: "/single"
//         }
//     <!-- One Level -->
//         {
//             name: "sidebar.onelevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     routepath: "/ex",
//                 }
//             ]
//         }
//     <!-- Second level -->
//         {
//             name: "sidebar.secondlevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     iconClass: "fas fa-plus",
//                     child: [
//                         {
//                             name: "sidebar.example1",
//                             routepath: "/ex1",
//                         },
//                         {
//                             name: "sidebar.example2",
//                             routepath: "/ex2",
//                         }
//                     ]
//                 }
//             ]
//         }