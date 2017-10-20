import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

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
        username: this.state.email,
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
        <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
        <Icon color='blue' name='rocket' />
          {' '}Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>

            <label for="email" className="sr-only">Email</label>
          <Form.Input type="email" id="email" name="email" onChange={this.handleEmailChange} 
          fluid icon='user' iconPosition='left' placeholder='E-mail address'/>

          <label for="password" className="sr-only">Password</label>
          <Form.Input placeholder="Password" type="password" name="password" onChange={this.handlePasswordChange}
          fluid icon='lock' iconPosition='left'/>
            
          <Button type='submit' onClick={this.loginUser} color='blue' fluid size='large'>Login</Button>
          </Segment>
        </Form>

        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
         
        { userMessage }
        </div>
      </Container>
    );
  }
}

export default withRouter(Login);