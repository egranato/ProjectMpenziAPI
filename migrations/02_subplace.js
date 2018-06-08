exports.up = function (knex, Promise) {
  return knex.schema.createTable('subplace', (t) => {
    t.increments('id');
    t.integer('place_id').references('id').inTable('place');
    t.integer('subplace_id').references('id').inTable('place');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('subplace');
};
