const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerDocs = require('./swaggerConfig');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const userSubAdminRoutes = require('./routes/userSubAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const authGuard = require('./middleware/authGuard');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    // console.log("the req is ", req.path);
    if (req.path === '/api/users/signup' || req.path==="/api/login/") {
      return next(); // Skip authentication
    }
    authGuard()(req, res, next);
  });

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/practicle';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subadmin/clients', userSubAdminRoutes);
app.use('/api/login', authRoutes);

swaggerDocs(app);
// Start the server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
