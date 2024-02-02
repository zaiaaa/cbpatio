const multer = require('multer')
const path = require('node:path')

const userPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "userPhotos/")
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const campeonatoPhotos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "fotoCampeonatos/")
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb ) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('O arquivo enviado não é uma imagem!'), false)
    }
}

const uploadUser = multer({storage: userPhoto, fileFilter})
const uploadCampeonato = multer({storage: campeonatoPhotos, fileFilter})

    
module.exports = {uploadUser, uploadCampeonato}