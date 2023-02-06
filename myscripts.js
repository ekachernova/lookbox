
//humburger menu function

function myFunction() {
    var x = document.getElementById("menu");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }


// creating outfits functions >>

// upload images
let imageElement = document.getElementById("image-input");

let outfit = {};
let images = [];

//load the images from PC using onchange event + fileReader object
imageElement.onchange = function () {
    let reader = new FileReader();
    reader.onload = function () {
        let img = document.getElementById("img");
        const i = images.push(reader.result);
        renderImage(reader.result, i); // index has been added to allow other function to see it
        saveImages();
    }
    reader.readAsDataURL(this.files[0]);

}

function saveImages () {
    localStorage.setItem("images",JSON.stringify(images))
}

function loadImages() {
    
    images = JSON.parse(localStorage.getItem("images"));
    if (images === null) {
        images = [];
    }
}

function renderImage(src, i) {
    let wrapper = document.getElementById("gallery");
    let imageWrapper = document.createElement("div"); //creating the div for image in the gallery
    let image = document.createElement("img"); // creating the HTML element img
    image.draggable = true; //set the attribute to get img to be draggable
    image.ondragstart = function(ev) {
        ev.dataTransfer.setData("text/plain",src);
    };

    //set removing items from the gallery
    image.onclick = function(ev) {
        images.splice(i, 1);
        image.remove();
        saveImages();
    };

    image.src = src
    image.width = "200";
    image.height = "240";
    wrapper.append(image);
}

loadImages();


for (let i=0; i < images.length; i++) {
    renderImage(images[i], i);
}

function allowDrop (event) {
    event.preventDefault();
}

function dropImage(event) {
    let data = event.dataTransfer.getData("text/plain");
    event.preventDefault();
    let target = event.target;
    let outfitPart = target.className;
    if (outfitPart === 'bottom') {
        outfit.bottom = data;
    } else if (outfitPart === 'shoes') {
        outfit.shoes = data;
    } else if (outfitPart === 'bag') {
        outfit.bag = data;
    } else if (outfitPart === 'top') {
        outfit.top = data;
    }
    
    localStorage.setItem("outfit",JSON.stringify(outfit));


   createImage(data,event.target);
}

//creating the image for the collage 
function createImage(outfitImage, outfitContainer) {
	
    let outfitPart = outfitContainer.className;
    let image = document.createElement("img");

    console.log("image" + outfitImage);
    

    image.src = outfitImage;
   
    image.width = "200";
    image.height = "240";
    outfitContainer.innerHTML = "";
    if (outfitImage) {

        outfitContainer.appendChild(image);
        
    }

    //removing item from the collage
    image.onclick = function(ev) {
      image.remove();
      if (outfitPart === "shoes") {
      	outfit.shoes = "";
      } else if (outfitPart === "bag") {
      	outfit.bag = "";
      }else if (outfitPart === "bottom") {
        outfit.bottom = "";
    }else if (outfitPart === "top") {
        outfit.top = "";
    }

    function saveOutfit() {
        localStorage.setItem("outfit",JSON.stringify(outfit));

     }
    saveOutfit();
  }
}

function loadOutfit () {

    outfit = JSON.parse(localStorage.getItem("outfit"));
    if (outfit === null) {
        outfit = {};
    }
    let topImage = outfit.top;
    let topContainer = document.getElementsByClassName('top')[0];
    createImage(topImage, topContainer);

    let bottomImage = outfit.bottom;
    let bottomContainer = document.getElementsByClassName('bottom')[0];
    createImage(bottomImage, bottomContainer);

    let bagImage = outfit.bag;
    let bagContainer = document.getElementsByClassName('bag')[0];
    createImage(bagImage, bagContainer);

    let shoesImage = outfit.shoes;
    let shoesContainer = document.getElementsByClassName('shoes')[0];
    createImage(shoesImage, shoesContainer);

}

loadOutfit();

function clearGallery() {
    images.splice(0,images.length);
    let gallery = document.getElementById("gallery");
    gallery.textContent = "";
    localStorage.clear();
}

function saveOutfitToTheGallery() {
    
}











