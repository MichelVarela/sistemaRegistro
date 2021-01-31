const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/images')/* ruta carpeta de destino del archivo */
    },
    filename : (req,file,cb) => {/* primer parametro req, segundo param archivo file, tercer param callback */
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))/* primer parametro null, segundo parametro nombre del archivo + '-' + Date.now() + path.extname que indicaremos la extension del archivo original*/
    }
})

const upload = multer({storage})

module.exports = upload;