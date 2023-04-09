import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    req.logger.warning('just a warning')
    req.logger.info('Se llamo a esta url')
    req.logger.error('Se cayo el server :(')
    req.logger.debug('1 + 1 === 2 ????')
    req.logger.fatal("FATAL ERROR")
    res.send({message: 'Logger Test'})
})

export default router