
module.exports = app => {

    app.get('/', (req, res) => {//criamos o servidor com este método
        res.statusCode = 200;
        res.setHeader('Content-Type', 'Text/html')
        res.end('<h1>Olá</h1>');

    });
};