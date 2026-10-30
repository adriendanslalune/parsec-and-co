// Monde jungle : l’histoire d’expédition
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

histoire("jungle", "Les jardiniers", [

  // scène 1
  {
    situation: "Les arbres font cent mètres. Et au-dessus, d’autres arbres, qui poussent sur les premiers.",
    prudent: {
      choix: "Rester au sol",
      resultat: "Il fait sombre, humide, et tout bouge. Tu notes trois espèces, tu en oublies deux, tu avances."
    },
    risque: {
      choix: "Grimper jusqu’à la seconde forêt",
      reussite: "Là-haut, la lumière, et dans un nid immense : {trouvaille}, {trouvaille:couvé|couvée} depuis des années par rien du tout.",
      echec: "Une branche que tu croyais branche était un bras. Tu redescends sans l’aide de l’échelle."
    },
    objet: {
      serie: "fossiles",
      resultat: "Les arbres {objet:le|la} sentent et s’écartent d’un pas. À mi-hauteur, dans un creux : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Tu as gardé les pieds sur terre. Ici, la terre a des fleurs.",
      reussite: "Du haut de la seconde forêt, tu as vu une fleur énorme. Elle aussi t’a {toi:vu|vue}.",
      echec: "Le bras t’a laissé tomber devant une fleur. Il avait sûrement ses raisons.",
      objet: "Les arbres s’écartent encore sur ton passage, jusqu’à une fleur."
    },
    situation: "Une fleur grande comme une voiture s’ouvre à ton approche. Elle sent la cannelle et la mauvaise foi.",
    prudent: {
      choix: "Reculer lentement",
      resultat: "Elle se referme, déçue. Le Guide note : « carnivore probable, parfum excellent »."
    },
    risque: {
      choix: "Regarder dedans",
      reussite: "Au fond du calice, dans un peu de sève : {trouvaille}, {trouvaille:digéré|digérée} à moitié mais récupérable. Tu te laves longtemps.",
      echec: "Elle se referme. Sur toi. Tu sors par le haut, {toi:poisseux et plus léger|poisseuse et plus légère} de quelques affaires."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu {objet:le|la} jettes dans la fleur. Elle {objet:le|la} goûte, frémit, s’ouvre tout grand : {trouvaille}, au fond."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "La fleur boude. Derrière elle, un sentier.",
      reussite: "Tu sens encore la sève. Derrière la fleur, un sentier tout propre.",
      echec: "Tu as perdu quelques affaires dans la fleur. Quelqu’un les a rangées au bord d’un sentier.",
      objet: "La fleur digère encore ton offrande. Derrière elle, un sentier."
    },
    situation: "Un sentier. Entretenu. Avec des bornes. Personne en vue, mais quelqu’un passe le balai ici.",
    prudent: {
      choix: "Suivre le sentier jusqu’au premier virage",
      resultat: "Le virage mène à un autre virage. Tu renonces avec dignité. Le Guide note : « jardiniers inconnus »."
    },
    risque: {
      choix: "Quitter le sentier",
      reussite: "Hors du chemin, {trouvaille:caché|cachée} exprès : {trouvaille}, sous une pierre qui n’a rien à faire là. Les jardiniers rangent mal.",
      echec: "Hors du chemin, la jungle est la jungle. Tu reviens au sentier avec des bouts en moins."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} glisses dans une borne : elle s’ouvre comme une vieille boîte à outils. Dedans : {trouvaille}, et un balai."
    }
  }

]);
