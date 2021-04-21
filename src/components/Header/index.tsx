import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { userPageList, preLoginList } from "../../shared/constants";
import { getHeaderTitle } from "../../shared/helper";
import { useMemo } from "react";
import AccountButton from "./AccountButton";

type HeaderProps = RouteComponentProps<any> & {
  account: any;
  drawerWidth: number;
  open: boolean;
  handleDrawerOpen: () => void;
};

const Header = ({
  account,
  drawerWidth,
  open,
  handleDrawerOpen,
  location,
}: HeaderProps) => {
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const titleList = account ? userPageList : preLoginList;
  const { pathname } = location;
  const headerText = useMemo(() => getHeaderTitle(titleList, pathname), [
    titleList,
    pathname,
  ]);

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {headerText}
        </Typography>
        {account && (
          <>
            <Typography variant="h6">{account.name}</Typography>
            <AccountButton />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
