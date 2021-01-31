const express = require('express');
const app = express();
const port = 3000;

const methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(methodOverride('_method'));

/* RUTAS */

const indexRouter = require('./routes/indexRouter');

app.use('/',indexRouter);


app.listen(port,()=>console.log(`Servidor funcionando en el puerto ${port}`));