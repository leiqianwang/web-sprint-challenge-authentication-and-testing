/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    {
    id: 1, username: 'Albert', password: 'fall2011'},
    {id: 2, username: 'ying', password: 'leiftJoinWang0822'},
    {id: 3, username: 'Jackson', password: 'takeoffFufu' }
  ]);
};
