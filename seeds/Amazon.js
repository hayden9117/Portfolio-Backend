exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Amazon")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Amazon").insert([
        { url: "rowValue1", itemprice: "rowValue2" },
        { url: "rowValue1", itemprice: "rowValue2" },
      ]);
    });
};
