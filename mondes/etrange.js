// Monde étrange : la fiche du monde et son histoire d’expédition
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
  cle: "etrange",
  nom: "Monde étrange",
  rarete: "commun",
  poids: 2,
  danger: [2, 4],
  couleurs: ["#d7a8f0", "#4a2a7a"],
  sol: "#d8b9ee",
  guide: [
    "des montagnes de cristal qui chantent quand on passe, faux, mais avec conviction",
    "la gravité y change d’avis deux fois par jour, et les habitants, s’il y en a, ne s’en formalisent plus",
    "un monde dont les anneaux projettent une ombre qui met trois heures à arriver au sol et repart vexée"
  ]
});

histoire("etrange", "Le monde qui hésite", [

  // scène 1
  {
    situation: "La gravité change toutes les heures. En ce moment, elle tire vers la gauche.",
    prudent: {
      choix: "Attendre la prochaine bascule {toi:couché|couchée}",
      resultat: "La gravité revient au sol. Tu te relèves. Le Guide note : « prévoir des sangles ». Tu n’as rien trouvé sauf un torticolis."
    },
    risque: {
      choix: "Marcher sur le mur tant que ça dure",
      reussite: "Sur le mur, qui était un sol, dans une fissure qui était une tranchée : {trouvaille}. La bascule revient. Tu redescends en volant, mal.",
      echec: "La bascule arrive en avance. Tu tombes sur le plafond, puis sur le sol, puis sur le mur."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} flotte, insensible aux caprices de la gravité. Tu t’y accroches et tu attrapes {trouvaille} au passage."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "La gravité s’est remise à l’endroit, à peu près. Au loin, des cristaux chantent.",
      reussite: "Tu as marché sur un mur. Les cristaux, plus loin, en parlent déjà.",
      echec: "Tu as visité le plafond, le sol et le mur. Plus loin, des cristaux applaudissent.",
      objet: "La gravité a l’air vexée qu’on l’ait ignorée. Des cristaux s’en moquent en chantant."
    },
    situation: "Des cristaux chantent quand tu passes. Faux. Mais ils chantent ta chanson préférée, celle que tu n’as dite à personne.",
    prudent: {
      choix: "Passer vite",
      resultat: "Ils finissent le refrain dans ton dos. Tu ne te retournes pas. Le Guide note : « indiscrets »."
    },
    risque: {
      choix: "Chanter avec eux",
      reussite: "Ils se taisent, surpris, puis l’un d’eux s’ouvre sur {trouvaille}. Un cadeau pour le duo.",
      echec: "Ils chantent plus fort. Beaucoup plus fort. Tu rentres avec un acouphène et aucun trésor."
    },
    objet: {
      serie: "reliques",
      resultat: "Les cristaux lisent ce qui est gravé dessus et se taisent, impressionnés. L’un d’eux s’ouvre : {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Les cristaux finissent ta chanson dans ton dos. Devant toi, une plaque de verre.",
      reussite: "Ton duo avec les cristaux résonne encore. Dans une plaque de verre, ton reflet chante en retard.",
      echec: "Tu n’entends plus très bien. Ton reflet, dans une plaque de verre, a l’air d’entendre pour toi.",
      objet: "Les cristaux se taisent encore, impressionnés. Ton reflet aussi, avec trois secondes de retard."
    },
    situation: "Ton reflet dans une plaque de verre a trois secondes de retard. Il te regarde partir avant que tu ne partes.",
    prudent: {
      choix: "Partir sans regarder le reflet",
      resultat: "Le reflet te regarde partir. Tu le sens. Le Guide note : « miroir en retard, à ne pas offenser »."
    },
    risque: {
      choix: "Attendre que le reflet fasse autre chose",
      reussite: "Il fait autre chose : il se baisse et ramasse {trouvaille}. Tu te baisses, tu ramasses. {trouvaille:Il|Elle} y était.",
      echec: "Il fait autre chose : il te montre le plafond. Tu lèves les yeux. Le plafond tombe."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Ton reflet {objet:le|la} voit avant toi, et te montre où chercher. Dans la plaque : {trouvaille}."
    }
  }

]);
