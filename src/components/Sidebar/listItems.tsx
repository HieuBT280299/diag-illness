import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import {
  userPageList,
  adminPageList,
  preLoginList,
  PageListItem,
} from "../../shared/constants";
import { Tooltip } from "@material-ui/core";

type ListItemProps = {
  list: PageListItem[];
  pathname: string;
  handleDrawerOpen?: () => void;
};

const ListItems = ({ list, pathname, handleDrawerOpen }: ListItemProps) => {
  return (
    <List>
      {list
        .filter((item) => !item.hidden)
        .map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Tooltip title={item.text} placement="right">
              <ListItem
                button
                // onMouseOver={handleDrawerOpen}
                selected={item.to === pathname}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Tooltip>
          </Link>
        ))}
    </List>
  );
};

export const UserPageListItems = ({ pathname, handleDrawerOpen }: any) => (
  <ListItems
    handleDrawerOpen={handleDrawerOpen}
    list={userPageList}
    pathname={pathname}
  />
);

export const AdminPageListItems = ({ pathname, handleDrawerOpen }: any) => (
  <ListItems
    handleDrawerOpen={handleDrawerOpen}
    list={adminPageList}
    pathname={pathname}
  />
);

export const PreLoginListItems = ({ pathname, handleDrawerOpen }: any) => (
  <ListItems
    handleDrawerOpen={handleDrawerOpen}
    list={preLoginList}
    pathname={pathname}
  />
);
