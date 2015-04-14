var appCache = window.applicationCache;

function putOffline(){
    offlineMode = true;
    $("#offlineInfo").addClass("offline");
}

function cacheOk(){
   $("#offlineInfo").html("<i class='fi-check'></i>");
}

function cacheError(){
   $("#offlineInfo").html("<i class='fi-alert'></i>");
    cacheStateError = true;
}

appCache.addEventListener("checking",function(){
   $("#offlineInfo").html("<i class='fi-loop'></i>");
},false);

appCache.addEventListener("downloading",function(){
   $("#offlineInfo").html("<i class='fi-download'></i>");
},false);

appCache.addEventListener("error",function(){
    cacheError();
},false);

appCache.addEventListener("obsolete",function(){
    cacheError();
},false);

appCache.addEventListener('cached', function(){
    cacheOk();
}, false);

appCache.addEventListener('noupdate', function(){
    cacheOk();
}, false);