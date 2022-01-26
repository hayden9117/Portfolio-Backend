exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Amazon")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Amazon").insert([
        { itemname: "rowValue1", itemprice: "rowValue2" },
        { itemname: "rowValue1", itemprice: "rowValue2" },
      ]);
    });
};
