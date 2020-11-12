const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({
    extended: true
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/my-custom-prompt', (req, res) => {
    const state = req.query.state;

    res.render('pages/animal', { state });
  })
  .post('/my-custom-prompt', (req, res) => {
    console.log(req.body)
    const { state, animal } = req.body;

    console.log("Redirecting with state ", state);

    res.redirect(`https://sam-auth0-demos.auth0.com/continue?state=${state}&animal=${animal}`);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
