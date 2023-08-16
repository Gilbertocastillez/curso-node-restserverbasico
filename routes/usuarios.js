const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet );
    
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe ser de mas de 6 letras').isLength({min:6}),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_RULE']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost );



router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );












module.exports = router;