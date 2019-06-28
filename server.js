const express = require("express"),
         cors = require("cors"),
           bp = require("body-parser");
          app = express(),
      DB_NAME = "restaurantdb",
         port = 8000,

app.use(bp.json({limit: '1mb'}));
app.use(cors());
// below is deployment line
app.use(express.static(__dirname + "/client/build"));

require("./server/utils/mongoose")(DB_NAME);
require("./server/utils/routes")(app);

// below are deployment lines 17 to 19
app.all('*', (req, res, next) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
