const db = require('../../data/dbConfig');

function findBy(filter) {
    return db('users').where(filter);
  }



function findById(id) {
      return db('users')
      .select('id', 'username', 'password')
      .where('users.id', id).first();
}


async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
  }

// async function add({ username, password}) {
//     let created_user_id 
//     await db.transaction(async trx => {
//         let id_to_use
//         const [id] = await trx('id').where('username', username)
//         if(username) {
//             id_to_use = id
//         }else {
//             const [username] = await trix('username').insert({ username: username.trim()})
//             created_user_id = username.id;
//         }
//     })
//     return findById(created_user_id);
// }


module.exports ={
    findBy,
    findById,
    add,
}