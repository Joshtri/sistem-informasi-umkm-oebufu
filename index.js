import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import { config } from 'dotenv';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import connectDB from './config/dbConfig.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRoute from './routes/index.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import kbliRoute from './routes/kbli.route.js';
import umkmRoute from './routes/umkm.route.js';
import pendudukRoute from './routes/penduduk.route.js';
import keluargaRoute from './routes/keluarga.route.js';
import userRoute from './routes/user.route.js';
import statistikRoute from './routes/statistik.route.js';
import kegiatanRoute from './routes/kegiatan.route.js';
import publikasiRoute from './routes/publikasi.route.js';

const app = express();
const port = process.env.PORT || "3003";

// Connect to MongoDB
connectDB();

// Tentukan lokasi folder views
const viewsDirectories = [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'keluarga'),
    path.join(__dirname, 'views', 'penduduk'),
    path.join(__dirname, 'views', 'umkm'),
    path.join(__dirname, 'views', 'kbli'),
    path.join(__dirname, 'views', 'statistik'),
    path.join(__dirname, 'views', 'user'),
    path.join(__dirname, 'views', 'kegiatan'),
    path.join(__dirname, 'views', 'publikasi'),
];

// view engine setup
app.set('views', viewsDirectories);
app.set('view engine', 'ejs');
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(
  session({
    proxy: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'oetete',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Replace with your MongoDB connection string
      collectionName: 'sessions'
    })
  })
);

// Method override middleware
app.use(methodOverride('_method'));

app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRoute, dashboardRoute, statistikRoute);  // most top level sitemap.
app.use('/adm/data', kbliRoute, umkmRoute, keluargaRoute, pendudukRoute, userRoute,kegiatanRoute, publikasiRoute);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { error: err, message: err.message });
});

app.listen(port, () => console.log(`listening on ${port}`));
