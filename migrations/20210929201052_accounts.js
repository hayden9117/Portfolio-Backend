
exports.up = function (knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('username').notNullable();
        table.string('password').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('accounts');
};
