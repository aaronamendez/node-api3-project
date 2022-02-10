const users = require('../users/users-model');

function logger(req, res, next) {
	// DO YOUR MAGIC
}

// Returns req.user
async function validateUserId(req, res, next) {
	// DO YOUR MAGIC
	try {
		const { id } = req.params;
		users.getById(id).then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(404).json({ message: 'user not found' });
			}
		});
	} catch (err) {
		res.status(500).json({ message: 'internal server error' });
	}
}

// Returns req.name
async function validateUser(req, res, next) {
	// DO YOUR MAGIC
	try {
		const { name } = req.body;
		if (name) {
			req.name = req.body;
			next();
		} else {
			res.status(400).json({ message: 'missing required name field' });
		}
	} catch (err) {
		res.status(500).json({ message: 'internal server error' });
	}
}

function validatePost(req, res, next) {
	// DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateUserId,
	validateUser,
	validatePost,
};
