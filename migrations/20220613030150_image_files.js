exports.up = function (knex) {
  return knex.schema.createTable("image_files", (table) => {
    table.increments("id").primary();
    table.text("filename").unique().notNullable();
    table.text("filepath").notNullable();
    table.text("mimetype").notNullable();
    table.bigint("size").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("image_files");
};
