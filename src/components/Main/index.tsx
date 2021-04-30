import SwitchRoutes from "../routes";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Main = () => {
  const account = useSelector((state: any) => state.loginAccount?.account);

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Header
        account={account}
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar
        account={account}
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <SwitchRoutes />
    </>
  );
};

export default withRouter(Main);
