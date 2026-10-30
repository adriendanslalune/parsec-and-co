# Parsec & Co — fiche de conception

État au 30 octobre 2026. Ce document fait foi : en cas de doute, il l'emporte sur le code.

## L'idée

Tu es explorateur pour une petite compagnie galactique. Tu pars d'un monde tiré au sort, tu scrutes le vide pour repérer des étoiles, tu y voles, et chaque monde atteint est une courte expédition à vivre. Ce que tu trouves remplit ta soute ; ce que tu explores devient un port de la Compagnie. Les distances sont réelles (pour le vertige), les durées sont réglées pour le plaisir.

Ton : H2G2 et le Disque-monde, humour et absurde. Dessin : Moebius, ligne claire. Impression : pulp des années 50.

## Principes

- **Ce qui marche passe par la main et l'oreille.** Le ping et l'antenne sont les meilleurs moments du jeu parce qu'ils sont tactiles et sonores. Un mécanisme qui se résume à un pourcentage est à refuser.
- **Simple et satisfaisant.** Pas de gestion, pas de jauges, pas de chaîne de production.
- **Une brique à la fois**, testée sur téléphone avant la suivante.

## Le jeu tel qu'il existe

### La galaxie
- Une formule, pas une base de données : une graine + une position donnent toujours la même étoile, le même nom, le même monde. Rien n'est stocké tant que personne n'y est allé.
- Forme réelle : bulbe, deux bras spiraux, densité qui augmente vers le centre, rayon d'environ 55 000 années-lumière.
- Étoiles par niveaux de cellules, avec fondu entre les niveaux au zoom. Chaque étoile a son système de planètes en orbite. Zoom de la galaxie entière jusqu'à l'échelle d'un système (unités astronomiques).
- Le joueur démarre sur un monde tiré au sort ; il choisit son nom d'explorateur au premier lancement.

### Scruter le vide (le cœur du jeu)
1. Le joueur choisit le port qui écoute (s'il en a plusieurs).
2. **Ping** : une onde, puis un cercle qui donne la distance du signal, pas la direction.
3. **Antenne** : on fait glisser le doigt autour du port pour tourner l'antenne ; du souffle à côté, un ton clair sur l'étoile. Tolérance de 3°, bouton « Verrouiller ».
4. L'étoile se révèle et reste sur la carte (cercle lavande).
- L'ordre ping puis antenne est imposé. Un toucher ailleurs annule l'écoute.

### Voyager
- Toucher une étoile repérée, puis « Y aller ». 20 secondes par année-lumière, divisées par (1 + 0,15 × niveau). Le vol continue appli fermée.
- Arrivée : la caméra plonge dans le système, carillon, puis l'expédition s'ouvre.

### L'expédition
- 2 ou 3 scènes tirées parmi celles du type de monde. Chaque scène : une situation et trois options.
  - **Prudent** : on apprend peu, on rentre entier (+1 XP).
  - **Risqué** : trouvaille probable, ou blessure selon le danger du monde (12 % par point de danger) (+2 XP si réussi).
  - **Sortir un objet de la soute** : un objet de la bonne série fait basculer la scène ; un objet de palier 2+ garantit le risqué ; palier 3+ donne +4 XP. L'objet est consommé.
- **Blessure** : l'expédition s'arrête, convalescence de 5 min + 5 min par point de danger, ni vol ni scrutation pendant ce temps. Répliques drôles tirées au hasard. On reprend à la scène suivante une fois remis.
- **Verrou** : on ne repart pas scruter tant que l'expédition en cours n'est pas finie.
- À la fin : la fiche du Guide (texte, journal des choix), et le monde devient un port.

### Les mondes (12 types actuels)
Rocheux, gazeux, désertique, glacé, volcanique, toxique, criblé, océan, jungle, tempéré, étrange, habité. Chacun avec un poids de tirage (les rocheux dominent), une fourchette de danger (0 à 5), des couleurs, des textes du Guide et 3 scènes.

### Les ports
- Tout monde exploré est un port de la Compagnie : il écoute le vide, il étend le territoire (hachures vert-de-gris sur la carte).
- La vie des ports : des navettes vont et viennent ; de temps en temps, un feu d'artifice ou une escarmouche de petits vaisseaux au-dessus d'un port.

### La soute (façon 2048)
- Une seule sorte d'objets : 4 séries, 5 paliers.
  - Épaves (la technique) : boulon, rouage, mécanisme, moteur d'épave, cœur de vaisseau.
  - Fossiles (le vivant) : écaille, os creux, crâne à trois orbites, squelette en boîte, fossile qui respire.
  - Reliques (les civilisations) : tesson, pièce « pile/pile », sceau, couronne, trône pliant.
  - Bizarreries (la physique tordue) : lueur en bocal, murmure en boucle, paradoxe de poche, petit miracle, chose indescriptible.
- Grille en 4 colonnes, une par série. On glisse un objet sur son jumeau (même série, même palier) pour les **bricoler** : palier suivant. Chiffres romains sur les tuiles.

### Progression
- XP : +1 prudent, +2 risqué réussi ou bon objet, +4 avec objet de palier 3+.
- Titres aux seuils 0, 3, 8, 15, 25, 40, 60, 90, 130, 200 : Stagiaire du Vide, Touriste Assermenté, Arpenteur Approximatif, Cartographe Malgré Lui, Dompteur de Cailloux, Inspecteur des Horizons, Vétéran Fêlé, Légende Locale (très locale), Grand Explorateur selon lui-même, Monument Interstellaire Classé.
- Le niveau accélère le vaisseau.

### Interface
- **Bandeau** pleine largeur en parchemin grillé : Parsec & Co, nom, titre et niveau, barre d'XP, relevé (mondes, objets, distance au centre) avec l'échelle, menu Soute / Guide / Galaxie. Double filet sépia et trait orange décalé en bas.
- **Carte** : cartographie ancienne sur papier blanc cassé, encre sépia, quadrillage, bords roussis, rose des vents qui pointe vers le centre, galaxie en lavis sépia au dézoom.
- **Bas d'écran** : le message (papier tramé) et le bouton « Scruter le vide ».
- **Fenêtres** (fiche, soute, Guide) : page de magazine pulp, se ferment d'un glisser vers le bas ou d'un toucher sur le fond.
- **Vignette d'expédition** : nocturne, en ligne claire, dessinée en code en attendant les illustrations (ciel en aplats, planète cerclée d'encre, sol au premier plan, l'explorateur minuscule le bras levé).
- Symboles à l'encre partout (fusée, étoile, planète, caisse, boussole, livre, spirale, antenne, viseur, lune, un par série).

### Direction artistique
- Couleurs : papier #efe6d2, sépia #3b2a1e, brique #b5523b, vert-de-gris #3f8f80, lavande #6f5fae, orange #ef9b4f, rose #e8a99a, encre #1b2451.
- Polices : Bowlby One (titres), Vollkorn (tout le texte).
- Trait d'encre fin, aplats, ombres de couleur décalées (impression mal calée), trame de points.

### Sauvegarde
localStorage, clés `parsec.*` (seed, joueur, decouverts, explores, soute, vol, blesse, vu).

## Écarté, et pourquoi
- **L'argent, les cargos, les routes commerciales** : de la gestion, ennuyeux ; l'argent n'achetait rien de désirable.
- **La colonisation** : « je suis un explorateur, pas un colon ».
- **Les outils fournis par les colonies** : doublon avec la soute.
- **La fouille en pourcentages** et la fouille en paliers « stop ou encore » : aucun plaisir.
- **Les balises** pour trianguler : pénibles, remplacées par l'antenne.
- **Le compte à rebours d'un vaisseau vers le centre** : une barre de progression déguisée.
- **Le rapport de reprise** : pénible à chaque connexion.

## En attente

1. **Histoires liées** : passer des scènes indépendantes à des histoires de 3 scènes qui se suivent (le chemin) et se souviennent des choix (une phrase change selon le choix d'avant). Les 36 scènes actuelles se réorganisent en 12 histoires. Corriger en même temps : la trouvaille annoncée dans le texte doit être l'objet réellement reçu ; accords grammaticaux ; titres au féminin.
2. **Plus de types de mondes** (26 au total) : rares (bibliothèque, champignon, administratif, cimetière de vaisseaux, musical, en chantier, ruche), très rares (creux, plat, horloge, miroir, à rebours), légendaires (endormi, fantôme, jardin d'un dieu absent). Règle : un type fantastique n'est gardé que si ChatGPT en fait une illustration cohérente. Viser à terme une dizaine de scènes par type.
3. **Illustrations** : environ 60 images (style Moebius, palette pastel, portrait vertical, aucun texte), prompt maître testé sur 3 images d'abord, WebP ~100 Ko.
4. **Le carnet d'un explorateur disparu** (nom provisoire Ezra Bloom) : chasse au trésor solo. Des pages trouvées en expédition donnent des indices à croiser ; le monde final est écrit à la main. Anti-divulgâchage : indices et cachette calculés pour chaque joueur, relatifs à ses propres mondes.
5. **Multijoueur** (avec un serveur, en dernier) : galaxie commune (graine partagée), départ n'importe où, liste des joueurs avec leur position, messages laissés sur les mondes, classement mensuel (jamais cumulé), réputation, colonies fantômes, explorer les mondes des autres. **Le Signal du Centre** : chaque semaine, Sagittarius A* émet ; chaque joueur le mesure depuis ses ports ; les cercles de tous se croisent ; la récompense exige d'avoir mesuré soi-même. Tester avec une centaine de bots avant de trancher la question des départs dispersés.
6. **Play Store**.

## Ce qu'on ne fera pas
- Pas de bâtiments, pas de jauges, pas de chaîne de production.
- Pas de durées réelles : les distances réelles servent aux chiffres.
- Pas de relativité.
- Pas de combat entre joueurs, pas de vol d'un monde à un joueur actif.
- Pas de serveur avant que le jeu solo soit bon.
- Pas de pubs forcées, pas de boosts payants.
