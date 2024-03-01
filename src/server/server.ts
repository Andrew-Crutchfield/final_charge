import express from 'express';
import cors from 'cors';
import routes from './routes'; 
import { tokenCheck } from './middlewares/tokenCheck'; 

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

if (isDevelopment) {
    app.use(cors());
}

if (isProduction) {
    app.use(express.static('public'));
}

app.use(express.json());

app.use('/api/secure', tokenCheck);

app.use('/api', routes);

app.get('/api/hello', (req, res) => {
    res.json({ message: 'World' });
});

if (isProduction) {
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
