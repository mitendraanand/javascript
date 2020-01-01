import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
import { renderLoader, clearLoader } from './views/base';


/**Global state of the app
 * Search object
 * Current Recipe object
 * Shapping list object
 * Liked recipes
*/
const state = {

};

const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2) new Search object and add to the state.
        state.search = new Search(query);

        // 3) Prepare UI for results.
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        // 4) Search for recipes.
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

    }
}

elements.sarchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
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




