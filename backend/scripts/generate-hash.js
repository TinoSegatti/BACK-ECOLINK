const bcrypt = require('bcryptjs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Introduce la contraseña a hashear: ', password => {
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      console.error('Error generando el hash:', err);
    } else {
      console.log('Hash generado:', hash);
    }
    readline.close();
  });
});