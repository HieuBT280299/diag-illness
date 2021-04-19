import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export enum RoleIDs {
  ROLE_USER = 1,
  ROLE_ADMIN = 2,
}

export enum Routes {
  //general routes
  HOME = "/home",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  FORGOT_PASSWORD = "/forgotpassword",
  PROFILE = "/profile",
  CHANGE_PASSWORD = "/changepassword",

  //user routes
  NEWS = "/news",
  HOSPITAL = "/hospital",
  DIAGNOSE = "/diagnose",

  //admin routes
  MANAGE_ACCOUNT = "/manageaccount",
}

export type PageListItem = {
  icon: any;
  text: string;
  to: string;
  hidden: boolean;
};

export const mainList: PageListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "Home",
    to: Routes.HOME,
    hidden: false,
  },
  {
    icon: <ShoppingCartIcon />,
    text: "News",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <PeopleIcon />,
    text: "Diagnose",
    to: Routes.DIAGNOSE,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Find Hospital",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: null,
    text: "My Account Profile",
    to: Routes.PROFILE,
    hidden: true,
  },
  {
    icon: null,
    text: "Change Password",
    to: Routes.PROFILE,
    hidden: true,
  },
];

export const preLoginList: PageListItem[] = [
  {
    icon: <AssignmentIcon />,
    text: "Login",
    to: Routes.LOGIN,
    hidden: false,
  },
  {
    icon: <AssignmentIcon />,
    text: "Sign Up",
    to: Routes.SIGN_UP,
    hidden: false,
  },
  {
    icon: <AssignmentIcon />,
    text: "Forgot Password",
    to: Routes.FORGOT_PASSWORD,
    hidden: false,
  },
  {
    icon: <DashboardIcon />,
    text: "Manage Account",
    to: Routes.MANAGE_ACCOUNT,
    hidden: false,
  },
];
