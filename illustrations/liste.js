// Les illustrations de monde : combien d’images a chaque type.
//
// La première image d’un type s’appelle <type>.webp, les suivantes <type>-b.webp, <type>-c.webp, <type>-d.webp…
// Pour ajouter une image : dépose le fichier dans ce dossier avec la lettre suivante, puis augmente le nombre ici.
// Chaque monde garde son image ; un nouveau monde reçoit une des images de son type que tu as le moins vues.
// Un type à 0 image n’apparaît pas encore dans la galaxie : il y entre dès sa première image.

illustrations({
  rocheux: 3,
  gazeux: 3,
  desert: 3,
  glace: 3,
  volcan: 3,
  toxique: 3,
  crateres: 3,
  ocean: 3,
  jungle: 3,
  tempere: 3,
  etrange: 3,
  habite: 3,
  bibliotheque: 3,
  chantier: 3,
  champignon: 3,
  cimetiere: 3,
  plat: 2,
  dessine: 0
});
