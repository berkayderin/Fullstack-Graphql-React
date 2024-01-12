import mongoose from 'mongoose';
const db = mongoose
    .connect('mongodb+srv://zewodi:DAgkkJyG5yNLQeBh@cluster0.8t5rtcd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('mongodb bağlantısı başarılı');
})
    .catch((err) => {
    console.log('mongodb bağlantısı başarısız', err);
});
export default db;
