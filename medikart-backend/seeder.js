const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Medicine = require('./models/Medicine');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const medicinesData = [
  {
    name: 'Paracetamol 500mg',
    brand: 'MediCorp',
    price: 512.5,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: '/images/paracetamol.jpg',
    inStock: true,
    description: 'Effective pain reliever and fever reducer.',
  },
  {
    name: 'Amoxicillin 250mg',
    brand: 'PharmaCare',
    price: 85.5,
    categories: ['Antibiotics', 'Rx'],
    requiresRx: true,
    imageUrl: '/images/amoxicillin.jpg',
    inStock: true,
    description: 'Broad-spectrum antibiotic for bacterial infections.',
  },
  {
    name: 'Vitamin C 1000mg',
    brand: 'VitaHealth',
    price: 769.9,
    categories: ['Vitamins'],
    requiresRx: false,
    imageUrl: '/images/vitamin-c.jpg',
    inStock: true,
    description: 'Boosts immune system and antioxidant support.',
  },
  {
    name: 'Ibuprofen 200mg',
    brand: 'MediCorp',
    price: 449.5,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: '/images/Ibuprofen.jpg',
    inStock: true,
    description: 'Nonsteroidal anti-inflammatory drug for pain relief.',
  },
  {
    name: 'Cetirizine 10mg',
    brand: 'AllergyCare',
    price: 336.7,
    categories: ['Allergy'],
    requiresRx: false,
    imageUrl: '/images/cetirizine.jpg',
    inStock: false,
    description: 'Relieves allergy symptoms like sneezing and itching.',
  },
  {
    name: 'Aspirin 100mg',
    brand: 'HeartWell',
    price: 250.8,
    categories: ['Pain Relief'],
    requiresRx: false,
    imageUrl: '/images/aspirin.jpg',
    inStock: true,
    description: 'Used to reduce pain, fever, or inflammation.',
  },
  {
    name: 'Omeprazole 20mg',
    brand: 'DigestCare',
    price: 940.99,
    categories: ['Digestive Health', 'Rx'],
    requiresRx: true,
    imageUrl: '/images/omeprazole.jpg',
    inStock: true,
    description: 'Used to treat gastroesophageal reflux disease.',
  },
  {
    name: 'Multivitamin Complex',
    brand: 'VitaHealth',
    price: 1368.10,
    categories: ['Vitamins'],
    requiresRx: false,
    imageUrl: '/images/multivitamin.jpg',
    inStock: true,
    description: 'Provides essential vitamins and minerals.',
  },
  {
    name: 'Digital Blood Pressure Monitor',
    brand: 'HealthTech',
    price: 5044.25,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: '/images/blood-pressure.jpg',
    inStock: true,
    description: 'Measures blood pressure digitally.',
  },
  {
    name: 'Digital Thermometer',
    brand: 'MediTemp',
    price: 300.0,
    categories: ['Diagnostic Tools', 'Equipment'],
    requiresRx: false,
    imageUrl: '/images/thermometer.jpg',
    inStock: true,
    description: 'Measures body temperature.',
  },
  {
    name: 'Pulse Oximeter',
    brand: 'OxyCheck',
    price: 890.99,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: '/images/pulse-oximeter.jpg',
    inStock: true,
    description: 'Measures oxygen saturation in blood.',
  },
  {
    name: 'Stethoscope',
    brand: 'CardioSound',
    price: 1255.0,
    categories: ['Diagnostic Tools', 'Equipment', 'Rx'],
    requiresRx: true,
    imageUrl: '/images/stethoscope.jpg',
    inStock: true,
    description: 'Used for auscultation in medical exams.',
  },
  {
    name: 'Nebulizer Machine',
    brand: 'RespiCare',
    price: 3199.99,
    categories: ['Respiratory Equipment', 'Equipment', 'Rx'],
    requiresRx: true,
    imageUrl: '/images/nebulizer.jpg',
    inStock: false,
    description: 'Delivers medication in mist form to lungs.',
  },
  {
    name: 'Glucose Meter Kit',
    brand: 'DiabetesCheck',
    price: 1934.99,
    categories: ['Monitoring Devices', 'Equipment'],
    requiresRx: false,
    imageUrl: '/images/glucose-meter.jpg',
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
