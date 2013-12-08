spaboot
=======

## Single Page web App. (SPA or Spa) via NodeJS, Socket.IO, and Twitter Bootstrap / Bootswatch.

This is neither a framework nor does it use a framework (like Express). It is meant as an example
that may be used to start developing, i.e. "boot up", a new single page GUI that is organized via
TwitterBootstap CSS3 (and/or its custimazation via BootsWatch). Presumably the nature of a single
page app. means there need be only one HTML (index.html) file. This can be purely hand edited, or
a single jade template whose output HTML may or may not also be hand edited.

## Spa directory organization

1. ReadMe.md: this file
2. ./css: CSS/Less shared across any/all Spas 
3. ./img: ICOs, PNGs, JPEGs, GIFs shared across any/all Spas
4. ./js:  all shared Javascript

---

###./multi_carousel: example Spa that uses Twitter-Bootstrap Carousels
1. ./multi_carousel/spa.js: NodeJS Spaserver startup
2. ./multi_carousel/js: NodeJS server-side code specific to this Spa
3. ./multi_carousel/pub: Publish this Spa index.html GUI
4. ./multi_carousel/pub/css: CSS/Less specific to this Spa GUI
5. ./multi_carousel/pub/js: client-side Javascript code specific to this Spa GUI

---

