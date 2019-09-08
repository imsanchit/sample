const config = require('config');

const app = require("./app");

const PORT = config.get('bind.port');

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})