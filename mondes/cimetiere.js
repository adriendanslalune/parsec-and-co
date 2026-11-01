// Cimetière de vaisseaux : la fiche du monde et son histoire d’expédition
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
  cle: "cimetiere",
  nom: "Cimetière de vaisseaux",
  rarete: "rare",
  danger: [2, 4],
  couleurs: ["#a7a39a", "#3d4048"],
  sol: "#9a9488",
  guide: [
    "le monde où les vaisseaux viennent finir leur carrière, rangés par ordre d’arrivée",
    "des épaves de toutes les époques, de la fusée à charbon au croiseur qui s’excuse en douze langues",
    "un silence de métal, des carcasses sous le vent, et un gardien qui n’a pas reçu d’ordre depuis trois mille ans"
  ]
});

histoire("cimetiere", "La place libre", [

  // scène 1
  {
    situation: "Des épaves à perte de vue, alignées en rangs bien droits, de la plus vieille fusée au croiseur le plus récent. Le vent siffle dans les tuyères, et chacune siffle une note différente.",
    prudent: {
      choix: "Longer les rangées",
      resultat: "Tu lis les numéros peints sur les coques. Ils se suivent sans un trou, sur des kilomètres. Le Guide note : « bien tenu, mais par qui ? »."
    },
    risque: {
      choix: "Fouiller une épave",
      reussite: "Dans un cockpit qui sent encore le café froid : {trouvaille}, {trouvaille:bien rangé|bien rangée} dans la boîte à gants.",
      echec: "Le plancher de l’épave avait pris sa retraite avant elle. Tu passes au travers, puis à travers la soute, puis à travers ce qui restait."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} glisses dans une console éteinte : elle se rallume juste le temps d’ouvrir un casier et de te tendre {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Les numéros mènent jusqu’à une cabane de tôle, au bout d’une rangée.",
      reussite: "Tu sens encore le café froid. Au bout de la rangée, une cabane de tôle a sa lumière allumée.",
      echec: "En te relevant des débris, tu vois quelqu’un qui te regarde, depuis une cabane de tôle.",
      objet: "La console s’est rendormie. Au bout de la rangée, une cabane de tôle s’allume."
    },
    situation: "Dans une cabane de tôle, un robot gardien astique un registre. Il te demande ton numéro d’immatriculation, ta date d’arrivée, et si tu viens pour rester.",
    prudent: {
      choix: "Expliquer que tu ne fais que passer",
      resultat: "Il note « de passage », souligne deux fois, et te laisse repartir avec une poignée de main en métal. Le Guide note : « personnel aimable, procédure longue »."
    },
    risque: {
      choix: "Jeter un œil au registre",
      reussite: "Le registre remonte à la nuit des temps. Entre deux pages, {trouvaille:oublié|oubliée} depuis des siècles : {trouvaille}. Le robot te le donne, « pour les archives ».",
      echec: "Le robot n’aime pas qu’on lise par-dessus son épaule. Il t’inscrit d’office comme épave et tente de te ranger, rangée 4 012."
    },
    objet: {
      serie: "reliques",
      resultat: "Il {objet:le|la} reconnaît : une vieille pièce de la Compagnie. Il se met au garde-à-vous, et te remet {trouvaille} avec les honneurs."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Le gardien te fait un signe de la main. Au fond du cimetière, une rangée est vide.",
      reussite: "Le gardien t’a laissé fouiller ses archives. En échange, il te montre une rangée vide, au fond.",
      echec: "Tu t’es {toi:échappé|échappée} de la rangée 4 012. Juste à côté, il y a une rangée vide.",
      objet: "Le gardien te salue encore. Il t’indique une rangée vide, au fond."
    },
    situation: "Au bout du cimetière, une seule place libre, avec une plaque déjà gravée. En regardant mieux, tu reconnais sur la plaque la silhouette de ton propre vaisseau.",
    prudent: {
      choix: "Partir sans lire la plaque",
      resultat: "Tu remontes dans ton vaisseau, qui démarre au premier coup, pour une fois. Il n’a pas envie de rester. Toi non plus."
    },
    risque: {
      choix: "Lire la plaque",
      reussite: "La plaque dit « pas encore ». Juste dessous, quelqu’un a laissé {trouvaille}, comme on laisse des fleurs.",
      echec: "La plaque dit « bientôt ». Tu recules, tu trébuches sur un rail, et ton vaisseau, vexé, met une heure à te pardonner."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu {objet:le|la} poses sur la plaque : les lettres s’effacent d’elles-mêmes, et la place libre te rend {trouvaille}."
    }
  }

]);
