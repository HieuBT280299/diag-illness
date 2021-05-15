import React from "react";
import { useSelector } from "react-redux";
import { RoleIDs } from "../../../shared/constants";
import HomeContent from "./HomeContent";

export enum HomeContentType {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

const Home = () => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const type = account
    ? account.roleId === RoleIDs.ROLE_USER
      ? HomeContentType.USER
      : HomeContentType.ADMIN
    : HomeContentType.GUEST;
  return (
    <div className="main-container">
      {/* <HomeHeader /> */}
      <HomeContent type={type} />
      {/* <HomeFooter /> */}
    </div>
  );
};

export default React.memo(Home);
