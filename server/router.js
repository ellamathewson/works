/* eslint-disable linebreak-style */
const controllers = require('./controllers');
const mid = require('./middleware');

/*
    * connect as many middleware calls as you want in the order you want the middleware
        to run
    * first parameter is always the URL, last parameter always the controller
    *Everything in between is any of the middleware operations you want to call
*/
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getMeals', mid.requiresLogin, controllers.Data.getMeals);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Data.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Data.makePost);

  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  app.post('/changeSubscription', mid.requiresLogin, controllers.Account.changeSubscription);
  app.post('/unsubscribe', mid.requiresLogin, controllers.Account.unsubscribe);

  app.get('/data', mid.requiresLogin, controllers.Data.dataPage);
  app.get('/dataBlocked', mid.requiresLogin, controllers.Data.dataPage);

  app.get('/error', mid.requiresLogin, controllers.Account.errorPage);


  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  /*
    Figured this out with the help of https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  */
  app.get('*', mid.requiresLogin, controllers.Account.errorPage);
};

module.exports = router;
