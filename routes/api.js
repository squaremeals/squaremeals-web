const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

router.get('/ingredients', function(req, res){
	turbo.fetch('ingredients', req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(error => {
		res.json({
			confirmation: 'failure',
			data: error
		})
	})
})

// Ingredient Schema: 
// 
// {
// 	name: 'Ground Turkey',
// 	servingSize: '4oz',
// 	calories: 150,
// 	protein: 24,
// 	carbs: 0,
// 	fats: 6
// }

router.post('/ingredients', function(req, res){
	turbo.create('ingredients', req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(error => {})
})

router.get('/meals', function(req, res){
	turbo.fetch('meals', req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(error => {
		res.json({
			confirmation: 'failure',
			data: error
		})
	})
})

// Meal Schema:
// {
// 	name: 'Turkey Chili',
// 	image: 'https://www.ambitiouskitchen.com/wp-content/uploads/2015/10/IMG_6059-Edit.jpg',
//  type: 'Breakfast',
// 	servingSize: '8oz',
// 	calories: 300,
// 	protein: 48,
// 	carbs: 0,
// 	fats: 12,
// 	ingredients: [{
// 		id: '5a79ca9d7cde050014ba4a8f',
// 		amount: 2
// 	}]
// }

router.post('/meals', function(req, res){
	turbo.create('meals', req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(error => {})
})

router.get('/meals/:id', function(req, res){
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})

router.get('/mealplan', function(req, res){
	let msj = 0
	// Mifflin St Jeor: Male
	// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5
	if (req.query.gender === 'Male') {
		msj = (10*req.query.weight) + (6.25*req.query.height) - (5*req.query.age) + 5
	}
	// Mifflin St Jeor: Female
	// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161.
	if (req.query.gender === 'Female') {
		msj = (10*req.query.weight) + (6.25*req.query.height) - (5*req.query.age) - 161
	}

	let tdee = msj+(333*req.query.activityLevel)
	if (req.query.goal === 'Lose') tdee -= 500
	if (req.query.goal === 'Gain') tdee += 500

	let calPerMeal = Math.floor(tdee/req.query.mealsPerDay);
	
	console.log('MSJ:   ', msj)
	console.log('TDEE:  ', tdee)
	console.log('CPM:   ', calPerMeal);

	// (((85.28*10)+(6.25*180.34)-(5*22)+5) + (333*3) -500)/3

	turbo.fetch('meals', {})
	.then(data => {
		console.log('MEALS: ', data)
		let mealplan=[]
		for (i=0; i<req.query.mealsPerDay; i++){
			if (data[0].calories < calPerMeal) mealplan.push(data[0])
		}

		res.json({
			confirmation: 'success',
			data: mealplan
		})
	})
	.catch(error => {
		res.json({
			confirmation: 'failure',
			data: error
		})
	})
})

module.exports = router
