# Les illustrations

Les illustrations montrent les mondes : une image par monde visité, sur toutes ses scènes et sur sa fiche du Guide. Il n’y a pas d’image par scène, l’imagination fait le reste. Ce sont des paysages seuls, sans personnage ni vaisseau : les images actuelles, faites avec un explorateur dedans, sont à refaire et seront remplacées une à une.

## Plusieurs images par type

Chaque type de monde peut avoir plusieurs images : `rocheux.webp`, puis `rocheux-b.webp`, `rocheux-c.webp`, `rocheux-d.webp`… Leur nombre est écrit dans [liste.js](liste.js). Un monde garde son image pour toujours ; un nouveau monde reçoit une des images de son type que tu as le moins vues. Avec 3 images de rocheux, tes 3 premiers mondes rocheux auront 3 images différentes.

Pour ajouter une image : le fichier ici avec la lettre suivante, et le nombre augmenté dans `liste.js`. Tant qu’un type n’a pas d’image, la vignette dessinée reste.

## Le format

- Portrait vertical, 2:3, converti en WebP 720 × 1080, qualité 58 : environ 50 à 140 Ko selon le grain.
- Sur téléphone, la case montre surtout le centre de l’image : le sujet tient dans le tiers central, avec un espace dégagé au sol au milieu.
- Aucun personnage, aucune créature, aucun vaisseau.
- Aucun texte dans l’image.

## Les prompts

Le prompt maître et les prompts des prochaines images : [PROMPTS.md](PROMPTS.md).

## Les objets de la soute

Une image par objet, sur fond transparent, dans `objets/` : `epaves-1.webp` à `bizarreries-5.webp` (4 séries, 5 paliers). Le jeu la montre dans la tuile de la soute dès que le fichier existe, sans rien déclarer ailleurs ; tant qu’elle manque, la tuile garde son symbole et son chiffre romain.
