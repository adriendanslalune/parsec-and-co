// Monde en chantier : la fiche du monde et son histoire d’expédition
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
  cle: "chantier",
  nom: "Monde en chantier",
  rarete: "insolite",
  danger: [1, 3],
  couleurs: ["#e8b04a", "#5a5a5a"],
  sol: "#c8b08a",
  guide: [
    "une planète pas finie, avec des échafaudages jusqu’à l’horizon et un panneau « excusez la gêne »",
    "un monde livré en kit, dont il manque la notice et au moins trois montagnes",
    "un chantier si ancien que les ouvriers ont fondé une civilisation pendant la pause déjeuner"
  ]
});

histoire("chantier", "Excusez la gêne", [

  // scène 1
  {
    situation: "Le sol s’arrête net au pied d’une palissade. Derrière, rien n’est encore construit : des piquets, des cordeaux tendus, et un panneau « Montagne ici, livraison l’an prochain ».",
    prudent: {
      choix: "Suivre les panneaux de déviation",
      resultat: "Ils te font faire un grand détour par des collines provisoires, très bien balisées. Le Guide note : « travaux en cours depuis la création »."
    },
    risque: {
      choix: "Passer sous la palissade",
      reussite: "Derrière, dans un tas de matériaux en attente, rangé avec les montagnes : {trouvaille}.",
      echec: "Derrière la palissade, le sol n’a pas encore été posé. Tu tombes jusqu’au niveau en dessous, qui est le sous-sol, qui est aussi en travaux."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} tends à une grue en panne : elle redémarre, soulève une dalle, et dessous il y a {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "La déviation passe devant une cabane de chantier.",
      reussite: "Tu ressors des matériaux sans te faire voir. Enfin, presque : une cabane de chantier a sa porte ouverte.",
      echec: "En remontant du sous-sol, tu tombes sur une cabane de chantier.",
      objet: "La grue se remet au travail derrière toi, ravie. Une cabane de chantier est juste à côté."
    },
    situation: "Dans une cabane de chantier, une équipe d’ouvriers à six bras prend sa pause. Elle dure depuis plusieurs siècles. La cafetière, elle, n’a jamais refroidi.",
    prudent: {
      choix: "Ne pas déranger la pause",
      resultat: "Tu repars sur la pointe des pieds. Personne ne lève la tête. Ici, la pause est sacrée : elle est inscrite dans la constitution."
    },
    risque: {
      choix: "Demander quand ce sera fini",
      reussite: "Ils éclatent de rire, longtemps, avec leurs six bras. Pour te remercier de la blague, le chef d’équipe te donne {trouvaille}.",
      echec: "Personne ne pose cette question ici. Tu es {toi:reconduit|reconduite} à la sortie par trois ouvriers et dix-huit bras."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu {objet:le|la} poses sur la table : c’est exactement la pièce qui manquait au plan. On t’offre un café et {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "La pause continue derrière toi. Au bout du chantier, une seule maison est finie.",
      reussite: "Tu ris encore de ta blague. Au bout du chantier, une maison est finie, une seule.",
      echec: "On t’a {toi:raccompagné|raccompagnée} jusqu’au bout du chantier, devant la seule maison finie.",
      objet: "Ta pièce a fait avancer le plan d’un millimètre. Au bout du chantier, la seule maison finie t’attend."
    },
    situation: "Au bout du chantier, une seule maison est terminée : petite, parfaite, avec des rideaux. Sur la porte, une pancarte : « maison témoin, ne pas habiter ».",
    prudent: {
      choix: "Regarder par la fenêtre",
      resultat: "Dedans, tout est neuf, même la poussière. Le Guide note : « quand le monde sera fini, il ressemblera à ça ». Tu trouves ça un peu triste."
    },
    risque: {
      choix: "Entrer quand même",
      reussite: "Tu t’assois dans le fauteuil témoin, qui n’a jamais servi. Sous le coussin, {trouvaille:oublié|oubliée} par les livreurs : {trouvaille}.",
      echec: "La maison témoin n’a pas d’intérieur, seulement une façade. Tu tombes derrière, dans un trou de fondation."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu {objet:le|la} poses sur le seuil : la maison s’agrandit d’une pièce, juste le temps de te montrer {trouvaille}, puis se rétrécit, gênée."
    }
  }

]);
