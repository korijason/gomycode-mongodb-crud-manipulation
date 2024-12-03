// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI and Database Details
const uri = "mongodb+srv://crudoper@cluster0.uycyo.mongodb.net/"; // Replace with your connection string if needed
const client = new MongoClient(uri);
const dbName = "contact";

async function main() {
    try {
        // Step 1: Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");

        // Step 2: Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection("contactlist");

        // Step 3: Insert sample documents
        const contacts = [
            { "Last name": "Ben", "First name": "Moris", "Email": "ben@gmail.com", "age": 26 },
            { "Last name": "Kefi", "First name": "Seif", "Email": "kefi@gmail.com", "age": 15 },
            { "Last name": "Emilie", "First name": "brouge", "Email": "emilie.b@gmail.com", "age": 40 },
            { "Last name": "Alex", "First name": "brown", "age": 4 },
            { "Last name": "Denzel", "First name": "Washington", "age": 3 }
        ];
        await collection.insertMany(contacts);
        console.log("Documents inserted");

        // Step 4: Display all contacts
        console.log("\nAll Contacts:");
        const allContacts = await collection.find().toArray();
        console.log(allContacts);

        // Step 5: Display a specific contact by ID
        const specificContact = await collection.findOne({ "Last name": "Kefi" });
        console.log("\nContact with ID:");
        console.log(specificContact);

        // Step 6: Display contacts with age > 18
        console.log("\nContacts with age > 18:");
        const contactsAbove18 = await collection.find({ age: { $gt: 18 } }).toArray();
        console.log(contactsAbove18);

        // Step 7: Display contacts with age > 18 and name containing "ah"
        console.log("\nContacts with age > 18 and name containing 'ah':");
        const contactsFiltered = await collection.find({
            age: { $gt: 18 },
            "First name": { $regex: "ah", $options: "i" }
        }).toArray();
        console.log(contactsFiltered);

        // Step 8: Update "Kefi Seif" to "Kefi Anis"
        await collection.updateOne(
            { "Last name": "Kefi", "First name": "Seif" },
            { $set: { "First name": "Anis" } }
        );
        console.log("\nUpdated 'Kefi Seif' to 'Kefi Anis'");

        // Step 9: Delete contacts aged under 5
        await collection.deleteMany({ age: { $lt: 5 } });
        console.log("\nDeleted contacts with age < 5");

        // Step 10: Display all remaining contacts
        console.log("\nFinal Contacts List:");
        const finalContacts = await collection.find().toArray();
        console.log(finalContacts);
    } catch (err) {
        console.error(err);
    } finally {
        // Step 11: Close the MongoDB connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

main();
