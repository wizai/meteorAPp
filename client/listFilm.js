Template.listFilm.helpers({
    film: function() {
        return film.find();
    }
});

Template.listFilm.rendered = function () {
    $('select').material_select();
}
Template.filmPage.rendered = function () {
    var acteursList = $('.acteurs').text();
    var acteur = acteursList.split(',')
    var arrayActeur  = [];
    var newHTML = [];
    arrayActeur = arrayActeur.concat(acteur);
    $.each( arrayActeur, function( key, value ) {
        //alert( key + ": " + value );
        newHTML.push('<span>' + value + '</span>');
        //$(".acteurs").html("<span>"+ key + ": " + value + "</span>");
        $(".acteurs").html(newHTML.join(""));
    });
};

Template.filmSubmit.rendered = function () {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        labelMonthNext: 'Mois suivant',
        labelMonthPrev: 'Mois précédent',
        labelMonthSelect: 'Selectionner le mois',
        labelYearSelect: 'Selectionner une année',
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Aujourd\'hui',
        clear: 'Réinitialiser',
        close: 'Fermer',
        format: 'dd/mm/yyyy',
        closeOnSelect: true
    });
};



Template.filmSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        var film = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            genre: $(e.target).find('[name=genre]').val(),
            note: $(e.target).find('[name=note]').val(),
            description: $(e.target).find('[name=description]').val(),
            acteurs: $(e.target).find('[name=acteurs]').val(),
            couleur: $(e.target).find('[name=couleur]').val(),
            date : $(e.target).find('[name=date]').val(),
            image: $(e.target).find('img').attr('src')
        };
        console.log(film);

        Meteor.call('postInsert', film, function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
            Router.go('listFilm', {_id: result._id});
        });
    },
    'focus #fileInput' :function (e) {
        $(e.target).parents('.input-field').addClass('focused');
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
                Router.go('listFilm', {_id: currentPostId});
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

Template.filmEdit.rendered = function () {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        labelMonthNext: 'Mois suivant',
        labelMonthPrev: 'Mois précédent',
        labelMonthSelect: 'Selectionner le mois',
        labelYearSelect: 'Selectionner une année',
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Aujourd\'hui',
        clear: 'Réinitialiser',
        close: 'Fermer',
        format: 'dd/mm/yyyy',
        closeOnSelect: true
    });
};

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Images from '/lib/film.js';

Template.filmSubmit.helpers({
    uploadedFiles: function () {
        return Images.find();
    }
});

Template.filmSubmit.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
    this.uploadedImage = new ReactiveVar(false);
});

Template.filmSubmit.helpers({
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    uploadedImage: function () {
        return Template.instance().uploadedImage.get();
    }
});

Template.filmSubmit.events({
    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // there was multiple files selected
            var file = e.currentTarget.files[0];
            if (file) {
                var uploadInstance = Images.insert({
                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic'
                }, false);

                uploadInstance.on('start', function() {
                    template.currentUpload.set(this);
                });

                uploadInstance.on('afterUpload', function (fileRef) {
                    template.uploadedImage.set(fileRef);
                });

                uploadInstance.on('end', function(error, fileObj) {
                    if (error) {
                        window.alert('Error during upload: ' + error.reason);
                    } else {
                        console.log(template.uploadedImage)
                        template.uploadedImage.set(fileObj);
                    }
                    template.currentUpload.set(false);
                });
                uploadInstance.start();
            }
        }
    }
});

