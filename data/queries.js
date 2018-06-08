const db = require('./database-connection');

module.exports = {
	getFeed: () => {
		return db("post")
			.select(
				[
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
