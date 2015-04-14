var moustacheCube ="<div class=\"cube mat-{{material}}\">"+
                            "<figure class=\"front\"></figure>"+
                            "<figure class=\"back\"></figure>"+
                            "<figure class=\"left\"></figure>"+
                            "<figure class=\"right\">"+
                            "</figure><figure class=\"top\">"+
                        "</figure></div>";

function getLineConstruct(lineElement)
{
    var line = [];
    
    $(lineElement).find("td").each(function(index,element){
        var idCube = 0;
        if($(element).find("div.cube").length)
        {
            idCube = parseInt( $(element).find("div.cube").attr("class").slice(9));
        }
        line.push(idCube);
    });
    
    return line;
}

function getLevelConstruct(levelElement)
{
    var level = [];
    
    $(levelElement).find("tr").each(function(index,element){
        level.push(getLineConstruct(element));
    });
    
    return level;
}

function getTableConstruct()
{
    var construct = [];
    
    $("#screen table").each(function(index,element){
        construct.push(getLevelConstruct(element));
    });
    
    return construct;
    
}

function exportJSProject()
{
    return JSON.stringify(getTableConstruct());
}

function importJSProject(strImport)
{
    var project = JSON.parse(strImport);
    var $scene = $("#scene");
    $scene.empty();
    
    gridWidth = project[1][1].length;
    gridLenght = project[1].length;
    actualLevel = project.length;
    levelMax = project.length;
    
    for(var i = 0, sceneContent = ""; i<project.length; i++)
    {
        sceneContent = "<table class=\"level-"+(i+1)+"\">";
        for(var j = 0; j<project[i].length; j++)
        {
            sceneContent += "<tr>";
            for(var k = 0; k<project[i][j].length; k++)
            {
                sceneContent += "<td>";
                if(project[i][j][k] != 0)
                {
                    var params = {material: project[i][j][k]}
                    sceneContent += Mustache.render(moustacheCube,params);
                }
                sceneContent += "</td>";
            }
            sceneContent += "</tr>";
        }
        sceneContent += "</table>";
        $scene.append(sceneContent);
    }
}

function exportLUAProject()
{
    var projet = exportJSProject();
    projet = projet.replace(/\[/g,"{");
    projet = projet.replace(/\]/g,"}");
    return projet;
}