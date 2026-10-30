// Monde tempéré : les scènes d’expédition
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

scenes("tempere", [

  // scène 1
  {
    situation: "Des prairies, un ruisseau, un ciel raisonnable. Le Guide s’en méfie par principe.",
    prudent: {
      choix: "Pique-niquer",
      resultat: "Le meilleur repas de ta carrière. Rien ne se passe. C’est presque inquiétant."
    },
    risque: {
      choix: "Suivre le ruisseau jusqu’à sa source",
      reussite: "La source sort d’une pierre taillée, et au pied de la pierre : {trouvaille}. Quelqu’un a vécu ici, et bien.",
      echec: "Le ruisseau devient rivière, la rivière devient torrent. Tu rentres trempé et un peu bête."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu le poses sur la pierre taillée. Le ruisseau change de voix. À tes pieds : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Un verger. Les fruits sont mûrs, nombreux, et aucun oiseau ne les touche.",
    prudent: {
      choix: "Ne pas y toucher non plus",
      resultat: "Tu as faim mais tu as lu des livres. Le Guide approuve ta culture générale."
    },
    risque: {
      choix: "Goûter",
      reussite: "Sucré, parfait, et une légère sensation de voir à travers le temps. Au pied de l’arbre, tu remarques enfin {trouvaille}. Il était là depuis le début.",
      echec: "Sucré, parfait, puis une sieste de dix heures dont tu ne gardes rien. Au réveil, une migraine et des fourmis."
    },
    objet: {
      serie: "reliques",
      resultat: "L’écriteau du verger s’adresse à lui, pas à toi : « servez-vous ». Dans le panier : {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Une maison. Une seule. Porte ouverte, table mise, personne. Le thé est encore chaud.",
    prudent: {
      choix: "Rester sur le seuil",
      resultat: "Tu attends une heure. Personne. Tu refermes la porte doucement. Le Guide note : « sortis acheter du lait »."
    },
    risque: {
      choix: "Entrer et s’asseoir",
      reussite: "Tu bois le thé. Sur la chaise d’en face, quelqu’un a laissé {trouvaille}, emballé, avec un mot : « pour qui viendra ».",
      echec: "Tu bois le thé. Il n’était pas pour toi. Tu dors deux jours et tu te réveilles dehors."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Il pointe un tiroir. Dedans : {trouvaille}, et un mot : « bien joué »."
    }
  }

]);
