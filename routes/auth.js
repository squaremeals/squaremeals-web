const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.post('/register', function(req, res){

	console.log(JSON.stringify(req.body));
	turbo.createUser(req.body)
	.then(data => {
		req.vertexSession.user = {id: data.id}
		res.redirect('/user/settings')
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			messasge: err.message
		})
	})
	
})

router.get('/login', function(req, res){
	res.render('login', null);
})

router.post('/login', function(req, res){
	turbo.login(req.body)
	.then(data => {
		req.vertexSession.user = {id: data.id}

		res.redirect('/user/profile')
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			messasge: err.message
		})
	})
})

router.get('/currentuser', function(req, res){
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
		res.json({
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

router.get('/logout', function(req, res){

	req.vertexSession.reset();
	res.redirect('/');
	
})

router.post('/update', function(req, res){
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

	turbo.updateUser(req.vertexSession.user.id, JSON.parse(req.body.data))
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

module.exports = router;