var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var LocationSource = require('../sources/LocationSource');
var FavoritesStore = require('./FavoritesStore');

class LocationStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorites: LocationActions.ADD_FAVORITE_LOCATION,
      setAllFavorites: LocationActions.ADD_ALL_FAVORITE_LOCATION,
      unsetFavorites: LocationActions.REMOVE_FAVORITE_LOCATION,
      unsetAllFavorites: LocationActions.REMOVE_ALL_FAVORITE_LOCATION,
    });

    this.exportPublicMethods({
      getAllLocations: this.getAllLocations,
      getLocation: this.getLocation,
      getLocationIndex: this.getLocationIndex
    });

    this.exportAsync(LocationSource);
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations() {
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites() {
    this.locations = this.locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false
      };
    });
  }

  setFavorites() {
    this.refreshFavorites();
  }

  unsetFavorites() {
    this.refreshFavorites();
  }
  
  unsetAllFavorites() {
    this.refreshFavorites();
  }
  
  setAllFavorites() {
    this.refreshFavorites();
  }
  
  refreshFavorites() {
    this.waitFor(FavoritesStore);

    var favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {

        // set has_favorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = true;
          break;
        }
      }
    });
  }
  
  getAllLocations() {
    var { locations } = this.getState();
    
    return locations;
  }
  
  getLocation(id) {
    var { locations } = this.getState();
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return locations[i];
      }
    }

    return null;
  }
  
  getLocationIndex(id) {
    var { locations } = this.getState();
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return i;
      }
    }

    return null;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
