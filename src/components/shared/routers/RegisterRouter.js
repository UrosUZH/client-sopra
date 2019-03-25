import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Register from "../../register/Register";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
//// wanted to implement it but couldn't find a use

class RegisterRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/dahboard`}
          render={() => <Register />}
        />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/dahboard`} />}
        />
      </Container>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default RegisterRouter;
