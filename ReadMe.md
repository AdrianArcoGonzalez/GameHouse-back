ENDPOINTS:

[POST] /users/register -> Realiza el registro del usuario si los datos son correctos.

[POST] /users/login -> Devuelve un token si el user es correcto.

[GET] /games -> devuelve array de games.

[GET] /games/:idGame -> recibe una id y devuelve el game de la database si existe

[POST*] /games/create -> recibe un game (sin id), lo crea en la BD y devuelve el game recién creado

[PUT*] /games/update/:idGame -> recibe un game, modifica en la BD el game con la misma id que el recibido, y devuelve el game modificado

[DELETE*] /games/delete/:idGame -> elimina de la BD un game por id y devuelve un objeto con la id
