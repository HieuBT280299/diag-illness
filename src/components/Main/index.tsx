import SwitchRoutes from "../routes";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { withRouter } from "react-router";

const drawerWidth = 240;

const Main = () => {
  const account = { firstName: "Hieu", lastName: "Bui" };
  // const account = null;
  const [open, setOpen] = React.useState(true);
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
      />
      <SwitchRoutes />
    </>
  );
};

export default withRouter(Main);
