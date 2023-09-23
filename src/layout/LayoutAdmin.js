import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

const LayoutDashboard = (props) => {
  return (
    <>
      <NavbarAdmin />
      {props.children}
    </>
  );
};

export default LayoutDashboard;
