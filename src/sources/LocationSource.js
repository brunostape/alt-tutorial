var LocationActions = require('../actions/LocationActions');

var jsonData = {
    "locations": [
        {
            "id" : 0,
            "name" : "AbuDhabi"
        },
        {
            "id" : 1,
            "name" : "Berlin"
        },
        {
            "id" : 2,
            "name" : "Bogota"
        },
        {
            "id" : 3,
            "name" : "BuenosAires"
        },
        {
            "id" : 4,
            "name" : "Cairo"
        },
        {
            "id" : 5,
            "name" : "Chicago"
        },
        {
            "id" : 6,
            "name" : "Lima"
        },
        {
            "id" : 7,
            "name" : "London"
        },
        {
            "id" : 8,
            "name" : "Miami"
        },
        {
            "id" : 9,
            "name" : "Moscow"
        },
        {
            "id" : 10,
            "name" : "Mumbai"
        },
        {
            "id" : 11,
            "name" : "Paris"
        },
        {
            "id" : 12,
            "name" : "SanFrancisco"
        },
        {
            "id" : 13,
            "name" : "São Paulo"
        },
        {
            "id" : 14,
            "name" : "Lima"
        },
        {
            "id" : 15,
            "name" : "San José"
        }
    ]
};

var LocationSource = {
  fetchLocations() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              resolve(jsonData.locations);
            } else {
              reject('Things have broken');
            }
          }, 250);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: LocationActions.updateLocations,
      error: LocationActions.locationsFailed,
      loading: LocationActions.fetchLocations
    }
  }
};

module.exports = LocationSource;
