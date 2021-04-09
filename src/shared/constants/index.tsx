import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";

export enum Routes {
  HOME = "/home",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  NEWS = "/news",
  HOSPITAL = "/hospital",
  DIAGNOSE = "/diagnose",
}

export type SidebarListItem = {
  icon: any;
  text: string;
  to: string;
};

export const mainList: SidebarListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "Home",
    to: "/",
  },
  {
    icon: <ShoppingCartIcon />,
    text: "News",
    to: Routes.NEWS,
  },
  {
    icon: <PeopleIcon />,
    text: "Diagnose",
    to: Routes.DIAGNOSE,
  },
  {
    icon: <BarChartIcon />,
    text: "Find Hospital",
    to: Routes.HOSPITAL,
  },
  // {
  //   icon: <LayersIcon />,
  //   text: "Item 5",
  //   to: "/",
  // },
];

export const preLoginList: SidebarListItem[] = [
  {
    icon: <AssignmentIcon />,
    text: "Login",
    to: Routes.LOGIN,
  },
  {
    icon: <AssignmentIcon />,
    text: "Sign Up",
    to: Routes.SIGN_UP,
  },
  {
    icon: <AssignmentIcon />,
    text: "Forgot Password",
    to: "/",
  },
];
