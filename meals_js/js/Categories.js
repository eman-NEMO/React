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








async function fetchData() {
    // Show the loading section
    
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    response = await response.json()
   
    console.log('okk')
  
    display(response.categories)
    // display(response.meals)
    
};

  function display(searchByNameArr){
    var cartoona2 = ``;
    for (var i = 0; i < searchByNameArr.length; i++) {
        cartoona2 += `
           <div class="col-md-3 mb-5" id="se">
           <img src="${searchByNameArr[i].strCategoryThumb}" alt="" class="w-100  " id="serImg">
           <div class="layerName" data-category="${searchByNameArr[i].strCategory}">
           
              <div class="text-center p-3 text-center "><h2 class="name text-center">${searchByNameArr[i].strCategory}</h2><p>${searchByNameArr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p></div>
            </div>
            
        </div>
        `
         
      }
      document.getElementById("row").innerHTML = cartoona2;
  
      $(".layerName").click((e) => {
        var category = e.currentTarget.getAttribute("data-category");
        // console.log(category);
        DisplayCertainCategory(category)
      });
    }

  async function  DisplayCertainCategory(category){
    console.log("fghjkjlk;")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    DisplayMeals(response.meals)
    console.log(response.meals)
  }

 function DisplayMeals(meals){
   
        var cartoona2 = ``;
        for (var i = 0; i < meals.length; i++) {
            cartoona2 += ` 
               <div class="col-md-3 mb-2" id="se">
               <img src="${meals[i].strMealThumb}" alt="" class="w-100" id="serImg">
               <div class="layerName" data-category="${meals[i].idMeal}">
                  <div class=" d-flex justify-content-center align-content-center "> <h3 class="nameee">${meals[i].strMeal}</h3></div>
                </div>
                
            </div>
             `;
          }
          document.getElementById("row").innerHTML = cartoona2;
      
          $(".layerName").click((e) => {
            var categoryId = e.currentTarget.getAttribute("data-category");
            fetchDataId(categoryId)
          });
 }
   
 
async function fetchDataId(categoryId){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${categoryId}`)
    response = await response.json()
    console.log(response.meals)
    showDetails(response.meals)
 }
 function showDetails(searchByNameArr) {
    console.log('okk')
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
  
  
 
  