exports.up = function (knex, Promise) {
  return knex.schema.createTable('place', (t) => {
    t.increments('id');
    t.string('name');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('place');
};
