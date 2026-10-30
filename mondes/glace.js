// Monde glacé : l’histoire d’expédition
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

histoire("glace", "La lumière sous la banquise", [

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
    rappel: {
      prudent: "Sur ta photo de la forme, on devine des colonnes, plus loin.",
      reussite: "La coque est restée ouverte derrière toi. Le vent s’y engouffre et file vers des colonnes.",
      echec: "Tu claques encore des dents. Le vent, lui, joue une note.",
      objet: "La trappe de la coque s’est refermée toute seule, polie."
    },
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
    rappel: {
      prudent: "La note des colonnes te suit encore. Sous la glace, quelque chose l’a entendue.",
      reussite: "La colonne fendue sonne encore. Sous la banquise, une lumière s’est allumée.",
      echec: "Le sol a fini de trembler. Sous la banquise, une lumière cherche qui a fait ça.",
      objet: "La colonne libérée chante plus juste qu’avant. Sous la banquise, quelqu’un écoute."
    },
    situation: "Une lumière bleue bouge sous la banquise, lente, comme quelqu’un qui cherche ses clefs. Elle vient de la forme sombre.",
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
