const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Medicine = require('./models/Medicine');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const medicinesData = [
  {
    name: 'Paracetamol 500mg',
    brand: 'MediCorp',
    price: 5.99,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: 'src/assets/paracetamol.jpg',
    inStock: true,
    description: 'Effective pain reliever and fever reducer.',
  },
  {
    name: 'Amoxicillin 250mg',
    brand: 'PharmaCare',
    price: 12.5,
    categories: ['Antibiotics', 'Rx'],
    requiresRx: true,
    imageUrl: 'src/assets/amoxicillin.jpg',
    inStock: true,
    description: 'Broad-spectrum antibiotic for bacterial infections.',
  },
  {
    name: 'Vitamin C 1000mg',
    brand: 'VitaHealth',
    price: 8.99,
    categories: ['Vitamins'],
    requiresRx: false,
    imageUrl: 'src/assets/vitamin-c.jpg',
    inStock: true,
    description: 'Boosts immune system and antioxidant support.',
  },
  {
    name: 'Ibuprofen 200mg',
    brand: 'MediCorp',
    price: 6.49,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: 'src/assets/Ibuprofen.jpg',
    inStock: true,
    description: 'Nonsteroidal anti-inflammatory drug for pain relief.',
  },
  {
    name: 'Cetirizine 10mg',
    brand: 'AllergyCare',
    price: 7.99,
    categories: ['Allergy'],
    requiresRx: false,
    imageUrl: 'src/assets/cetirizine.jpg',
    inStock: false,
    description: 'Relieves allergy symptoms like sneezing and itching.',
  },
  {
    name: 'Aspirin 100mg',
    brand: 'HeartWell',
    price: 4.5,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: 'src/assets/aspirin.jpg',
    inStock: true,
    description: 'Used to reduce pain, fever, or inflammation.',
  },
  {
    name: 'Omeprazole 20mg',
    brand: 'DigestCare',
    price: 10.99,
    categories: ['Digestive Health', 'Rx'],
    requiresRx: true,
    imageUrl: 'src/assets/omeprazole.jpg',
    inStock: true,
    description: 'Used to treat gastroesophageal reflux disease.',
  },
  {
    name: 'Multivitamin Complex',
    brand: 'VitaHealth',
    price: 15.99,
    categories: ['Vitamins'],
    requiresRx: false,
    imageUrl: 'src/assets/multivitamin.jpg',
    inStock: true,
    description: 'Provides essential vitamins and minerals.',
  },
  {
    name: 'Digital Blood Pressure Monitor',
    brand: 'HealthTech',
    price: 89.99,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: 'src/assets/blood-pressure.jpg',
    inStock: true,
    description: 'Measures blood pressure digitally.',
  },
  {
    name: 'Digital Thermometer',
    brand: 'MediTemp',
    price: 24.99,
    categories: ['Diagnostic Tools', 'Equipment'],
    requiresRx: false,
    imageUrl: 'src/assets/thermometer.jpg',
    inStock: true,
    description: 'Measures body temperature.',
  },
  {
    name: 'Pulse Oximeter',
    brand: 'OxyCheck',
    price: 45.99,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: 'src/assets/pulse-oximeter.jpg',
    inStock: true,
    description: 'Measures oxygen saturation in blood.',
  },
  {
    name: 'Stethoscope',
    brand: 'CardioSound',
    price: 125.0,
    categories: ['Diagnostic Tools', 'Equipment', 'Rx'],
    requiresRx: true,
    imageUrl: 'src/assets/stethoscope.jpg',
    inStock: true,
    description: 'Used for auscultation in medical exams.',
  },
  {
    name: 'Nebulizer Machine',
    brand: 'RespiCare',
    price: 199.99,
    categories: ['Respiratory Equipment', 'Equipment', 'Rx'],
    requiresRx: true,
    imageUrl: 'src/assets/nebulizer.jpg',
    inStock: false,
    description: 'Delivers medication in mist form to lungs.',
  },
  {
    name: 'Glucose Meter Kit',
    brand: 'DiabetesCheck',
    price: 34.99,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: 'src/assets/glucose-meter.jpg',
    inStock: true,
    description: 'Measures blood glucose levels.',
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    await Medicine.deleteMany({});
    console.log('Existing medicines removed');

    await Medicine.insertMany(medicinesData);
    console.log('Medicines data seeded');

    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
