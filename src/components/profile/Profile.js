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
      password: null,
      status: null,
      token: null,
      date: null,
      birthday: "Unknown",
      id: null,
      updateUsername: null,
      updateBirthday: null
    };
  }

  componentDidMount() {
    const key = localStorage.getItem("id");
    fetch(`${getDomain()}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
        } else if (response.status === 404) {
          throw new Error("User ID was not found");
        }
        return response.json();
      })

      .then(returnedUser => {
        const user = new User(returnedUser);
        localStorage.setItem("hisID", user.id);
        this.handleInputChange("id", user.id);
        this.handleInputChange("username", user.username);
        this.handleInputChange("status", user.status);
        this.handleInputChange("date", user.date);
        this.handleInputChange("password", user.password);
        this.handleInputChange("birthday", user.birthday);
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

  editProfile() {
    if (
      this.state.updateBirthday !== null ||
      this.state.updateUsername !== null
    ) {
      fetch(`${getDomain()}/user/${localStorage.getItem("myID")}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.updateUsername,
          id: this.state.id,
          birthday: this.state.updateBirthday
        })
      })
        .then(response => {
          if (response.status === 204) {
          } else if (response.status === 404) {
            throw new Error("User ID was not found or Username taken");
          }
        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
    } else {
      alert("Type in the input field to edit profile");
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Label>Profile </Label>
          <Button
            disabled={
              localStorage.getItem("hisID") !== localStorage.getItem("myID")
            }
            width={"20%"}
            onClick={() => {
              this.editProfile();
              window.location.reload();
            }}
          >
            Edit Profile
          </Button>
          <Form>
            <h3>
              UserName: {this.state.username}
              <div align="right">
                {" "}
                <InputField
                  placeholder="Edit Username"
                  onChange={e => {
                    this.handleInputChange("updateUsername", e.target.value);
                  }}
                />
              </div>
            </h3>
            <h3>Status: {this.state.status}</h3>
            <h3>Creation Date: {this.state.date} </h3>
            <h3>
              Birthday: {this.state.birthday}
              <div align="right">
                {" "}
                <InputField
                  placeholder="dd/mm/yyyy"
                  onChange={e => {
                    this.handleInputChange("updateBirthday", e.target.value);
                  }}
                />
              </div>
            </h3>
            <ButtonContainer>
              <Button
                width="50%"
                onClick={() => {
                  localStorage.removeItem("id");
                  this.props.history.push(`/game`);
                }}
              >
                Back to Dashboard
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Profile);
