window.addEventListener("load",function(){

let displayMapButton=this.document.querySelectorAll('input')[0];
let detailedInfoButton=this.document.querySelectorAll('input')[1];
let myMap=this.document.querySelector(".myMap");

//succes function
function succesFun(locationObj){
    let  lat=locationObj.coords.latitude;
    let  lng=locationObj.coords.longitude;
    //use google object 
    let googleObj=new google.maps.LatLng(lat,lng);
    //create speces object
    let specs={zoom:10,center:googleObj};
    //return image map
    let imgMap=new Image();
   let returnMap =new google.maps.Map(myMap,specs);
    imgMap.src=returnMap;
    //marker object
    let markerParameterObj={position:googleObj,map:returnMap,title:"your location"};
    let marker=new google.maps.Marker(markerParameterObj);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    myMap.appendChild(imgMap);
     
}
//error function
function errorFun(errorObj){
    switch (errorObj.code){
        case errorObj.PERMISSION_DENIED:
            alert("you denied so you will not be able to know your location");
            break;
        case errorObj.TIME_OUT:
            alert("time out try again");
            break;
        case errorObj.POSITION_UNAVAILABLE:
            alert("your poistion not avaliable");
            break;
        case errorObj.UNKOWN_ERROR:
            alert("unkown error");
            break;
    }
}
//succes function for detailed information
function succesFun2(loc){
    let lat=loc.coords.latitude;
    let lng=loc.coords.longitude;
    let acurr=loc.coords.accuracy;
    let timestamp=loc.timestamp;

    //create new div
    
    var d=new Date(timestamp);
    let model=document.querySelector(".infDiv");
    
    myMap.innerText="";
    let newDiv=document.createElement("div");
    newDiv.innerHTML=model.innerHTML;
    newDiv.classList.add("infDiv");
    newDiv.style.visibility="visible";
    myMap.appendChild(newDiv);
   
    document.querySelectorAll(".infDiv input")[0].value=lat;
    document.querySelectorAll(".infDiv input")[1].value=lng;
    document.querySelectorAll(".infDiv input")[2].value=acurr;
    document.querySelectorAll(".infDiv input")[3].value=d;


}
//display map button event handling
displayMapButton.onclick=function(){
   if(navigator.geolocation){
      let geoObj=navigator.geolocation.getCurrentPosition(succesFun,errorFun);
   }else{
   myMap.innerText="apdate your browser and try again";
   }
}//end of display map button



//detailed information button event handling
detailedInfoButton.onclick=function(){
    if(navigator.geolocation){
        let geoObj=navigator.geolocation.getCurrentPosition(succesFun2,errorFun);
     }else{
     myMap.innerText="apdate your browser and try again";
     }
  }//end of detailed information button event handling




});//end of load