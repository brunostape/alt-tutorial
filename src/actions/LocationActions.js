var alt = require('../alt');

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  addFavoriteLocation(location) {
    this.dispatch(location);
  }
  
  addAllFavoriteLocation(allLocations){
    this.dispatch(allLocations);
  }
  
  removeFavoriteLocation(location) {
    this.dispatch(location);
  }
  
  removeAllFavoriteLocation(){
    this.dispatch();    
  }
}

module.exports = alt.createActions(LocationActions);
