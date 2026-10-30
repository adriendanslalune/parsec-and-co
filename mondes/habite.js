// Monde habité : les scènes d’expédition
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

scenes("habite", [

  // scène 1
  {
    situation: "Ils sont là, tous, sur la place, à te regarder descendre. Personne ne parle. L’un d’eux tient un plateau.",
    prudent: {
      choix: "Saluer de loin et attendre",
      resultat: "Ils attendent aussi. Une heure. Puis l’un d’eux hausse ce qui lui sert d’épaules et rentre dîner. Le Guide note : « patients »."
    },
    risque: {
      choix: "Accepter ce qu’il y a sur le plateau",
      reussite: "C’est violet, c’est vivant, c’est bon. On t’applaudit, et on te remet {trouvaille} « pour la route », avec un petit discours.",
      echec: "C’était pour quelqu’un d’autre. L’incident diplomatique dure trois heures et te coûte une dent."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu le poses sur le plateau. Silence, puis applaudissements : la bonne réponse. On te donne {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Un marché. Des étals, des cris, des odeurs. On te vend tout et on ne veut rien de tes mégacrédits, qui n’existent pas ici de toute façon.",
    prudent: {
      choix: "Regarder sans acheter",
      resultat: "Tu regardes. On te regarde regarder. Tout le monde est content. Le Guide note : « économie à base de regards »."
    },
    risque: {
      choix: "Troquer un objet de ton vaisseau",
      reussite: "Un boulon contre {trouvaille}. Le marchand est ravi, toi aussi, et quelqu’un, quelque part, vient de faire une très mauvaise affaire.",
      echec: "Tu troques une pièce dont tu avais besoin. Le retour au vaisseau est long et le décollage, inquiet."
    },
    objet: {
      serie: "epaves",
      resultat: "Le marchand en veut, très fort. Contre {trouvaille}, et une accolade qui dure."
    }
  },

  // scène 3
  {
    situation: "Une statue te représente. Toi. En plus grand, et avec une expression de certitude que tu n’as jamais eue.",
    prudent: {
      choix: "Ne rien dire",
      resultat: "Tu passes devant comme si de rien n’était. Les habitants t’observent, puis la statue. Le Guide note : « prophétie, ou blague »."
    },
    risque: {
      choix: "Demander qui l’a sculptée",
      reussite: "On te conduit à l’atelier d’un sculpteur mort il y a trois siècles. Sur son établi, {trouvaille}, et ton nom gravé dessous.",
      echec: "On se vexe que tu ne saches pas. On te fait comprendre, fermement, la sortie."
    },
    objet: {
      serie: "reliques",
      resultat: "La statue tient le même dans sa main de pierre. Elle s’ouvre : {trouvaille}, qui t’attendait."
    }
  }

]);
