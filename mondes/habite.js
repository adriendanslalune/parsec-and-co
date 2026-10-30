// Monde habité : l’histoire d’expédition
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

histoire("habite", "La statue", [

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
      resultat: "Tu {objet:le|la} poses sur le plateau. Silence, puis applaudissements : la bonne réponse. On te donne {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Les habitants ont fini par rentrer dîner. Le lendemain, c’est jour de marché.",
      reussite: "Tu as mangé le plat violet. Au marché, tout le monde le sait déjà.",
      echec: "L’incident diplomatique a fait le tour de la ville. Au marché, on te regarde de travers.",
      objet: "Ta bonne réponse a fait le tour de la ville. Au marché, on te salue."
    },
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
    rappel: {
      prudent: "Tu n’as rien acheté au marché. Au bout de la place, une statue a l’air de le savoir.",
      reussite: "Le marchand raconte votre affaire à tout le monde. Au bout de la place, une statue écoute.",
      echec: "Le décollage peut attendre : au bout de la place, une statue te ressemble.",
      objet: "Ton accolade avec le marchand a été vue de loin. Par une statue."
    },
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
      resultat: "La statue tient {objet:le même|la même} dans sa main de pierre. Elle s’ouvre : {trouvaille}, qui t’attendait."
    }
  }

]);
