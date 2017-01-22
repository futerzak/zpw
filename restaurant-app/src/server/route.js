module.exports = (app, models) => {
    app.get('/products', (req, res) => {
        models.Product.find({}, (err, products) => {
            if(err) throw err;

            res.json(products);
        });
    });

    app.get('/contacts', (req, res) => {
        models.Contact.find({}, (err, contacts) => {
            if(err) throw err;

            res.json(contacts);
        });
    });

    app.get('/slides', (req, res) => {
        models.Slide.find({}, (err, slides) => {
            if(err) throw err;

            res.json(slides);
        });
    });

    app.get('/tables', (req, res) => {
        models.Table.find({}, (err, tables) => {
            if(err) throw err;

            res.json(tables);
        });
    });

    app.post('/reservation', (req, res) => {
        const params = req.body;
        console.log(params);

        const newReservation = models.Reservation({
            firstname: params.firstname,
            surname: params.surname,
            phone: params.phone,
            date: params.date,
            tableId: params.tableId
        });

        newReservation.save(err => {
            if(err) throw err;

            res.send({message: "success"})
        });
    });
}
