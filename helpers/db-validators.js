const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo) => {
    const existeMail = await usuario.findOne({ correo });
    if (existeMail){
        throw new Error(`El correo: ${correo}, ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await usuario.findById( id );
    if (!existeUsuario){
        throw new Error(`El Id: ${correo}, no existe`)
    }
}







module.exports= {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}