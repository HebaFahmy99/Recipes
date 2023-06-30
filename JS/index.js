var recipes; 
GetRecipes('pizza');
var navItems = document.getElementsByClassName("nav-item"); 
for(var i =0 ; i<navItems.length ; i++){ 
    navItems[i].addEventListener("click", function(e){ 
        GetRecipes(e.target.innerHTML)
    })
}

function GetRecipes(meal){ 
    var httpReq = new XMLHttpRequest(); 
    httpReq.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${meal}`); 
    httpReq.send(); 
    httpReq.addEventListener("readystatechange", function(){ 
        if(httpReq.readyState == 4 && httpReq.status == 200){  
             recipes = JSON.parse(httpReq.response).recipes; 
            displayRecipes();
        }
    })
} 

function displayRecipes(){  
    var temp = ''; 
    var row = document.getElementById("ReciepesSection");
    for(var i =0 ; i<recipes.length ; i++){ 
         temp += ` 
        <div class="col-lg-3 col-md-4">
            <div class="item text-center">
                <img src="${recipes[i].image_url}" class="w-100" style="height:250px"  > 
                <h5 >${recipes[i].title}</h5> 
                <button type="button" class="btn btn-warning"><a href="${recipes[i].source_url}" target="_blank">Source</a></button> 
                <button type="button" onclick="GetRecipesDetails(${recipes[i].recipe_id})" class="btn" style="background-color:#F1F9FC;" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        </div>
    
    ` 
    }
    row.innerHTML = temp;
} 

async function GetRecipesDetails(recipe_id){ 
    var recepeDetails = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`); 
    recepeDetails = await recepeDetails.json();   
    var recepeInfo = recepeDetails.recipe 
    var recipeIngredients = recepeInfo.ingredients; 
    var ingredients = ``;
    for(var i= 0 ; i<recipeIngredients.length; i++){  
        ingredients+=`   
            <li>${recipeIngredients[i]}</li>
        `
    }

    var temp = ` 
    <img src="${recepeInfo.image_url}" width="250px" height="250px">   
    <h3 class="text-center mt-3">Recipe Ingredients</h3>
    <ul class="mt-3"> 
        ${ingredients}
    </ul>
    
    `; 
    document.getElementById("RecipeInfo").innerHTML = temp;
    document.getElementById("exampleModalLabel").innerHTML = `${recepeInfo.title}`;

}