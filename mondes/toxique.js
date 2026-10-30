// Monde toxique : les scènes d’expédition
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

scenes("toxique", [

  // scène 1
  {
    situation: "Un lac jaune, parfaitement immobile. Au bord, des traces de pas qui y entrent. Aucune qui en sort.",
    prudent: {
      choix: "Ne pas s’approcher",
      resultat: "Le Guide gagne une mise en garde très claire. Tu gagnes le droit de respirer encore."
    },
    risque: {
      choix: "Suivre les traces jusqu’au bord",
      reussite: "Au bord, sous une croûte de sel : {trouvaille}, laissé là par quelqu’un qui n’avait plus besoin de rien. Tu ne demandes pas.",
      echec: "La rive est molle. Ton pied y plonge, et l’acide ne plaisante pas."
    },
    objet: {
      serie: "epaves",
      resultat: "Il filtre l’air et l’acide. Tu marches dans le lac jusqu’à la taille : au fond, {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Des bulles remontent d’une mare et éclatent en formant des mots. Des vrais mots. Dans ta langue.",
    prudent: {
      choix: "Lire, ne pas répondre",
      resultat: "Les mots disent « encore », puis « merci », puis plus rien. Tu repars troublé et prudent."
    },
    risque: {
      choix: "Répondre à voix haute",
      reussite: "Les bulles changent de rythme, et la mare recrache {trouvaille}, propre, comme une réponse. Le Guide refuse de commenter.",
      echec: "Les bulles éclatent toutes en même temps. Le nuage te prend. Tu tousses pendant des heures."
    },
    objet: {
      serie: "reliques",
      resultat: "Les bulles le reconnaissent et s’excusent en vieille langue. La mare te rend {trouvaille}, « emprunté »."
    }
  },

  // scène 3
  {
    situation: "Une pluie verte commence. Elle grésille sur le vaisseau, et le vaisseau n’aime pas ça.",
    prudent: {
      choix: "Rentrer et décoller",
      resultat: "Tu décolles sous la pluie. Le Guide note : « pluie corrosive, voir ailleurs ». La coque a des taches."
    },
    risque: {
      choix: "Attendre sous un surplomb",
      reussite: "La pluie révèle, en rongeant le sol, {trouvaille}, enterré là depuis toujours. Tu le ramasses entre deux gouttes.",
      echec: "Le surplomb fond. Tout fond ici. Tu cours jusqu’au vaisseau, moins entier qu’à l’aller."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu l’exposes à la pluie verte : il l’absorbe. Tu te promènes sous l’averse et ramasses {trouvaille}."
    }
  }

]);
