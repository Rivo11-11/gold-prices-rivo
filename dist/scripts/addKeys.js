import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    mongoose.connection.db?.collection("keys").insertOne({
        current: 0,
        next: 1
    }).then(() => {
        console.log("Keys added successfully");
        mongoose.connection.close();
    }).catch((err) => {
        console.error("Error adding keys:", err);
        mongoose.connection.close();
    });
}).catch((err) => {
    console.log(process.env.MONGO_URI);
    console.error("MongoDB connection error:", err);
});
//# sourceMappingURL=addKeys.js.map