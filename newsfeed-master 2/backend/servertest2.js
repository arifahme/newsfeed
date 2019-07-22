var mongoose = require('mongoose');


let User = require('./models/User')

joe = new User ({ name: 'Joe', age: 42 });
joe.save( (err)= >{ // encrypted when sent to the database
                        // decrypted in the callback
  console.log(joe.name); // Joe
  console.log(joe.age); // 42
  console.log(joe._ct); // undefined
})
