import { components } from "react-select/dist/react-select.cjs.prod";
import Intro from "views/Intro";
import ResetPassword from "views/pages/authentication/ResetPassword";
import ProjectEntry from "views/pages/property/projectEntry";
import ProjectListing from 'views/pages/property/projectListing'
import Roles from 'views/pages/master/role/roles'
import User from "views/pages/master/user/user";

const dashboardRoutes = [
  { path: "/intro", component: Intro },
  { path: "/project_entry", component: ProjectEntry },
  { path: "/project_listing", component: ProjectListing },
  { path: "/reset_known_password", component: ResetPassword },
  {path: "/role_master", component: Roles},
  {path: "/user_master", component: User}
];

export default dashboardRoutes;