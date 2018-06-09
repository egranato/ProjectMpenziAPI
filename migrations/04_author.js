exports.up = function (knex, Promise) {
  return knex.schema.createTable('author', (t) => {
    t.increments('id');
    t.text('image');
    t.string('welcome');
    t.text('body');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('author');
};
