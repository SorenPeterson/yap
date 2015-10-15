window.Pokemon = new Mongo.Collection("pokemon");

Meteor.subscribe("pokemon");

var Team = function() {
}

Team.prototype.full = function() {
	return false;
}

var team;

Template.TeamBuilder.onCreated(function() {
	team = new Team();
});

Template.TeamBuilder.helpers({
	team_is_full: function() {
		return team.full();
	}
});

