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
					"place.name as place"
				]
			)
			.first()
			.innerJoin("place", function () {
				this.on('post.place_id', '=', 'place.id')
			});
	},
	// Places
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
	}
};
