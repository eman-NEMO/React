let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

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
})


async function searchByName(s) {
  // Show the loading section
  console.log(s)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`)
  response = await response.json()
 

  console.log(response.meals)
  display(response.meals)
  
}
async function searchByFirstL(s) {
  // Show the loading section
  console.log(s.value)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${s}`)
  response = await response.json()
  

  console.log(response.meals)
 
  display(response.meals)
  
}


function display(searchByNameArr){
  var cartoona2 = ``;
  for (var i = 0; i < searchByNameArr.length; i++) {
      cartoona2 += ` 
         <div class="col-md-3" id="se">
         <img src="${searchByNameArr[i].strMealThumb}" alt="" class="w-100  " id="serImg">
         <div class="layerName" id=${i}>
            <div class="  d-flex justify-content-center align-content-center"> <p class="name">${searchByNameArr[i].strMeal}</p></div>
          </div>
          
      </div>
       `;
    }
    document.getElementById("row").innerHTML = cartoona2;

    $(".layerName").click((e) => {
     showDetails(e.target.id,searchByNameArr);
    });
}



function showDetails(id,searchByNameArr) {
  console.log('okk')
  var cartoona = ``;
  cartoona += `
    
    <div class="col-md-4">
    <img src="${searchByNameArr[id]?.strMealThumb}" alt="" class="w-100">
    <h2>${searchByNameArr[id]?.strMeal}</h2>
</div>

<div class="col-md-8 ">
    <h2 class="text-center">Instructions</h2>
    <p>${searchByNameArr[id]?.strInstructions}</p>

    <h2>Area: ${searchByNameArr[id]?.strArea}</h2>  
    <h2>Category:${searchByNameArr[id]?.strCategory} </h2>  
    <h2>Recipes :</h2>
    <div class=" d-flex flex-wrap"> 
    `

    for (var i = 1; i <= 20; i++) {
      var str="strMeasure" + (i)
      var value = searchByNameArr[id][str];
      if (value && value.trim() !== "") {
        console.log(searchByNameArr[id][str])
        cartoona += `
          <div class="tags rounded-2 m-3">${searchByNameArr[id][str]}</div>
        `;
      }
    }
  cartoona+=`</div>
  <div class="youtube">
  <h2>tags</h2>
  `
  if(searchByNameArr[id].strTags){
    cartoona+=`
    <p>${searchByNameArr[id].strTags}</p>
  `
  }
 cartoona+=`
 <button class="btn btn-success mb-5"><a href="${searchByNameArr[id].strSource}" target="_blank">Source</a></button>
 <button class="btn btn-danger mb-5"><a href="${searchByNameArr[id].strYoutube}" target="_blank">Youtube</a></button>
 </div>
 </div>
 `
    
 document.getElementById('row').innerHTML=cartoona   
 document.getElementsByClassName('row').innerHTML=` `
    
}






/**
 *
 */
// strArea -->area
//strCategory -->category
//strInstructions-->instructions
//strMeasure1
//strSource
//strTags
//strYoutube
//strMealThumb-->image
//strMeal-->name

// getting data from Api

// var x=new XMLHttpRequest()

// x.open('get','www.themealdb.com/api/json/v1/1/search.php?s=$')
// x.send()
// x.addEventListener('readystatechange',function(){

//   if(x.readyState==4){
//     console.log(JSON.parse(x.responseText))
//   }
// })

// syncronous js

//1-callback
// function getpasta(){
//     var x=new XMLHttpRequest()

// x.open('get','https://forkify-api.herokuapp.com/api/search?q=pasta')
// x.send()
// x.addEventListener('readystatechange',function(){

//   if(x.readyState==4){
//     console.log(JSON.parse(x.responseText))
//     console.log("pasta")
//   }
// })
// }

// function getPizza(callback){
//     var x=new XMLHttpRequest()

// x.open('get','https://forkify-api.herokuapp.com/api/search?q=pizza')
// x.send()
// x.addEventListener('readystatechange',function(){

//   if(x.readyState==4){
//     console.log("pizza")
//     console.log(JSON.parse(x.responseText))
//     callback()
//   }
// })
// }

// getPizza(function(){
//      getpasta()
// })

// function getPizza(){
//     return new Promise(function(callback){
//         var x=new XMLHttpRequest()

//         x.open('get','https://forkify-api.herokuapp.com/api/search?q=pizza')
//         x.send()
//         x.addEventListener('readystatechange',function(){

//           if(x.readyState==4){
//             console.log("pizza")
//             console.log(JSON.parse(x.responseText))
//             callback()
//           }
//         })
//     })
// }

// problem of callback hell
// solution is then but not betterthing at all لازم الفنكشن ترجع promise
// getPizza().then(function(){
//     getpasta().then()// etc .....
// })

// using async, await function

// async function call(){
//     await getpizza()
//     await getpasta()
//     await demo()
// }

// using fetch from api

// ( async function(){

//     var response=await fetch('url')//default is get
//     var data=await response.json()
//     console.log(data)

// })()

// let btn =document.getElementById('btn')
// btn.addEventListener('click',()=>{
//     $('div').show(1000)
// })

// Jquery
// $('#btn').click(()=>{
//     $('div').show(1000)
// })
// one after one one by one
// $('#btn').click(()=>{
//     $('div').slideUp(1000,()=>{
//         $('#btn').slideUp(1000)
//     })
// })
// or
// $('#btn').click(function(){
//     $('div').slideUp(1000,()=>{
//         $(this).slideUp(1000)
//     })
// })
// or
//  callback
//  $('#btn').click(function(){
//     let that=this
//     $('div').slideUp(1000,function(){
//         $(that).slideUp(1000)
//     })
// })

// chaining اكتر من ايفنت علي نفس الاليمنت
// $('#btn').click(function(){
//     // $('div').slideUp(1000)
//     // $('div').slideDown(1000)
//     // $('div').slideUp(1000)
//     // $('div').slideDown(1000)
//     $('div').slideUp(1000).slideDown(1000).slideUp(1000)
// })
//الفنكشن بتستني بعضها علي عكس الحاجات اللي فوق
// $('#btn').click(function(){
//     $('.demo').animate({width:"500px"},1000) //or
//     $('.demo').animate({width:"+=500px"},1000) //or
//     $('.demo').animate({width:"-=500px"},1000) //or
//     // animate in qeuery doesnot work in background color

// })

// $('#mysec').animate({width:"100%"},1000)
// $('#mysec').animate({height:"100vh"},1000,()=>{
//      $('h1').fadeIn(1000,()=>{
//         $('.col-md-4').slideDown(1000,()=>{
//             $('h4').fadeIn(1000)
//         })
//     })
// })

/**
 * setter
 * css
 * html=innerhtml
 * text
 * val
 * attr
 */
// $('#btn').click(()=>{
// //    $('.demo').css('backgroundColor','#09c')// set
//   let x= $('.demo').css('backgroundColor')// get
//   console.log(x)
// })
//html
// $('#btn').click(()=>{
// //    $('.demo').css('backgroundColor','#09c')// set
//  // $('.demo').html('<h1>ahmed</h1>')// setter
// // setter
// let x= $('.demo').html()//getter
//   console.log(x)
// })

// $('#btn').click(()=>{

//     // let x= $('.demo').text()//getter text only not tag
//     // let x= $('.demo').text('ahmed')//put text only not tag
//     //   console.log(x)
//     //
// })
// $('#btn').click(()=>{
//   let x=$('#inpu').val()//get value of the input fielid

//     })
// $('#btn').click(()=>{
//   let x=$('#inpu').attr('id')//get value of the input atribute
//   let y=$('#inpu').attr('class','form-control')//set value of the input atribute
//   let z=$('#inpu').attr('type','text')// show password

//     })

// $('img').click(()=>{
//  let scr=$('img').attr('src')
//  console.log(scr)

// })

// example

// $('.small').click(function(){
//     let x=$(this).attr('src')
//     $('.big').attr('src',x)
//     console.log(x)
// })

/**
 * append
 * preappend
 * after
 * before
 * empty
 * remove
 * width
 * innerWidth->width+padding
 * outerWidth->width+padding+border
 */
// let x=$('.demo').append('<a>google</a>')
