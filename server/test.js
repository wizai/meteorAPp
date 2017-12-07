if (film.find().count() === 0) {
    film.insert({
        title: 'Introducing Telescope',
        url: 'http://sachagreif.com/introducing-telescope/'
    });

    film.insert({
        title: 'Meteor',
        url: 'http://meteor.com'
    });

    film.insert({
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    });
}