const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const controllers = require('../controllers')

const router = vertex.router()

router.get('/settings', function(req, res){
	if (req.vertexSession == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	if (req.vertexSession.user == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(data => {
		res.render('user/settings', {
			confirmation: 'success',
			user: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

	// res.render('user/settings', {
	// 	confirmation: 'success',
	// 	user: {
	// 		name: 'alexvallorosi'
	// 	}
	// })
})

router.get('/profile', function(req, res){
	if (req.vertexSession == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	if (req.vertexSession.user == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(data => {
		res.render('user/profile', {
			confirmation: 'success',
			user: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/mealplan', function(req, res){
	if (req.vertexSession == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	if (req.vertexSession.user == null) {
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}
	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(user => {
		// console.log(user)
		let height = (parseInt(user.height.feet)*12 + parseInt(user.height.inches))*2.54
		let weight = parseInt(user.weight)*0.453592
		return [user, controllers.meal.mealplan(height, weight, parseInt(user.age), 'male', user.goal, parseInt(user['activity level']), 3)]
	})
	.spread((user, mealplan) => {
		console.log(mealplan)
		res.render('user/mealplan', {
				user: user,
				meals: mealplan.meals,
				tdee: mealplan.tdee,
				protein: mealplan.protein,
				carbs: mealplan.carbs,
				fats: mealplan.fats,
				calories: mealplan.calories
			})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

module.exports = router;