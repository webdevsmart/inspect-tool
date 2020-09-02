const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

const Inspection = require("../../models/Inspection");
const bodyParser = require("body-parser");

const recorgnizeCountriesFromPlateNumber = require("../../utils");
const { isObject, inspect } = require("util");

router.get("/initial-data", (req, res) => {
  Inspection.find({}, function (err, docs) {
    return res.json(docs);
  })
});

router.post("/data", async (req, res) => {
  let dataList = await Inspection.find({});
  let { page, perPage } = req.body
  let totalPages = Math.ceil(dataList.length / perPage)
  if (page !== undefined && perPage !== undefined) {
    let calculatedPage = (page - 1) * perPage
    let calculatedPerPage = page * perPage
    return res.json({data: dataList.slice(calculatedPage, calculatedPerPage), totalPages});
  } else {
    return res.json({ data: dataList.slice(0, 4), totalPages: Math.ceil(dataList.length / 4) });
  }
});

router.get("/get-by-id", (req, res) => {
  Inspection.findOne({_id: req.query._id}, function (err, doc) {
    if (err) return res.status(400).json(err);
    return res.json(doc);
  });
});

router.post("/upload-photos", async (req, res) => {
  let photos = new Object;
  const form = new formidable.IncomingForm();
  if (req.query._id != 'null') {
    let inspection = await Inspection.findOne({_id: req.query._id});
    let photos = inspection.photos ? inspection.photos : null;
    if (photos != null) {
      Object.keys(photos).map((key, index) => {
        fs.unlinkSync(__dirname + '/../../uploads/' + photos[key])
      })
      const newData = {
        $set: {
          photos: null,
        }
      }
      await Inspection.findOneAndUpdate({_id: req.query._id}, newData);
    }
  }
  form.parse(req)
  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
    photos[name] = currentTime + '.' + file.name.split('.')[1];
  });

  form.on("file", function (name, file) {
  });
  
  form.on("end", function() {
    let fileBuffer = fs.readFileSync(__dirname + '/../../uploads/' + photos['front']);
    request({
      url: "https://api.carnet.ai/v2/mmg/detect?features=mm,mmg,color,angle",
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
        'Api-Key': 'e087f4bf-340f-46d8-8a6d-9948ffad310f'
      },
      body: fileBuffer
    }, function (err, resp, data) {
      let body = new FormData();
      body.append('upload', fileBuffer.toString('base64'));
      fetch("https://api.platerecognizer.com/v1/plate-reader/", {
          method: 'POST',
          headers: {
              "Authorization": "Token 528ec607cc73b1439208b687aa0a9dfd343ff66e"
          },
          body: body
      }).then(res => res.json())
      .then(json => {
        let recogResult = recorgnizeCountriesFromPlateNumber(json.results[0]['plate']);
        const apiResults = JSON.parse(data);
        let detections = apiResults.detections;
        let vehicleDetails = {
          make: detections[0].mm[0].make_name,
          model: detections[0].mm[0].model_name,
          generation: detections[0].mmg[0].generation_name,
          year: detections[0].mmg[0].years,
          generation: detections[0].mmg[0].generation_name,
          colour: detections[0].color[0].name,
          countries: recogResult.result.toString(),
          plateNumber: json.results[0]['plate'],
          provience: recogResult.extra,
        }
        if (req.query._id != 'null') {
          const newData = {
            $set: {
              photos: photos,
              vehicle_details: vehicleDetails
            }
          }
          Inspection.findOneAndUpdate({_id: req.query._id}, newData, {new: true}, function (err, doc) {
            return res.json(doc);
          })
        }
        else {
          const newInspection = new Inspection({
            photos: photos,
            vehicle_details: vehicleDetails,
          });
          newInspection.save(function (err, doc) {
            return res.json(doc);
          });
        }
      })
      .catch((err) => {
      });
    });

  })
});

router.post("/save-by-name", (req, res) => {
  let formData = req.body;
  let fieldName = req.body.fieldName;
  let _id = req.body._id;
  delete formData._id;
  delete formData.fieldName;
  if (_id) {
    let newData = {
      $set: {
        [fieldName]: {
          ...formData
        }
      }
    }
    Inspection.findOneAndUpdate({_id: _id}, newData, function (err, doc) {
      return res.json(doc);
    })
  }
  else {
    const newInspection = new Inspection({
      [fieldName]: {
        ...formData
      }
    });
    newInspection.save()
    .then((doc) => {
      return res.json(doc);
    })
  }
});

module.exports = router;
