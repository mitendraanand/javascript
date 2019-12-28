var uiController = (function() {
    
    var DOMString = {
        budget_value: '.budget__value',
        income_value: '.budget__income--value',
        expense_value: '.budget__expenses--value',
        budget_percentage: '.budget__expenses--percentage',
        add_type: '.add__type',
        add_description: '.add__description',
        add_value: '.add__value',
        add_button: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        container: '.container'
    }
    
    
    return {
        DOM: DOMString,
        getInput: function() {
            return {
                type: document.querySelector(DOMString.add_type).value,
                desc: document.querySelector(DOMString.add_description).value,
                value: parseFloat(document.querySelector(DOMString.add_value).value)
            }
        },
        clearInput: function() {
            document.querySelector(DOMString.add_description).value = "";
            document.querySelector(DOMString.add_value).value = "";
            document.querySelector(DOMString.add_description).focus();
        },
        updateBudgetUI: function(budget, totalExp, totalInc, percentage) {
            document.querySelector(DOMString.budget_value).textContent = budget;
            document.querySelector(DOMString.income_value).textContent = totalInc;
            document.querySelector(DOMString.expense_value).textContent = totalExp;
            document.querySelector(DOMString.budget_percentage).textContent = percentage + '%';             
        },
        addItemToContainer: function(item) {
            if (item.type === 'inc') {
                html='<div class="item clearfix" id="%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">+ %VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                newHTML = html.replace('%ID%', item.type + '-' + item.id);
                newHTML = newHTML.replace('%DESC%', item.desc);
                newHTML = newHTML.replace('%VALUE%', item.value);
                
                document.querySelector(DOMString.incomeContainer).insertAdjacentHTML('beforeend', newHTML)
            } else if (item.type === 'exp') {
                html=' <div class="item clearfix" id="%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">- %VALUE%</div><div class="item__percentage">%PERCENTAGE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                newHTML = html.replace('%ID%', item.type + '-' + item.id);
                newHTML = newHTML.replace('%DESC%', item.desc);
                newHTML = newHTML.replace('%VALUE%', item.value);
                newHTML = newHTML.replace('%PERCENTAGE%', '...');
                
                document.querySelector(DOMString.expensesContainer).insertAdjacentHTML('beforeend', newHTML)
            }  
        },
        removeItemFromContainer: function(id) {
            var el = document.getElementById(id)
            el.parentNode.removeChild(el);
        }
    }
    
})();


var budgetController = (function() {
    

    var data = {
        exp: [],
        inc: [],
        total_exp: 0,
        total_inc: 0,
        budget: 0,
        percentage: -1
    }
    

    return {
        print: function() {
            console.log(data);
        },
        addItem: function(type, desc, value) {
            if (value > 0 && !isNaN(value) && desc !== "") {
                id = 0;
                if (data[type].length > 0) {
                    id = data[type][data[type].length - 1].id + 1;
                }
                data[type].push({
                    id: id,
                    desc: desc,
                    value: value
                });
                
                return {
                    type: type,
                    id: id,
                    desc: desc,
                    value: value
                }
            }
        },
        removeItem: function(type, id) {
            indexes = data[type].map((current, index, array) => {
                return current.id;
            })  
            console.log(indexes);
            toBeDeletedItemIndex = indexes.indexOf(id);
            console.log(toBeDeletedItemIndex);
            if (toBeDeletedItemIndex !== -1) {
                data[type].splice(toBeDeletedItemIndex, 1);
            }
        },
        calculate: function() {
            data.total_inc = 0;
            data.inc.forEach((current) => {
                data.total_inc += current.value;
            })
            data.total_exp = 0;
            data.exp.forEach((current) => {
                data.total_exp += current.value;
            })            
            data.budget = data.total_inc - data.total_exp;
            data.percentage = Math.round((data.total_exp / data.total_inc) * 100);
        },
        getBudget: function() {
            return {
                total_exp: data.total_exp,
                total_inc: data.total_inc,
                budget: data.budget,
                percentage: data.percentage                
            }
        }
    }
    
})();


var appController = (function(uiCtrl, budgetCtrl) {
    
    var handleInput = function() {
        
        // 1. Collect Input from uiController
        var input = uiCtrl.getInput();
        uiCtrl.clearInput();
        
        // 2. Calculate the budget in budgetController
        var item = budgetCtrl.addItem(input.type, input.desc, input.value);
        if (item) {
            budgetCtrl.calculate();
            budgetCtrl.print();

            // 3. Update the UI from uiController
            uiCtrl.addItemToContainer(item);
            budget = budgetCtrl.getBudget();
            uiCtrl.updateBudgetUI(budget.budget, budget.total_exp, budget.total_inc, budget.percentage);
            
        }
    };
    
    var handleDelte = function(event) {
        // 1. Get the ID to be deleted.
        console.log(event.target);
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);        
        if (itemID) {
            
            // 2. Delete the item from budget controller and re-calculate        
            s = itemID.split('-');
            type = s[0];
            id = parseInt(s[1]);
            
            budgetCtrl.removeItem(type, id);
            budgetCtrl.calculate();
            budgetCtrl.print();
        
            //3. update the UI from uiController
            uiCtrl.removeItemFromContainer(itemID);
            budget = budgetCtrl.getBudget();
            uiCtrl.updateBudgetUI(budget.budget, budget.total_exp, budget.total_inc, budget.percentage);            
        }
        
        
    }

    var addEnvetHandlers = function() {
        document.querySelector(uiCtrl.DOM.add_button).addEventListener('click', handleInput);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                handleInput();
            }
        });
        document.querySelector(uiCtrl.DOM.container).addEventListener('click', handleDelte)
    };

     
    return {
        start: function() {
            uiCtrl.updateBudgetUI(0, 0, 0, '---');
            addEnvetHandlers();
        }
    }
    
})(uiController, budgetController);

appController.start();

