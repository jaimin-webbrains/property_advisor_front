import { components } from "react-select/dist/react-select.cjs.prod";
import Intro from "views/Intro";
import ResetPassword from "views/pages/authentication/ResetPassword";
import ProjectEntry from "views/pages/property/projectEntry";
import ProjectListing from "views/pages/property/projectListing";
import Roles from "views/pages/master/role/roles";
import User from "views/pages/master/user/user";
import State from "views/pages/master/geolocation/state";
import City from "views/pages/master/geolocation/cities";
import zones from "views/pages/master/geolocation/zones";
import districts from "views/pages/master/geolocation/districts";
import location from "views/pages/master/geolocation/location";
import subLocation from "views/pages/master/geolocation/subLocation";
import Landmark from "views/pages/master/geolocation/landmark";

const dashboardRoutes = [
  // { path: "/intro", component: Intro },
  { path: "/project_entry", component: ProjectEntry },
  { path: "/project_listing", component: ProjectListing },
  { path: "/reset_known_password", component: ResetPassword },
  { path: "/role_master", component: Roles },
  { path: "/user_master", component: User },
  { path: "/state_master", component: State },
  { path: "/city_master", component: City },
  { path: "/zone_master", component: zones },
  { path: "/district_master", component: districts },
  { path: "/landmark_master", component: Landmark },
  { path: "/location_master", component: location },
  { path: "/sub_location_master", component: subLocation },
];

export default dashboardRoutes;
