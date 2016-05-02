
exports.up = function(knex, Promise) {

    return knex.schema.createTable('users', (t)=> {
    t.increments();
    t.text('email').unique().notNullable();
    t.text('password').notNullable();
    t.text('screen_name');
    t.text('first_name');
    t.text('last_name');
    t.boolean('member');

    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
  
};
