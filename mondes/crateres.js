// Monde criblé : la fiche du monde et son histoire d’expédition
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
  cle: "crateres",
  nom: "Monde criblé",
  rarete: "commun",
  poids: 10,
  danger: [1, 2],
  couleurs: ["#a9a3a0", "#3e3b3a"],
  sol: "#bdb7b2",
  guide: [
    "des cratères dans des cratères, comme si quelqu’un avait raté le même coup de poing pendant un milliard d’années",
    "une surface morte, calme, et parfaitement reposante pour qui ne tient pas à la vie",
    "le genre d’endroit où on retrouve ses clefs tout de suite, parce qu’il n’y a rien d’autre"
  ]
});

histoire("crateres", "Celui qui saute", [

  // scène 1
  {
    situation: "Un cratère parfait, trop parfait. Au centre, un point noir. Tu te dis que c’est un rocher. Il n’a pas l’ombre d’un rocher.",
    prudent: {
      choix: "Faire le tour du bord",
      resultat: "Tu fais le tour. Le point noir reste au centre, quel que soit l’angle. Le Guide note : « non »."
    },
    risque: {
      choix: "Marcher jusqu’au centre",
      reussite: "Le point noir est un trou, et dans le trou, {trouvaille:posé|posée} sur une marche : {trouvaille}. Quelqu’un voulait qu’on {trouvaille:le|la} trouve.",
      echec: "Le trou est plus proche que prévu. Et plus profond."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} tiens au-dessus du trou : ça vibre, ça grince, ça indique. À vingt mètres, sous la poussière : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Le point noir est resté au centre. Sur le bord, une empreinte.",
      reussite: "Quelqu’un voulait qu’on trouve ce qu’il y avait dans le trou. Ce quelqu’un a de grands pieds.",
      echec: "En sortant du trou, tu tombes nez à nez avec une empreinte.",
      objet: "Le trou s’est refermé. À côté, une empreinte."
    },
    situation: "La poussière garde une seule empreinte, énorme, à trois orteils. Une seule. Comme si quelque chose avait sauté.",
    prudent: {
      choix: "Mesurer l’empreinte",
      resultat: "Deux mètres. Le Guide propose plusieurs explications, toutes désagréables. Tu repars sans vérifier."
    },
    risque: {
      choix: "Chercher l’atterrissage",
      reussite: "Trois kilomètres plus loin, une seconde empreinte, et dedans : {trouvaille}, {trouvaille:écrasé mais entier|écrasée mais entière}. Tu ne cherches pas la troisième.",
      echec: "Tu la trouves. Elle est fraîche."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} poses dans l’empreinte. Elle se referme doucement sur {objet:lui|elle}, et te laisse {trouvaille} en échange."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Tu n’as pas vérifié. Les empreintes, elles, mènent à un vieux module.",
      reussite: "Tu n’as pas cherché la troisième empreinte. Elle est devant un vieux module.",
      echec: "L’empreinte fraîche avait un propriétaire. Il a garé son module ici.",
      objet: "L’empreinte refermée pointait vers un vieux module."
    },
    situation: "Un vieux module repose sur le flanc, à moitié enterré. Son antenne tourne encore, très lentement.",
    prudent: {
      choix: "Lire la plaque",
      resultat: "Une langue inconnue, un chiffre immense. Le Guide traduit : « ici, un jour ». Tu notes, tu salues, tu repars."
    },
    risque: {
      choix: "Ouvrir la trappe",
      reussite: "Dedans, tout est mort, sauf une boîte, qui s’ouvre : {trouvaille}. L’antenne s’arrête. Il attendait ça.",
      echec: "La trappe cède d’un coup. Toi aussi, sous elle."
    },
    objet: {
      serie: "reliques",
      resultat: "La trappe porte un sceau de la même main. Elle s’ouvre : {trouvaille}, et l’antenne s’arrête."
    }
  }

]);
