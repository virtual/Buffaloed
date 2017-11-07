import {extendObservable} from 'mobx';
var axios = require('axios');

export default class UserStore {
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
    // console.log(username, password);
    return new Promise((resolve, reject) => {
      axios.post('/login', {
        username: username,
        password: password
     }).then((answer) => { 
        // console.log(answer);
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
          // console.log(answer.data.message);
          this.message = answer.data.message
        }
        resolve(answer)
      })
  });
}


createNewUser(newUserObj) {
  return new Promise((resolve, reject)=>{
  axios.post("/signup", 
   {firstName: newUserObj.firstName,
    lastName: newUserObj.lastName,
    email: newUserObj.email,
    password: newUserObj.password}
    ).then((userObj)=>{
      if (userObj.data) {
        this.user = userObj.data
      } else {
        console.log("user add failed");
        reject(userObj);
      }
      resolve(userObj);
    })
  })
}

logout() {
  axios.get('/logout').then((res)=> {
    console.log(res);
    if (res !== undefined) { 
      this.user = null;  
      sessionStorage.removeItem('user');
    }  else {
      console.log('undefined');
    }
  }, function(err){
    console.log(err);
  });
 
}


} // closes UserStore