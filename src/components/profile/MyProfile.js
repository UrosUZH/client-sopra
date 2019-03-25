import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

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

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      name: null,
      status: null,
      token: localStorage.getItem("token"),
      date: null,
      birthday: "Unknown"
    };
  }

  componentDidMount() {
    fetch(`${getDomain()}/MyProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        token: this.state.token
      })
    })
      .then(response => {
        if (response.status === 200) {
          alert("status myprofile ok 200");
        } else if (response.status === 404) {
          throw new Error("User ID was not found");
        }
        return response.json();
      })

      .then(returnedUser => {
        const user = new User(returnedUser);
        this.handleInputChange("username", user.username);
        this.handleInputChange("status", user.status);
        this.handleInputChange("date", user.date);
        this.handleInputChange("name", user.name);
      })

      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
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
            <Label>Username: {this.state.username} </Label>
            <Label>Status: {this.state.status} </Label>
            <Label>Creation Date: {this.state.date} </Label>
            <Label>Birthday:{this.state.birthday}</Label>
            <ButtonContainer>
              <Button
                width="50%"
                onClick={() => {
                  localStorage.removeItem("id");
                  this.props.history.push(`/game`);
                }}
              >
                Use und lösche {localStorage.getItem("id")}
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(MyProfile);
