import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FiberNewIcon from "@material-ui/icons/FiberNew";

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
    icon: <AccountCircleIcon />,
    text: "Tài khoản của tôi",
    to: Routes.PROFILE,
    hidden: false,
  },
  {
    icon: <FindInPageIcon />,
    text: "Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <LocalHospitalIcon />,
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
    icon: <AccountCircleIcon />,
    text: "Quản lý Tài khoản",
    to: Routes.MANAGE_ACCOUNT,
    hidden: false,
  },
  {
    icon: <FindInPageIcon />,
    text: "Quản lý Tin tức",
    to: Routes.NEWS,
    hidden: false,
  },
  {
    icon: <LocalHospitalIcon />,
    text: "Quản lý Bệnh viện",
    to: Routes.HOSPITAL,
    hidden: false,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Upload thông tin Tin tức",
    to: `${Routes.UPLOAD}/news`,
    hidden: true,
  },
  {
    icon: <CloudUploadIcon />,
    text: "Upload thông tin Bệnh viện",
    to: `${Routes.UPLOAD}/hospital`,
    hidden: true,
  },
];

export const preLoginList: PageListItem[] = [
  {
    icon: <ExitToAppIcon />,
    text: "Đăng nhập",
    to: Routes.LOGIN,
    hidden: false,
  },
  {
    icon: <FiberNewIcon />,
    text: "Đăng ký",
    to: Routes.SIGN_UP,
    hidden: false,
  },
  {
    icon: <RotateLeftIcon />,
    text: "Quên Mật khẩu",
    to: Routes.FORGOT_PASSWORD,
    hidden: false,
  },
];

export const hospitalCsv = `id,name,number,ward,district,city,workingTime,introduction,services,department,website,link,phone
107,Nha khoa Tương Lai,"76/1 Võ Thị Sáu,",Phường Tân Định,Quận 1,", Hồ Chí Minh","T2,T3,T4,T5,T6,T7: 08:00 - 19:30",,"Nhổ răng, Trám răng, Lấy vôi, Răng tháo lắp, Răng sứ, Tẩy trắng răng",Nha Khoa,,https://timbenhvien.vn/chi-tiet/nha-khoa-tuong-lai/357,028.3820.1003`;

export const newsCsv = `id,name,number,ward,district,city,workingTime,introduction,services,department,website,link,phone
107,Nha khoa Tương Lai,"76/1 Võ Thị Sáu,",Phường Tân Định,Quận 1,", Hồ Chí Minh","T2,T3,T4,T5,T6,T7: 08:00 - 19:30",,"Nhổ răng, Trám răng, Lấy vôi, Răng tháo lắp, Răng sứ, Tẩy trắng răng",Nha Khoa,,https://timbenhvien.vn/chi-tiet/nha-khoa-tuong-lai/357,028.3820.1003`;
