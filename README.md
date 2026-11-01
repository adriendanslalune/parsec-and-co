# Parsec & Co

Jeu mobile d’exploration galactique. La fiche de conception, `fiche.md`, fait foi pour toutes les décisions.

## Jouer

Ouvre `index.html` dans un navigateur. Pour l’installer comme une appli sur le téléphone, le jeu doit être servi en HTTPS (par exemple avec GitHub Pages) : ouvre l’adresse dans Chrome (Android) puis « Installer l’appli », ou dans Safari (iPhone) puis « Partager › Sur l’écran d’accueil ».

La sauvegarde vit dans le navigateur (localStorage, clés `parsec.*`), et elle est propre à chaque adresse : une partie commencée sur une adresse ne se retrouve pas sur une autre. Sur iPhone, l’appli installée a sa propre sauvegarde, séparée de celle de Safari.

## Les fichiers

| Fichier | Ce qu’il contient |
|---|---|
| `index.html` | la page : le bandeau, la carte, le bas d’écran, et l’ordre de chargement des scripts |
| `css/style.css` | l’apparence : parchemin, pulp, boutons, fenêtres, soute |
| `js/galaxie.js` | la formule de la galaxie : densité, étoiles par niveaux de cellules, noms, planètes, monde de départ |
| `js/etat.js` | la sauvegarde et l’état de la partie (graine, joueur, étoiles repérées, mondes explorés, ports, vol) |
| `js/interface.js` | les symboles à l’encre, le bandeau, niveau et titres, le message du bas, la fiche du Guide, les formats |
| `js/carte.js` | le dessin de la carte papier, la vie des ports, la vignette d’expédition, les doigts et la caméra |
| `js/sons.js` | les sons synthétisés : bips, carillon, radio de l’antenne |
| `js/ecoute.js` | scruter le vide : le ping, puis l’antenne |
| `js/voyage.js` | partir, voler, arriver ; les nouveaux ports |
| `js/expeditions.js` | le moteur des expéditions : tirage du type de monde (par rareté), tirage de l’histoire, choix et leur souvenir |
| `mondes/*.js` | les mondes, un fichier par type : sa fiche (nom, rareté, danger, couleurs, textes du Guide) et son histoire |
| `js/soute.js` | les objets des quatre séries, leurs paliers, la grille où on les bricole |
| `js/demarrage.js` | le démarrage, chargé en dernier |
| `manifest.webmanifest`, `icones/`, `sw.js` | l’appli installable : nom, couleurs, icône, jeu hors ligne |

Les fichiers de `js/` sont des scripts classiques qui partagent leurs variables : l’ordre des balises `<script>` dans `index.html` compte.

## Écrire des mondes et des histoires

Chaque fichier de `mondes/` contient la fiche d’un type de monde, puis son histoire : 3 scènes qui se suivent, et pour les scènes 2 et 3 une phrase de rappel selon le choix d’avant. Le mode d’emploi est en tête de chaque fichier. On ne touche qu’aux textes entre guillemets ; on peut ajouter une autre histoire à la suite, le jeu en tire une au hasard ; on ne supprime ni ne réordonne rien d’existant, parce qu’une expédition en cours retient les numéros.

Pour ajouter un type de monde : copier un fichier de `mondes/` sous un nouveau nom et le réécrire, puis ajouter une ligne dans `index.html` (à côté des autres mondes), une dans `sw.js` (la liste des fichiers) et une dans `illustrations/liste.js` (à 0 : le monde entre dans la galaxie avec sa première image).
