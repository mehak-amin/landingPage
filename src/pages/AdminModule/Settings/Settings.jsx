import React from "react";
// import ManageRoles from "../ManageRoles/ManageRoles";
// import CreateRoles from "../ManageRoles/createRoles/CreateRoles";
import { Outlet } from "react-router-dom";
function Settings() {
  return (
    <>
      {/* <ManageRoles /> */}
      {/* <CreateRoles /> */}
      <Outlet />
    </>
  );
}

export default Settings;
