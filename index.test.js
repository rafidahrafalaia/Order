const express = require('express');
const routes = require('./routes');
const supertest = require("supertest");
const bodyParser = require('body-parser');

jest.setTimeout(5000);

function startServer() {
  const app = express();
 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use('/',routes());
 
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
	   const err = new Error('Not Found');
	   err['status'] = 404;
	   next(err);
	});
 
	app.use((err, req, res, next) => {
	   res.status(err.status || 500);
	   res.json({
		  errors: [
			 {
				message: err.message
			 }
		  ]
	   });
	});
  
  
  return app;
}


const app = startServer();

describe("ORDER TEST", () => {
  const value_post = {
    "name": "POST",
    "code": "POST",
    "status": "done processed",
    };
  const value_fail = {
    "name": "POST",
    "code": "",
    "status": "being processed",
    };

  let elementId;
  test("POST SUCCESS", async () => {
    await supertest(app)
    .post("/order")
        .send(value_post)
        .expect(200)
        .expect((res) => {
          elementId = res.body.id;
        })
  });

  test("POST FAIL", async () => {
    await supertest(app)
    .post("/order")
        .send(value_fail)
        .expect(400)
  });

  test("GET SUCCESS", async () => {
    await supertest(app).get("/order/"+elementId)
      .expect(200);
  });
  
  test("GET FAIL", async () => {
      await supertest(app).get("/order/"+"dada0c40-539f-479a-99aa-8ad11722aadc")
        .expect(404);
  });

});