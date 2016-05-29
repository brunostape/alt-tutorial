var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class FavoritesStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      addFavoriteLocation: LocationActions.ADD_FAVORITE_LOCATION,
      addAllFavoriteLocation: LocationActions.ADD_ALL_FAVORITE_LOCATION,
      removeFavoriteLocation: LocationActions.REMOVE_FAVORITE_LOCATION,
      removeAllFavoriteLocation: LocationActions.REMOVE_ALL_FAVORITE_LOCATION,
    });
    
    this.exportPublicMethods({
      getAllLocations: this.getAllLocations
    });
  }

  addFavoriteLocation(location) {
    this.locations.push(location);
  }
  
  addAllFavoriteLocation(allLocations) {
    this.locations = [];
    
    for (var i = 0; i < allLocations.length; i += 1) {
      this.locations.push(allLocations[i]);      
    }
  }
  
  removeFavoriteLocation(location) {
    for (var i = 0; i < this.locations.length; i += 1) {
        if (this.locations[i].id === location.id) {
          this.locations.splice(i, 1);
          break;
        }
    }
  }
  
  removeAllFavoriteLocation() {
    this.locations = [];
  }
  
  getAllLocations() {
    var { locations } = this.getState();
    
    return locations;
  }
  
}

module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');
