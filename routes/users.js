let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});
module.exports = function (app) {

    let route = app.route('/users');
    route.get((req, res) => {
        db.find({}).sort({ name: 1 }).exec((err, users) => {//find traz todos, nedb
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    users
                });
            }
        });

    });


    route.post((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);

            }

        });

    });//cadastrar

    let routeId = app.route('/users/:id');
    routeId.get((req, res) => {
        db.findOne({ _id: req.params.id }).exec((err, user) => {//findone traz um registro, nedb
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        })
    })

    routeId.put((req, res) => {
        db.update({ _id: req.params.id }, req.body, err => {//findone traz um registro, nedb
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    })//update dos dados

    routeId.delete((req, res) => {//metodo do rest API delete 
        db.remove({ _id: req.params.id }, {}, err => {//metodo do nedb remove
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params.id));
            }
        });
    });

};
//express-validator oara validação dos dados
