import React from "react";
import { Redirect } from "react-router-dom";

export const ProfileGuard = props => {
  if (localStorage.getItem("token" || localStorage.getItem("id"))) {
    return props.children;
  }
  return <Redirect to={"/login"} />;
};
