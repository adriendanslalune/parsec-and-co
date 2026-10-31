// Monde-bibliothèque : la fiche du monde et son histoire d’expédition
//
// LA FICHE DU MONDE, monde({ … }) :
//   cle      : le nom court du type, sans accent ni espace : le même que celui du fichier et des images ;
//   nom      : le nom affiché ;
//   rarete   : commun, insolite, rare ou legendaire. Part des tirages : 70, 20, 8 et 2 %, partagée entre les mondes de même rareté ;
//   poids    : (facultatif) la part de ce monde dans sa rareté, 1 par défaut ;
//   danger   : de … à … (0 à 5) ; chaque point de danger, c’est 7 % de risque de blessure sur un choix risqué ;
//   couleurs : les deux couleurs de la planète sur la vignette dessinée, puis sol : la couleur du sol ;
//   guide    : trois façons de décrire le monde dans le Guide (« Le Guide dit : Untel, c’est … »).
// Un monde n’apparaît dans la galaxie qu’une fois qu’il a au moins une image (voir illustrations/liste.js).
//
// L’HISTOIRE, histoire(cle, titre, [ 3 scènes ]) : une expédition joue les 3 scènes, dans l’ordre. Chaque scène a :
//   rappel    : (scènes 2 et 3) la phrase qui ouvre la scène, selon ce qui s’est passé juste avant :
//               prudent, reussite (risque réussi), echec (risque raté, on revient après la convalescence) ou objet ;
//   situation : ce que l’explorateur découvre ;
//   prudent   : le choix sans risque (le bouton, puis ce qui se passe) ;
//   risque    : le choix risqué (le bouton, ce qui se passe si ça marche, ce qui se passe si on se blesse) ;
//   objet     : la série d’objet qui fait basculer la scène (epaves, fossiles, reliques ou bizarreries),
//               et ce qui se passe quand on sort cet objet de la soute.
// {trouvaille} est remplacé par l’objet trouvé, en gras (un objet de palier 1 : un boulon d’épave, une écaille fossile…).
//
// Les accords : écris les deux formes entre accolades, la masculine puis la féminine, avec à qui elles s’accordent.
//   {toi:trempé|trempée}        s’accorde avec l’explorateur ou l’exploratrice ;
//   {objet:le|la}               avec l’objet sorti de la soute (dans « objet : resultat ») ;
//   {trouvaille:coincé|coincée} avec l’objet trouvé (pas dans les rappels : la trouvaille d’avant est déjà loin).
// Sans accolades, la phrase ne change pas : c’est très bien quand elle n’a rien à accorder.
//
// Pour modifier : ne touche qu’au texte entre les guillemets droits "…". Garde les virgules et les accolades.
// Pour une autre histoire du même monde : copie tout le bloc histoire( … ); à la suite, avec un autre titre.
// Ne supprime pas une histoire et ne change pas l’ordre des scènes : une expédition en cours retient leurs numéros.

monde({
  cle: "bibliotheque",
  nom: "Monde-bibliothèque",
  rarete: "insolite",
  danger: [0, 2],
  couleurs: ["#c98a5a", "#5a3a2a"],
  sol: "#d8b98a",
  guide: [
    "une planète de rayonnages, où chaque montagne est classée et chaque vallée a sa cote",
    "une bibliothèque si grande que le silence y a des embouteillages",
    "un monde où l’on prête des livres, des orages et, sur présentation d’une pièce d’identité, des souvenirs"
  ]
});

histoire("bibliotheque", "Le livre en retard", [

  // scène 1
  {
    situation: "Les rayonnages montent jusqu’aux nuages, et le vent tourne les pages des livres restés ouverts. Au pied d’une étagère, une bibliothécaire de pierre te regarde par-dessus ses lunettes.",
    prudent: {
      choix: "Chuchoter un bonjour et passer",
      resultat: "Elle hoche la tête, à peine. Tu as été {toi:poli|polie}, et ici c’est une forme de passeport. Le Guide note : « parler bas »."
    },
    risque: {
      choix: "Grimper aux rayonnages",
      reussite: "Tout en haut, entre deux volumes qui ne se parlent plus : {trouvaille}. La bibliothécaire n’a rien vu, ou fait semblant.",
      echec: "Une échelle roule, l’étagère suit, et une encyclopédie en douze tomes t’explique la gravité, tome après tome."
    },
    objet: {
      serie: "reliques",
      resultat: "Elle {objet:le|la} reconnaît : un objet de la réserve, disparu depuis des siècles. Pour te remercier, elle tamponne ta main et te tend {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "La bibliothécaire t’a laissé passer. Plus loin, une salle de lecture.",
      reussite: "Tu redescends des rayonnages sans bruit, ou presque. Plus loin, une salle de lecture.",
      echec: "Tu connais maintenant la gravité en douze tomes. La salle de lecture est au bout du couloir.",
      objet: "Le tampon sur ta main ouvre les portes de la salle de lecture."
    },
    situation: "Dans la salle de lecture, des lecteurs de toutes les espèces lisent sans un bruit. Un seul livre est posé sur une table vide, ouvert sur une page qui parle de toi.",
    prudent: {
      choix: "Ne pas le lire",
      resultat: "Tu refermes le livre sans regarder. Certaines choses sont mieux en rayon. Les lecteurs approuvent d’un battement de cils, ou de ce qui en tient lieu."
    },
    risque: {
      choix: "Lire la page",
      reussite: "La page raconte ce que tu vas faire dans une minute. Tu le fais. Entre deux pages, en marque-page, il y avait {trouvaille}.",
      echec: "La page raconte que tu trébuches. Tu trébuches. Les lecteurs lèvent tous les yeux en même temps, et ce silence-là fait mal."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu {objet:le|la} poses sur la page : l’encre se met à bouger et écrit une suite plus gentille. À la fin du chapitre, il y a {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Le livre est resté fermé. Mais aux réserves, quelque chose l’a entendu se refermer.",
      reussite: "Tu sais déjà ce que tu vas faire : descendre aux réserves.",
      echec: "Les lecteurs te suivent des yeux jusqu’à l’escalier des réserves.",
      objet: "Le livre continue de s’écrire tout seul derrière toi. L’escalier des réserves est ouvert."
    },
    situation: "Aux réserves, un livre gronde dans sa cage. Il a quatre cents ans de retard, et son amende a maintenant son propre code postal.",
    prudent: {
      choix: "Laisser le gardien s’en occuper",
      resultat: "Le gardien sort un filet, un tabouret et beaucoup de patience. Tu remontes. Le Guide note : « rendre ses livres à temps »."
    },
    risque: {
      choix: "Ouvrir la cage et le calmer",
      reussite: "Tu lui lis une histoire à voix basse. Il ronronne, se laisse ranger, et recrache {trouvaille}, qu’il gardait depuis le Moyen Âge.",
      echec: "Il ne veut pas être lu. Il te mord, à la page 112, et ne lâche qu’au chapitre suivant."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} glisses entre ses pages, comme une friandise. Il se calme, s’ouvre, et te rend {trouvaille}."
    }
  }

]);
