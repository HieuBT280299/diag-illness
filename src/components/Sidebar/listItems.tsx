import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";

type SidebarListItem = {
  icon: any;
  text: string;
  to: string;
};

const mainList: SidebarListItem[] = [
  {
    icon: <DashboardIcon />,
    text: "Item 1",
    to: "/",
  },
  {
    icon: <ShoppingCartIcon />,
    text: "Item 2",
    to: "/",
  },
  {
    icon: <PeopleIcon />,
    text: "Item 3",
    to: "/",
  },
  {
    icon: <BarChartIcon />,
    text: "Item 4",
    to: "/",
  },
  {
    icon: <LayersIcon />,
    text: "Item 5",
    to: "/",
  },
];

const preLoginList: SidebarListItem[] = [
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

type ListItemProps = {
  list: SidebarListItem[];
  pathname: string;
};

const ListItems = ({ list, pathname }: ListItemProps) => {
  return (
    <List>
      {list.map((item) => (
        <Link to={item.to} style={{ color: "inherit", textDecoration: "none" }}>
          <ListItem button selected={item.to === pathname}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export const MainListItems = ({ pathname }: any) => (
  <ListItems list={mainList} pathname={pathname} />
);

export const PreLoginListItems = ({ pathname }: any) => (
  <ListItems list={preLoginList} pathname={pathname} />
);
