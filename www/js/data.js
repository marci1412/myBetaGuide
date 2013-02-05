$(document).ready(function(){
    //Variable for major of user
    var major = "medieninformatik";
	var lecture_directory_link = 'http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&roo';
	var first = true;
				  
	//only a test for JSON
	$('#getdata-button').live('click', function(){
        var url = 'http://localhost:8888?json=1';
        $.getJSON(url, function(data) {
            $('#showdata').append("<p> Hier sieht man die Anzahl der Seiten: "+data.pages+"</p>");
        });
	});
				  
/*------------------------------ NAVIGATION -----------------------------------------------------------------------------------------------------------------------*/

	/*$('#navigation').live('pageshow', function() {
		$('#navigation').find('div.content').html(""+
			"<ul data-role=\"listview\" id=\"nav_list\">"+
				"<li class=\"nav_headline\">Universit&auml;t Ulm</li>"+
				"<ul class=\"inner_nav_ul\">"+
					"<a href=\"uni_ulm/kiz.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Kommunikations- &amp; Informationszentrum</li></a>"+
					"<a href=\"uni_ulm/student_counselling.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Studienberatung</li></a>"+
					"<a href=\"uni_ulm/secretarys_office.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Studiensekretariat</li></a>"+
					"<a href=\"uni_ulm/examination_board.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Pr&uuml;fungsausschuss</li></a>"+
				"</ul>"+
				"<li class=\"nav_headline\">Studium</li>"+
				"<ul class=\"inner_nav_ul\">"+
					"<a href=\"study/re_registration.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">R&uuml;ckmeldung</li></a>"+
					"<a href=\"study/lecture_times.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Vorlesungszeiten</li></a>"+
					"<a href=\"study/lecture_directory.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Vorlesungsverzeichnis</li></a>"+
					"<a href=\"study/study_plans.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Studienpl&auml;ne</li></a>"+
					"<a href=\"study/exam_regulations.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Pr&uuml;fungsordnung</li></a>"+
					"<a href=\"study/student_card.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Studierendenausweis</li></a>"+
				"</ul>"+
				"<li class=\"nav_headline\">Studentenwerk</li>"+
				"<ul class=\"inner_nav_ul\">"+
					"<a href=\"student_services/university_gastronomy.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Hochschulgastronomie</li></a>"+
					"<a href=\"student_services/counselling_kids_social.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Beratung, Kinder, Soziales</li></a>"+
					"<a href=\"student_services/habitation.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Wohnen</li></a>"+
					"<a href=\"student_services/student_financial_aid.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Studienfinanzierung</li></a>"+
				"</ul>"+
				"<li class=\"nav_headline\">Extras</li>"+
				"<ul class=\"inner_nav_ul\">"+
					"<a href=\"extras/faq.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">FAQ</li></a>"+
					"<a href=\"extras/campus_map.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Campusplan</li></a>"+
					"<a href=\"extras/bus_schedule.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Busfahrplan</li></a>"+
				"</ul>"+
				"<li class=\"nav_headline\">Optionen</li>"+
				"<ul class=\"inner_nav_ul\">"+
					"<a href=\"options/settings.html\" data-transition=\"slide\" class=\"nav_a\"><li class=\"nav_listitem\">Einstellungen</li></a>"+
				"</ul>"+
			"</ul>");
	});*/

/*------------------------------ KIZ ------------------------------------------------------------------------------------------------------------------------------*/
				  
	$('#kiz').live('pageshow', function(){							//start when page loads
		if(getOnlineStatus()) {
			var url = 'http://localhost:8888/universitat-ulm/kiz/?json=1';//Url from Kiz-Site of WP-Server
			$.getJSON(url, function(data) {								//Get JSON Data
				var text = data.page.content;							//store text
				var newText = text.split('<h1>');						//split for each section (headline)
				$(newText).each(function(i){							//loop for each section
					if(i != 0) {										//except first loop, it is empty because of split
						var text2 = this.split('</h1>');				//split each sections into heading and text
						//for each section create accordion element
						$('#kiz .content').append("<div data-role=\'collapsible\' data-inset=\'false\' class=\'lecture_directory_acc_element\'>"+
												"<h3 class=\'lecture_directory_headings\'><font>"+$(text2[0]).text()+"<font></h3>"+
												"<p>"+$(text2[1]).text()+"</p>"+
												"</div>").trigger('create');
					}
				});
			});
		} else {//if no internet connection available
			alert("Keine Verbindung! Daten konnten nicht geladen werden!");
		}
	});
	
/*------------------------------ Lecture Times --------------------------------------------------------------------------------------------------------------------*/
                  
    $('#lecture_times').live('pageshow', function(){
		if(getOnlineStatus()) {
        	var url = 'http://www.uni-ulm.de/studium/studienorganisation/vorlesungszeiten.html';
        	$.get(url, function(data) {
        	    //alert(data); //uncomment this for debug
        	    //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
        	    //$(vz).find('tr.tr-'+(i+1)+'').find('td.td-0').text()
        	    var vz = $(data).find('div#c21640').html();
        	    var rows = $.returnString(vz);
        	    $('#lecture_times_data').append("<table id=\'lecture_times_table\'>"+
        	                                        "<tr>"+
         	                                           "<th>"+$(vz).find('th#col21640-0').text()+"</th>"+
            	                                        "<th>"+$(vz).find('th#col21640-2').text()+"</th>"+
                	                                    "<th>"+$(vz).find('th#col21640-4').text()+"</th>"+
                    	                                "<th>"+$(vz).find('th#col21640-6').text()+"</th>"+
                        	                        "</tr>"+rows+
                            	                "</table>");
        	});
		} else {//if no internet connection available
			alert("Keine Verbindung! Daten konnten nicht geladen werden!");
		}
    });
    
    //This function is for determining the entire row values for lecture times
    $.returnString = function(x) {
        var text="";//start with empty string
        for(var i=1; i<$(x).find('tr').length-1; i++){//travers each table row
                  text = text+"<tr><td>"+$(x).find('tr.tr-'+i+'').find('td.td-0').text()+"</td><td>"+$(x).find('tr.tr-'+i+'').find('td.td-2').text()+"</td><td>"+$(x).find('tr.tr-'+i+'').find('td.td-4').text()+"</td><td>"+$(x).find('tr.tr-'+i+'').find('td.td-6').text()+"</td></tr>";//add each table data
        }
        return text;//return whole string
    };

/*------------------- Lecture Directory ---------------------------------------------------------------------------------------------------*/
	
	$('#lecture_directory').live('pageshow',function(){
        var url = 'http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&roo';
		var institute = "";
		var subject = "";
		
        //$.get(url, function(data) {
			/*var tmp = $(data).find('a#choosesemester');
            var semester_link = tmp.attr("href");
            var semester = tmp.text();*/
			//if(major == "medieninformatik" || major == "informatik" || major == "psychologie"){
				//Do something
				//if(major == "medieninformatik") {
					//Do something
			//	}
			//}
		//});
		
		
								 
		$.when($.get(url)).then(function(resp){//Data from Lecture Directory
			//alert(resp);
			if(first) {
				url = $(resp).find('div.content_max_portal_qis a.ueb:eq(1)').attr("href");//get Fakultät für Ingeneurswissenschaften und Informatik
				first=false;
			} else { url = $(resp).find('div.content a.ueb:eq(1)').attr("href"); }
			//alert(url);
			$.when($.get(url)).then(function(resp){//Data from faculty for engineering and informatic
				url = $(resp).find('div.content a.ueb:eq(2)').attr("href");//get Informatik
				//alert(url);
				$.when($.get(url)).then(function(resp){//Data from Informatik
					url = $(resp).find('div.content a.ueb:eq(3)').attr("href");//get Bachelor Studiengänge Informatik, Medieninformatik und Software Engineering
					//alert(url);
					$.when($.get(url)).then(function(resp){//Data from this Site
						var links = [];
						links = $.getAllLinks(resp, 'div.content a.ueb', 4);//Get all Modules
						for(i=1; i<links.length; i++) {//For each module
								$.getAllLectures(links[i]);//Show them
						}
						$.when($.get(links[0])).then(function(resp){//now only "Anwendungsfächer" is missing
							var tmp = [];
							tmp = $.getAllLinks(resp, 'div.content a.ueb', 5);//Else travers once more deeper
							for(j=0; i<tmp.length; j++) {
								$.getAllLectures(tmp[i]);//Show them
							}
						});
					});
				});
			});
		});
								 
		//Anwendungsfächer
		/*$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|11408&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|11651&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|11544&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|12541&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|12542&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|12543&P.vx=kurz');
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11401|11399&P.vx=kurz');
		//Bachelorseminare
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11610&P.vx=kurz');
		//Mathematik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11030&P.vx=kurz');
		//Mediale Informatik
        $.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11590&P.vx=kurz');
		//Praktische Informatik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11157&P.vx=kurz');
		//Proseminare
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11194&P.vx=kurz');
		//Schwerpunkt Informatik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11403&P.vx=kurz');
		//Schwerpunkt Medieninformatik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11395&P.vx=kurz');
								 
		//Technische und Systemnahe Informatik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11362&P.vx=kurz');
		//Theoretische Methoden der Informatik
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|11376&P.vx=kurz');
		//Anwendungsporjekt Software Engineering
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|12612&P.vx=kurz');
		//Schwerpunkt Software Engineering
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|12610&P.vx=kurz');
		//Software Engineering
		$.getAllLectures('http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&root120122=11605|11027|11632|11354|12611&P.vx=kurz');*/
								 								 
		return false;
    });

	$.getAllLinks = function(text, finder, beginIndex) {
		var tmp = [];
		$(text).find(finder).each(function(index){
			if(beginIndex <= index)
				tmp[index-beginIndex] = $(this).attr("href");
		});
		return tmp;
	};
	
	//Add all lectures from given link to collapsible-set
	$.getAllLectures = function(url){
		$.get(url, function(data){
			$(data).find('table:last').find('tr').each(function(){
				if($(this).find('td:eq(1) a:first').text() != "") {
					var lecture_title = $(this).find('td:eq(1) a:first').text();
					$.get($(this).find('td:eq(1) a:first').attr("href"), function(details){
						$('#lecture_directory_accordion').append("<div data-role=\'collapsible\' data-inset=\'false\' class=\'lecture_directory_acc_element\'>"+
																"<h3 class=\'lecture_directory_headings\'><font>"+lecture_title+"<font></h3>"+
																"<p>"+$.getLectureDetails(details)+"</p>"+
																"</div>").trigger('create');
					});
				}
			});
		});
	};
	
	//Get Details of lecture by given text x
	$.getLectureDetails = function(x){
		var result = "<table border=\'1\' style=\'font-size: 8pt;\'>";//start tag for table
		$(x).find('form tr').each(function(){//All necessary Details
			var attribute = $(this).find('td.mod').text().replace(/\s/g, "");//get defining value
			//if attribute contains one of the desired values
			if(attribute == "Veranstaltungsart" || attribute == "Semester" || attribute == "SWS" || attribute == "Dozenten" || attribute == "Einrichtungen" || attribute == "Studiengänge")
				result = result + "<tr><td>"+attribute+"</td><td>"+$(this).find('td.mod_n').text()+"</td></tr>";//add row
		});
		//if terms are available
		if($(x).find('form table:last').attr("summary") == "Übersicht über alle Veranstaltungstermine") {
			result = result + "<tr><td colspan=\'5\'><table><tr><th colspan=\'4\'>Termine</th></tr>";//define headline
			$(x).find('form table:last tr').each(function(index){//Terms
				if(index == 0) {//if th-values
					result = result + "<tr><td>"+$(this).find('th:eq(1)').text()+"</td><td>"+$(this).find('th:eq(2)').text()+"</td><td>"+$(this).find('th:eq(4)').text()+"</td><td>"+$(this).find('th:eq(5)').text()+"</td><td></td></tr>";//add row
				} else {
					result = result + "<tr><td>"+$(this).find('td:eq(1)').text()+"</td><td>"+$(this).find('td:eq(2)').text()+"</td><td>"+$(this).find('td:eq(4)').text()+"</td><td>"+$(this).find('td:eq(5)').text()+"</td><td><div class=\'add_calendar_button\'><img src=\'../../res/icon/calendar_img.png\' /></div></td></tr>";//add row
				}
			});
			result = result + "</table></td></tr>";
		}//else without terms
		return result+"</table>"; //return with end tag for table the whole table
	};
				  
	$('.add_calendar_button').live('click', function(event){
		var title = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().find('span.ui-btn-text font').text();
		$('#lecture_directory_data').append("<iframe src=\"http://localhost:8888/return_ics.php?title="+title+"\" width=\"0px\" height=\"0px\" style=\"display: none;\"></iframe>").remove();
		alert("before");
		//$('#lecture_directory_data').append("<script type=\"text/javascript\">src=\"http://localhost:8888/return_ics.php?title="+title+"\"</style>").remove();
		//var uri = 'http://localhost:8888/return_ics.php?title='+title;
		//$.get(uri);
		//alert("Test");
	});

//});
//var pageToLoad = $(this).attr("href");
// varaible für den neuen inhalt
//var pageContent;

//$('#vz_content').load(start_page);

// die externe seite laden, der inhalt ist dann in 'data'
/*$.get(pageToLoad, function(data){
 
 // den inhalt zwischenspeichern
 pageContent=data;
 //pageContent = deleteSpaces(pageContent);
 alert(pageContent);
 // content-div langsam ausblenden
 $('#vz_content').fadeOut("slow", function(){
 // wenn das ausblenden fertig ist, inhalt an das content-div übergeben
 $('#vz_content').append(pageContent);
 // content-div langsam wieder einblenden lassen
 $('#vz_content').fadeIn("slow");
 
 // oder in kurzer form (vorzuziehen)
 // $("#content").html(pageContent).fadeIn("slow");
 });
 });*/

//pageToLoad = pageToLoad + " .divcontent";

//$('#vz_content').load(pageToLoad)

// wichtig! sonst wird der a-link im browser aufgerufen!

                  /*$('#soapTest').live('click', function(){
                                      var productServiceUrl = 'http://134.60.71.103:8080/axis2/services/LDAPService/';
                                      // Preferably write this out from server side
                   
                                      function beginAuthByMail(){
                                      var soapMessage =
                                      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding"> \
                                      <soap:Body> \
                                      <authbymail xmlns="http://ttdev.com/ls/"> \
                                      <mail>'marcel.reichersdoerfer@uni-ulm.de'</mail> \
                                      </authbymail> \
                                      </soap:Body> \
                                      </soap:Envelope>';
                                      
                                      $.ajax({
                                             url: productServiceUrl,
                                             type: "POST",
                                             dataType: "xml",
                                             data: soapMessage,
                                             complete: endAuthByMail,
                                             contentType: "text/xml; charset=\"utf-8\""
                                             });
                                      
                                      return false;
                                      }
                                      
                                      function endAuthByMail(xmlHttpRequest, status){
                                      $(xmlHttpRequest.responseXML)
                                      .find('authbymailResult')
                                      .each(function()
                                            {
                                            var name = $(this).find('Name').text();
                                            });
                                      }
                                      
                                      });
                  
                  /*function deleteSpaces(string) {
                   var split = string.split('<');
                   string = "";
                   for(i=0; i<split.length; i++) {
                   if(split[i] != "") string = string+"<br><br>"+split[i];
                   else string = string+""+split[i];
                   }
                   return string;
                   }*/
    
    //If Menue Button is clicked then slide to navigation or back to site
    //$('#menu').pageslide();
});