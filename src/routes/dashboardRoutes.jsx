import Intro from "views/Intro";
import ProjectEntry from "views/pages/property/projectEntry";
import ProjectListing from 'views/pages/property/projectListing'

const dashboardRoutes = [
  { path: "/intro", component: Intro },
  {path: "/project_entry",component: ProjectEntry},
  {path: "/project_listing",component: ProjectListing}

];

export default dashboardRoutes;