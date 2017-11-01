import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import ContactCard from './ContactCard';


export default class ContactInfo extends Component {
  constructor(){  
    super()

    this.displayContacts = this.displayContacts.bind(this);

    this.contacts = [
    { name: 'Jeanine Schoessler', 
      desc: 'Montana Code School Person',
      img: 'emily.jpg',
      meta: 'Code Wizard',
      email: 'Jeanine.MT@gmail.com',
      twitter: "Graphical"
    },
    { name: 'Kate Ten',
    desc: 'Montana Code School Full Time Student - Bozeman',
    img: 'emily.jpg',
    meta: 'Developer',
    email: 'katharina.a.root@gmail.com'
  },
  { name: 'Rob Herrmann',
    desc: 'Montana Code School Full Time Student - Bozeman',
    img: 'emily.jpg',
    meta: 'Time Traveller ',
    email: 'robjherrmann@gmail.com',
    twitter: 'RobJHerrmann'
  },
    { name: 'Emily Kimmel',
    desc: 'huh',
    img: 'emily.jpg',
    meta: 'what now?',
    email: 'kimmelem@hotmail.com',
    twitter: 'EmKim5'
  }
  ] 
  this.cardhtml = []; // define our empty card array that will get info pushed into it
  }

      // this function loops over the contacts array
  displayContacts(contacts) {
    contacts.forEach((element, index)=> {  //initiating our forEach loop on our contact array by each element within our four objects
      //this.cardhtml.push(<ContactCard {...element}/>)
      this.cardhtml.push(<ContactCard twitter={element.twitter} name={element.name} desc={element.desc} email={element.email} meta={element.meta} img={element.img} key={index}/>)
      //the line above pushes the element of each object within the contact array into the cardhtml array with the ContactCard's formatting 
    })
  }

  componentDidMount(){
    this.displayContacts(this.contacts) // this calls our displayContacts function  
  } 

  render () {
    return (
    <Card.Group stackable={true} itemsPerRow={4}>
      
      {this.cardhtml}
  </Card.Group>
 );
}
}

