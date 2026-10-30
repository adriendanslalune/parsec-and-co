// Monde volcanique : l’histoire d’expédition
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

histoire("volcan", "Enfin", [

  // scène 1
  {
    situation: "Un lac de lave respire à cent mètres. Sur une île au milieu, quelque chose brille qui n’est pas de la lave.",
    prudent: {
      choix: "Observer depuis la rive",
      resultat: "Tu attends qu’une bulle éclate. Elle éclate. Le Guide note : « joli, mortel, pas de parking ». Derrière le lac, une cheminée éteinte."
    },
    risque: {
      choix: "Sauter d’îlot en îlot",
      reussite: "Tu arrives sur l’île, tu attrapes {trouvaille}, tu reviens, et tu ne regardes tes semelles que plus tard. Elles ont fondu.",
      echec: "Le troisième îlot n’était pas un îlot. Tu te sauves par miracle, et {toi:pas entier|pas entière}."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu t’en sers d’écran : la chaleur glisse dessus. Tu traverses jusqu’à l’île : {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Tu as regardé le lac de loin. La cheminée, elle, te regarde de près.",
      reussite: "Tu marches désormais en chaussettes, vers une cheminée.",
      echec: "Tu sens encore le roussi. La cheminée, devant toi, aussi.",
      objet: "Ton écran fume encore un peu."
    },
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
      resultat: "Dans la niche, un socle à sa forme exacte. Tu {objet:le|la} poses : la paroi s’ouvre sur {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Le nœud marin est dans ta poche. Sous tes pieds, le sol s’est mis à battre.",
      reussite: "« Enfin », disait l’inscription. Sous tes pieds, quelque chose est d’accord.",
      echec: "Tu sens le poil roussi, et le sol bat comme s’il riait.",
      objet: "La paroi s’est refermée derrière toi. Le sol, lui, s’est mis à battre."
    },
    situation: "Le sol est tiède, et il bat. Un battement lent, profond, qu’on sent dans les genoux.",
    prudent: {
      choix: "Repartir vers le vaisseau",
      resultat: "Tu marches sans courir. Le battement te suit jusqu’à la porte. Puis s’arrête. Puis tu décolles."
    },
    risque: {
      choix: "Poser l’oreille au sol",
      reussite: "Tu entends un rythme, puis un autre dessous, puis tu sens sous ta main {trouvaille}, {trouvaille:chaud, remonté|chaude, remontée} par une fissure. Le monde te l’a {trouvaille:donné|donnée}.",
      echec: "Le sol bat plus fort, et s’ouvre. Pas beaucoup. Assez."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} bat au même rythme que le sol. La fissure s’ouvre juste assez : {trouvaille}, {trouvaille:chaud|chaude}."
    }
  }

]);
