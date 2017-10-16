import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      name: ""
    };
    this.loginUser = this.loginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  loginUser() {
    fetch('/login', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((answer) => {
      console.log(answer);
      if (answer.success) {
        this.props.setUser({name: answer.name, email: this.state.email});
        this.props.history.push("/");
      } else {
        console.log(answer.message);
        this.setState({
          message: answer.message
        });
      }
    });
  }

  render() {
    var userMessage = this.state.message ? (
      <Container>{this.state.message}</Container>
    ) : (null);

    return (
      <Container>
        <h1>Log in</h1>
        <Form>
          <FormGroup>
            <Label for="email">email</Label>
            <Input type="email" name="email" onChange={this.handleEmailChange} placeholder="Your email here"></Input>
          </FormGroup>
          <FormGroup>
            <Label for="password">password</Label>
            <Input type="password" name="password" onChange={this.handlePasswordChange} placeholder="Your password here"></Input>
          </FormGroup>
          <Button onClick={this.loginUser}>Log in</Button>
        </Form>
        {
          userMessage
        }
      </Container>
    );
  }
}

export default withRouter(Login);