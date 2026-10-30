// Monde toxique : l’histoire d’expédition
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

histoire("toxique", "Le marcheur du lac jaune", [

  // scène 1
  {
    situation: "Un lac jaune, parfaitement immobile. Au bord, des traces de pas qui y entrent. Aucune qui en sort.",
    prudent: {
      choix: "Ne pas s’approcher",
      resultat: "Le Guide gagne une mise en garde très claire. Tu gagnes le droit de respirer encore."
    },
    risque: {
      choix: "Suivre les traces jusqu’au bord",
      reussite: "Au bord, sous une croûte de sel : {trouvaille}, {trouvaille:laissé|laissée} là par quelqu’un qui n’avait plus besoin de rien. Tu ne demandes pas.",
      echec: "La rive est molle. Ton pied y plonge, et l’acide ne plaisante pas."
    },
    objet: {
      serie: "epaves",
      resultat: "Tu en fais un filtre de fortune, pour l’air et pour l’acide. Tu marches dans le lac jusqu’à la taille : au fond, {trouvaille}."
    }
  },

  // scène 2
  {
    rappel: {
      prudent: "Tu n’as pas suivi les traces. D’autres, plus loin, mènent à une mare.",
      reussite: "Ce qu’a laissé le marcheur du lac est dans ta soute. Tu as l’impression qu’on te regarde.",
      echec: "Ton pied fume encore. Une mare, plus loin, fait des bulles comme on se moque.",
      objet: "Le lac a gardé la forme de tes pas. Ils mènent à une mare."
    },
    situation: "Des bulles remontent d’une mare et éclatent en formant des mots. Des vrais mots. Dans ta langue.",
    prudent: {
      choix: "Lire, ne pas répondre",
      resultat: "Les mots disent « encore », puis « merci », puis plus rien. Tu repars {toi:troublé et prudent|troublée et prudente}."
    },
    risque: {
      choix: "Répondre à voix haute",
      reussite: "Les bulles changent de rythme, et la mare recrache {trouvaille}, propre, comme une réponse. Le Guide refuse de commenter.",
      echec: "Les bulles éclatent toutes en même temps. Le nuage te prend. Tu tousses pendant des heures."
    },
    objet: {
      serie: "reliques",
      resultat: "Les bulles {objet:le|la} reconnaissent et s’excusent en vieille langue. La mare te rend {trouvaille}, « {trouvaille:emprunté|empruntée} »."
    }
  },

  // scène 3
  {
    rappel: {
      prudent: "Les bulles ont dit « merci ». Le ciel, lui, se couvre.",
      reussite: "La mare t’a répondu. Le ciel, vexé de ne pas avoir été consulté, se couvre.",
      echec: "Tu tousses encore. Le ciel tourne au vert, par solidarité.",
      objet: "Derrière toi, les bulles s’excusent encore. Le ciel se couvre."
    },
    situation: "Une pluie verte commence. Elle grésille sur le vaisseau, et le vaisseau n’aime pas ça.",
    prudent: {
      choix: "Rentrer et décoller",
      resultat: "Tu décolles sous la pluie. Le Guide note : « pluie corrosive, voir ailleurs ». La coque a des taches."
    },
    risque: {
      choix: "Attendre sous un surplomb",
      reussite: "La pluie révèle, en rongeant le sol, {trouvaille}, {trouvaille:enterré|enterrée} là depuis toujours. Tu {trouvaille:le|la} ramasses entre deux gouttes.",
      echec: "Le surplomb fond. Tout fond ici. Tu cours jusqu’au vaisseau, {toi:moins entier|moins entière} qu’à l’aller."
    },
    objet: {
      serie: "fossiles",
      resultat: "Tu l’exposes à la pluie verte : {objet:il|elle} l’absorbe. Tu te promènes sous l’averse et ramasses {trouvaille}."
    }
  }

]);
