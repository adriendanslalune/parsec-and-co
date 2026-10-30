// Monde océan : l’histoire d’expédition
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

histoire("ocean", "Ce qui nage dessous", [

  // scène 1
  {
    situation: "La mer est plate, immense, et sous ta coque passe une ombre plus longue que ton vaisseau n’est long.",
    prudent: {
      choix: "Rester en surface",
      resultat: "L’ombre passe deux fois, puis s’en va. Le Guide note : « habité, sous l’eau, à ne pas déranger »."
    },
    risque: {
      choix: "Plonger derrière elle",
      reussite: "L’ombre te mène à une fosse, et dans la fosse, {trouvaille:coincé|coincée} dans le corail : {trouvaille}. Elle t’attendait là, ou attendait quelqu’un.",
      echec: "L’ombre se retourne. Elle a une bouche. Tu remontes vite, pas assez."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} brille sous l’eau. L’ombre {objet:le|la} suit comme un chien, et te mène à {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "L’ombre est partie. Ce qui dérive vers toi lui ressemble, en plus calme.",
      reussite: "L’ombre t’a montré sa fosse. Maintenant, elle t’envoie quelqu’un.",
      echec: "L’ombre avait une bouche. Ce qui arrive maintenant en a une aussi, mais elle sourit.",
      objet: "L’ombre te suit encore, docile, et pousse quelque chose vers toi."
    },
    situation: "Une île flotte. Pas posée : flottante, et elle dérive vers toi.",
    prudent: {
      choix: "La laisser passer",
      resultat: "Elle passe, lente, couverte d’herbes. Quelque chose y chante. Tu notes la chanson."
    },
    risque: {
      choix: "Y débarquer",
      reussite: "L’île est un animal, très vieux, très doux, et sur son dos : {trouvaille}, {trouvaille:enfoncé|enfoncée} dans la mousse. Tu {trouvaille:le|la} prends ; il soupire.",
      echec: "L’île plonge quand tu poses le pied. Tu nages. Longtemps."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} déposes sur le dos de l’île. Elle soupire, s’arrête, et te laisse prendre {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "L’île est passée en chantant. À la nuit, le plancton reprend sa chanson.",
      reussite: "L’île a soupiré. À la nuit tombée, le plancton répète le soupir.",
      echec: "Tu as nagé longtemps. À la nuit, le plancton s’allume autour de toi.",
      objet: "L’île s’est arrêtée pour toi. La nuit tombe dessus."
    },
    situation: "Le plancton s’allume à la nuit tombée et dessine des lettres. Elles forment un mot. Tu le lis. Tu préfères ne pas l’avoir lu.",
    prudent: {
      choix: "Éteindre les lumières et attendre l’aube",
      resultat: "Au matin, plus rien. Le mot est dans ta tête, et dans le Guide, en tout petit."
    },
    risque: {
      choix: "Écrire une réponse à la rame",
      reussite: "Le plancton répond à son tour, et la mer te rend {trouvaille}, {trouvaille:poussé|poussée} par un courant poli.",
      echec: "Le plancton n’aime pas ta réponse. L’eau devient très froide, très vite."
    },
    objet: {
      serie: "reliques",
      resultat: "Tu {objet:le|la} tiens au-dessus de l’eau : le plancton change de phrase, rit, et te lance {trouvaille}."
    }
  }

]);
