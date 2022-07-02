const request = require("supertest");

const app = require("./../app/index");

describe('Tests endpoints', ()=> {
    test("GET /", (done) => {
        request(app)
            .get("/api/")
            .expect("Content-Type", "text/html; charset=UTF-8")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test("GET /footballers", (done) => {
        request(app)
            .get("/api/footballers")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .expect((res) => {
                res.body.data.Items.length
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test("GET /footballers", (done) => {
        request(app)
            .get("/api/footballers/10")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .expect({
                footballerId: '10',
                name: "Lionel Messi",
                club: "PSG"
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })

    test("POST /footballers", (done) => {
        request(app)
            .post("/api/footballers/")
            .expect("Content-Type", "application/json; charset=utf-8")
            .send({
                footballerId: '31',
                name: 'Gavi',
                club: 'FC Barcelona'
            })
            .expect(200)
            .expect({
                footballerId: '31',
                name: 'Gavi',
                club: 'FC Barcelona'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
})