var bcrypt = require('bcrypt');
var pas = encryptByBcrypt('123');

function encryptByBcrypt(password)
{
  bcrypt.hash(password, parseInt(process.env.SALT), function(err, hash)
  {
    if(err)
    {
      encryptByBcrypt(password);
    }
    else{
      return hash;
    }
  });
}


const mainTherapist =[
{
  name: 'T1',
  email: 'first@theraleap.com',
  password: '$2b$10$Puo0.eHAT5sAaRKrdRykj.eZlOJMB3tmPliKRA5NFkYrW9IEqxzve'
}
];

module.exports = mainTherapist;
