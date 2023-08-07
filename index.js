const faker = require('faker');
const { MongoClient } = require('mongodb');

function generateRandomInsuranceValuation() {
    return {
        policyId: faker.random.uuid(),
        policyType: faker.random.arrayElement(['Life', 'Health', 'Disability']),
        policyStartDate: faker.date.past(),
        policyEndDate: faker.date.future(),
        policyHolderAge: faker.random.number({ min: 18, max: 80 }),
        policyHolderGender: faker.random.arrayElement(['Male', 'Female']),
        smoker: faker.random.boolean(),
        height: faker.random.number({ min: 150, max: 200 }),
        weight: faker.random.number({ min: 40, max: 150 }),
        bloodPressure: faker.random.number({ min: 80, max: 180 }) + '/' + faker.random.number({ min: 50, max: 110 }),
        cholesterolLevel: faker.random.number({ min: 100, max: 300 }),
        preExistingConditions: faker.random.words(3),
        coverageAmount: faker.random.number({ min: 10000, max: 100000 }),
        coverageType: faker.random.arrayElement(['Basic', 'Comprehensive']),
        deductibleAmount: faker.random.number({ min: 500, max: 5000 }),
        beneficiaryName: faker.name.findName(),
        beneficiaryRelationship: faker.random.arrayElement(['Spouse', 'Child', 'Parent', 'Other']),
        annualIncome: faker.random.number({ min: 25000, max: 150000 }),
        savingsAndInvestments: faker.random.number({ min: 1000, max: 100000 }),
        riderType: faker.random.arrayElement(['Accidental Death', 'Critical Illness']),
        riderCoverageAmount: faker.random.number({ min: 5000, max: 50000 }),
        riderPremium: faker.random.number({ min: 100, max: 1000 }),
        preferredHospital: faker.company.companyName(),
        preferredDoctor: faker.name.findName(),
        occupation: faker.name.jobTitle(),
    };
}

async function generateInsuranceRecordsAndSave(count) {
    const collection= await getMongoDbConnection();
    
    for (let i = 0; i < count; i++) {
        console.log("Saving "+ i + " Record in DB");
        await collection.insertOne(generateRandomInsuranceValuation());
    }
}

async function getMongoDbConnection() {
    
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('your-database-name');
    const collection = database.collection('insuranceValuations');
    return collection;
}

const numberOfRecords = 5000000;
generateInsuranceRecordsAndSave(numberOfRecords);