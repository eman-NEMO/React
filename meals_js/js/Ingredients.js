let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

async function searchByName(s) {
  fetchData();
}

// async function searchByName(s) {
//   // Show the loading section
//   console.log(s)
//   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`)
//   response = await response.json()
 

//   console.log(response.meals)
//   display(response.meals)
  
// }

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
});








async function fetchData(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals)
   displayIng(response.meals)
};

function displayIng(Ing){
   var cartoona=``
   for(var i=0;i<20;i++){
    cartoona+=`<div class="var col-md-3 text-center mt-4" data-category="${Ing[i].strIngredient}">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3 class="areaName">${Ing[i].strIngredient}</h3>

    <p>${Ing[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>`
   }
   document.getElementById('row').innerHTML=cartoona

   $('.col-md-3').click(function(e){
    var Ingg = e.currentTarget.getAttribute("data-category");
        fetchIngIngMeals(Ingg)
   })
}

 async function fetchIngIngMeals(Ingg){
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingg}`)
   response = await response.json()
  display(response.meals)
  console.log(response.meals)
//   displayAreas(response.meals)
}
function display(meals){
   var cartoona2 = ``;
   for (var i = 0; i < meals.length; i++) {
       cartoona2 += ` 
          <div class="col-md-3" id="se">
          <img src="${meals[i].strMealThumb}" alt="" class="w-100  " id="serImg">
          <div class="layerName"  data-category=${meals[i].idMeal}>
             <div class="  d-flex justify-content-center align-content-center"> <p class="name">${meals[i].strMeal}</p></div>
           </div>
           
       </div>
        `;
     }
     document.getElementById("row").innerHTML = cartoona2;
 
     $(".layerName").click((e) => {
        var MealName  = e.currentTarget.getAttribute("data-category");
       // console.log(MealName)
         fetchDataId(MealName)
      // showDetails(e.target.id);
     });
   }
 
   async function fetchDataId(MealName){
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealName}`)
      response = await response.json()
      console.log(response.meals,"yuiop")
      showDetails(response.meals)
   }


   function showDetails(searchByNameArr) {
      console.log('okkk',searchByNameArr[0].strMealThumb)
      var cartoona = ``;
      cartoona += `
        
        <div class="col-md-4">
        <img src="${searchByNameArr[0].strMealThumb}" alt="" class="w-100">
        <h2>${searchByNameArr[0].strMeal}</h2>
    </div>
    
    <div class="col-md-8 ">
        <h2 class="text-center">Instructions</h2>
        <p>${searchByNameArr[0].strInstructions}</p>
    
        <h2>Area: ${searchByNameArr[0].strArea}</h2>  
        <h2>Category:${searchByNameArr[0].strCategory} </h2>  
        <h2>Recipes :</h2>
        <div class=" d-flex flex-wrap"> 
        `
    
        for (var i = 1; i <= 20; i++) {
          var str="strMeasure" + (i)
          var value = searchByNameArr[0][str];
          if (value && value.trim() !== "") {
            console.log(searchByNameArr[0][str])
            cartoona += `
              <div class="tags rounded-2 m-3">${searchByNameArr[0][str]}</div>
            `;
          }
        }
      cartoona+=`</div>
      <div class="youtube">
      <h2>tags</h2>
      `
      if(searchByNameArr[0].strTags){
        cartoona+=`
        <p>${searchByNameArr[0].strTags}</p>
      `
      }
     cartoona+=`
     <button class="btn btn-success mb-5"><a href="${searchByNameArr[0].strSource}" target="_blank">Source</a></button>
     <button class="btn btn-danger mb-5"><a href="${searchByNameArr[0].strYoutube}" target="_blank">Youtube</a></button>
     </div>
     </div>
     `
        
     document.getElementById('row').innerHTML=cartoona   
     document.getElementsByClassName('row').innerHTML=` `
        
    }
    