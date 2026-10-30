// Monde glacé : les scènes d’expédition
//
// Une expédition tire 2 ou 3 scènes de ce fichier. Chaque scène a :
//   situation : ce que l’explorateur découvre en arrivant ;
//   prudent   : le choix sans risque (le bouton, puis ce qui se passe) ;
//   risque    : le choix risqué (le bouton, ce qui se passe si ça marche, ce qui se passe si on se blesse) ;
//   objet     : la série d’objet qui fait basculer la scène (epaves, fossiles, reliques ou bizarreries),
//               et ce qui se passe quand on sort cet objet de la soute.
// {trouvaille} est remplacé par l’objet trouvé, en gras (un objet de palier 1 : un boulon d’épave, une écaille fossile…).
//
// Les accords : écris les deux formes entre accolades, la masculine puis la féminine, avec à qui elles s’accordent.
//   {toi:trempé|trempée}        s’accorde avec l’explorateur ou l’exploratrice ;
//   {objet:le|la}               avec l’objet sorti de la soute (dans « objet : resultat ») ;
//   {trouvaille:coincé|coincée} avec l’objet trouvé.
// Sans accolades, la phrase ne change pas : c’est très bien quand elle n’a rien à accorder.
//
// Pour modifier : ne touche qu’au texte entre les guillemets droits "…". Garde les virgules et les accolades.
// Pour ajouter une scène : copie un bloc { … } entier, à la fin de la liste, sans oublier la virgule entre deux blocs.
// Ne change pas l’ordre des scènes existantes et n’en supprime pas : une expédition en cours retient leurs numéros.

scenes("glace", [

  // scène 1
  {
    situation: "Sous la glace, à trois mètres, une forme sombre, grande comme une maison. Elle n’a pas bougé depuis que tu regardes. Tu regardes depuis longtemps.",
    prudent: {
      choix: "Mesurer, photographier, partir",
      resultat: "Le Guide gagne un croquis. La forme gagne {toi:un visiteur|une visiteuse}. Vous êtes quittes."
    },
    risque: {
      choix: "Creuser jusqu’à elle",
      reussite: "La glace cède sur une coque. Dans une ouverture : {trouvaille}, {trouvaille:gelé, intact|gelée, intacte}, et presque tiède.",
      echec: "La glace cède, mais sous toi. L’eau est à moins deux. Tu ressors en claquant des dents et des mots."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} branches sur la coque enfouie ; une trappe s’ouvre d’elle-même : {trouvaille}, tiède."
    }
  },

  // scène 2
  {
    situation: "Des colonnes de glace, des centaines, alignées. Le vent y souffle une note grave qui te fait vibrer les dents.",
    prudent: {
      choix: "Traverser en silence",
      resultat: "La note t’accompagne jusqu’au bout. De l’autre côté, le silence est si soudain qu’il fait mal."
    },
    risque: {
      choix: "Frapper une colonne",
      reussite: "Elle sonne, les autres répondent, et l’une d’elles se fend : {trouvaille} tombe à tes pieds, {trouvaille:enfermé|enfermée} depuis des âges.",
      echec: "Elle sonne, les autres répondent, et le sol aussi. Tu cours. Tu ne cours pas assez vite."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} frappes doucement contre une colonne. Elle répond, se fend, et libère {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Une lumière bleue bouge sous la banquise, lente, comme quelqu’un qui cherche ses clefs.",
    prudent: {
      choix: "La suivre à distance",
      resultat: "Elle tourne en rond, puis s’éteint. Tu notes : « cherche encore ». Tu rentres avec les mains froides et vides."
    },
    risque: {
      choix: "Percer un trou au-dessus d’elle",
      reussite: "La lumière monte vers le trou, curieuse, et dépose {trouvaille} sur la glace avant de replonger. Un échange, sans mot.",
      echec: "La lumière monte trop vite. La glace éclate autour du trou, et toi avec elle, un peu."
    },
    objet: {
      serie: "bizarreries",
      resultat: "La lumière bleue {objet:le|la} voit, approche, hésite, laisse {trouvaille} sur la glace, repart."
    }
  }

]);
