import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      name: null
    };
  }
  swag() {
    localStorage.removeItem("id");
  }
  register() {
    fetch(`${getDomain()}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(returnedUser => {
        const user = new User(returnedUser);
        // store the token into the local storage
        if (user.error === 0) {
          //localStorage.setItem("token", user.token);
          // user login successfully worked --> navigate to the route /game in the GameRouter
          alert("Registration Successful!");
          this.props.history.push(`/login`);
        } else if (user.error === 1) {
          alert("Register Error: Username is Taken");
          this.props.history.push(`/register`);
        } else {
          alert("Random Error");
          this.props.history.push(`/login`);
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }
  logout() {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Label>Profile</Label>
          <Form>
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              type="password"
              name="pwd"
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("name", e.target.value);
              }}
            />

            <ButtonContainer>
              <Button
                disabled={this.state.username || this.state.name}
                width="50%"
                onClick={() => {
                  localStorage.removeItem("id");
                  this.props.history.push(`/game`);
                }}
              >
                Register {localStorage.getItem("id")}
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Profile);
