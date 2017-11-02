import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import ContactCard from './ContactCard';

export default class ContactInfo extends Component {
  constructor(){  
    super();
    this.state = {
      initialized: false,
      contacts: []
    }
  
    this.displayContacts = this.displayContacts.bind(this);   
    this.cardhtml = []; // define our empty card array that will get info pushed into it
  }

  // this function loops over the contacts array
  displayContacts(contacts) {
    contacts.forEach((element, index)=> {  //initiating our forEach loop on our contact array by each element within our four objects
      //this.cardhtml.push(<ContactCard {...element}/>)
      this.cardhtml.push(<ContactCard linkedin={element.linkedin} twitter={element.twitter} name={element.name} desc={element.desc} email={element.email} meta={element.meta} img={element.img} key={index}/>)
      //the line above pushes the element of each object within the contact array into the cardhtml array with the ContactCard's formatting 
    });
    this.setState({
      initialized: true
    })
  }
componentWillMount() {
  this.setState({
    contacts: [
    {
      name: 'Rob Herrmann',
      desc: 'Montana Code School Full Time Student - Bozeman',
      img: 'rob.jpg',
      meta: 'Aspiring Full Stack Web Developer',
      email: 'robjherrmann@gmail.com',
      twitter: 'RobJHerrmann',
      linkedin: 'rob-herrmann-36b269146'
    },
    {
      name: 'Emily Kimmel',
      desc: 'huh',
      img: 'emily.jpg',
      meta: 'Aspiring Developer',
      email: 'kimmelem@hotmail.com',
      twitter: 'EmKim5',
      linkedin: 'emily-kimmel-1b0960151'
    },
    {
      name: 'Jeanine Schoessler',
      desc: 'Montana Code School Person',
      img: 'jeanine.jpg',
      meta: 'Front-End Web Developer',
      email: 'jeanine.mt@gmail.com',
      twitter: "Graphical",
      linkedin: "satinflame"
    },
    {
      name: 'Kate Ten',
      desc: 'Montana Code School Full Time Student - Bozeman',
      img: 'kate.jpg',
      meta: 'Web Developer',
      email: 'katharina.a.root@gmail.com'
    }
  ]});
}
  componentDidMount(){
    if (!(this.state.initialized)) {
      this.displayContacts(this.state.contacts) // this calls our displayContacts function  
    }
  } 

  render () {
    
    return (
      <div>
        <h1>About Our Team</h1>
        <Card.Group doubling stackable={true} itemsPerRow={4}> 
          {this.cardhtml}
        </Card.Group>
      </div>
    );
  }
}

