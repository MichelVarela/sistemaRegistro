const express = require('express');
const upload = require('../middlewares/multer')/* requerimos el upload del metodo multer de la carpeta middlewares */
const router = express.Router();

const {index,register,processRegister,dataUser,login,processLogin} = require('../controllers/indexController');

router.get('/',index)

router.get('/register',register);
router.post('/register',upload.any(),processRegister);/* upload.any() de multer */

router.get('/profile/:id',dataUser);

router.get('/login',login);
router.post('/login',processLogin);

module.exports = router;