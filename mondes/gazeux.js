// Géante gazeuse : les scènes d’expédition
//
// Une expédition tire 2 ou 3 scènes de ce fichier. Chaque scène a :
//   situation : ce que l’explorateur découvre en arrivant ;
//   prudent   : le choix sans risque (le bouton, puis ce qui se passe) ;
//   risque    : le choix risqué (le bouton, ce qui se passe si ça marche, ce qui se passe si on se blesse) ;
//   objet     : la série d’objet qui fait basculer la scène (epaves, fossiles, reliques ou bizarreries),
//               et ce qui se passe quand on sort cet objet de la soute.
// {trouvaille} est remplacé par l’objet trouvé, en gras.
//
// Pour modifier : ne touche qu’au texte entre les guillemets droits "…". Garde les virgules et les accolades.
// Pour ajouter une scène : copie un bloc { … } entier, à la fin de la liste, sans oublier la virgule entre deux blocs.
// Ne change pas l’ordre des scènes existantes et n’en supprime pas : une expédition en cours retient leurs numéros.

scenes("gazeux", [

  // scène 1
  {
    situation: "Tu tombes dans les nuages sans fin. Un éclair horizontal passe à côté de toi et continue sa route sur mille kilomètres.",
    prudent: {
      choix: "Rester haut, observer",
      resultat: "Tu comptes les éclairs. Le Guide note : « orage permanent, lumineux, pas cher ». Tu n’as rien ramené que la vue."
    },
    risque: {
      choix: "Plonger sous la couche",
      reussite: "Sous les nuages, une plateforme dérive, vide, ancienne. Dessus : {trouvaille}. Tu remontes avant que le vent ne la reprenne.",
      echec: "La pression te rappelle qu’elle existe. Le vaisseau grince, toi aussi."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Il flotte tout seul ; tu t’y accroches et tu descends sans effort. Sur une plateforme perdue : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Quelque chose de vivant nage dans les nuages : grand, lent, translucide, et manifestement pas intéressé par toi.",
    prudent: {
      choix: "Le filmer de loin",
      resultat: "Il ondule, il disparaît. Le Guide le baptise « la chose polie ». Tu as une vidéo floue et un souvenir net."
    },
    risque: {
      choix: "T’approcher",
      reussite: "Il te laisse venir, et quand tu es tout près, il lâche quelque chose qui tombe lentement : {trouvaille}. Un cadeau, ou un déchet. Le Guide hésite.",
      echec: "Il te frôle. Tu apprends que « translucide » ne veut pas dire « léger »."
    },
    objet: {
      serie: "fossiles",
      resultat: "La chose polie le renifle, le reconnaît, et dépose {trouvaille} à côté de toi, lentement."
    }
  },

  // scène 3
  {
    situation: "Une tempête de la taille d’un continent se forme devant toi. Elle a un œil, et l’œil est calme.",
    prudent: {
      choix: "Contourner",
      resultat: "Trois heures de détour. Tu regardes l’œil de loin. Il te regarde aussi, probablement."
    },
    risque: {
      choix: "Traverser par l’œil",
      reussite: "Dans l’œil, le silence. Et un nuage de débris en orbite : {trouvaille} flotte à portée de bras.",
      echec: "La paroi de l’œil bouge plus vite que les cartes. Tu ressors secoué, et pas du bon côté."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Il vibre vers l’œil de la tempête, et t’y guide. Au centre, en apesanteur : {trouvaille}."
    }
  }

]);
