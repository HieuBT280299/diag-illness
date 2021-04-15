import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import { mainList, preLoginList, PageListItem } from "../../shared/constants";

type ListItemProps = {
  list: PageListItem[];
  pathname: string;
};

const ListItems = ({ list, pathname }: ListItemProps) => {
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
