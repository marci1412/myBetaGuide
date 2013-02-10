$(document).ready(function(){
    //Variable for major of user
    var major = "medieninformatik";
	var lecture_directory_link = 'http://campusonline.uni-ulm.de/qislsf/rds?state=wtree&search=1&trex=step&roo';
	var first = true;
				  
/*------------------------------ NAVIGATION -----------------------------------------------------------------------------------------------------------------------*/

	$('#navigation').live('pageinit', function() {
		$('#navigation').find('div.content').html(""+
			"<ul data-role=\"listview\" id=\"nav_list\">"+
	 			"<li data-role=\"list-divider\" role=\"heading\" class=\"nav_headline\">"+getLangObject().uniulm.title+"</li>"+//Heading Ulm University
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"uni_ulm/kiz.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().uniulm.kiz+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"uni_ulm/student_counselling.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().uniulm.student_counselling+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"uni_ulm/secretarys_office.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().uniulm.secretarys_office+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"uni_ulm/examination_board.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().uniulm.examination_board+"</a></li>"+
	 			"<li data-role=\"list-divider\" role=\"heading\" class=\"nav_headline\">"+getLangObject().study.title+"</li>"+//Heading Study
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/re_registration.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.re_registration+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/lecture_times.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.lecture_times+"</a></li>"+
					"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/lecture_directory.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.lecture_directory+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/study_plans.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.study_plans+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/exam_regulations.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.exam_regulations+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"study/student_card.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().study.student_card+"</a></li>"+
	 			"<li data-role=\"list-divider\" role=\"heading\" class=\"nav_headline\">"+getLangObject().student_services.title+"</li>"+//Heading Student Services
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"student_services/university_gastronomy.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().student_services.university_gastronomy+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"student_services/counselling_kids_social.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().student_services.counselling_kids_social+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"student_services/habitation.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().student_services.habitation+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"student_services/student_financial_aid.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().student_services.student_financial_aid+"</a></li>"+
	 			"<li data-role=\"list-divider\" role=\"heading\" class=\"nav_headline\">"+getLangObject().extras.title+"</li>"+//Heading Extras
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"extras/faq.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().extras.faq+"</a></li></a>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"extras/campus_map.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().extras.campus_map+"</a></li>"+
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"extras/bus_schedule.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().extras.bus_schedule+"</a></li>"+
	 			"<li data-role=\"list-divider\" role=\"heading\" class=\"nav_headline\">"+getLangObject().options.title+"</li>"+//Heading Options
	 				"<li data-icon=\"false\" class=\"nav_listitem ui-btn\"><a href=\"options/settings.html\" data-transition=\"slide\" class=\"nav_a\">"+getLangObject().options.settings+"</a></li>"+
			"</ul>");
	});

/*------------------------------ KIZ ------------------------------------------------------------------------------------------------------------------------------*/
				  
	$('#kiz').live('pageshow', function(){							//start when page loads
		$('#kiz').find('div.headline').text(getLangObject().pages.kiz.headline);
		if(checkConnection()) {
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
		$('#lecture_times').find('div.headline').text(getLangObject().pages.lecture_times.headline);
		//if(checkConnection()) {
			alert("Aktueller Status: "+checkConnection());
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
		/*} else {//if no internet connection available
			alert("Aktueller Status: "+checkConnection());
		}*
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
								 
		$('#lecture_directory').find('div.headline').text(getLangObject().pages.lecture_directory.headline);
		
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

/*------------------- Settings ------------------------------------------------------------------------------------------------------------*/
	
	$('#settings').live('pageshow', function(){
		$('#settings').find('div.headline').text(getLangObject().pages.settings.headline);
		$('#settings').find('div.content').append("<div data-role=\"collapsible\" data-inset=\"false\" data-collapsed-icon=\"arrow-d\" data-expanded-icon=\"arrow-l\" data-iconpos=\"right\" class=\"lecture_directory_acc_element\">"+
													"<h3 class=\'lecture_directory_headings\'><font>"+getLangObject().pages.settings.selectmenu_title+"<font></h3>"+
												  	"<p>"+
												  		"<select name=\"select-choice-0\" id=\"settings_selectmenu\">"+
												  			"<option value=\"en\">"+getLangObject().pages.settings.lang_option_one+"</option>"+
												  			"<option value=\"de\">"+getLangObject().pages.settings.lang_option_two+"</option>"+
												  		"</select></p>"+
												  "</div>").trigger('create');
		$('#settings_selectmenu option[value='+getLanguage()+']').attr("selected", "selected");
		$('#settings_selectmenu').selectmenu();
		$('#settings_selectmenu').selectmenu('refresh', true);
	});
				  
	$('#settings_selectmenu').live('change', function() {
		setLanguage($(this).val());
		$.mobile.changePage(window.location.href, { transition: 'none', reloadPage: true });
	});
});