import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
import { renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import List from './models/List';


/**Global state of the app
 * Search object
 * Current Recipe object
 * Shapping list object
 * Liked recipes
*/
const state = {};


const controlSearch = async (query = '') => {
    // 1) Get the query from the view
    if (query.length === 0) {
        query = searchView.getInput();
    }

    if (query) {
        // 2) new Search object and add to the state.
        state.search = new Search(query);

        // 3) Prepare UI for results.
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes.
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);            
        } catch (error) {
            alert('something wrong with the search.')
            clearLoader();
        }
    }
}

elements.sarchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch('pizza');
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})




/**
 * RECIPE CONTROLLER
 */

 const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#','');
    //console.log(id);

    if (id) {
        // Prepare UI for changes.
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight Selected search
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object.
        state.recipe = new Recipe(id);

        // TESTING: So that inspect->console has access to recipe.
        window.r = state.recipe;

        try {
            // Get recipe data.
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('error processsing recipe!')
        }
    }

 };

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});

window.l = new List();