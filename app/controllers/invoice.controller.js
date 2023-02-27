const db = require("../models");
const Invoice = db.invoice;

// Retrieve all invoices
exports.findAll = (req, res) => {
    Invoice.find({}).
        then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving invoices."
            });
        });
};

// Create and save a new Invoice
exports.create = (req, res) => {
    const invoice = new Invoice({
        id: req.body.id,
        createdAt: req.body.createdAt,
        paymentDue: req.body.paymentDue,
        description: req.body.description,
        paymentTerms: req.body.paymentTerms,
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        status: req.body.status,
        senderAddress: {
            street: req.body.senderAddress.street,
            city: req.body.senderAddress.city,
            postCode: req.body.senderAddress.postCode,
            country: req.body.senderAddress.country,
        },
        clientAddress: {
            street: req.body.clientAddress.street,
            city: req.body.clientAddress.city,
            postCode: req.body.clientAddress.postCode,
            country: req.body.clientAddress.country,
        },
        items: req.body.items,
        total: req.body.total
    });

    // Save invoice in the database
    invoice
        .save(invoice)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the invoice"
            });
        });
};

// Mark invoice as paid
exports.markAsPaid = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;

    Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found!`,
                });
            } else res.send({ message: 'Invoice was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Invoice with id=' + id,
            });
        });
};

// Update invoice
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;

    Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found!`,
                });
            } else res.send({ message: 'Invoice was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Invoice with id=' + id,
            });
        });
};

// Delete invoice
exports.delete = (req, res) => {
    const id = req.params.id;

    Invoice.findByIdAndRemove(id, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Invoice with id=${id}. Maybe Invoice was not found!`,
                });
            } else {
                res.send({
                    message: 'Invoice was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Invoice with id=' + id,
            });
        });
};