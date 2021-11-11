
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favoriteslist').del()
    .then(function () {
      // Inserts seed entries
      return knex('favoriteslist').insert([
        { listname: 'fav movies' },
        { listname: 'fav movies' }


      ]);
    });
};
