const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

const upload = multer({ dest: 'uploads/' }); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'relatorios',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rotas
app.get('/get-reports', (req, res) => {
    const query = 'SELECT * FROM reports ORDER BY created_at DESC'; 
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar relatórios:', err);
            return res.status(500).send({ success: false, message: 'Erro ao buscar relatórios.' });
        }
        res.status(200).send({ success: true, reports: results });
    });
});


app.post('/submit-report', upload.single('image'), (req, res) => {
    const { description, location } = req.body; 
    const image = req.file; 

    console.log('Dados recebidos:', { description, location, image });

  
    const imagePath = image ? image.path : null;

    // Query para inserir os dados no banco de dados
    const query = 'INSERT INTO reports (description, location, image_path) VALUES (?, ?, ?)';
    connection.query(query, [description, location, imagePath], (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            return res.status(500).send({ success: false, message: 'Erro ao salvar no banco.' });
        }

      
        res.status(200).send({ success: true, message: 'Relatório salvo com sucesso!' });
    });
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
