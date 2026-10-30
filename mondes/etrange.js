// Monde étrange : les scènes d’expédition
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

scenes("etrange", [

  // scène 1
  {
    situation: "La gravité change toutes les heures. En ce moment, elle tire vers la gauche.",
    prudent: {
      choix: "Attendre la prochaine bascule {toi:couché|couchée}",
      resultat: "La gravité revient au sol. Tu te relèves. Le Guide note : « prévoir des sangles ». Tu n’as rien trouvé sauf un torticolis."
    },
    risque: {
      choix: "Marcher sur le mur tant que ça dure",
      reussite: "Sur le mur, qui était un sol, dans une fissure qui était une tranchée : {trouvaille}. La bascule revient. Tu redescends en volant, mal.",
      echec: "La bascule arrive en avance. Tu tombes sur le plafond, puis sur le sol, puis sur le mur."
    },
    objet: {
      serie: "bizarreries",
      resultat: "{objet:Il|Elle} flotte, insensible aux caprices de la gravité. Tu t’y accroches et tu attrapes {trouvaille} au passage."
    }
  },

  // scène 2
  {
    situation: "Des cristaux chantent quand tu passes. Faux. Mais ils chantent ta chanson préférée, celle que tu n’as dite à personne.",
    prudent: {
      choix: "Passer vite",
      resultat: "Ils finissent le refrain dans ton dos. Tu ne te retournes pas. Le Guide note : « indiscrets »."
    },
    risque: {
      choix: "Chanter avec eux",
      reussite: "Ils se taisent, surpris, puis l’un d’eux s’ouvre sur {trouvaille}. Un cadeau pour le duo.",
      echec: "Ils chantent plus fort. Beaucoup plus fort. Tu rentres avec un acouphène et aucun trésor."
    },
    objet: {
      serie: "reliques",
      resultat: "Les cristaux lisent ce qui est gravé dessus et se taisent, impressionnés. L’un d’eux s’ouvre : {trouvaille}."
    }
  },

  // scène 3
  {
    situation: "Ton reflet dans une plaque de verre a trois secondes de retard. Il te regarde partir avant que tu ne partes.",
    prudent: {
      choix: "Partir sans regarder le reflet",
      resultat: "Le reflet te regarde partir. Tu le sens. Le Guide note : « miroir en retard, à ne pas offenser »."
    },
    risque: {
      choix: "Attendre que le reflet fasse autre chose",
      reussite: "Il fait autre chose : il se baisse et ramasse {trouvaille}. Tu te baisses, tu ramasses. {trouvaille:Il|Elle} y était.",
      echec: "Il fait autre chose : il te montre le plafond. Tu lèves les yeux. Le plafond tombe."
    },
    objet: {
      serie: "bizarreries",
      resultat: "Ton reflet {objet:le|la} voit avant toi, et te montre où chercher. Dans la plaque : {trouvaille}."
    }
  }

]);
