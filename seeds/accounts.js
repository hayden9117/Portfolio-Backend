
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { username: 'rowValue1', password: "asd" },
        { username: 'rowValue2', password: "asd" },
        { username: 'rowValue3', password: "asd" }
      ]);
    });
};
