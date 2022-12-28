import express from 'express'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('public'))

//Configuracion multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + '_' + file.originalname)
    }
})

const uploader = multer({storage})


app.post('/', uploader.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send({status: 'Error', error: 'No file'})
    }
    console.log(req.file);
    res.send('File uploaded!')
})

app.listen(8080)
