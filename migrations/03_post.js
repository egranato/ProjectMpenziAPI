exports.up = function (knex, Promise) {
  return knex.schema.createTable('post', (t) => {
    t.increments('id');
    t.string('title').notNullable();
    t.text('body').notNullable();
    t.text('image');
    t.integer('place_id').references('id').inTable('place');
    t.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('post');
};
