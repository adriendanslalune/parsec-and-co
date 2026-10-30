// Monde océan : les scènes d’expédition
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

scenes("ocean", [

  // scène 1
  {
    situation: "La mer est plate, immense, et sous ta coque passe une ombre plus longue que ton vaisseau n’est long.",
    prudent: {
      choix: "Rester en surface",
      resultat: "L’ombre passe deux fois, puis s’en va. Le Guide note : « habité, sous l’eau, à ne pas déranger »."
    },
    risque: {
      choix: "Plonger derrière elle",
      reussite: "L’ombre te mène à une fosse, et dans la fosse, coincé dans le corail : {trouvaille}. Elle t’attendait là, ou attendait quelqu’un.",
      echec: "L’ombre se retourne. Elle a une bouche. Tu remontes vite, pas assez."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Il brille sous l’eau. L’ombre le suit comme un chien, et te mène à {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Une île flotte. Pas posée : flottante, et elle dérive vers toi.",
    prudent: {
      choix: "La laisser passer",
      resultat: "Elle passe, lente, couverte d’herbes. Quelque chose y chante. Tu notes la chanson."
    },
    risque: {
      choix: "Y débarquer",
      reussite: "L’île est un animal, très vieux, très doux, et sur son dos : {trouvaille}, enfoncé dans la mousse. Tu le prends ; il soupire.",
      echec: "L’île plonge quand tu poses le pied. Tu nages. Longtemps."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu le déposes sur le dos de l’île. Elle soupire, s’arrête, et te laisse prendre {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Le plancton s’allume à la nuit tombée et dessine des lettres. Elles forment un mot. Tu le lis. Tu préfères ne pas l’avoir lu.",
    prudent: {
      choix: "Éteindre les lumières et attendre l’aube",
      resultat: "Au matin, plus rien. Le mot est dans ta tête, et dans le Guide, en tout petit."
    },
    risque: {
      choix: "Écrire une réponse à la rame",
      reussite: "Le plancton répond à son tour, et la mer te rend {trouvaille}, poussé par un courant poli.",
      echec: "Le plancton n’aime pas ta réponse. L’eau devient très froide, très vite."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu le tiens au-dessus de l’eau : le plancton change de phrase, rit, et te lance {trouvaille}."
    }
  }

]);
