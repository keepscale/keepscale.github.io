# keepscale.fr

Site vitrine de KeepScale, publié par GitHub Pages sur https://www.keepscale.fr.

Site statique sans build ni dépendance : `index.html`, `assets/style.css`, `assets/main.js`.
Aucun cookie, aucun traceur, aucune ressource tierce.

- Après une modification du script en ligne `document.documentElement.classList.add('js')`, recalculer son empreinte dans la CSP de chaque page :
  `printf "%s" "document.documentElement.classList.add('js')" | openssl dgst -sha256 -binary | base64`
- Mettre à jour `lastmod` dans `sitemap.xml` à chaque changement de contenu.
