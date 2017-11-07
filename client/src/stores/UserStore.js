import {extendObservable} from 'mobx';
var axios = require('axios');

export default class UserStores {
  constructor() {
    extendObservable(this, {
      user: null,
      message: null,
      get retrieveUser() {
        return this.user;
      }
    })
  }
    
  loginUser(username, password) {
    console.log(username, password);
    return new Promise((resolve, reject) => {
      axios.post('/login', {
        username: username,
        password: password
     }).then((answer) => { 
        console.log(answer);
        if (answer.data.success) {
          let loggedUser={
            firstName: answer.data.firstName, 
            lastName: answer.data.lastName,
            email: answer.data.email,
            id: answer.data.id,
            img: answer.data.img
          }
          this.user = loggedUser; 
          sessionStorage.setItem('user', JSON.stringify(loggedUser));  
          
        } else {
          reject(answer)
          console.log(answer.data.message);
          this.message = answer.data.message
        }
        resolve(answer)
      })
  });
}


} // closes UserStores