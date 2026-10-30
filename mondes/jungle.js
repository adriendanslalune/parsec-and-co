// Monde jungle : les scènes d’expédition
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

scenes("jungle", [

  // scène 1
  {
    situation: "Les arbres font cent mètres. Et au-dessus, d’autres arbres, qui poussent sur les premiers.",
    prudent: {
      choix: "Rester au sol",
      resultat: "Il fait sombre, humide, et tout bouge. Tu notes trois espèces, tu en oublies deux, tu repars."
    },
    risque: {
      choix: "Grimper jusqu’à la seconde forêt",
      reussite: "Là-haut, la lumière, et dans un nid immense : {trouvaille}, couvé depuis des années par rien du tout.",
      echec: "Une branche que tu croyais branche était un bras. Tu redescends sans l’aide de l’échelle."
    },
    objet: {
      serie: "fossiles",
      resultat: "Les arbres le sentent et s’écartent d’un pas. À mi-hauteur, dans un creux : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Une fleur grande comme une voiture s’ouvre à ton approche. Elle sent la cannelle et la mauvaise foi.",
    prudent: {
      choix: "Reculer lentement",
      resultat: "Elle se referme, déçue. Le Guide note : « carnivore probable, parfum excellent »."
    },
    risque: {
      choix: "Regarder dedans",
      reussite: "Au fond du calice, dans un peu de sève : {trouvaille}, digéré à moitié mais récupérable. Tu te laves longtemps.",
      echec: "Elle se referme. Sur toi. Tu sors par le haut, poisseux et plus léger de quelques affaires."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu le jettes dans la fleur. Elle le goûte, frémit, s’ouvre tout grand : {trouvaille}, au fond."
    }
  },

  // scène 3
  {
    situation: "Un sentier. Entretenu. Avec des bornes. Personne en vue, mais quelqu’un passe le balai ici.",
    prudent: {
      choix: "Suivre le sentier jusqu’au premier virage",
      resultat: "Le virage mène à un autre virage. Tu renonces avec dignité. Le Guide note : « jardiniers inconnus »."
    },
    risque: {
      choix: "Quitter le sentier",
      reussite: "Hors du chemin, caché exprès : {trouvaille}, sous une pierre qui n’a rien à faire là. Les jardiniers rangent mal.",
      echec: "Hors du chemin, la jungle est la jungle. Tu reviens au sentier avec des bouts en moins."
    },
    objet: {
      serie: "epaves",
      resultat: "Il bipe sous une borne enterrée. Tu la déterres : {trouvaille}, et une borne, aussi."
    }
  }

]);
