// lees image bestand
function readFile(input){
		if(input.files && input.files[0]) {
				var reader = new FileReader();

				// check file
				if (input.files[0].type.match("image.*")) {
						reader.onload = function (evt) {
						
						// controleer rotatie, pas aan als nodig 
						/*
						var rotation = false;
						EXIF.getData(input.files[0], function() {
				  		//alert(EXIF.pretty(this));
							if(EXIF.getTag(this, "Orientation")) {
			     			rotation = EXIF.getTag(this, "Orientation");	      	
							}
							console.log(rotation);
							if (rotation != 1 || rotation != false) {
								//rotateImage(evt.target.result, rotation);
								//document.getElementById("rotator").src = evt.target.result;
							} 
						});
						*/

						// toon afbeelding
						document.documentElement.style.backgroundImage = "url("+evt.target.result+")";						
						saveImage(evt.target.result);
					}
					reader.readAsDataURL(input.files[0]);
				}
		}
}

// roteer functie
function rotateImage(imageDate, rotation) {
	if (rotation == 3) {   			 	
			// rotate 180 graden
 	} else if (rotation == 6) {
			// rotate 90 graden CW 
 	} else if (rotation == 8) {	 
 	  	// rotate 90 CCW
  }
}
// verstuur image via ajax
function saveImage(imgData) {
			$.ajax({
	 		  url: "http://auberginator.com/saveaubergine.php",
	     	type: "POST",
	     	data: {'img' : imgData},
	     	/*success: function() {
	 				console.log(imgData);
	   		},
	   		error: function() {
	     		console.log('Error occured');
	   		}*/
	});
}
// random getal
function randomIntFromInterval(min,max)	{
		return Math.floor(Math.random()*(max-min+1)+min);
}
// toon uploader div
function toonUploader() {
		document.getElementById("uploader").className = "show";
		document.getElementById("opener").style.zIndex = "-10";
} 
// verstop uploader
function hideUploader() {
		document.getElementById("uploader").className = "";
		document.getElementById("opener").style.zIndex = "10";
} 
// new image 
function newImage() {
		document.location.reload();
}
// change category 
function changeCat(c) {
		var imageSrc;
		switch(c) {
		case 'all':
			imageSrc = "http://lorempixel.com/400/600/";
			break;
		case 'people':
			imageSrc = "http://lorempixel.com/400/600/people/";
			break;
		case 'animal':
			imageSrc = "http://lorempixel.com/400/600/animals/";
			break;
		case 'sport':
			imageSrc = "http://lorempixel.com/400/600/sports/";
			break;
		case 'fashion':
			imageSrc = "http://lorempixel.com/400/600/fashion/";
			break;
	} 
	document.documentElement.style.backgroundImage = "url("+imageSrc+")";
	hideUploader();
}

// new aubergine
function newAubergine() {
		var h 				= window.innerHeight;
		var w					= window.innerWidth;
		var maxsize		= w/2;
		var rotate		= randomIntFromInterval(1,360);
		var size			= randomIntFromInterval(30,maxsize);
		var top				= randomIntFromInterval(5,h-(size/2*3));
		var left		  = randomIntFromInterval(5,w-(size/2*3));
		
		// rotation
		document.getElementById("aubergine").style.WebkitTransform = "rotate("+rotate+"deg)"; 
		document.getElementById("aubergine").style.msTransform = "rotate("+rotate+"deg)"; 
		document.getElementById("aubergine").style.transform = "rotate("+rotate+"deg)";
		
		// size
		document.getElementById("aubergine").style.width = size+"px";
		
		// position
		document.getElementById("aubergine").style.top = top+"px";
		document.getElementById("aubergine").style.left = left+"px";
}
	
// voer uit
document.addEventListener("DOMContentLoaded", function(event) { 			
		newAubergine();
	
		$('#aubergine').draggable({
		  containment: "window"
		});
		$("#fileToAubergine").change(function(){
				readFile(this);
				hideUploader();
		});
	});
