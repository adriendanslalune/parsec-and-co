// Monde rocheux : la fiche du monde et son histoire d’expédition
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
  cle: "rocheux",
  nom: "Monde rocheux",
  rarete: "commun",
  poids: 22,
  danger: [1, 3],
  couleurs: ["#8d7b6e", "#4a3f3a"],
  sol: "#c9b6a4",
  guide: [
    "des cailloux, puis d’autres cailloux, puis une vallée, remplie de cailloux",
    "une surface grise qui a décidé très tôt de ne pas faire d’efforts",
    "un relief si monotone que les géologues y pleurent d’ennui, puis de joie, puis d’ennui"
  ]
});

histoire("rocheux", "La faille qui brille", [

  // scène 1
  {
    situation: "Une faille coupe la plaine en deux. Au fond, quelque chose renvoie la lumière de ta lampe, et ce n’est pas de la roche.",
    prudent: {
      choix: "Noter la position et contourner",
      resultat: "Tu notes. Le Guide gagne une ligne, toi une heure de marche. La faille garde son secret, et brille dans ton dos."
    },
    risque: {
      choix: "Descendre en rappel",
      reussite: "Trente mètres plus bas, {trouvaille:coincé|coincée} entre deux blocs : {trouvaille}. Tu remontes avec, et avec un sourire idiot.",
      echec: "Le rocher où tu as ancré la corde a d’autres projets. Tu descends plus vite que prévu."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu en tires de quoi bricoler un treuil. Trente mètres plus bas, sans risque : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "La faille brille encore derrière toi, et sa lueur file vers un col.",
      reussite: "Tu as encore de la poussière de faille plein les genoux.",
      echec: "Ta cheville se souvient de la faille. Toi aussi.",
      objet: "Ton treuil de fortune grince encore dans ton sac."
    },
    situation: "Un vent sec pousse des galets qui roulent tous dans la même direction, vers un col. Tu n’as jamais vu des cailloux avoir une destination.",
    prudent: {
      choix: "Suivre les galets de loin",
      resultat: "Ils se rassemblent en un tas au col, devant l’entrée d’une grotte. Un tas, c’est tout. Mais tu as marché avec eux, et c’était bien."
    },
    risque: {
      choix: "Grimper au col avant eux",
      reussite: "Au col, le vent t’offre une vue sur trois vallées et, {trouvaille:calé|calée} dans une fissure, {trouvaille}.",
      echec: "Un galet plus gros que les autres te prend la cheville en passant. Il avait l’air pressé."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu {objet:le|la} poses au sol : les galets s’arrêtent net, comme gênés. L’un d’eux n’est pas un galet : {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Les galets se sont arrêtés ici, et toi avec eux.",
      reussite: "Du col, tu as vu les trois vallées. Elles mènent toutes ici.",
      echec: "Le galet pressé est là, devant l’entrée. Il fait semblant de ne pas te connaître.",
      objet: "Derrière toi, les galets se sont remis à rouler, vexés."
    },
    situation: "Une grotte respire. Vraiment : un souffle tiède qui entre et qui sort, toutes les dix secondes. Au fond, la même lueur que dans la faille.",
    prudent: {
      choix: "Rester à l’entrée et écouter",
      resultat: "Le souffle est régulier, rassurant, comme un animal qui dort. Tu comprends que c’est la planète entière qui dort, et tu repars sur la pointe des pieds."
    },
    risque: {
      choix: "Entrer entre deux souffles",
      reussite: "La grotte est un ancien conduit, lisse, et au bout, {trouvaille:posé|posée} là : {trouvaille}. Le souffle s’arrête une seconde quand tu {trouvaille:le|la} prends, puis reprend, plus léger.",
      echec: "Tu entres au mauvais moment. Le souffle te recrache. Tu atterris mal."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} présentes à l’entrée. Le souffle s’arrête, poli. Au fond : {trouvaille}, et un peu de honte."
    }
  }

]);
