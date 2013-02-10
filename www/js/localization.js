var lang = "en";

function getLanguage() {
	return lang;
}

function setLanguage(language) {
	lang = language;
}

function getLangObject() {
	if(lang == "de")
		return localization.de;
	else return localization.en;
}

var localization = {
	"de" : {
		"uniulm" : {
			"title" : "Universit&auml;t Ulm",
			"kiz" : "Kommunikations- &amp; Informationszentrum",
			"student_counselling" : "Studienberatung",
			"secretarys_office" : "Studiensekretariat",
			"examination_board" : "Pr&uuml;fungsausschuss"
		},
		"study" : {
			"title" : "Studium",
			"re_registration" : "R&uuml;ckmeldung",
			"lecture_times" : "Vorlesungszeiten",
			"lecture_directory" : "Vorlesungsverzeichnis",
			"study_plans" : "Studienpl&auml;ne",
			"exam_regulations" : "Pr&uuml;fungsordnung",
			"student_card" : "Studierendenausweis"
		},
		"student_services" : {
			"title" : "Studentenwerk",
			"university_gastronomy" : "Hochschulgastronomie",
			"counselling_kids_social" : "Beratung, Kinder, Soziales",
			"habitation" : "Wohnen",
			"student_financial_aid" : "Studienfinanzierung"
		},
		"extras" : {
			"title" : "Extras",
			"faq" : "FAQ",
			"campus_map" : "Campusplan",
			"bus_schedule" : "Busfahrplan"
		},
		"options" : {
			"title" : "Optionen",
			"settings" : "Einstellungen"
		},
		"pages" : {
			"kiz" : {
				"headline" : "KIZ"
			},
			"lecture_times" : {
				"headline" : "Vorlesungszeiten"
			},
			"lecture_directory" : {
				"headline" : "Vorlesungsverzeichnis"
			},
			"settings" : {
				"headline" : "Einstellungen",
				"selectmenu_title" : "Sprachauswahl",
				"lang_option_one" : "Englisch",
				"lang_option_two" : "Deutsch"
			}
		}
	},
	"en" : {
		"uniulm" : {
			"title" : "Ulm University",
			"kiz" : "Communication and Information Center",
			"student_counselling" : "Student Counselling",
			"secretarys_office" : "Secretarys Office",
			"examination_board" : "Pr&uuml;fungsausschuss"
		},
		"study" : {
			"title" : "Study",
			"re_registration" : "Re-Registration",
			"lecture_times" : "Lecture Times",
			"lecture_directory" : "Lecture Directory",
			"study_plans" : "Study Plans",
			"exam_regulations" : "Exam Regulations",
			"student_card" : "Student Card"
		},
		"student_services" : {
			"title" : "Student Services",
			"university_gastronomy" : "University Gastronomy",
			"counselling_kids_social" : "Counselling, Kids, Social",
			"habitation" : "Habitation",
			"student_financial_aid" : "Student Financial Aid"
		},
		"extras" : {
			"title" : "Extras",
			"faq" : "FAQ",
			"campus_map" : "Campus Map",
			"bus_schedule" : "Bus Schedule"
		},
		"options" : {
			"title" : "Options",
			"settings" : "Settings"
		},
		"pages" : {
			"kiz" : {
				"headline" : "KIZ"
			},
			"lecture_times" : {
				"headline" : "Lecture Times"
			},
			"lecture_directory" : {
				"headline" : "Lecture Directory"
			},
			"settings" : {
				"headline" : "Settings",
				"selectmenu_title" : "Choose Language",
				"lang_option_one" : "English",
				"lang_option_two" : "German"
			}
		}
	}
};