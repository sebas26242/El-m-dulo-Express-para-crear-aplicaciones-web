const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 }
];

app.get('/', (req, res) => {
    res.render('index', { message: '¡Bienvenido al servidor Node.js!' });
});

app.get('/productos', (req, res) => {
    res.render('productos', { productos });
});

app.get('/productos/nuevo', (req, res) => {
    res.render('nuevo-producto');
});

app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        res.status(400).send('Nombre y precio son requeridos');
        return;
    }
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio: parseFloat(precio)
    };
    productos.push(nuevoProducto);
    res.redirect('/productos');
});

app.get('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id, 10);
    const producto = productos.find(p => p.id === productoId);
    if (!producto) {
        res.status(404).send('Producto no encontrado');
        return;
    }
    res.render('producto', { producto });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
