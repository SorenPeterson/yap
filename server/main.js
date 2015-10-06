global.Pokemon = new Mongo.Collection("pokemon");

Meteor.publish("pokemon", function() {
	return Pokemon.find();
});

// This is a wrapper for PokeAPI.com
var Api = function() {
	// The base url for the api
	var base_url = 'http://pokeapi.co/';

	// This contains resource urls for all pokemon
	this.pokedex = function(cb) {
		Meteor.http.get(base_url + 'api/v1/pokedex/1/', function(err, res) {
			cb(err, res.data);
		});
	}

	this.pokemon = function(cb, url) {
		Meteor.http.get(base_url + url, function(err, res) {
			cb(err, res.data);
		});
	}
}

var api = new Api();

Meteor.startup(function() {
	if(Pokemon.find().count() === 0) {
		api.pokedex(function(err, res) {
			_(res.pokemon).each(function(pokemon) {
				api.pokemon(function(err, pokemon_data) {
					Pokemon.insert(pokemon_data);
				}, pokemon.resource_uri);
			});
		});
	}
});

