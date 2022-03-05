exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_week")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product_week").insert([
        { url: "rowValue1", itemprice: "rowValue2" },
        { url: "rowValue1", itemprice: "rowValue2" },
      ]);
    });
};
