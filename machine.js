var actualLevel = 1;
var actualView = 45;
var actualScale = 1;
var screenX = 0;
var screenY = 0;
var scaleMin = 0.1;
var scaleMax = 10;
var absoluteLevelMax = 9;
var levelMax = 1;
var levelMin = 1;
var gridWidth = 1;
var gridLenght = 1;
var materialMin = 1;
var materialMax = 11;
var materialSelect = materialMin;
var displacementStep = 50
var offlineMode = false;
var cacheStateError = false;
/* actualise les dimentions de la scene */
function actualizeScene()
{
    $scene = $("#scene");
    $firstLevel = $("#scene table").first();
    $scene.width($firstLevel.width());
    $scene.css("-webkit-transform-origin",($firstLevel.width()/2)+"px "+($firstLevel.height()/2)+"px");
    $scene.width(30*gridWidth);
}

function createLightbox(title,content,buttonValue,closeFunction)
{
    var params = { title : title, content : content, buttonValue : buttonValue}
    
    $("body").prepend(Mustache.render(mustacheLightbox,params));
    
    $("#closeLightbox").click(function(){
        if(closeFunction != null)
        {
            if($(".lightBox textarea").length != 0)
            {
                closeFunction($(".lightBox textarea").get(0).value);
            }
            else
            {
                closeFunction();
            }
        }
        $(".lightBox").remove();
    })
}

function generateLine(){
    var tab = "";
    tab += "<tr>";
    for(var i=0;i<gridWidth;i++)
    {
        tab += "<td></td>";
    }
    tab += "</tr>";
    return tab;
}

function generateTable(){
    var tab = "<table class=\"level-"+actualLevel+"\">";
    for(var i=0;i<gridLenght;i++)
    {
        tab += generateLine();
    }
    tab += "</table>";
    return tab;
}

function actualizeCubeClick()
{    
    $("#scene td").off("click");
    $("#scene td").on("click",function(e){
        if($(this).html() == "")
        {
            var parametres = {
                material : materialSelect
            }
            $(this).html(Mustache.render(moustacheCube,parametres));
        }
        else
        {
            $(this).html("");
        }
    });
}

function isChrome()
{
    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}


$(function () {
    actualizeCubeClick();
    
    if(isChrome())
    {
        createLightbox("Bienvenue !",welcomeMessage,"Go");
    }
    else
    {
        createLightbox("Incompatible",incompatibilityMessage,"Continuer quand même",function(){
            createLightbox("Bienvenue !",welcomeMessage,"Go");
        });
    }
    
    /* Montrer d'un niveau */
    $("#gridMore").click(function(){
        if(actualLevel < levelMax)
        {
            $("#scene table.level-"+(actualLevel+1)).removeClass("hidden");
            actualLevel++;
        }
    });
    
    /* descendre d'un niveau */
    $("#gridLost").click(function(){
        if(actualLevel>levelMin)
        {
            $("#scene table.level-"+actualLevel).addClass("hidden");
            actualLevel--;
        }
    });
    
    /* cacher les grilles */
    $("#gridHide").click(function(){
        if($("#scene").hasClass("gridTransparent"))
        {
            $("#scene").removeClass("gridTransparent");
        }
        else
        {
            $("#scene").addClass("gridTransparent");
        }
    });
    
    /* changer de type */
    $("#materialSelector").click(function(){
        if(materialSelect<materialMax)
        {
            materialSelect++;
        }
        else
        {
            materialSelect = materialMin;
        }
        $(this).html("Type de cube "+materialSelect);
    });
    
    
    /* tourner a gauche */
    $("#sceneTurnLeft").click(function(){
        actualizeScene();
        actualView += 10;
        $("#scene").css("-webkit-transform","rotateX(45deg) rotateZ("+actualView+"deg)");
    });
    
    /* tourner a droite */
    $("#sceneTurnRight").click(function(){
        actualizeScene();
        actualView -= 10;
        $("#scene").css("-webkit-transform","rotateX(45deg) rotateZ("+actualView+"deg)");
    });
    
    /* pivoter a gauche */
    $("#scenePivotLeft").click(function(){
        actualizeScene();
        actualView += 45;
        $("#scene").css("-webkit-transform","rotateX(45deg) rotateZ("+actualView+"deg)");
    });
    
    /* pivoter a droite */
    $("#scenePivotRight").click(function(){
        actualizeScene();
        actualView -= 45;
        $("#scene").css("-webkit-transform","rotateX(45deg) rotateZ("+actualView+"deg)");
    });
    
    /* ajouter une grille */
    $("#gridAddLevel").click(function(){
        if(actualLevel < absoluteLevelMax)
        {
            levelMax++;
            actualLevel = levelMax;
            $("#scene").append(generateTable());
            actualizeCubeClick();
        }
    });
    
    
    /* ajouter une grille */
    $("#gridRemLevel").click(function(){
        if(actualLevel > 1)
        {
            levelMax--;
            actualLevel = levelMax;
            $("#scene table").last().remove();
            actualizeCubeClick()
        }
    });
    
    /* Ajouter une ligne */
    $("#gridAddRight").click(function(){
       $("#scene table").append(generateLine());
        gridLenght++;
        actualizeCubeClick();
        actualizeScene();
    });
    
    /* Ajouter une ligne */
    $("#gridAddLeft").click(function(){
       $("#scene table").prepend(generateLine());
        gridLenght++;
        actualizeCubeClick();
        actualizeScene();
    });
    
    /* Supprimmer une ligne */
    $("#gridRemRight").click(function(){
        if(gridLenght > 1)
        {
           $("#scene table tr:last-child").remove();
            gridLenght--;
            actualizeCubeClick();
            actualizeScene();
        }
    });
    
    /* Supprimmer une ligne */
    $("#gridRemLeft").click(function(){
        if(gridLenght > 1)
        {
            $("#scene table tr:first-child").remove();
             gridLenght--;
             actualizeCubeClick();
             actualizeScene();
        }
    });
    
    /* Ajouter une colonne */
    $("#gridAddBottom").click(function(){
       $("#scene table tr").append("<td></td>");
        gridWidth++;
        actualizeCubeClick();
        actualizeScene();
    });
    
    /* Ajouter une colonne */
    $("#gridAddTop").click(function(){
       $("#scene table tr").prepend("<td></td>");
        gridWidth++;
        actualizeCubeClick();
        actualizeScene();
    });
    
    /* Supprimmer une colonne */
    $("#gridRemBottom").click(function(){
        if(gridWidth > 1)
        {
            $("#scene table tr td:last-child").remove();
             gridWidth--;
             actualizeCubeClick();
             actualizeScene();
        }
    });
    
    /* Supprimmer une colonne */
    $("#gridRemTop").click(function(){
        if(gridWidth > 1)
        {
            $("#scene table tr td:first-child").remove();
             gridWidth--;
             actualizeCubeClick();
             actualizeScene();
        }
    });
    
    /* Switch de cube*/
    $("#blockSwitchUp").click(function(){
        if(materialSelect < materialMax)
        {
            materialSelect++;
            $("#blockMaterialId").html(materialSelect);
        }
    });
    
    /* Switch de cube*/
    $("#blockSwitchDown").click(function(){
        if(materialSelect > materialMin)
        {
            materialSelect--;
            $("#blockMaterialId").html(materialSelect);
        }
    });
    
    /* zoom */
    $(".zoom").click(function(){
       switch ($(this).attr("id"))
       {
               case "zoomIn" :
                actualScale += 0.5;
               break;
               case "zoomOut" :
                actualScale -= 0.5;
               break;
               case "zoomInitial":
                actualScale = 1;
               break;
       } 
       if(actualScale < scaleMin)
       {
           actualScale = scaleMin;
       }
       else if(actualScale > scaleMax)
       {
           actualScale = scaleMax;
       }
       $("#sceneScreen").css("transform","scale("+actualScale+")");
    });
    
    /*deplacements*/
    $(".displacement").click(function(){
       switch ($(this).attr("id"))
       {
               case "goUp" :
                screenY -= displacementStep;
               break;
               case "goDown" :
                screenY += displacementStep;
               break;
               case "goLeft" :
                screenX -= displacementStep;
               break;
               case "goRight" :
                screenX += displacementStep;
               break;
               case "goCenter" :
                screenX = 0;
                screenY = 0;
               break;
       }
       $("#sceneScreen").css("left",screenX+"px");
       $("#sceneScreen").css("top",screenY+"px");
    });
    
    /* non implementé */
    $(".nimplement").click(function(){
        createLightbox("Patience",noImplementMessage,"A plus tard");   
    })
    
    /* exportation JS */
    $("#exportJS").click(function(){
        var content = exportJSMessage+"<textarea reanonly>"+exportJSProject()+"</textarea>";
        createLightbox("Exportation JavaScript",content,"J'ai terminé");
    });
    
    /* exportation LUA */
    $("#exportLUA").click(function(){
        var content = exportLUAMessage+"<textarea reanonly>"+exportLUAProject()+"</textarea>";
        createLightbox("Exportation Lua",content,"J'ai terminé");
    });
    
    /* importation JS */
    $("#importJS").click(function(){
        createLightbox("Importation JavaScript",importJSMessage,"Importer",function(value)
        {
            if(value != "" && value != null)
            {
                importJSProject(value);
                actualizeCubeClick();
                actualizeScene();
            }
        });
    });
    
    /* about */
    $("#about").click(function(){
        createLightbox("A propos",aboutMessage,"Fermer");
    });
    
    /* aide */
    $("#help").click(function(){
       createLightbox("Aide",helpMessage,"Fermer"); 
    });
    
    $("#offlineInfo").click(function(){
        var content = cacheInfoMessage+"<br/><br/>";
        
        if(cacheStateError)
        {
            content += cacheErrorMessage;
        }
        else
        {
            content += cacheSuccessMessage;
        }
        
        createLightbox("Mode hors connexion",content,"J'ai compris");
    });
    
});