const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

module.exports = {
    url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gfdin.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
};