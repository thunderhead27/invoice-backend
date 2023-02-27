module.exports = (mongoose) => {
    const AddressSchema = mongoose.Schema({
        street: String,
        city: String,
        postCode: String,
        country: String
    });

    const ItemSchema = mongoose.Schema({
        name: String,
        quantity: Number,
        price: Number,
    }, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

    ItemSchema.virtual('total').get(function () {
        return this.quantity * this.price;
    });

    const invoice = mongoose.Schema({
        id: String,
        createdAt: Date,
        paymentDue: Date,
        description: String,
        paymentTerms: Number,
        clientName: String,
        clientEmail: String,
        status: String,
        senderAddress: {
            type: AddressSchema,
            required: true,
        },
        clientAddress: {
            type: AddressSchema,
            required: true,
        },
        items: [ItemSchema],
        total: Number,
    });



    const Invoice = mongoose.model("invoice", invoice);
    return Invoice;
};
