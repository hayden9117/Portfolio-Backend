exports.up = function (knex) {
  return knex.schema.createTable("Amazon", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.string("productname", 1000);
    table.string("url", 9000);
    table.string("itemprice");
    table.string("prevdayitemprice");
    table.string("prevweekitemprice");
    table.string("prevmonthitemprice");
    table.dateTime("some_datetime");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Amazon");
};
