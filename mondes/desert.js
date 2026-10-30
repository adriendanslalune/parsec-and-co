// Monde désertique : l’histoire d’expédition
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

histoire("desert", "La route sous le sable", [

  // scène 1
  {
    situation: "Une ligne droite traverse les dunes sur des kilomètres. Trop droite pour être naturelle, trop longue pour être utile.",
    prudent: {
      choix: "La longer un moment",
      resultat: "Elle ne mène nulle part de visible. Le Guide note : « quelqu’un avait un plan ». Au bout, très loin, un arbre seul."
    },
    risque: {
      choix: "Creuser au milieu",
      reussite: "À un mètre, du métal. À deux, {trouvaille}. La ligne était une route, et tu viens d’en voler un morceau.",
      echec: "Le sable glisse dans le trou plus vite que tu ne creuses. Tu t’en sors {toi:couvert et vexé|couverte et vexée}."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} poses sur le sable : ça résonne, il y a du métal dessous. Tu creuses au bon endroit, une fois : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Tu as suivi la ligne, sagement. Elle mène à l’arbre.",
      reussite: "Tu as un morceau de route dans la soute. La route, elle, continue jusqu’à un arbre.",
      echec: "Tu as encore du sable dans des endroits que le Guide ne nomme pas.",
      objet: "Sous tes pieds, la route résonne encore."
    },
    situation: "Au bout de la ligne, un mirage ne disparaît pas quand tu t’approches. C’est une oasis, avec de l’eau noire et un seul arbre.",
    prudent: {
      choix: "Remplir une gourde et repartir",
      resultat: "L’eau est froide, bonne, et un peu trop calme. Tu n’as pas attendu de voir si l’arbre bougeait."
    },
    risque: {
      choix: "Passer la nuit sous l’arbre",
      reussite: "À l’aube, l’arbre a laissé tomber {trouvaille} à côté de toi. Ou tu l’as rêvé. {trouvaille:Il|Elle} est dans la soute, donc non.",
      echec: "Tu te réveilles à cent mètres de l’oasis, sans savoir comment. Quelque chose a préféré que tu dormes ailleurs."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} trempes dans l’eau noire. Elle frémit, et recrache {trouvaille} à minuit pile."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "L’eau noire clapote dans ta gourde. Plus loin, la route reprend, et le sable chante.",
      reussite: "L’arbre t’a fait un cadeau. Le sable, autour, a l’air jaloux : il chante pour qu’on le remarque.",
      echec: "Tu ne sais toujours pas qui t’a {toi:porté|portée} pendant la nuit. Le sable, lui, a l’air au courant.",
      objet: "L’eau noire a gardé ta trace. La route reprend derrière l’oasis."
    },
    situation: "La route s’enfonce sous une dune. Le sable chante quand tu marches dessus, une note différente à chaque pas. Tu te surprends à composer.",
    prudent: {
      choix: "Enregistrer la mélodie",
      resultat: "Le Guide a maintenant une bande-son. Elle est bizarre. Tu l’écoutes trois fois, et la route reste sous la dune."
    },
    risque: {
      choix: "Jouer la mélodie à l’envers",
      reussite: "Le sable s’affaisse sur dix mètres et découvre une dalle. Sous la dalle : {trouvaille}. La musique était un mot de passe, et la route, une porte.",
      echec: "Le sable n’aime pas ta version. Il te le fait savoir en se dérobant sous tes pieds."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} reprend la mélodie du sable, à l’envers. La dune s’ouvre sur {trouvaille}."
    }
  }

]);
