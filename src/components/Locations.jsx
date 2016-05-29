var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');

var EmptyContent = React.createClass({
  render() {
    return (
      <p>Nenhum <strong>{this.props.contentName}</strong> encontrado.</p>
    );
  }

});

var AddFavoriteButton = React.createClass({
  onClick(ev) {
    var number = Number(ev.target.getAttribute('data-id'))
    var location = LocationStore.getLocation(number);
    LocationActions.addFavoriteLocation(location);
  },

  render() {
    return (
      <button onClick={this.onClick} data-id={this.props.locationId}>
        Favoritar
      </button>
    );
  }
});

var AddAllFavoriteButton = React.createClass({
  onClick() {
    var allLocations = LocationStore.getAllLocations();
    LocationActions.addAllFavoriteLocation(allLocations);
  },

  render() {
    return (
      <button onClick={this.onClick}>
        Adicionar todos
      </button>
    );
  }
});

var RemoveFavoriteButton = React.createClass({
  onClick(ev) {
    var number = Number(ev.target.getAttribute('data-id'))
    var location = LocationStore.getLocation(number);
    LocationActions.removeFavoriteLocation(location);
  },

  render() {
    return (
      <button onClick={this.onClick} data-id={this.props.locationId}>
        Enjoei
      </button>
    );
  }
});

var RemoveAllFavoriteButton = React.createClass({
  onClick() {
    LocationActions.removeAllFavoriteLocation();
  },

  render() {
    return (
      <button onClick={this.onClick}>
        Remover todos
      </button>
    );
  }
});

var Favorites = React.createClass({

  render() {
    return (
      <div>
        <h1>({this.props.locations.length}) Favoritos</h1>
        {this.props.locations.length > 0 ?
          (
            <div>
              <RemoveAllFavoriteButton />
              <ul>
                {this.props.locations.map((location, i) => {
                  return (
                    <li key={i}>{location.name} <RemoveFavoriteButton locationId={location.id} /></li>
                  );
                }) }
              </ul>
            </div>
          ) : (
            <EmptyContent contentName="Favorito" />
          )
        }
      </div>
    );
  }
});

var AllLocations = React.createClass({

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (LocationStore.isLoading()) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      );
    }

    return (
      <div>
        <h1>({this.props.locations.length}) Destinos</h1>

        {
          LocationStore.getAllLocations().length > FavoritesStore.getAllLocations().length ? <AddAllFavoriteButton /> : <RemoveAllFavoriteButton />
        }
        
        {this.props.locations.length > 0 ? (
          <ul>
            {this.props.locations.map((location, i) => {
              return (
                <li key={i}>
                  {location.name} {location.has_favorite ? '<3' : <AddFavoriteButton locationId={location.id} />}
                </li>
              );
            }) }
          </ul>
        ) : (
            <EmptyContent contentName="Destino" />
          )
        }
      </div>
    );
  }
});

var Locations = React.createClass({
  componentDidMount() {
    LocationStore.fetchLocations();
  },

  render() {
    return (
      <div>

        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>

        <AltContainer store={FavoritesStore}>
          <Favorites />
        </AltContainer>

      </div>
    );
  }
});

module.exports = Locations;
