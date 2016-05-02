
exports.up = function(knex, Promise) {

    return knex.schema.createTable('courses', t => {
    t.increments();
    t.text('name').notNullable();
    t.text('desc');
    t.integer('level');
    t.boolean('active');
    t.text('location');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('courses')
  
};
