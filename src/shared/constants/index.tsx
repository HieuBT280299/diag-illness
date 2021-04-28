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
  ROLE_USER = 2,
  ROLE_ADMIN = 1,
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

  //admin routes
  MANAGE_ACCOUNT = "/manageaccount",
  UPLOAD = "/upload",
}

export type PageListItem = {
  icon: any;
  text: string;
  to: string;
  hidden: boolean;
};

export const userPageList: PageListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "My Account Profile",
    to: Routes.PROFILE,
    hidden: false,
  },
  {
    icon: <ShoppingCartIcon />,
    text: "News",
    to: Routes.NEWS,
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
    text: "Change Password",
    to: Routes.PROFILE,
    hidden: true,
  },
];

export const adminPageList: PageListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "Manage Account",
    to: Routes.MANAGE_ACCOUNT,
    hidden: false,
  },
  {
    icon: <ShoppingCartIcon />,
    text: "Manage News",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Manage Hospital",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Upload News",
    to: `${Routes.UPLOAD}/news`,
    hidden: true,
  },
  {
    icon: <BarChartIcon />,
    text: "Upload Hospital",
    to: `${Routes.UPLOAD}/hospital`,
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
];
