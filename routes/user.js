const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
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
	.then(data => {
		res.render('user/mealplan', {
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

module.exports = router;