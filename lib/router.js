Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'listFilm'});

Router.route('/film/:_id', {
    name: 'filmPage',
    data: function() { return film.findOne(this.params._id); }
});

Router.route('/film/:_id/edit', {
    name: 'filmEdit',
    data: function() { return film.findOne(this.params._id); }
});

Router.route('/submit', {name: 'filmSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'filmPage'});