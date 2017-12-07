film = new Mongo.Collection('film');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.String);
        check(postAttributes, {
            title: String,
            url: String,
            image : String
        });

        var post = _.extend(postAttributes, {
            submitted: new Date()
        });
        var filmId = film.insert(post);
        return {
            _id: filmId
        };
    }
});