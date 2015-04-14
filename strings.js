var moustacheCube ="<div class=\"cube mat-{{material}}\">"+
                            "<figure class=\"front\"></figure>"+
                            "<figure class=\"back\"></figure>"+
                            "<figure class=\"left\"></figure>"+
                            "<figure class=\"right\">"+
                            "</figure><figure class=\"top\">"+
                    "</figure></div>";

var moustacheGrid ="<table class=\"level-{{level}}\">"+
                          "{{tableau}}"+
                        "</table>";

var mustacheLightbox = "<div class=\"lightBox\" > <div class=\"lightboxContent\">"+
                                "<h2>{{title}}</h2>"+
                                "{{{content}}}"+
                                "<div class=\"lightboxButtonContainer\"><div class=\"lightboxButton\" id=\"closeLightbox\" >{{buttonValue}}</div></div>"+
                            "</div> </div>";

var welcomeMessage = "Ce site a pour vocation premiere de fournir une interface d'utilisateur pour la creation de batiments pour ensuite les importer dans le jeu Minecraft au travers d'un programme développé via le mod ComputerCraft. Une fois votre construction achevée vous pouvez l'exporter via le panneau prévu a cet effet. Vous pouvez tout a fait untiliser cet interface pour seulement construir avec des blocs de couleur ... vous pourrez ensuite télécharger le code de votre batiment pour le sauvegarder sur votre ordinateur et le partager.";

var importJSMessage = "Entrez dans le champ ci dessous le texte donner lors de l'exportation d'un projet en JavaScript. Ce texte sera ensuite interprèté et la construction vas apparaitre. Pour annuler n'entrez rien dans le champ. <br/> ATTENTION : La construction en cours sera écrasée !<textarea></textarea> Si la fenêtre ne se ferme pas c'est que vous avez fait une erreur dans le texte entré."

var noImplementMessage = "Cette fonctionalité n'a pas encors été codée. Il faudra patienter un peu :-(";

var exportJSMessage = "Votre projet a été exporté sous forme de texte. Ce texte est uniquement compatible avec cette WebApp et ne peut pas etre utilisé autre pars. Vous pouvez utiliser ce code pour partager votre création ou pour la sauvegarder.<br/>Copiez le texte ci dessous et enregistrez le dans un fichier.";

var exportLUAMessage = "Votre projet a été exporté sous forme de tableau LUA. Ce tableau peut etre utilisé pour construir un batiment grace au programme fournit.";

var aboutMessage = "Veuillez rediger cette lightbox a propos !";

var helpMessage = "A rédiger";

var incompatibilityMessage = "Attention votre navigateur semble incompatible avec cette WebApp. Vous devez utiliser Google Chrome pour pouvoir utiliser cette application dans les mailleurs conditions. Si vous n'utilisez pas ce navigateurs vous risquez d'avoir des bugs de 3D.";

var cacheInfoMessage = "A l'aide des nouvelles possibilités offertes par le HTML5 il est desormet possible de rendre certaines application disponibles Hors Ligne et, bonne nouvelle, cette option est disponible ici. Vous pouvez ainsi acceder a cette adresse meme si vous n'avez pas de connexion. (L'icone changera vers le rouge en mode hors ligne).<br/>Pour actualiser l'application et vider le chache accedez au gestionnaire (chrome://appcache-internals/) disponible sur Google Chrome";

var cacheSuccessMessage = "L'application à été correctement entregistrée dans le cache de votre navigateur et est maintenant disponible hors connexion.";

var cacheErrorMessage = "Une erreur est survenue lors de la mise en cache de l'application. Vous ne pouvez pour le moment pas l'utiliser hors connexion. Essayez d'actualiser la page et si le probleme persiste contactez nous.";