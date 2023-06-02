import multer from "multer";
import { UserService } from "../repository/index.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.includes('image/png')) {
            if (file.originalname.includes('profile')) {
                cb(null, 'files/profiles');
            }
            if (file.originalname.includes('product')) {
                cb(null, 'files/products');
            }
        } else {
            if (file.originalname.includes('.pdf')) {
                cb(null, 'files/documents');
            }
        }
    },
    filename: async (req, file, cb) => {
        const uid = req.params.uid;

        if (!file.originalname.includes('.pdf')) return

        if (file.originalname.includes('Identificacion')) {
            const docName = `${Date.now()}-${uid}-${file.originalname}`;
            const path = `files/documents/${docName}`
            await UserService.addDocs(uid, 'Identificacion', path);
            return cb(null, docName);
        }

        if (file.originalname.includes('ComprobanteDomicilio')) {
            const docName = `${Date.now()}-${uid}-${file.originalname}`;
            const path = `files/documents/${docName}`
            await UserService.addDocs(uid, 'ComprobanteDomicilio', path);
            return cb(null, docName);
        }

        if (file.originalname.includes('ComprobanteEstadoCuenta')) {
            const docName = `${Date.now()}-${uid}-${file.originalname}`;
            const path = `files/documents/${docName}`
            console.log(docName);
            await UserService.addDocs(uid, 'ComprobanteEstadoCuenta', path);
            return cb(null, docName);
        }
    }
});

function fileFilter(req, file, cb){
    // Comprueba si se desea procesar el archivo

    if (!file.originalname.includes('.pdf') && !file.originalname.includes('.png')) return cb(null, false);
    
    if(file.originalname.includes('.pdf')){
        if (!file.originalname.includes('Identificacion') && !file.originalname.includes('ComprobanteDomicilio') && !file.originalname.includes('ComprobanteEstadoCuenta')){
            return cb(null, false);
        }
    }
    if (file.originalname.includes('.png')) {
        if (!file.originalname.includes('profile') && !file.originalname.includes('product')) {
            return cb(null, false);
        }
    }
    return cb(null, true);
}

const upl = multer({ storage: storage, fileFilter });

export const upload = upl.single('file');