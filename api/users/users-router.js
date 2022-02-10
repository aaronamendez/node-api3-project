const express = require('express');
const users = require('./users-model');
const posts = require('../posts/posts-model');
const {
	logger,
	validateUserId,
	validateUser,
	validatePost,
} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
	// RETURN AN ARRAY WITH ALL THE USERS
	users
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An internal server error has occured.' });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	// RETURN THE USER OBJECT
	// this needs a middleware to verify user id
	res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
	// RETURN THE NEWLY CREATED USER OBJECT
	// this needs a middleware to check that the request body is valid
	users.insert(req.name).then((user) => {
		// req.user = user;
		res.status(201).json(user);
	});
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
	// RETURN THE FRESHLY UPDATED USER OBJECT
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	users.update(req.user.id, req.name).then((updated) => {
		res.status(200).json(updated);
	});
});

router.delete('/:id', validateUserId, (req, res) => {
	// RETURN THE FRESHLY DELETED USER OBJECT
	// this needs a middleware to verify user id
	users.remove(req.user.id).then((deletedUser) => {
		// res.json(deletedUser);
		res.status(200).json(req.user);
	});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	// RETURN THE ARRAY OF USER POSTS
	// this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
	// RETURN THE NEWLY CREATED USER POST
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
