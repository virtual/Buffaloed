import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button, Form, Message } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      firstName: "",
      lastName: ""
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
        this.props.setUser({firstName: answer.firstName, email: this.state.email});
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
      <Container>
      <Message
      warning
      header='Error: '
      list={[
         this.state.message
      ]}
    />
      </Container>
    ) : (null);

    return (
      <Container>
        <h1>Log in</h1>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
 
            <Form.Input label="Email" type="email" name="email" onChange={this.handleEmailChange} placeholder="Your email here"></Form.Input>
            </Form.Field>
            
            <Form.Field>
             <Form.Input label="Password" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Your password here"></Form.Input>
            </Form.Field> 
          </Form.Group>
          <Button primary type='submit' onClick={this.loginUser}>Log&nbsp;in</Button>
        </Form> 

        
         
        { userMessage }
      </Container>
    );
  }
}

export default withRouter(Login);