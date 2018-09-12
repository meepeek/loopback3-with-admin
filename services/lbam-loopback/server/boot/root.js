'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  const SystemUser = server.models.SystemUser

  server.post('/login', function(req, res) {
    const {email, password} = req.body
    SystemUser.login({
      email,
      password
    }, 'user', function(err, token) {
      if (err) {
        res.status(401).send(JSON.stringify({ message: 'Username or password was not correct' }))
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ email, token: token.id }));
    });
  });

  server.post('/signup', async function(req, res) {
    const {email, password, birthdate, name, surname, gender} = req.body
    await SystemUser.create( {email, password, birthdate, name, surname, gender} )
      .then( r => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
      } )
      .catch( e => {
        console.log(e)
        const {statusCode} = e
        res.status(statusCode).send(JSON.stringify(e))
      } )
  });

  server.post('/logout', function(req, res, next) {
    const token = req.body.token
    if (!token) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    else
    SystemUser.logout(token, function(err) {
      if (err) return next(err);
    });
    res.sendStatus(204)
  });

  server.post('/checkEmail', async function(req, res) {
    const {email} = req.body
    const found = await SystemUser.findOne( {where: {email}} )
    if (found) res.sendStatus(400)
    else res.sendStatus(200)
  });
  server.post('/checkToken', async function(req, res) {
    const {token} = req.body
  });

  server.use(router);
};
