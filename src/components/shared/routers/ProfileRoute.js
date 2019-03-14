import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profile from "../../profile/Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
//// wanted to implement it but couldn't find a use
class ProfileRoute extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={localStorage.getItem("id")}
          render={() => <Profile />}
        />

        <Route
          exact
          path={`/user`}
          render={() => <Redirect to={`/user/1`} />}
        />
      </Container>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default ProfileRoute;
