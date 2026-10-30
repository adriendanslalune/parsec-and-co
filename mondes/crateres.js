// Monde criblé : les scènes d’expédition
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

scenes("crateres", [

  // scène 1
  {
    situation: "Un cratère parfait, trop parfait. Au centre, un point noir. Tu te dis que c’est un rocher. Il n’a pas l’ombre d’un rocher.",
    prudent: {
      choix: "Faire le tour du bord",
      resultat: "Tu fais le tour. Le point noir reste au centre, quel que soit l’angle. Le Guide note : « non »."
    },
    risque: {
      choix: "Marcher jusqu’au centre",
      reussite: "Le point noir est un trou, et dans le trou, posé sur une marche : {trouvaille}. Quelqu’un voulait qu’on le trouve.",
      echec: "Le trou est plus proche que prévu. Et plus profond."
    },
    objet: {
      serie: "epaves",
      resultat: "Il bipe vers le centre, mais s’arrête à vingt mètres : {trouvaille} est juste là, sous la poussière."
    }
  },

  // scène 2
  {
    situation: "La poussière garde une seule empreinte, énorme, à trois orteils. Une seule. Comme si quelque chose avait sauté.",
    prudent: {
      choix: "Mesurer l’empreinte",
      resultat: "Deux mètres. Le Guide propose plusieurs explications, toutes désagréables. Tu repars sans vérifier."
    },
    risque: {
      choix: "Chercher l’atterrissage",
      reussite: "Trois kilomètres plus loin, une seconde empreinte, et dedans : {trouvaille}, écrasé mais entier. Tu ne cherches pas la troisième.",
      echec: "Tu la trouves. Elle est fraîche."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu le poses dans l’empreinte. Elle se referme doucement sur lui, et te laisse {trouvaille} en échange."
    }
  },

  // scène 3
  {
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
