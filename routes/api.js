const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const controllers = require('../controllers')

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
// 

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

module.exports = router
