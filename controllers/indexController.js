const fs = require('fs');
const bcrypt = require('bcrypt');
const data = require('../data/data');

module.exports = {
    index: (req,res)=>{
        res.render('index');
    },
    register: (req,res)=>{
        res.render('register');
    },
    processRegister: (req,res,next)=>{
        
        const {nombre,apellido,email,passUno,passDos,avatar} = req.body;
        
        if(!nombre || !apellido || !email || !passUno || !passDos){/* VALIDACION SI LOS CAMPOS VIENEN VACAIOS --PRIMER IF--*/
            res.render('register',{
                error : 'Faltan completar algunos campos'
            })
        }else{
            if(passUno != passDos){/* VALIDACION SI LAS CONTRASEÑAS NO COINCIDEN --SEGUNDO IF--*/
                res.render('register',{
                    error : 'Las contraseñas deben ser iguales'
                })
            }else{
                let result = data.find(admin => admin.email.toLowerCase() === email.toLowerCase().trim());
                
                if(result){ /* si result resulta true, VALIDACION PARA EMAIL YA REGISTRADO --TERCER IF-- */
                    res.render('register',{
                        error : 'El email ya se encuentra registrado en nuestra base de datos'
                    })
                }else{/* SI TODO ES CORRECTO SE EJECUTA LA CARGA DEL USER */
                    let lastId = 0;
                    
                    data.forEach(element=>{
                        if(element.id > lastId){
                            return lastId = element.id;
                        }
                    });

                    
                    
                    const newUser = {
                        id: +lastId + 1,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        passUno: bcrypt.hashSync(passUno.trim(),12),
                        passDos: bcrypt.hashSync(passDos.trim(),12),
                        avatar: req.files[0].filename
                    }
                    
                    data.push(newUser);
                    fs.writeFileSync('./data/users.json',JSON.stringify(data,null,2),'utf-8');
                    
                    res.redirect('/profile' + '/' + newUser.id);
                }
            }
        }
        
        
    },
    dataUser: (req,res)=>{
        let user = data.find(element => element.id === +req.params.id);
        
        res.render('profile',{user});
    },
    login: (req,res)=>{
        res.render('login');
    },
    processLogin: (req,res)=>{
        const {email,pass} = req.body;
        
        let result = data.find(admin => admin.email.toLowerCase() === email.toLowerCase().trim());/* si el email del json coincide con el email ingresado, que me traiga sus datos */
        
        if(result){
            if(bcrypt.compareSync(pass.trim(),result.passUno)){/* si las contraseñas coinciden, aplicamos bcrypt.compareSync, y utilizamos trim para quitar caracteres ocultos(espacios) a los lados del dato ingresado */
                return res.redirect('/profile' + '/' + result.id)
            }else{
                res.render('login',{
                    error : "Datos incorrectos"
                })
            }
        }else{
            res.render('login',{
                error : "Datos incorrectos"
            })
        }
    }
}