import {extendObservable} from 'mobx';
var axios = require('axios');

export default class SightStore {
  constructor() {
    extendObservable(this, {
      sights: null, 
    })
    this.fetchSights();
  }
  fetchSights() {
    // console.log('fetching sights')
    return new Promise((resolve, reject) => {
      axios.get('/sights', {
      }).then((sightObj) => {
        if (sightObj.data !== undefined) {
          // console.log(sightObj.data);
          this.sights = sightObj.data;
        } else {
          console.log('undefined')
          reject(sightObj);
        }
        resolve(sightObj);
      }).catch(function (err) {
        console.log(err);
      });
    });
  }
    
  

} // closes SightStore