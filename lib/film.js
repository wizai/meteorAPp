
import { Template } from 'meteor/templating';
film = new Mongo.Collection('film');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.String);
        check(postAttributes, {
            title: String,
            url: String,
            genre: String,
            note: String,
            description: String,
            acteurs: String,
            couleur: String,
            image : String,
            date: String
        });

        var post = _.extend(postAttributes, {
            postTime: String
        });
        var filmId = film.insert(post);
        return {
            _id: filmId
        };
    }

});

import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
    debug: true,
    collectionName: 'Images',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload: function (file) {
        console.log("OnBeforeUpload");
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
});

if (Meteor.isServer) {
    Images.denyClient();
    Meteor.publish('files.images.all', function () {
        return Images.find().cursor;
    });
} else {
    Meteor.subscribe('files.images.all');
}

export default Images;
