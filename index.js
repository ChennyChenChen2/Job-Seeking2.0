/* HackTheChange 2013
	index.js */

var job_sector_names = ["Agricultura", "Telemarketing", "Hotelaria"];

var jobs_per_page = 3;

var job_sector;
var job_category;

var user_location = "sao paulo";


/* When home page is first loaded, shift navbar to the left, hide the text, and
display the item's information */
function shiftPageDown() {
	$("#middle_container").toggle();
	fullJobSearch();
}

function fullJobSearch(){
	var query = document.getElementById("job_search").value
	job_search(query, user_location, 1);
	$("#all_jobtitle").text(query);
}

function shiftPageInit(source) {

	if( $("#middle_container").css("display") == 'block' ){
		$("#middle_container").toggle();
	}

	var nav = document.getElementById("nav");
	var text = document.getElementById("text");
	var info = document.getElementById("info");

	var details = document.getElementById("details");
	
	$("#text").toggle();
		info.style.left= "20%";
		displayNewData(source);
}

/* When different category selected, change margin between elements in the
	navbar */
function shiftChangeCategory(source) {

	$("#info").toggle();
	var details  = document.getElementById("details");

	//info.style.left="-50%";
	details.style.left= "5%";
	displayJobData(source);

}

/* At every shift, whether by shiftPageInit or shiftChangeCategory, display
	the information for the current category selected */
function displayNewData(source) {
	
	var img1  = document.getElementById("img1");
	var capt1 = document.getElementById("capt1");
	var img2  = document.getElementById("img2");
	var capt2 = document.getElementById("capt2");
	var img3  = document.getElementById("img3");
	var capt3 = document.getElementById("capt3");
	var img4  = document.getElementById("img4");
	var capt4 = document.getElementById("capt4");

	switch(source){ // source is the previous page

		case job_sector_names[0]: // Agricultura 
			job_sector = job_sector_names[0];
			break;
		case job_sector_names[1]: // Telemarketing
			job_sector = job_sector_names[1];
			break;
		case job_sector_names[2]: // Hotelaria
			job_sector = job_sector_names[2]; 
			img1.src 	= 'Images/waiter.jpg';
			$("#capt1").text("Waiter");
			img2.src 	= 'Images/chef.jpg'
			$("#capt2").text("Chef");
			img3.src 	= 'Images/assistantchef.jpg'
			$("#capt3").text("Kitchen Assistant");
			img4.src 	= 'Images/restaurantmanager.jpg'
			$("#capt4").text("Restaurant Manager");
			break; 
		default:
			break;
	}
}

function displayJobData(job_index){

	var job_picture = document.getElementById("job_picture");
	var job_title 	= document.getElementById("job_title");

	switch(job_sector){
		case job_sector_names[0]: // Agriculture
			switch(job_index){
				case 1: 
					break;
				case 2: 
					break;
				case 3: 
					break;
				case 4: 
					break;
			}
			break;
		case job_sector_names[1]: // Telemarketing
			break;
		case job_sector_names[2]: // Hospitality
			switch(job_index){
				case 1: // Waiter
					job_picture.src = 'Images/waiter.jpg';
					$("#job_title").text("Garcom");
					job_search("garcom", user_location, 0);
					break;
				case 2: // Chef
					job_picture.src = 'Images/chef.jpg';
					$("#job_title").text("Cozinheiro");
					job_search("Cozinheiro", user_location, 0);
					break;
				case 3: // Kitchen Assistant
					job_picture.src = 'Images/assistantchef.jpg';
					$("#job_title").text("Auxiliar Cozinha");
					job_search("Auxiliar Cozinha", user_location, 0);
					break;
				case 4: // Restaurant Manager
					job_picture.src = 'Images/restaurantmanager.jpg';
					$("#job_title").text("Gerente Restaurante");
					job_search("Gerente Restaurante", user_location, 0);
					break;
			}
			break;
	}
}



function jobkey_search(jobkey, index, dataset){

if(dataset == 0){
	console.log("standard dataset");
    var job_title =       ["#jobtitle1", "#jobtitle2", "#jobtitle3"];
    var job_description = ["#jobdescription1", "#jobdescription2", "#jobdescription3"];
    var company =         ["#company1", "#company2", "#company3"];
}
else if (dataset == 1){
	console.log("all job dataset");
	var job_title =       ["#all_jobtitle1", "#all_jobtitle2", "#all_jobtitle3"];
    var job_description = ["#all_jobdescription1", "#all_jobdescription2", "#all_jobdescription3"];
    var company =         ["#all_company1", "#all_company2", "#all_company3"];
}

  // query individual job result
    $.getJSON( "http://api.indeed.com/ads/apigetjobs?publisher=1392687517264254&format=json&jobkeys="+jobkey+"&v=2", function(data){
      // set job title
      $(job_title[index]).text(data.results[0].jobtitle);
      $(job_title[index]).attr("href", data.results[0].url);
      // set job description
      $(job_description[index]).text(data.results[0].snippet);

      //set employer
      $(company[index]).text(data.results[0].company);
    });
  }

  function job_search(keyword, location, dataset){

  // query general database 
   $.getJSON( "http://api.indeed.com/ads/apisearch?publisher=1392687517264254&format=json&co=br&limit=30&l="+location+"&q="+keyword+"&v=2", function(data){

    // query individual job result, get job-specific data
    for (var i = 0; i < jobs_per_page; i++) {
      jobkey_search(data.results[i].jobkey, i, dataset);
    };
    
   });
  }

