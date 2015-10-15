window.Pokemon = new Mongo.Collection("pokemon");

Meteor.subscribe("pokemon");

var Team = function() {
	this.slots = new ReactiveVar([]);
}

Team.prototype.full = function() {
	return false;
}

Team.prototype.add = function(pokemon) {
	var slots = this.slots.get();
	slots.push(pokemon);
	this.slots.set(slots);
}

var team;

Template.TeamBuilder.onCreated(function() {
	team = new Team();
	window.theteam = team;
});

Template.TeamBuilder.helpers({
	team: function() {
		team.slots.get();
	},
	team_is_full: function() {
		return team.full();
	},
});

var results;

Template.Picker.onCreated(function() {
	results = new ReactiveVar();
});

Template.Picker.helpers({
	results: function() {
		return results.get();
	}
});

Template.Picker.events({
	'keyup input': function(evt, tmpl) {
		var query = evt.target.value;
		results.set(Pokemon.find({
			name: {
				$regex: RegExp(query,'i')
			}
		}).fetch());
	}
});
