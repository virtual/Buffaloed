import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import { Container, Button, Form, Input, Message } from 'semantic-ui-react'


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.createNewUser = this.createNewUser.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  createNewUser() {
    fetch('/signup', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
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
          <Form.Group widths='equal'>
            <Form.Field>
              <Form.Input label="First Name" type="text" name="firstName" onChange={this.handleFirstNameChange} placeholder="John"></Form.Input>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Last Name" type="text" name="lastName" onChange={this.handleLastNameChange} placeholder="Smith"></Form.Input>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Form.Input label="Email" type="email" name="email" onChange={this.handleEmailChange} placeholder="Your email here"></Form.Input>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Password" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Your password here"></Form.Input>
            </Form.Field>
          </Form.Group>
          <Button primary type='submit' onClick={this.createNewUser}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);