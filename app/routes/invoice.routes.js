module.exports = (app) => {
    const invoices = require("../controllers/invoice.controller");

    let router = require("express").Router();

    // Create an invoice
    router.post('/', invoices.create);

    // Retrieve all invoices
    router.get('/', invoices.findAll);

    // Mark as paid
    router.patch('/:id', invoices.markAsPaid);

    // Delete invoice
    router.delete('/:id', invoices.delete);

    // Update invoice 
    router.put('/:id', invoices.update);

    app.use('/api/invoices', router);
};
