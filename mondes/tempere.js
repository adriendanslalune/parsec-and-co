// Monde tempéré : la fiche du monde et son histoire d’expédition
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
  cle: "tempere",
  nom: "Monde tempéré",
  rarete: "commun",
  poids: 2,
  danger: [0, 1],
  couleurs: ["#9fd6a8", "#3b6fb0"],
  sol: "#b6dcb0",
  guide: [
    "des prairies, des rivières, un climat raisonnable : la Compagnie y voit déjà des impôts",
    "un monde si agréable qu’on se demande ce qu’il cache, et la réponse est : rien, c’est pire",
    "des saisons, des oiseaux, et une lumière du soir qui ferait pleurer un expert-comptable"
  ]
});

histoire("tempere", "Le thé encore chaud", [

  // scène 1
  {
    situation: "Des prairies, un ruisseau, un ciel raisonnable. Le Guide s’en méfie par principe.",
    prudent: {
      choix: "Pique-niquer",
      resultat: "Le meilleur repas de ta carrière. Rien ne se passe. C’est presque inquiétant."
    },
    risque: {
      choix: "Suivre le ruisseau jusqu’à sa source",
      reussite: "La source sort d’une pierre taillée, et au pied de la pierre : {trouvaille}. Quelqu’un a vécu ici, et bien.",
      echec: "Le ruisseau devient rivière, la rivière devient torrent. Tu rentres {toi:trempé|trempée} et un peu bête."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu {objet:le|la} poses sur la pierre taillée. Le ruisseau change de voix. À tes pieds : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Le pique-nique fini, tu remarques au bout de la prairie un verger.",
      reussite: "La pierre taillée le prouve : quelqu’un vit ici. Son verger aussi.",
      echec: "Tu sèches au soleil, au bord d’un verger.",
      objet: "Le ruisseau chante encore avec sa nouvelle voix, jusqu’à un verger."
    },
    situation: "Un verger. Les fruits sont mûrs, nombreux, et aucun oiseau ne les touche.",
    prudent: {
      choix: "Ne pas y toucher non plus",
      resultat: "Tu as faim mais tu as lu des livres. Le Guide approuve ta culture générale."
    },
    risque: {
      choix: "Goûter",
      reussite: "Sucré, parfait, et une légère sensation de voir à travers le temps. Au pied de l’arbre, tu remarques enfin {trouvaille}. {trouvaille:Il|Elle} était là depuis le début.",
      echec: "Sucré, parfait, puis une sieste de dix heures dont tu ne gardes rien. Au réveil, une migraine et des fourmis."
    },
    objet: {
      serie: "reliques",
      resultat: "L’écriteau du verger s’adresse à {objet:lui|elle}, pas à toi : « servez-vous ». Dans le panier : {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Tu n’as pas touché aux fruits. Au bout du verger, une maison.",
      reussite: "Le fruit te fait encore voir à travers le temps. Ce que tu vois, c’est une maison.",
      echec: "Tu te réveilles de ta sieste devant une maison. Elle n’était pas là avant.",
      objet: "Le panier du verger était à quelqu’un. Sa maison est juste là."
    },
    situation: "Une maison. Une seule. Porte ouverte, table mise, personne. Le thé est encore chaud.",
    prudent: {
      choix: "Rester sur le seuil",
      resultat: "Tu attends une heure. Personne. Tu refermes la porte doucement. Le Guide note : « sortis acheter du lait »."
    },
    risque: {
      choix: "Entrer et s’asseoir",
      reussite: "Tu bois le thé. Sur la chaise d’en face, quelqu’un a laissé {trouvaille}, {trouvaille:emballé|emballée}, avec un mot : « pour qui viendra ».",
      echec: "Tu bois le thé. Il n’était pas pour toi. Tu dors deux jours et tu te réveilles dehors."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} pointe un tiroir. Dedans : {trouvaille}, et un mot : « bien joué »."
    }
  }

]);
