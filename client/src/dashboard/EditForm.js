import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, TextArea, Icon } from 'semantic-ui-react'
const axios = require('axios');

class EditForm extends Component { 
  constructor() {
  super();
    this.state = {
      name: "",
      type: '',
      initialized: false,
      loadingStyle: false,
      loadingStyleDelete: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    if (window.confirm('Delete the sight?')) {
      axios.post('/deleteSight', {slug: this.props.slug}).then((res) => {
        if (res.status === 200) {   
          this.props.history.push("/admin");
        }  else {
          console.log('delete unsuccessful');
        }
      }); 
    }
    this.setState({
      loadingStyleDelete: true
    })
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
      slug: this.props.slug,
      name: this.state.name,
      img: this.state.img,
      lat: this.state.lat,
      lng: this.state.lng,
      type: this.state.type,
      desc: this.state.desc
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
    if(!(this.state.initialized)){
    this.setState({
      name: this.props.info.name,
      desc: this.props.info.desc,
      lng: this.props.info.lng,
      lat: this.props.info.lat,
      img: this.props.info.img,
      type: this.props.info.type,
      initialized: true
    })
   }
  }

  render() {
    return (
      <div>
        <h1>
        Edit {this.state.name}
        </h1>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name='name' value={this.state.name} label='Sight name' placeholder='Sight name'  onChange={this.handleChange}  /> 
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
          <Form.Group widths="equal">
          <Form.Field floated="left" loading={this.state.loadingStyle} onClick={this.handleClick} control={Button} primary>Save</Form.Field>
          <Form.Field floated="right" loading={this.state.loadingStyleDelete} onClick={this.deleteItem} control={Button} color="red"><Icon name='trash' /> Delete</Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
    //onClick={() => {if(window.confirm('Delete the item?')) {this.deleteItem};}}
  }
}
export default withRouter(EditForm);