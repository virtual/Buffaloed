import React, { Component } from 'react'; 
import { withRouter, Link } from 'react-router-dom';
import { Container, Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'



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
        {' '}Sign Up
      </Header>
      <Form size='large'>
        <Segment stacked>

          <label htmlFor="firstName" className="sr-only">First Name</label>
          <Form.Input id='firstName' type="text" name="firstName" onChange={this.handleFirstNameChange} placeholder="John"></Form.Input>

        <label htmlFor="lastName" className="sr-only">Last Name</label>
        <Form.Input id="lastName" type="text" name="lastName" onChange={this.handleLastNameChange} placeholder="Smith"></Form.Input>

        <label htmlFor="email" className="sr-only">Email</label>
          <Form.Input type="email" id="email" name="email" onChange={this.handleEmailChange} 
          fluid icon='user' iconPosition='left' placeholder='E-mail address'/>

          <label htmlFor="password" className="sr-only">Password</label>
          <Form.Input placeholder="Password" id="password" type="password" name="password" onChange={this.handlePasswordChange}
          fluid icon='lock' iconPosition='left'/>

          <Button primary type='submit' color='blue' fluid size='large' onClick={this.createNewUser}>Submit</Button>
        </Segment>
      </Form>

      <Message>
       Already have an account? <Link to="/login">Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
       
      {/* { userMessage } */}
      </div>
    </Container>
      // <Container>
      //   <h1>Signup</h1>
      //   <Form>
      //     <Form.Group widths='equal'>
      //       <Form.Field>
      //         <Form.Input label="First Name" type="text" name="firstName" onChange={this.handleFirstNameChange} placeholder="John"></Form.Input>
      //       </Form.Field>
      //       <Form.Field>
      //         <Form.Input label="Last Name" type="text" name="lastName" onChange={this.handleLastNameChange} placeholder="Smith"></Form.Input>
      //       </Form.Field>
      //     </Form.Group>
      //     <Form.Group widths='equal'>
      //       <Form.Field>
      //         <Form.Input label="Email" type="email" name="email" onChange={this.handleEmailChange} placeholder="Your email here"></Form.Input>
      //       </Form.Field>
      //       <Form.Field>
      //         <Form.Input label="Password" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Your password here"></Form.Input>
      //       </Form.Field>
      //     </Form.Group>
      //     <Button primary type='submit' onClick={this.createNewUser}>Submit</Button>
      //   </Form>
      // </Container>
    );
  }
}

export default withRouter(SignUp);