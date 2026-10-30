// Monde désertique : les scènes d’expédition
//
// Une expédition tire 2 ou 3 scènes de ce fichier. Chaque scène a :
//   situation : ce que l’explorateur découvre en arrivant ;
//   prudent   : le choix sans risque (le bouton, puis ce qui se passe) ;
//   risque    : le choix risqué (le bouton, ce qui se passe si ça marche, ce qui se passe si on se blesse) ;
//   objet     : la série d’objet qui fait basculer la scène (epaves, fossiles, reliques ou bizarreries),
//               et ce qui se passe quand on sort cet objet de la soute.
// {trouvaille} est remplacé par l’objet trouvé, en gras (un objet de palier 1 : un boulon d’épave, une écaille fossile…).
//
// Les accords : écris les deux formes entre accolades, la masculine puis la féminine, avec à qui elles s’accordent.
//   {toi:trempé|trempée}        s’accorde avec l’explorateur ou l’exploratrice ;
//   {objet:le|la}               avec l’objet sorti de la soute (dans « objet : resultat ») ;
//   {trouvaille:coincé|coincée} avec l’objet trouvé.
// Sans accolades, la phrase ne change pas : c’est très bien quand elle n’a rien à accorder.
//
// Pour modifier : ne touche qu’au texte entre les guillemets droits "…". Garde les virgules et les accolades.
// Pour ajouter une scène : copie un bloc { … } entier, à la fin de la liste, sans oublier la virgule entre deux blocs.
// Ne change pas l’ordre des scènes existantes et n’en supprime pas : une expédition en cours retient leurs numéros.

scenes("desert", [

  // scène 1
  {
    situation: "Une ligne droite traverse les dunes sur des kilomètres. Trop droite pour être naturelle, trop longue pour être utile.",
    prudent: {
      choix: "La longer un moment",
      resultat: "Elle ne mène nulle part de visible. Le Guide note : « quelqu’un avait un plan ». Tu rentres avant la nuit."
    },
    risque: {
      choix: "Creuser au milieu",
      reussite: "À un mètre, du métal. À deux, {trouvaille}. La ligne était une route, et tu viens d’en voler un morceau.",
      echec: "Le sable glisse dans le trou plus vite que tu ne creuses. Tu t’en sors {toi:couvert et vexé|couverte et vexée}."
    },
    objet: {
      serie: "epaves",
      resultat: "{objet:Il|Elle} bipe sur la ligne. Tu creuses au bon endroit, une fois : {trouvaille}."
    }
  },

  // scène 2
  {
    situation: "Un mirage ne disparaît pas quand tu t’approches. C’est une oasis, avec de l’eau noire et un seul arbre.",
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
    situation: "Le sable chante quand tu marches dessus, une note différente à chaque pas. Tu te surprends à composer.",
    prudent: {
      choix: "Enregistrer la mélodie",
      resultat: "Le Guide a maintenant une bande-son. Elle est bizarre. Tu l’écoutes trois fois."
    },
    risque: {
      choix: "Jouer la mélodie à l’envers",
      reussite: "Le sable s’affaisse sur dix mètres et découvre une dalle. Sous la dalle : {trouvaille}. La musique, c’était un mot de passe.",
      echec: "Le sable n’aime pas ta version. Il te le fait savoir en se dérobant sous tes pieds."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} reprend la mélodie du sable, à l’envers. La dune s’ouvre sur {trouvaille}."
    }
  }

]);
