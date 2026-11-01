// Monde dessiné : la fiche du monde et son histoire d’expédition
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
  cle: "dessine",
  nom: "Monde dessiné",
  rarete: "legendaire",
  danger: [0, 2],
  couleurs: ["#f4e9cf", "#1b2451"],
  sol: "#efe6d2",
  guide: [
    "un monde pas encore colorié, où le paysage est au crayon et où l’on voit les traits de construction",
    "une planète en cours de dessin, dont l’auteur est parti chercher un café il y a quelques millions d’années",
    "des montagnes à l’encre, un ciel en hachures, et une gomme géante dont personne ne parle"
  ]
});

histoire("dessine", "L’auteur est parti chercher un café", [

  // scène 1
  {
    situation: "Tout est au trait : les montagnes, les arbres, le ciel en hachures, sur un fond couleur papier. Seul ton scaphandre est en couleur, et ça se voit beaucoup.",
    prudent: {
      choix: "Marcher en restant dans les traits",
      resultat: "Tu suis les lignes sans déborder, comme on t’a appris. Le Guide note : « monde à colorier, apporter ses crayons »."
    },
    risque: {
      choix: "Toucher un arbre",
      reussite: "Ton doigt laisse une trace de couleur, et l’arbre, ravi, devient vert. En remerciement, il laisse tomber {trouvaille}, encore un peu {trouvaille:crayonné|crayonnée}.",
      echec: "L’arbre n’était qu’un brouillon. Il s’efface sous ta main, et toi avec, un peu : tu passes une heure {toi:à moitié transparent|à moitié transparente}."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} est en couleur, comme toi : le paysage autour se met à rosir d’envie, et te cède {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Tu n’as pas débordé d’un trait. Plus loin, une partie du monde n’est pas encore dessinée.",
      reussite: "Derrière toi, l’arbre colorié fait des jaloux. Plus loin, le monde s’arrête au milieu d’un trait.",
      echec: "Tu retrouves peu à peu tes couleurs. Plus loin, le monde n’est pas fini.",
      objet: "Le paysage rosit encore derrière toi. Devant, le monde s’arrête au milieu d’un trait."
    },
    situation: "Ici, le dessin s’arrête au milieu d’une colline. Après, la page est blanche, avec seulement quelques traits légers au crayon, à peine posés, qui hésitent.",
    prudent: {
      choix: "Ne pas marcher sur le blanc",
      resultat: "Tu restes du côté dessiné. Le blanc a l’air très doux, et très définitif. Le Guide note : « fin provisoire du monde »."
    },
    risque: {
      choix: "Marcher sur les traits de construction",
      reussite: "Les traits tiennent, à peine. Au bout de l’un d’eux, {trouvaille:esquissé mais bien réel|esquissée mais bien réelle} : {trouvaille}.",
      echec: "Les traits ne tiennent pas. Tu passes à travers le blanc et tu te retrouves trois pages plus loin, dans un brouillon raté."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} poses sur le blanc : un trait se met à dessiner tout seul autour, et dessine, entre autres, {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Le blanc est resté blanc. Au milieu, une gomme géante repose sur la page.",
      reussite: "Les traits tiennent derrière toi, de justesse. Plus loin, sur le blanc, une gomme géante.",
      echec: "{toi:Revenu|Revenue} du brouillon raté, tu tombes nez à nez avec une gomme géante.",
      objet: "Le trait continue de dessiner derrière toi. Devant, une gomme géante est posée sur la page."
    },
    situation: "Sur la page blanche, une gomme grande comme une maison, usée sur un coin. À côté, un crayon taillé, et la trace ronde d’une tasse de café.",
    prudent: {
      choix: "Ne toucher à rien",
      resultat: "Tu laisses tout comme l’auteur l’a laissé. Il reviendra peut-être, après son café. Le Guide note : « ne pas déranger l’auteur »."
    },
    risque: {
      choix: "Prendre le crayon et dessiner quelque chose",
      reussite: "Tu dessines une petite fleur. Elle pousse aussitôt, en couleur, à sa place dans le monde. À côté d’elle, comme une signature : {trouvaille}.",
      echec: "Tu dessines mal. Ce que tu as dessiné se lève, te regarde, et te poursuit jusqu’au vaisseau en boitant."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu {objet:le|la} poses près de la tasse, comme une offrande à l’auteur. La gomme s’écarte d’elle-même et découvre {trouvaille}."
    }
  }

]);
