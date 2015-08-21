window.onload = function () {
    var toc = "";
    var level = 0;
	
    document.getElementById("contents").innerHTML =
        document.getElementById("contents").innerHTML.replace(
				/<h([\d])( class="section scrollspy")?( id=")?([\w]+)?(")?>([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, ignore, ignore, id, ignore, titleText, closeLevel) {
				if(level==0) {
					toc += "<ul class=\"section table-of-contents\">";				
					toc += "<li><a class=\"active\" href=\"#" + id + "\">" + titleText + "</a></li>";
				}
				else {					
					toc += "<li><a href=\"#" + id + "\">" + titleText
						+ "</a></li>";
				}
				
                level = parseInt(openLevel);

				level += 1;
                return str;
				// <h([\d]) class="section scrollspy" id="([\w]+)">([^<]+)<\/h([\d])>
				// "<h" + openLevel + "><a name=\"" + anchor + "\">"
                    // + titleText + "</a></h" + closeLevel + ">";
            }
        );
	
    if (level) {
        toc += (new Array(level + 1)).join("</ul>");
    }

	if (toc=="") {
		var probe = document.getElementsByClassName("row")[0].innerHTML;
		document.getElementsByClassName("row")[0].innerHTML = probe.replace("l10","l12");
		document.getElementById("toc").remove();
	}
	else {
		document.getElementById("toc").innerHTML += toc;
	}
};
