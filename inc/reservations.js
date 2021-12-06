var conn = require('./db')

module.exports = {
    render(req, res, error, success) {
        
        res.render('reservations', {

            title: 'Reservas - Restaurante Saboroso!',
            background: 'images/img_bg_1.jpg',
            h1: 'Reserve um mesa!',
            body: req.body,
            error,
            success
        
        })
    },

    save(fields) {
        
        let date = fields.date.split('/');
        fields.date = `${date[2]}-${date[1]}-${date[0]}`

        return new Promise((resolve, reject) => {
            conn.query(`
                INSERT INTO tb_reservations (name, email, people, date, time)
                Values(?, ?, ?, ?, ?)
            `, [
                fields.name, 
                fields.email, 
                fields.people, 
                fields.date, 
                fields.time
            ], (err, results) => {

                if(err) { 
                    reject(err);
                }
                else {
                    resolve(results);
                }

            })

        })



    }
}