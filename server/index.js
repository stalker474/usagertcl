/* eslint consistent-return:0 */
const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');

const app = express();


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const buildMsg = (formData) => {
  const msg = `
  Bonjour,
  Le transport de la ligne ${formData.ligne} à l'arrêt ${formData.arret} en direction de ${formData.direction} devant passer à ${formData.horaire} est passé à ${formData.horaire_reel}.
  Bien courtoisement et à votre écoute,
  Client TCL`;
  return msg;
};

const puppeteerMe = async (formData) => {
  let log = 'puppeteer execution :';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  log += '\nnavigating to https://tcl.fr/fr/Pied-de-page/Nous-contacter';
  await page.goto('https://tcl.fr/fr/Pied-de-page/Nous-contacter');
  log += '\nselecting request nature';
  await page.evaluate(() => {
    const test = document.querySelector('#nature2');
    test.click();
  });
  log += '\nselecting motive';
  await page.select('#motif', '2307796');
  log += '\nselecting name';
  await page.type('#nom', 'Usager');
  log += '\nselecting firstname';
  await page.type('#prenom', 'TCL');
  log += '\nselecting email';
  await page.type('#email', formData.email);
  log += '\nwriting mail body';
  const body = buildMsg(formData);
  await page.type('#contenu', body);
  log += '\nfinal body => ';
  log += body;
  await page.click('#envoyer');
  await page.waitForNavigation();
  log += '\nnew page url ';
  log += page.url();
  return log;
};

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/app',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
// app.post
app.post('/api/submit', (req, res) => {
  const formData = req.body;
  puppeteerMe(formData).then((result) => {
    res.send({
      express: result
    });
  });
});
