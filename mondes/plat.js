// Monde plat : la fiche du monde et son histoire d’expédition
//
// LA FICHE DU MONDE, monde({ … }) :
//   cle      : le nom court du type, sans accent ni espace : le même que celui du fichier et des images ;
//   nom      : le nom affiché ;
//   rarete   : commun, insolite, rare ou legendaire. Part des tirages : 70, 20, 8 et 2 %, partagée entre les mondes de même rareté ;
//   poids    : (facultatif) la part de ce monde dans sa rareté, 1 par défaut ;
//   danger   : de … à … (0 à 5) ; chaque point de danger, c’est 7 % de risque de rater un choix risqué (pas de trouvaille) ;
//   couleurs : les deux couleurs de la planète sur la vignette dessinée, puis sol : la couleur du sol ;
//   guide    : trois façons de décrire le monde dans le Guide (« Le Guide dit : Untel, c’est … »).
// Un monde n’apparaît dans la galaxie qu’une fois qu’il a au moins une image (voir illustrations/liste.js).
//
// L’HISTOIRE, histoire(cle, titre, [ 3 scènes ]) : une expédition joue les 3 scènes, dans l’ordre. Chaque scène a :
//   rappel    : (scènes 2 et 3) la phrase qui ouvre la scène, selon ce qui s’est passé juste avant :
//               prudent, reussite (risque réussi), echec (risque raté, sans trouvaille) ou objet ;
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
  cle: "plat",
  nom: "Monde plat",
  rarete: "rare",
  danger: [1, 3],
  couleurs: ["#9fc48a", "#3f6a8f"],
  sol: "#b6cc9a",
  guide: [
    "un disque, avec un bord, et une vue imprenable sur le vide",
    "un monde si plat que l’horizon est tracé à la règle et qu’on voit arriver la pluie trois jours à l’avance",
    "une planète qui a tort selon tous les savants, et qui s’en porte très bien"
  ]
});

histoire("plat", "Le bord du monde", [

  // scène 1
  {
    situation: "Tout est plat : les champs, les lacs, les forêts, comme posés à plat sur une grande table. Au loin, le paysage s’arrête net, et après il n’y a plus que des étoiles.",
    prudent: {
      choix: "Marcher vers le bord, sans se presser",
      resultat: "Il faut deux jours, mais on voit le bord tout du long, et le voyage paraît court. Le Guide note : « horizon fiable »."
    },
    risque: {
      choix: "Prendre le raccourci par le lac",
      reussite: "Le lac n’a que deux centimètres de profondeur, comme tout ici. Au fond, bien à plat : {trouvaille}.",
      echec: "Le lac n’a qu’une épaisseur, mais elle glisse. Tu fais toute la traversée sur le dos."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il roule tout seul|Elle roule toute seule} vers le bord, sur un sol parfaitement plat. Tu {objet:le|la} suis, et en chemin tu ramasses {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Deux jours de marche, et le bord est enfin là.",
      reussite: "Tu sèches en marchant. Le bord du monde est juste devant.",
      echec: "Tu as glissé sur le dos jusqu’au bord du monde, sans le vouloir.",
      objet: "Ce qui roulait s’arrête pile au bord du monde."
    },
    situation: "Au bord, le sol s’arrête comme une nappe au bout d’une table. En dessous, très loin, quelque chose de gigantesque porte le disque, et respire lentement.",
    prudent: {
      choix: "T’allonger et regarder par-dessus",
      resultat: "Tu regardes longtemps. Ce qui porte le monde a un œil, et il est fermé. Le Guide note : « ne pas réveiller »."
    },
    risque: {
      choix: "Descendre le long du bord",
      reussite: "Tu descends, {toi:accroché|accrochée} aux racines qui dépassent. Dans un creux sous le monde : {trouvaille}.",
      echec: "Les racines ne sont pas faites pour ça. Tu remontes à la force des bras, et un peu à la force de la peur."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} tends au-dessus du vide. Quelque chose d’immense, en dessous, renifle l’air, sourit peut-être, et souffle jusqu’à toi {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Ce qui porte le monde a gardé son œil fermé. Le long du bord, tu entends de l’eau.",
      reussite: "Tu remontes, {toi:chargé|chargée} de ta trouvaille. Le long du bord, tu entends de l’eau.",
      echec: "Tu reprends ton souffle au bord du monde. Pas loin, de l’eau tombe dans le vide.",
      objet: "Le souffle d’en dessous remonte encore jusqu’à toi. Le long du bord, de l’eau tombe dans le vide."
    },
    situation: "Au bord du monde, une cascade tombe dans le vide sans jamais toucher le fond. Assis sur la dernière pierre, un vieux pêcheur tend sa ligne dans les étoiles.",
    prudent: {
      choix: "T’asseoir à côté de lui, sans rien dire",
      resultat: "Vous regardez la ligne ensemble. Rien ne mord. C’est la plus belle heure de ton voyage, et le pêcheur a l’air d’accord."
    },
    risque: {
      choix: "Lui emprunter sa canne",
      reussite: "Ça mord tout de suite : une petite étoile filante, qui s’échappe, mais laisse à l’hameçon {trouvaille}.",
      echec: "Ça mord trop fort. Tu passes une heure {toi:suspendu|suspendue} au-dessus du vide, et le pêcheur ne t’aide qu’après avoir fini son sandwich."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu {objet:le|la} lui montres. Il {objet:le|la} reconnaît, rit, et sort de sa boîte à appâts {trouvaille}, qu’il gardait pour ce jour-là."
    }
  }

]);
