var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var path = require('path');
var ObjectID = mongodb.ObjectID;

var OFFERS_COLLECTION = "offers";
var CFIELDS_COLLECTION = "cfields";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://localhost:27017/freegroceries', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// OFFERS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


/* CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*  "/api/offers"
 *    GET: finds all offers
 *    POST: creates a new offer
 */

app.get("/api/offers", function(req, res) {
  db.collection(OFFERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get offers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/offers", function(req, res) {
  var newOffer = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(OFFERS_COLLECTION).insertOne(newOffer, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new offer.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/offers/:id"
 *    GET: find offer by id
 *    PUT: update offer by id
 *    DELETE: deletes offer by id
 */

app.get("/api/offers/:id", function(req, res) {
  db.collection(OFFERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get offer");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/offers/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(OFFERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update offer");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/offers/:id", function(req, res) {
  db.collection(OFFERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete offer");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*  "/api/cfields"
 *    GET: finds all cfields
 *    POST: creates a new cfield
 */

app.get("/api/cfields", function(req, res) {
  db.collection(CFIELDS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get custom fields.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/cfields", function(req, res) {
  var newCfield = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CFIELDS_COLLECTION).insertOne(newCfield, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new custom field.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/cfields/:id"
 *    GET: find cfield by id
 *    PUT: update cfield by id
 *    DELETE: deletes cfield by id
 */

app.get("/api/cfields/:id", function(req, res) {
  db.collection(CFIELDS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get custom field");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/cfields/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CFIELDS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update custom field");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/cfields/:id", function(req, res) {
  db.collection(CFIELDS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete custom field");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/* api for authenticate admin */
app.post("/api/authenticate", function(req,res) {
  var login = req.body;
  if(login.username == 'admin' && login.password == 'admin2017' ) {
    res.status(200).json({token: 'authenticated'});
  } else {
    res.status(200).json({invalid: 'true'});
  }
});


/* angular route */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
