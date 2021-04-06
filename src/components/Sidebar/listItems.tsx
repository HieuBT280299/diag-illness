import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import {
  mainList,
  preLoginList,
  SidebarListItem,
} from "../../shared/constants";

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
