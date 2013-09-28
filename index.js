/* HackTheChange 2013
	index.js */

var esporteImg = "Images/logochef.png";


/* When home page is first loaded, shift navbar to the left, hide the text, and
display the item's information */
function shiftPageInit() {
	
	var nav = document.getElementById("nav");
	var text = document.getElementById("text");
	var info = document.getElementById("info");
	
	if(nav.style.marginLeft==="70%") {
		text.style.left= "-30%";
		nav.style.marginLeft= "0%";
		info.style.left= "40%";
		displayNewData();
	}

	else {
		shiftChangeCategory();
	}

}

/* When different category selected, change margin between elements in the
	navbar */
function shiftChangeCategory() {
	

}

/* At every shift, whether by shiftPageInit or shiftChangeCategory, display
	the information for the current category selected */
function displayNewData() {
	


}