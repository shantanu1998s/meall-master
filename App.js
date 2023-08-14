const get_name=localStorage.getItem("name");
if(get_name!==null){
    loginName=document.getElementById("loginName");
    loginName.innerHTML=get_name;
  }

const card = document.getElementById("meals");
const recipe = document.getElementById("recepi")
const calories = document.querySelectorAll(".calories")
const ingre=document.getElementById("ingredients-tab");
const step=document.getElementById("step-tab");
const equ=document.getElementById("equipment-tab");
const myform = document.getElementById('form');
const ingre_li=document.getElementById("ingredients");
const step_li=document.getElementById("step");
const equip_li=document.getElementById("equipment")
  ingre_li.style.color='#000000';
  step_li.style.color='#000000';
  equip_li.style.color='#000000';
var calorie;
var breakfastId, lunchId, dinnerId;
document.getElementById("ingredients-tab").style.backgroundColor= "orangered";
document.getElementById("ingredients-tab").style.color= "white";
document.getElementById("equipment-tab").style.color= "orangered";
document.getElementById("step-tab").style.color= "orangered"
function change1() {
    document.getElementById("ingredients-tab").style.backgroundColor= "orangered";
    document.getElementById("ingredients-tab").style.color= "white";
    document.getElementById("step-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("step-tab").style.color= "orangered"
    document.getElementById("equipment-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("equipment-tab").style.color= "orangered";
  }
  function change2() {
    document.getElementById("step-tab").style.backgroundColor= "orangered";
    document.getElementById("step-tab").style.color= "white";
    document.getElementById("ingredients-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("ingredients-tab").style.color= "orangered";
    document.getElementById("equipment-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("equipment-tab").style.color= "orangered";
  }
  function change3() {
    document.getElementById("equipment-tab").style.backgroundColor= "orangered";
    document.getElementById("equipment-tab").style.color= "white";
    document.getElementById("ingredients-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("ingredients-tab").style.color= "orangered";
    document.getElementById("step-tab").style.backgroundColor= "rgb(232, 224, 224)";
    document.getElementById("step-tab").style.color= "orangered";
  }

function checkData() {
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let activity = document.getElementById("activity").value;
  console.log(activity);
  let mealsBtn = document.getElementById("mealsbtn");
  
  if (height !== "" && weight !== "" && age !== "" && gender !== "other" && activity !== "other") 
  {
    mealsBtn.disabled = false;
    mealsBtn.classList.add("enabled");
    mealsBtn.classList.remove("disabled");
  } 
  else {
    mealsBtn.disabled = true;
    mealsBtn.classList.add("disabled");
    mealsBtn.classList.remove("enabled");
  }
}

 const btn= document.getElementById('mealsbtn');
 
 btn.addEventListener("click", calorieCal)
   
 function calorieCal(e) {
    e.preventDefault();

    const get_email=localStorage.getItem("email");
    const get_password=localStorage.getItem("password");
    const get_name=localStorage.getItem("name");

    if(get_email && get_name && get_password){
    var bmr;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var age = document.getElementById("age").value;
    var activity = document.getElementById("activity").value;
    var gender = document.getElementById("gender").value;
      
    if(height!="" && weight!="" && age!="" && activity!="other" && gender!="other")
    {
      if (gender === "male") {
        bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
      }
      else if (gender === "female"){
        bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
      }
      else
      return;
      if (activity === "light") {
        calorie = bmr * 1.375;
      }
      else if (activity === "moderate") {
        calorie = bmr * 1.55;
      }
      else if(activity === "active"){
        calorie = bmr * 1.725;
      }
      else if(activity=="extrem")
      calorie = bmr * 1.725;
      getMealData();
       myform.reset();
      btn.disabled = true;
      btn.classList.remove("enabled");
  }
  else
  alert("Please Fill All Required Element");
    }
    else{
        alert('You have to login first');
        location.replace("login.html")
    }
}

function getMealData() {
    fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=3fb6fbb1e04040a58d5edad8088c973f&timeFrame=day&targetCalories=${calorie}`
    )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            card.style.display = "block";
        })
        .catch((error) => {
            console.log(error);
        });
}

function setMealData(data) {
    setBreakFastData(data.meals[0]);
    setLunchData(data.meals[1]);
    setDinnerData(data.meals[2]);
}


function setBreakFastData(data) {
    breakfastId = data.id;
    const img = document.getElementById("breakfast-image");
    img.src = "https://spoonacular.com/recipeImages/" + breakfastId + "-556x370." + data.imageType;
    document.getElementById("breakfast-name").innerHTML = data.title;
    calories[0].innerHTML = calorie.toFixed(2)
}

function setLunchData(data) {
    lunchId = data.id;
    const img = document.getElementById("lunch-image");
    img.src = "https://spoonacular.com/recipeImages/" + lunchId + "-556x370." + data.imageType;
    document.getElementById("lunch-name").innerHTML = data.title;
    calories[1].innerHTML = calorie.toFixed(2)
}

function setDinnerData(data) {
    dinnerId = data.id
    const img = document.getElementById("dinner-image");
    img.src = "https://spoonacular.com/recipeImages/" + dinnerId + "-556x370." + data.imageType;
    document.getElementById("dinner-name").innerHTML = data.title;
    calories[2].innerHTML = calorie.toFixed(2);
}

function breakFastRecipe(){
    dataFetch(breakfastId)
    recipe.style.display="block";
}

function lunchRecipe(){
    dataFetch(lunchId)
    recipe.style.display="block";
}

function dinnerRecipe(){
    dataFetch(dinnerId)
    recipe.style.display="block";
}

function dataFetch(id) {
    var equipment = [];
    fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=3fb6fbb1e04040a58d5edad8088c973f&includeNutrition=false`
    )
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("steps").innerHTML = ""
            for (item of data.analyzedInstructions) {
                for (i of item.steps) {
                    stepShow(i.step);
                }
            }
            document.getElementById("list-of-ingredients").innerHTML = "";
            for (item of data.extendedIngredients) {
                var quantity = item.amount + " " + item.unit
                if (item.nameClean != null){
                    var name=item.nameClean.charAt(0).toUpperCase() + item.nameClean.slice(1);
                    ingredientsShow(name, quantity)
                }

                   
            }


            for (item of data.analyzedInstructions) {
                for (i of item.steps) {
                    for (j of i.equipment) {
                        if (!equipment.includes(j.name))
                            equipment.push(j.name);
                    }
                }
            }
            equipmentShow(equipment);

        })
        .catch((e) => {
            console.log(e);
        });
}

function ingredientsShow(name, quantity) {
    const ul_list_of_ingredients= document.getElementById("list-of-ingredients");
    const li_of_ingredients = document.createElement("li");
    li_of_ingredients.innerText  = name + " - " + quantity;
    ul_list_of_ingredients.appendChild(li_of_ingredients);
}

function stepShow(step) {
    const ol_of_steps = document.getElementById("steps")
    const li_of_steps = document.createElement("li");
    li_of_steps.innerText = step;
    ol_of_steps.appendChild(li_of_steps);
}

function equipmentShow(equipment) {
    const ul_equip = document.getElementById("equip")
    ul_equip.innerHTML = ""
    for (i of equipment) {
        var temp=i.charAt(0).toUpperCase() + i.slice(1);;
        const li_of_equip = document.createElement("li");
        li_of_equip.innerText = temp;
        ul_equip.appendChild(li_of_equip);
    }
}
