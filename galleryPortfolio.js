		var currentText= 'null';
		var currentImage='img/google.jpg';
		var oldText ='null';

		var activeImage = '0_0_0';
		var oldImage = 'null';

		var pause = false; //pause gallery ani


		$.fx.speeds._default = 1000;




		// open textfield
		function openTextfield(cat){
			var catName = cat;
			var catNumber = 0;
			var  node = document.getElementById('projects');

			while (node.hasChildNodes()) {
					node.removeChild(node.lastChild);
			}



			//search for cat
			for(n=0; n < data.length; n++){
					if(data[n].cat == catName){
							catNumber = n;
					}
			}

			for(i=0; i < data[catNumber].projects.length; i++){
						//console.log(data[catNumber].projects[i].title);
						//create project title
						var newProjectContainer = document.createElement('UL');
						document.getElementById('projects').appendChild(newProjectContainer);

						var lastContainer = document.getElementById('projects').lastChild;
						lastContainer.id = data[catNumber].projects[i].ID;
						lastContainer.addEventListener("click", function(){
																																switchGallery(this.id);
																																openProjectText(this.id);
																																cleanBorder(node);
																																this.className = "border";
																															});
						var newProject = 	document.createElement('LI');
						lastContainer.appendChild(newProject);
						lastContainer.lastChild.innerHTML = data[catNumber].projects[i].title;
						lastContainer.lastChild.style.color = "black";
						lastContainer.lastChild.style.fontSize = "10pt";
						lastContainer.lastChild.style.letterSpacing = "5px";
						lastContainer.lastChild.style.cursor = "pointer";



						var newProjectDesc = document.createElement('LI');
						lastContainer.appendChild(newProjectDesc);
						lastContainer.lastChild.innerHTML = data[catNumber].projects[i].description;

						var newProjectTech = document.createElement('LI');
						lastContainer.appendChild(newProjectTech);
						lastContainer.lastChild.innerHTML = data[catNumber].projects[i].software;
						lastContainer.lastChild.style.fontSize = "9pt";
						lastContainer.lastChild.style.marginBottom = "5px";

						//create project author and link
						var newProjectInfo = document.createElement('LI');
						var newProjectInfoString = "by ";
						newProjectInfoString = newProjectInfoString.concat(data[catNumber].projects[i].author, ", ",data[catNumber].projects[i].ref);
						lastContainer.appendChild(newProjectInfo);
						lastContainer.lastChild.innerHTML = newProjectInfoString;
						lastContainer.lastChild.style.color = "black";
						lastContainer.lastChild.style.fontSize = "9pt";
						lastContainer.lastChild.style.marginBottom = "35px";
						lastContainer.lastChild.style.cursor = "pointer";
						var url = data[catNumber].projects[i].ref;
						lastContainer.lastChild.onclick = function(catNumber, i){window.open(url)};
						$(lastContainer.lastChild).hover(function(){this.style.textDecoration = "underline"}, function(){this.style.textDecoration = "none"});

			}
		};

function openProjectText(projectID){
		var cat = activeImage.charAt(0);
		var project = activeImage.charAt(2);
		var node = document.getElementById('projText');

		//console.log(activeImage);

		console.log("open text");
		var newDiv = document.createElement('div');
		var newDivId = "text_";
		newDivId.concat(projectID);
		newDiv.id=newDivId;
		newDiv.innerHTML = data[cat-1].projects[project-1].text;


		while (node.hasChildNodes()) {
    		node.removeChild(node.lastChild);
		}
		node.appendChild(newDiv);
}


function switchGallery(elementId){
			var cat = elementId.charAt(0);
			var project = elementId.charAt(2);
			activeImage = cat.concat("_",project,"_0");
			var node = document.getElementById('imageIndicator');


			//remove old circles
			while (node.hasChildNodes()) {
	    		node.removeChild(node.lastChild);
			}

			//create new circles with links to images
			for(i=0; i<data[cat-1].projects[project-1].images.length; i++){
				var newCircle = document.createElement('DIV');
				node.appendChild(newCircle);
				node.lastChild.class="imageCircles";
				node.lastChild.id=i;
				node.lastChild.addEventListener("click", function(){switchToImage(this.id);});
				$(node.lastChild).hover(function(){pause = true;}, function(){pause = false;});

			}

			document.getElementById('secImage').src = data[cat-1].projects[project-1].images[0].imageUrl;
			$(document.getElementById('firstImage')).transition({  opacity:0 });

}

function switchToImage(imageID){
	var cat = activeImage.charAt(0);
	var project = activeImage.charAt(2);
	console.log("switch image");
	//console.log(imageID);
	//set front invisible front image to current image
	document.getElementById('firstImage').src = data[cat-1].projects[project-1].images[imageID].imageUrl;
	//set changed front image to visible
	document.getElementById('firstImage').style.opacity = 1;
	//save current image var
	activeImage = cat.concat('_',project,'_',imageID);

	//set all circles to low opacity
	console.log(document.getElementById('imageIndicator').children);
	for(i=0; i<document.getElementById('imageIndicator').children.length; i++){
		document.getElementById('imageIndicator').children[i].style.opacity = 0.5;
	}
	document.getElementById(imageID).style.opacity = 1;


}

function galleryAni(){
		var cat = activeImage.charAt(0);
		var project = activeImage.charAt(2);
		var image = activeImage.charAt(4);
		// console.log("change gallery image");
		// console.log(activeImage);

		if(cat!=0 && !pause){
		//set front invisible front image to current image
		document.getElementById('firstImage').src = data[cat-1].projects[project-1].images[image].imageUrl;

		//set changed front image to visible
		document.getElementById('firstImage').style.opacity = 1;

		image++;

		//set hidden background image to new image
		document.getElementById('secImage').src = data[cat-1].projects[project-1].images[(image)%data[cat-1].projects[project-1].images.length].imageUrl;
		//fade out front image
		$(document.getElementById('firstImage')).transition({  opacity:0 });

		//set all circles to low opacity
		 for(i=0; i<document.getElementById('imageIndicator').children.length; i++){
		 	document.getElementById('imageIndicator').children[i].style.opacity = 0.5;
			//$(document.getElementById((image+1)%data[cat-1].projects[project-1].images.length).children[i]).transition({ opacity:0,5 });

		 }

		$(document.getElementById((image)%data[cat-1].projects[project-1].images.length)).transition({ opacity:1 });
		//save current image var
		activeImage = cat.concat('_',project,'_',(image)%(data[cat-1].projects[project-1].images.length));
		//console.log(data[cat-1].projects[project-1].images.length);
		//console.log(activeImage);
	}
}


function cleanBorder(parent){
	var nodes = parent.childNodes;
	for(i=0; i<nodes.length; i++) {
    	nodes[i].className = "";
	}
}


		//return textfields


		function returnTextfield(){
			    $(document.getElementById('t1')).transition({  y:0 });
      			$(document.getElementById('t2')).transition({  y:0 });
      			$(document.getElementById('t3')).transition({  y:0 });
      			currentText = 'null';

		};







		//change image, ,triggered in html
		function changeImage(fromParameter, toParameter){
			 //set current image as image1
    		document.getElementById('11img').src=fromParameter;
    		//set image1 opacity to 100
    		$(document.getElementById('11img')).css({  opacity:100 });
    		//set image2 to new image
    		document.getElementById('12img').src=toParameter;
    		//fade out image1
      		$(document.getElementById('11img')).transition({  opacity:0 });
			currentImage = toParameter;

		};



		//image preloader


function preloader() {
	if (document.images) {
		var img1 = new Image();
		var img2 = new Image();
		var img3 = new Image();
		var img4 = new Image();

		var img5 = new Image();
		var img6 = new Image();
		var img7 = new Image();

		var img8 = new Image();
		var img9 = new Image();
		var img10 = new Image();

		//spatial
		img1.src = "exhiWork/ex00.jpg";
		img2.src = "exhiWork/ex01.jpg";
		img3.src = "exhiWork/ex02.jpg";
		img4.src = "exhiWork/ex04.jpg";


		//gadgets
		img5.src = "gadgets/hamster.jpg";
		img6.src = "gadgets/ta.jpg";
		img7.src = "gadgets/nearness.jpg";

		//media
		img8.src = "corpIden/diverse.jpg";
		img8.src = "grafWork/mBT00.jpg";
		img8.src = "grafWork/sketchArt.jpg";

	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(preloader);
