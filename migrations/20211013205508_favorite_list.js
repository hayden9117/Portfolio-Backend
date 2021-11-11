
exports.up = function (knex) {
    return knex.schema.createTable('favoriteslist', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('listname').notNullable();

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('favoriteslist');
};
