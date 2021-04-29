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
    text: "Tài khoản của tôi",
    to: Routes.PROFILE,
    hidden: false,
  },
  {
    icon: <ShoppingCartIcon />,
    text: "Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Tìm Bệnh viện",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: null,
    text: "Đổi Mật khẩu",
    to: Routes.PROFILE,
    hidden: true,
  },
];

export const adminPageList: PageListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "Quản lý Tài khoản",
    to: Routes.MANAGE_ACCOUNT,
    hidden: false,
  },
  {
    icon: <ShoppingCartIcon />,
    text: "Quản lý Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Quản lý Bệnh viện",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: <BarChartIcon />,
    text: "Upload thông tin Tin tức",
    to: `${Routes.UPLOAD}/news`,
    hidden: true,
  },
  {
    icon: <BarChartIcon />,
    text: "Upload thông tin Bệnh viện",
    to: `${Routes.UPLOAD}/hospital`,
    hidden: true,
  },
];

export const preLoginList: PageListItem[] = [
  {
    icon: <AssignmentIcon />,
    text: "Đăng nhập",
    to: Routes.LOGIN,
    hidden: false,
  },
  {
    icon: <AssignmentIcon />,
    text: "Đăng ký",
    to: Routes.SIGN_UP,
    hidden: false,
  },
  {
    icon: <AssignmentIcon />,
    text: "Quên Mật khẩu",
    to: Routes.FORGOT_PASSWORD,
    hidden: false,
  },
];
