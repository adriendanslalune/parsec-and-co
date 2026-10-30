// Monde volcanique : les scènes d’expédition
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

scenes("volcan", [

  // scène 1
  {
    situation: "Un lac de lave respire à cent mètres. Sur une île au milieu, quelque chose brille qui n’est pas de la lave.",
    prudent: {
      choix: "Observer depuis la rive",
      resultat: "Tu attends qu’une bulle éclate. Elle éclate. Le Guide note : « joli, mortel, pas de parking »."
    },
    risque: {
      choix: "Sauter d’îlot en îlot",
      reussite: "Tu arrives sur l’île, tu attrapes {trouvaille}, tu reviens, et tu ne regardes tes semelles que plus tard. Elles ont fondu.",
      echec: "Le troisième îlot n’était pas un îlot. Tu te sauves par miracle, et pas entier."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu t’en sers d’écran : la chaleur glisse dessus. Tu traverses jusqu’à l’île : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Une cheminée éteinte, large comme un puits. Une corde y pend, très vieille, attachée à rien de visible.",
    prudent: {
      choix: "Tirer sur la corde",
      resultat: "Elle remonte, dix mètres, puis se détache. Au bout, un nœud marin. Quelqu’un est descendu un jour. Tu n’es pas quelqu’un."
    },
    risque: {
      choix: "Descendre dans la cheminée",
      reussite: "À mi-hauteur, une niche creusée à la main : {trouvaille}, et une inscription qui dit « enfin ». Tu remontes avant de comprendre.",
      echec: "La cheminée n’était pas si éteinte. Tu remontes rapidement, avec une odeur de poil roussi."
    },
    objet: {
      serie: "reliques",
      resultat: "Dans la niche, un socle à sa forme exacte. Tu le poses : la paroi s’ouvre sur {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Le sol est tiède, et il bat. Un battement lent, profond, qu’on sent dans les genoux.",
    prudent: {
      choix: "Repartir vers le vaisseau",
      resultat: "Tu marches sans courir. Le battement te suit jusqu’à la porte. Puis s’arrête. Puis tu décolles."
    },
    risque: {
      choix: "Poser l’oreille au sol",
      reussite: "Tu entends un rythme, puis un autre dessous, puis tu sens sous ta main {trouvaille}, chaud, remonté par une fissure. Le monde te l’a donné.",
      echec: "Le sol bat plus fort, et s’ouvre. Pas beaucoup. Assez."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Il bat au même rythme que le sol. La fissure s’ouvre juste assez : {trouvaille}, chaud."
    }
  }

]);
