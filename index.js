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
	
	var nav = document.getElementById("nav");
	var text = document.getElementById("text");
	var info = document.getElementById("info");

	var details = document.getElementById("details");
	
	
	//nav.style.marginTop==="70%"; 
		//text.style.left= "-30%";
		//nav.style.marginLeft= "0%";
		//info.style.left= "40%";
		//displayNewData(source);
	

}

function shiftPageInit(source) {
	
	var nav = document.getElementById("nav");
	var text = document.getElementById("text");
	var info = document.getElementById("info");

	var details = document.getElementById("details");
if (source == "Back"){
	if(text.style.left==="-30%") {
		text.style.left= "10%";
		nav.style.marginLeft= "70%";
		info.style.left= "120%";
	}
	else {
		console.log("back");
	}

}
else{	
	if(nav.style.marginLeft==="70%") {
		text.style.left= "-30%";
		nav.style.marginLeft= "0%";
		info.style.left= "40%";
		displayNewData(source);
	}

	else {
		shiftChangeCategory(source);	
	}
}

}

/* When different category selected, change margin between elements in the
	navbar */
function shiftChangeCategory(source) {
	info.style.left="-50%";
	details.style.left= "40%";
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
					job_search("garcom", user_location);
					break;
				case 2: // Chef
					job_picture.src = 'Images/chef.jpg';
					job_search("Cozinheiro", user_location);
					break;
				case 3: // Kitchen Assistant
					job_picture.src = 'Images/assistantchef.jpg';
					job_search("Auxiliar Cozinha", user_location);
					break;
				case 4: // Restaurant Manager
					job_picture.src = 'Images/restaurantmanager.jpg';
					job_search("Gerente Restaurante", user_location);
					break;
			}
			break;
	}
}



function jobkey_search(jobkey, index){

    var job_title =       ["#jobtitle1", "#jobtitle2", "#jobtitle3"];
    var job_description = ["#jobdescription1", "#jobdescription2", "#jobdescription3"];
    var company =         ["#company1", "#company2", "#company3"];


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

  function job_search(keyword, location){

  // query general database 
   $.getJSON( "http://api.indeed.com/ads/apisearch?publisher=1392687517264254&format=json&co=br&limit=30&l="+location+"&q="+keyword+"&v=2", function(data){

    // query individual job result, get job-specific data
    for (var i = 0; i < jobs_per_page; i++) {
      jobkey_search(data.results[i].jobkey, i);
    };
    
   });
  }