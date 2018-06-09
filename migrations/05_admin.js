exports.up = function (knex, Promise) {
  return knex.schema.createTable('admin', (t) => {
    t.increments('id');
    t.string('username');
    t.string('digest');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('admin');
};
