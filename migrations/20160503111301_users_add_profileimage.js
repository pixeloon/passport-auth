
exports.up = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.text('profileimage');

  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.dropColumn('profileimage');
  })
  
};
