import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, TextArea } from 'semantic-ui-react'
const axios = require('axios');

class AddForm extends Component { 
  constructor() {
  super();
    this.state = {
      name: "",
      type: '',
      loadingStyle: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    // console.log(e)
    // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
    var change = {}
    change[e.target.name] = e.target.value
    // console.log(change);
    this.setState(change)
    // console.log(this.state)
  }
  handleClick() {
    // console.log(this.state);
    this.setState({
      loadingStyle: true
    })

    let updatedSight = {
      slug: this.state.slug,
      name: this.state.name,
      img: this.state.img,
      lat: this.state.lat,
      lng: this.state.lng,
      type: this.state.type,
      desc: this.state.desc,
      savetype: 'add'
    }
    axios.post('/saveSight', updatedSight).then((scoresObj) => {  
      if (scoresObj.status === 200) {   
        this.props.history.push("/admin");
      }  else {
        console.log('save unsuccessful');
      }
    }); 
  }
  componentDidMount(){

  }

  render() {
    return (
      <div>
        <h1>
        Create New Sight
        </h1>
        <Form>
          <Form.Group widths='equal'>
          <Form.Field control={Input} required name='slug' value={this.state.slug} label='Slug' placeholder='Lowercase and dashes only'  onChange={this.handleChange}  /> 
          <Form.Field control={Input} required name='name' value={this.state.name} label='Sight name' placeholder='Sight name'  onChange={this.handleChange}  /> 
          </Form.Group>
          <Form.Field control={TextArea} name='desc' value={this.state.desc} label='Description' placeholder='Information for the sight' onChange={this.handleChange} /> 
          <Form.Group widths='equal'>
            <Form.Field control={Input} name='lat' value={this.state.lat} label='Latitude' placeholder='Latitude' onChange={this.handleChange} />
            <Form.Field control={Input} name='lng' value={this.state.lng} label='Longitude' placeholder='Longitude' onChange={this.handleChange} />
            <Form.Field control={Input} name='type' value={this.state.type} label='Type' placeholder='Type' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name='img' value={this.state.img} label='Image' placeholder='url'  onChange={this.handleChange}  /> 
          </Form.Group>

          <Form.Field loading={this.state.loadingStyle} onClick={this.handleClick} control={Button} primary>Create</Form.Field>
        </Form>
      </div>
    )
  }
}
export default withRouter(AddForm);