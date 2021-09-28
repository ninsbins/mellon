//Reference = https://github.com/mekaiser/hungry-monster
import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import DefaultHome from "../components/DefaultHome";
import "../styles/Food.css"
import $ from "jquery"
// Getting all the food belonging to the category
const details = mealID => {
    const settings = {
        "url": `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        mealInformation(response)
    });
}
const FoodPage= () => {
    return (
        <div>
            <Header/>
            <main className="container">

                <section className="mt-5 mb-5">
                    <form className="col-md-6 mx-auto">
                        <div className="input-group">
                            <input
                                id="input"
                                type="text"
                                className="form-control bg-light"
                                placeholder="Recipe"
                                aria-label="Search"
                            />
                            <div className="input-group-append">
                                <button id="submit" className="btn" type="button" onClick={search}>Search</button>
                            </div>
                        </div>
                    </form>
                    <h4 id="noinfo" className="text-center mt-5"></h4>
                </section>



                <section
                    id="meal-details-section"
                    className="row my-5 d-flex justify-content-center p-3"
                ></section>


                <section id="meal-info-section" className="row"></section>
            </main>


        </div>



    );

}

// Details for each meal
    const mealInformation = info => {
        const details = document.getElementById('meal-details-section');

        const meal = info.meals[0];
        const mealName = meal.strMeal;
        details.innerHTML = `
        <div id="information"   >
             <div class="card-body">
                <h2 class="card-title text-center my-3">${mealName}</h2>
                <hr>
                <h5 >Category</h5>
                <div id="meal-category"></div>
                <h5 >Meal Ingredients</h5>
                <div id="meal-ingredients"></div>
                <h5 >Meal Instructions</h5>
                <div id="meal-instructions"></div>
                <h5 >Meal Video</h5>
                <div id="meal-video"></div>
            </div>
        </div>
        
    `
        //Category of meal
        const mealCategory = document.getElementById('meal-category');
        const category = `
          ${meal[`strCategory`]}
        
        `
        const mealCatDetail = document.createElement('p');
        mealCatDetail.className = 'card-text';
        mealCatDetail.innerText = category;
        mealCategory.appendChild(mealCatDetail);


        //Meal Ingredient
        const mealIngredients = document.getElementById('meal-ingredients');

        // Set Contents of Each Paragraph Inside Meal Details Div Structure
        for (let i = 1; meal[`strIngredient${i}`]; i++) {
            const ingredients = `
        - ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
            const mealDetailsP = document.createElement('p');
            mealDetailsP.className = 'card-text';
            mealDetailsP.innerText = ingredients + "\n";
            mealIngredients.appendChild(mealDetailsP);
        }

        //Meal Instructions
        const mealInstructions = document.getElementById('meal-instructions');
        const instructions = `
          ${meal[`strInstructions`]}
        
        `
        const mealDetails = document.createElement('p');
        mealDetails.className = 'card-text';
        mealDetails.innerText = instructions;
        mealInstructions.appendChild(mealDetails);


        //Youtube Demo of Recipe
        const mealVideo = document.getElementById('meal-video');
        const video = `
          ${meal[`strYoutube`]}
        
        `
        const val = video.split("=")
        const watch = val[1]
        const link = "https://www.youtube.com/embed/" + watch

        const mealVid = document.createElement('p');
        mealVid.className = 'card-text';
        mealVid.innerHTML = "<iframe width=\"420\" height=\"315\" src=" + link + "'> </iframe> ";
        mealVideo.appendChild(mealVid);


    }
    const createMealInfoDiv = (meal) => {
        const mealPhoto = meal.strMealThumb;
        const mealName = meal.strMeal;


        const mealInfo =
            `
        <div onclick= details(${meal.idMeal}) class="card"  style="width:400px">
          <img class="card-img-top" src="${mealPhoto}" alt="Card image">
          <div class="card-body">
            <h4 class="card-title">${mealName}</h4>
            
            <a href="#" class="btn btn-primary">See Detail</a>
          </div>
        </div>

        
        `
        const mealInfoSection = document.getElementById('meal-info-section');
        const mealInfoDiv = document.createElement('div');
        mealInfoDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
        mealInfoDiv.innerHTML = mealInfo;
        mealInfoSection.appendChild(mealInfoDiv);
    }

    const showMealInfoDiv = (data, mealInput) => {
        const meal = data.meals;

        if (meal) {
            meal.forEach(element => {
                createMealInfoDiv(element, mealInput);
            });
        } else {
            const noMealFound = document.getElementById('noinfo');
            noMealFound.innerText = `No Recipe Found S${mealInput}!`;
        }
    }

    const search = () => {
        const mealInput = document.getElementById('input').value;
        if (mealInput) {
            const noMealFound = document.getElementById('noinfo');
            noMealFound.innerText = ``;
            const mealInfoSection = document.getElementById('meal-info-section');
            mealInfoSection.innerHTML = ``;
            const mealDetailsSection = document.getElementById('meal-details-section');
            mealDetailsSection.innerHTML = ``;

            const settings = {
                "url": `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`,
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                showMealInfoDiv(response, mealInput);
            });


        } else {
            const noMealFound = document.getElementById('noinfo');
            noMealFound.innerText = `You haven't entered anything`;
        }



}


export default FoodPage;
