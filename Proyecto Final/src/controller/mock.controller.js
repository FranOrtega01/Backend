import { MockService } from '../repository/index.js'
export const get = async (req, res)=>{
    try {
        const products = MockService.get();
        
        const user = req.user?.user || {first_name:'Fran'};

        return res.render('mocking', {
            user,
            role: (user?.role == 'admin'),
            data: products
        });
    } catch (error) {
        req.logger.error('error: ', error);
    }
}