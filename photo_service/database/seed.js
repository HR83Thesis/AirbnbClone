//README:
//This file is a stand-alone file with limited dependencies.
//------------------------------------------
const mongoose = require('mongoose');
const fs = require('fs');
//------------------------------------------
const Schema = mongoose.Schema;
const binaryDataSchema = new Schema({
  photo_id: Number,
  binary_data: Buffer,
  photo_type: String,
});
//------------------------------------------
let BinaryDataModel = mongoose.model('binarydata', binaryDataSchema);
//------------------------------------------

let counter = 0;
const records = 1000;

let counter2 = 0; //TEMPORARILY USED TO DO LOAD TESTING

function createModels () {

  let models = [];

  for (let i = 1; i <= 10; i++) {
    data = fs.readFileSync(__dirname + `/tmp/ext${i}.jpg`);

    let model = new BinaryDataModel;
    model.binary_data = data;
    model.photo_id = counter2; //eventually use Date.now() in real service usage
    model.photo_type = 'ext';
    models.push(model);
    counter2++;
  }

  for (let i = 1; i <= 10; i++) {
    data = fs.readFileSync(__dirname + `/tmp/int${i}.jpg`);

    let model = new BinaryDataModel;
    model.binary_data = data;
    model.photo_id = counter2; //eventually use Date.now() in real service usage
    model.photo_type = 'int';
    models.push(model);
    counter2++;
  }

  return models;
};

function endSeed (err) {
  if (err) {
    console.log(err);
  } else {
    if (counter < records - 1) {
      bulkInsert();
    } else {
      console.log('Counter ', counter);
      console.log('Time :', (Date.now() - beginTime) / 1000, 'seconds');
      mongoose.connection.close();
    }
  }
};

let start = false;
let beginTime;

function bulkInsert() {

  if (!start) {
    beginTime = Date.now();
    start = true;
  }

  let models = createModels();

  let bulk = BinaryDataModel.collection.initializeUnorderedBulkOp();

  for (var i = 0; i < models.length; i++) {
    bulk.insert(models[i]);
    counter++;
    console.log('inserting #: ', counter);
  }

  bulk.execute(endSeed);
};

const Seed = function () {
  mongoose.connect('mongodb://localhost/photoservice', bulkInsert);
};

Seed(); //Begins the Seeding Process

//------------------------------------------
//For Mongoose Connect:
//Ensure that the callback function is declared or
//hoisted before connection is called.
//Connection is an async process.

