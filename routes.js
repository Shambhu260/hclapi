module.exports = function (app) {
    app.use('/api/transaction', require('./api/transaction'))
}