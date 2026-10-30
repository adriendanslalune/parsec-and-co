// Monde rocheux : les scènes d’expédition
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

scenes("rocheux", [

  // scène 1
  {
    situation: "Une faille coupe la plaine en deux. Au fond, quelque chose renvoie la lumière de ta lampe, et ce n’est pas de la roche.",
    prudent: {
      choix: "Noter la position et contourner",
      resultat: "Tu notes. Le Guide gagne une ligne, toi une heure de marche. La faille garde son secret."
    },
    risque: {
      choix: "Descendre en rappel",
      reussite: "Trente mètres plus bas, coincé entre deux blocs : {trouvaille}. Tu remontes avec, et avec un sourire idiot.",
      echec: "Le rocher où tu as ancré la corde a d’autres projets. Tu descends plus vite que prévu."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu bricoles un treuil avec. Trente mètres plus bas, sans risque : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Un vent sec pousse des galets qui roulent tous dans la même direction, vers un col. Tu n’as jamais vu des cailloux avoir une destination.",
    prudent: {
      choix: "Suivre les galets de loin",
      resultat: "Ils se rassemblent en un tas au col. Un tas, c’est tout. Mais tu as marché avec eux, et c’était bien."
    },
    risque: {
      choix: "Grimper au col avant eux",
      reussite: "Au col, le vent t’offre une vue sur trois vallées et, calé dans une fissure, {trouvaille}.",
      echec: "Un galet plus gros que les autres te prend la cheville en passant. Il avait l’air pressé."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Tu le poses au sol : les galets s’arrêtent net, comme gênés. L’un d’eux n’est pas un galet : {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Une grotte respire. Vraiment : un souffle tiède qui entre et qui sort, toutes les dix secondes.",
    prudent: {
      choix: "Rester à l’entrée et écouter",
      resultat: "Le souffle est régulier, rassurant, comme un animal qui dort. Tu repars sur la pointe des pieds."
    },
    risque: {
      choix: "Entrer entre deux souffles",
      reussite: "La grotte est un ancien conduit, lisse, et au bout, posé là : {trouvaille}. Le souffle s’arrête une seconde quand tu le prends.",
      echec: "Tu entres au mauvais moment. Le souffle te recrache. Tu atterris mal."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu le présentes à l’entrée. Le souffle s’arrête, poli. Au fond : {trouvaille}, et un peu de honte."
    }
  }

]);
