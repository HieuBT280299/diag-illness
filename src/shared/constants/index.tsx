import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

export enum Routes {
  HOME = "/home",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  NEWS = "/news",
  HOSPITAL = "/hospital",
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
    to: "/news",
  },
  {
    icon: <PeopleIcon />,
    text: "Diagnose",
    to: "/diagnose",
  },
  {
    icon: <BarChartIcon />,
    text: "Find Hospital",
    to: "/hospital",
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
    to: "/login",
  },
  {
    icon: <AssignmentIcon />,
    text: "Sign Up",
    to: "/signup",
  },
  {
    icon: <AssignmentIcon />,
    text: "Forgot Password",
    to: "/",
  },
];
