import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
    if (film.find().count() === 0) {
        film.insert({
            title: 'Blade Runner 2049',
            url: 'https://www.youtube.com/watch?v=dZOaI_Fn5o4',
            genre: 'Science fiction',
            note: '9',
            description: 'En 2049, la société est fragilisée par les nombreuses tensions entre les humains et leurs esclaves créés par ' +
            'bioingénierie. L’officier K est un Blade Runner : il fait partie d’une force d’intervention d’élite chargée de trouver et ' +
            'd’éliminer ceux qui n’obéissent pas aux ordres des humains. Lorsqu’il découvre un secret enfoui depuis longtemps et capable de ' +
            'changer le monde, les plus hautes instances décident que c’est à son tour d’être traqué et éliminé. Son seul espoir est de ' +
            'retrouver Rick Deckard, un ancien Blade Runner qui a disparu depuis des décennies..',
            acteurs: 'Ryan Gosling, Harrison Ford, Jared Leto',
            couleur: 'ec7e05',
            image : 'images/bladeRunner.png',
            date: '4/10/2017',
            postTime: new(Date)
        });

        film.insert({
            title: 'Moonlight',
            url: 'https://www.youtube.com/watch?v=9NJj12tJzqc',
            genre: 'Action',
            note: '8',
            description: 'Après avoir grandi dans un quartier difficile de Miami, Chiron, un jeune homme tente de trouver sa place dans ' +
            'le monde. Moonlight évoque son parcours, de l’enfance à l’âge adulte.',
            acteurs: 'Alex R. Hibbert, Ashton Sanders, Trevante Rhodes',
            couleur: '0a8ea5',
            image : 'images/moonlight.png',
            date: '1/02/2017',
            postTime: new(Date)
        });

        film.insert({
            title: 'Interstellar',
            url: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
            genre: 'Aventure',
            note: '9',
            description: 'Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps ' +
            'afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire. ',
            acteurs: 'Matthew McConaughey, Anne Hathaway, Michael Caine',
            couleur: '3b4747',
            image : 'images/interstellar.png',
            date: '5/10/2014',
            postTime: new(Date)
        });

        film.insert({
            title: 'Baby Driver',
            url: 'https://www.youtube.com/watch?v=D9YZw_X5UzQ',
            genre: 'Comédie',
            note: '7',
            description: 'Chauffeur pour des braqueurs de banque, Baby a un truc pour être le meilleur dans sa partie : il roule au rythme ' +
            'de sa propre playlist. Lorsqu’il rencontre la fille de ses rêves, Baby cherche à mettre fin à ses activités criminelles pour revenir ' +
            'dans le droit chemin. Mais il est forcé de travailler pour un grand patron du crime et le braquage tourne mal… Désormais, sa liberté, ' +
            'son avenir avec la fille qu’il aime et sa vie sont en jeu. ',
            acteurs: 'Ansel Elgort, Kevin Spacey, Lily James',
            couleur: 'd4445f',
            image : 'images/BabyDriver.png',
            date: '19/07/2017',
            postTime: new(Date)
        });

        film.insert({
            title: 'A Ghost Story',
            url: 'https://www.youtube.com/watch?v=c_3NMtxeyfk',
            genre: 'Thriller',
            note: '7',
            description: 'Apparaissant sous un drap blanc, le fantôme d\'un homme rend visite à sa femme en deuil dans la maison ' +
            'de banlieue qu\'ils partageaient encore récemment, pour y découvrir que dans ce nouvel état spectral, le temps n\'a plus ' +
            'd\'emprise sur lui. Condamné à ne plus être que simple spectateur de la vie qui fut la sienne, avec la femme qu\'il aime, ' +
            'et qui toutes deux lui échappent inéluctablement, le fantôme se laisse entraîner dans un voyage à travers le temps et la mémoire, ' +
            'en proie aux ineffables questionnements de l\'existence et à son incommensurabilité. ',
            acteurs: 'Casey Affleck, Rooney Mara, McColm Cephas Jr.',
            couleur: '161815',
            image : 'images/AGhostStory.png',
            date: '20/12/2017',
            postTime: new(Date)
        });
    }
});

