const db = require('./database-connection');

module.exports = {
	// Posts
	getFeed: () => {
		return db("post")
			.select(
				[
					"post.id as id",
					"post.title as title",
					"post.body as body",
					"post.image as image",
					"post.place_id as place_id",
					"post.created_at as date",
					"place.name as place"
				]
			)
			.innerJoin("place", function () {
				this.on('post.place_id', '=', 'place.id')
			});
	},
	getPost: (id) => {
		return db("post")
			.where('post.id', id)
			.select(
				[
					"post.id as id",
					"post.title as title",
					"post.body as body",
					"post.image as image",
					"post.created_at as date",
					"place.name as place",
					"post.place_id as place_id"
				]
			)
			.first()
			.innerJoin("place", function () {
				this.on('post.place_id', '=', 'place.id')
			});
	},
	newPost: (postObj) => {
		return db('post')
			.insert(postObj)
			.returning('id');
	},
	// Places
	newPlace: (name) => {
		return db('place')
			.insert({ name })
			.returning('id');
	},
	checkPlace: (name) => {
		return db('place')
			.where('name', name)
			.select('id')
			.first();
	},
	getPlaces: () => {
		return db('place')
			.select('*');
	},
	getPlacePosts: (id) => {
		return db("post")
			.where('post.place_id', id)
			.select(
				[
					"post.id as id",
					"post.title as title",
					"post.body as body",
					"post.image as image",
					"post.created_at as date",
					"place.name as place"
				]
			)
			.innerJoin("place", function () {
				this.on('post.place_id', '=', 'place.id')
			});
	},
	// Dates
	getDates: () => {
		return db('post')
			.select(['id', 'created_at']);
	},
	// Author
	getAuthorInfo: () => {
		return db('author')
			.select('*')
			.first();
	},
	// Admin
	checkAdmin: () => {
		return db('admin')
			.select('id');
	},
	addAdmin: (adminObj) => {
		return db('admin')
			.insert(adminObj)
			.returning('id');
	},
	getUser: (username) => {
		return db('admin')
			.select('*')
			.where('username', username)
			.first();
	},
	newPost: (postObj) => {
		return db('post')
			.insert(postObj)
			.returning('id');
	}
};
