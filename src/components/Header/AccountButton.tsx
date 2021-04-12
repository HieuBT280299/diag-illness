import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

const AccountButton = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const history = useHistory();

  const logout = () => {
    // history.push({ROUTE_HOME});
    // props.postLogout();
    console.log("logout");
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Link
          onClick={handleClose}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>My account</MenuItem>
        </Link>

        <Link
          onClick={handleClose}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>Change password</MenuItem>
        </Link>

        <Link
          onClick={handleClose}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default AccountButton;
