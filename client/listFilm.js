Template.listFilm.helpers({
    film: function() {
        return film.find();
    }
});

Template.filmSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var film = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            image: $(e.target).find('[name=image]').val()
        };

        Meteor.call('postInsert', film, function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
            Router.go('listFilm', {_id: result._id});
        });

    }
});

Template.filmEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        film.update(currentPostId, {$set: postProperties}, function(error) {
            if (error) {
                // affiche l'erreur à l'utilisateur
                alert(error.reason);
            } else {
                Router.go('filmPage', {_id: currentPostId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            film.remove(currentPostId);
            Router.go('listFilm');
        }
    }
});

