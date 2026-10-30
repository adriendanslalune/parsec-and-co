// Géante gazeuse : l’histoire d’expédition
//
// Une expédition joue les 3 scènes de l’histoire, dans l’ordre. Chaque scène a :
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

histoire("gazeux", "La chose polie", [

  // scène 1
  {
    situation: "Tu tombes dans les nuages sans fin. Un éclair horizontal passe à côté de toi et continue sa route sur mille kilomètres.",
    prudent: {
      choix: "Rester haut, observer",
      resultat: "Tu comptes les éclairs. Le Guide note : « orage permanent, lumineux, pas cher ». Plus bas, quelque chose de grand bouge dans les nuages."
    },
    risque: {
      choix: "Plonger sous la couche",
      reussite: "Sous les nuages, une plateforme dérive, vide, ancienne. Dessus : {trouvaille}. Tu remontes avant que le vent ne la reprenne.",
      echec: "La pression te rappelle qu’elle existe. Le vaisseau grince, toi aussi."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il flotte tout seul|Elle flotte toute seule} ; tu t’y accroches et tu descends sans effort. Sur une plateforme perdue : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Ce que tu as vu bouger sous les éclairs remonte vers toi.",
      reussite: "La plateforme a disparu dans le vent. Ce qui l’habitait, non.",
      echec: "Le vaisseau grince encore. Dehors, quelque chose a l’air de trouver ça intéressant.",
      objet: "Tu flottes encore un peu, par habitude."
    },
    situation: "Quelque chose de vivant nage dans les nuages : grand, lent, translucide, et manifestement pas intéressé par toi.",
    prudent: {
      choix: "Le filmer de loin",
      resultat: "Il ondule, puis disparaît vers une tempête. Le Guide le baptise « la chose polie ». Tu as une vidéo floue et un souvenir net."
    },
    risque: {
      choix: "T’approcher",
      reussite: "Il te laisse venir, et quand tu es tout près, il lâche quelque chose qui tombe lentement : {trouvaille}. Un cadeau, ou un déchet. Le Guide hésite.",
      echec: "Il te frôle. Tu apprends que « translucide » ne veut pas dire « léger »."
    },
    objet: {
      serie: "fossiles",
      resultat: "La chose polie {objet:le|la} renifle, {objet:le|la} reconnaît, et dépose {trouvaille} à côté de toi, lentement."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Sur ta vidéo floue, la chose polie entre dans une tempête.",
      reussite: "Le cadeau de la chose polie est dans la soute. Elle, elle nage vers une tempête.",
      echec: "La chose polie s’est excusée, à sa façon : elle t’ouvre le chemin.",
      objet: "La chose polie nage devant toi, comme pour montrer la route."
    },
    situation: "Une tempête de la taille d’un continent se forme devant toi. Elle a un œil, et l’œil est calme.",
    prudent: {
      choix: "Contourner",
      resultat: "Trois heures de détour. Tu regardes l’œil de loin. Il te regarde aussi, probablement. Dedans, la chose polie tourne en rond, chez elle."
    },
    risque: {
      choix: "Traverser par l’œil",
      reussite: "Dans l’œil, le silence, et la chose polie qui dort. Dans un nuage de débris en orbite : {trouvaille} flotte à portée de bras.",
      echec: "La paroi de l’œil bouge plus vite que les cartes. Tu ressors {toi:secoué|secouée}, et pas du bon côté."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} vibre vers l’œil de la tempête, et t’y guide. Au centre, en apesanteur : {trouvaille}."
    }
  }

]);
