Router.onBeforeAction(function() {
	this.layout('Layout');
	this.next();
});

Router.route('/', function() {
	this.render('Index');
}); 

Router.route('/teambuilder', function() {
	this.render('TeamBuilder');
});

