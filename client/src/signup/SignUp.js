import React, { Component } from 'react';
import './App.css';
import { Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.createNewUser = this.createNewUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleNameChange(event) {
    let name = event.target.value;
    console.log(name);
    this.setState({ name: name });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  createNewUser() {
    fetch('/user', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((answer) => {
      console.log(answer);
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <Container>
        <h1>Signup</h1>
        <Form>
          <FormGroup>
            <Label for="name">name</Label>
            <Input type="text" name="name" onChange={this.handleNameChange} placeholder="Your name here"></Input>
          </FormGroup>
          <FormGroup>
            <Label for="email">email</Label>
            <Input type="email" name="email" onChange={this.handleEmailChange} placeholder="Your email here"></Input>
          </FormGroup>
          <FormGroup>
            <Label for="password">password</Label>
            <Input type="password" name="password" onChange={this.handlePasswordChange} placeholder="Your password here"></Input>
          </FormGroup>
          <Button onClick={this.createNewUser}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Signup);