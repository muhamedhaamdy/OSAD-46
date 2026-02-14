var navDiv = document.getElementById("navigation");
var navList = document.getElementById("nav");
var headerDiv = document.getElementById("header");
var img1 = headerDiv.getElementsByTagName("img")[0];

navDiv.style.textAlign = "center"; 
navDiv.style.marginTop = "150px";

navList.style.display = "inline-block";
navList.style.listStyleType = "circle"; 

img1.style.position = "absolute";
img1.style.top = "0px";
img1.style.right = "0px";

var img2 = img1.cloneNode(true);
document.body.appendChild(img2);

img2.style.top = "auto";   
img2.style.right = "auto"; 

img2.style.position = "absolute";
img2.style.bottom = "0px";
img2.style.left = "0px";