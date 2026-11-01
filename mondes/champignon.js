// Monde champignon : la fiche du monde et son histoire d’expédition
//
// LA FICHE DU MONDE, monde({ … }) :
//   cle      : le nom court du type, sans accent ni espace : le même que celui du fichier et des images ;
//   nom      : le nom affiché ;
//   rarete   : commun, insolite, rare ou legendaire. Part des tirages : 70, 20, 8 et 2 %, partagée entre les mondes de même rareté ;
//   poids    : (facultatif) la part de ce monde dans sa rareté, 1 par défaut ;
//   danger   : de … à … (0 à 5) ; chaque point de danger, c’est 7 % de risque de rater un choix risqué (pas de trouvaille) ;
//   couleurs : les deux couleurs de la planète sur la vignette dessinée, puis sol : la couleur du sol ;
//   guide    : trois façons de décrire le monde dans le Guide (« Le Guide dit : Untel, c’est … »).
// Un monde n’apparaît dans la galaxie qu’une fois qu’il a au moins une image (voir illustrations/liste.js).
//
// L’HISTOIRE, histoire(cle, titre, [ 3 scènes ]) : une expédition joue les 3 scènes, dans l’ordre. Chaque scène a :
//   rappel    : (scènes 2 et 3) la phrase qui ouvre la scène, selon ce qui s’est passé juste avant :
//               prudent, reussite (risque réussi), echec (risque raté, sans trouvaille) ou objet ;
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

monde({
  cle: "champignon",
  nom: "Monde champignon",
  rarete: "rare",
  danger: [1, 3],
  couleurs: ["#d98fa0", "#5a2e4a"],
  sol: "#b89ab0",
  guide: [
    "une forêt de champignons hauts comme des immeubles, qui s’allument quand la nuit tombe",
    "un monde où tout pousse dans le noir sans demander l’avis du soleil",
    "des chapeaux géants, des spores qui chantent, et une odeur de sous-bois qui ne s’en va jamais"
  ]
});

histoire("champignon", "La forêt qui pense", [

  // scène 1
  {
    situation: "Une forêt de champignons géants, aux chapeaux grands comme des places publiques. Quand tu passes, leurs lamelles s’allument une à une, comme on se passe une nouvelle.",
    prudent: {
      choix: "Marcher sous les chapeaux, sans rien toucher",
      resultat: "La lumière te suit, pied après pied, jusqu’à une clairière. Le Guide note : « curieux, lumineux, pas encore vexés »."
    },
    risque: {
      choix: "Grimper sur un chapeau",
      reussite: "Le chapeau est souple comme un matelas. Au milieu, dans un creux de mousse : {trouvaille}. Tu rebondis un peu avant de redescendre. Personne ne te juge.",
      echec: "Le chapeau était souple, puis il ne l’était plus. Tu traverses trois étages de champignons et tu atterris dans un quatrième, mou mais rancunier."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu {objet:le|la} poses au pied du plus vieux champignon. Il s’allume tout entier, comme on reconnaît un ami, et laisse tomber {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "La lumière des champignons t’a {toi:mené|menée} jusqu’à une clairière.",
      reussite: "Tu as encore de la mousse sur les genoux. Une clairière s’ouvre devant toi.",
      echec: "Le quatrième champignon t’a {toi:recraché|recrachée} dans une clairière, vexé.",
      objet: "Le vieux champignon brille encore derrière toi. Devant, une clairière."
    },
    situation: "Au milieu de la clairière, un nuage de spores dorées flotte et fredonne. Une mélodie simple, en boucle, comme quelqu’un qui cherche la suite.",
    prudent: {
      choix: "Retenir ta respiration et contourner",
      resultat: "Tu contournes, les joues gonflées. Les spores fredonnent plus doucement, un peu déçues. Tu respires enfin, plus loin."
    },
    risque: {
      choix: "Fredonner la suite",
      reussite: "Les spores s’arrêtent, ravies, et reprennent avec ta suite. Le nuage s’écarte et dépose à tes pieds {trouvaille}.",
      echec: "Tu respires en fredonnant, et les spores entrent. Pendant une heure, tu vois des couleurs qui n’ont pas de nom, et certaines te parlent."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} vibre à la bonne fréquence : les spores se rangent autour comme autour d’un chef d’orchestre, et te confient {trouvaille}."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Les spores fredonnent derrière toi. Sous tes pieds, le sol est chaud, et tout blanc.",
      reussite: "Ta mélodie tourne encore dans la clairière. Le sol, sous tes pieds, frémit comme s’il l’écoutait.",
      echec: "Les couleurs sans nom s’éteignent peu à peu. Le sol, lui, est tout blanc, et il bouge.",
      objet: "Les spores gardent ta mesure derrière toi. Sous tes pieds, quelque chose écoute."
    },
    situation: "Sous la forêt, le sol est un réseau de fils blancs, fins comme des cheveux, qui relient tous les champignons entre eux. Ça pulse doucement, comme une pensée très lente.",
    prudent: {
      choix: "Ne pas déranger la pensée",
      resultat: "Tu marches sur la pointe des pieds jusqu’au vaisseau. La forêt a pensé à toi, quelque part, pendant une seconde. Le Guide note : « un seul habitant, très grand »."
    },
    risque: {
      choix: "Poser la main sur le réseau",
      reussite: "Une pensée immense, lente et bienveillante te traverse. Elle te demande ton nom, oublie la réponse, et t’offre {trouvaille}, {trouvaille:remonté|remontée} des profondeurs.",
      echec: "Une pensée immense te traverse et ne trouve pas la sortie. Tu passes la nuit à croire que tu es un champignon."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu {objet:le|la} branches sur un gros fil blanc, comme dans une prise. La forêt grésille, reçoit, comprend, et te répond avec {trouvaille}."
    }
  }

]);
