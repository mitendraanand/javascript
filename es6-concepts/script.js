/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

/*

TownElement:
    name
    buildYear
    getAge()
    
Park extends TownElement:
	number of trees
	area
	treeDencity
	addTrees()

Street extends TownElement:
	length
	size


Town
	parks = []
	streets = []
	avgAgeOfParks()
	totalStreetsLength()
	avgStreetLenght()


TownManagement
	towns = []
	nameOfParkWithMoreThan1000Trees()


*/

class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
    
    getAge() {
        return new Date().getFullYear() - this.buildYear;
    }
};

class Park extends TownElement {
    constructor(name, buildYear, numberOfTrees, area) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area; //  square km
        this.treeDensity = (this.numberOfTrees / this.area).toFixed(2);
    }
    
    addTrees(n) {
        this.numberOfTrees += n;
        this.treeDensity = this.numberOfTrees / this.area;
    }
};

class Street extends TownElement {
    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length; // km
        this.size = size;
    }
};

class Town extends TownElement {
    constructor(name, buildYear) {
        super(name, buildYear);
        this.parks = new Map();
        this.streets = new Map();
    }
    
    addPark(name, buildYear, numberOfTrees, area) {
        this.parks.set(name, new Park(name, buildYear, numberOfTrees, area));
    }
    
    addStreet(name, buildYear, length, size) {
        this.streets.set(name, new Street(name, buildYear, length, size));
    }
    
    getAvgAgeOfParks() {
        if (this.parks.size > 0) {
            let ageSum = 0;
            this.parks.forEach((current) => ageSum += current.getAge())
            return Math.round(ageSum / this.parks.size);            
        }
        else {
            return 0;
        }
    }
    
    getParksWithMoreThan1000Trees() {
        let arr = [];
        this.parks.forEach(curr => {
            if (curr.numberOfTrees > 1000) {
                arr.push(curr);
            }
        });
        return arr;
    }
    
    
    getTotalStreetLength() {
        let sumLength = 0;
        this.streets.forEach(curr => {
            sumLength += curr.length;
        })
        return sumLength;
    }    
    
    getAvgLenghtOfStreets() {
        if (this.streets.size > 0) {
            return Math.round(this.getTotalStreetLength() / this.streets.size);            
        }
        else {
            return 0;
        }
    }
    
    printReport() {
        console.log('---------------- PARKS REPORT ----------------------------')
        console.log(`Our ${this.parks.size} Parks have an average age of ${this.getAvgAgeOfParks()} years.`)
        this.parks.forEach(current => console.log(`${current.name} Park has a tree density of ${current.treeDensity} per square km. `));
        this.getParksWithMoreThan1000Trees().forEach(curr => console.log(`${curr.name} Park has more than 1000 trees.`))
        
        console.log('---------------- STREETS REPORT ----------------------------')
        console.log(`Our ${this.streets.size} Streets have an total length of ${this.getTotalStreetLength()} km, with an average of ${this.getAvgLenghtOfStreets()} km.`)
        this.streets.forEach(curr => console.log(`${curr.name}, build in ${curr.buildYear}, is a ${curr.size} street. `))
    }
};



// create the town
let gurgaon = new Town('Gurgaon', 1823);

// add parks
gurgaon.addPark('park1', 1990, 100, 500);
gurgaon.addPark('park2', 1991, 200, 600);
gurgaon.addPark('park3', 1992, 1300, 1700);

// add streets
gurgaon.addStreet('street1', 1990, 100, 'small');
gurgaon.addStreet('street2', 2001, 2000);
gurgaon.addStreet('street3', 1993, 3000, 'big');
gurgaon.addStreet('street4', 1999, 3400, 'big');

// print report
gurgaon.printReport()

























