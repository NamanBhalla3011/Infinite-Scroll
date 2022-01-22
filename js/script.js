let imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let imageType;
//Unsplash API
const count = 3;
const apiKey = 'h7N1s9DxwkFKSOhEqZZEVh-qjCnaJA2v20dNOiQk6oY';
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//search query
function searchType() {
  imageContainer.remove();
    imageContainer = document.createElement("Div");
    imageContainer.id="image-container";
    imageContainer.classList.add("image-container");
    document.body.appendChild(imageContainer);
    imageType = document.getElementById('filter').value;
    console.log(imageType);
    
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${imageType}&count=${count}`;
    getPhotos();
}


//Check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
        
    }
}


//Helper Funtion to set attribute on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, Add to the dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
        //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // Put <img> inside <a>, then put both inside image container Element
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //event listerner, check when each loading finished
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}


//Get photos from unsplash api

async function getPhotos() {
    try {
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        //Catch error
    }
}
//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        console.log('load more');
        getPhotos();
    }
});



// On load
getPhotos();