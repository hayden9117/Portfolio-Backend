exports.up = function (knex) {
  return knex.schema.createTable("viaPages", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.integer("userID");
    table.integer("avatars");
    table.integer("numLinks");
    table.string("pageName");
    table.string("template");
    table.string("background");
    table.string("opacity");
    table.integer("brightness");
    table.string("url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("viaPages");
};
