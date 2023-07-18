import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import Jwt  from 'jsonwebtoken';

//CREAR LAS INSTANCIA DE EXPRESS
const app=express();
app.use(cors());
app.use(express.json());


//CREAR LA CONEXION
const conexion=mysql.createConnection({
    server:'localhost',
    user:'root',
    password:'',
    database:'bodas'
});

//VERIFICAMOS LA CONEXION
conexion.connect(function(error){
    if(error){
        console.log("ERROR AL CONECTAR A LA BASE DE DATOS")
    }else{
        console.log("CONEXION EXITOSA");
    }
});

// 6. obtener la lista de productos
app.get('/obtenerProductos',(peticion, respuesta)=>{
    // 6.1 consulta sql
    const sql="SELECT * FROM productos";
    // 6.2 lo envio a la conexion
    conexion.query(sql,(error,resultado)=>{
        // 6.3 compruebo el resultado
        if(error) return respuesta.json({Error:"Error en la consulta"});
        return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
    });
});

// 6. Ruta para obtener todas las categorias
app.get('/obtenerCategorias',(peticion, respuesta)=>{
    // 6.1 consulta sql
    const sql="SELECT * FROM categoria";
    // 6.2 lo envio a la conexion
    conexion.query(sql,(error,resultado)=>{
        // 6.3 compruebo el resultado
        if(error) return respuesta.json({Error:"Error en la consulta"});
        return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
    });
});

//Ruta para obtener los productos por categoria 
app.get('/obtenerProductos/:id',(peticion, respuesta)=>{
    const id = peticion.params.id;
    // 6.1 consulta sql
    const sql="SELECT * FROM productos WHERE id_categoria_id = ?";
    // 6.2 lo envio a la conexion
    conexion.query(sql, [id],(error,resultado)=>{
        // 6.3 compruebo el resultado
        if(error) return respuesta.json({Error:"Error en la consulta"});
        return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
    });
});

//Acceso

app.post('/acceso', (peticion,respuesta)=>{
    const sql="SELECT * FROM usuario where correo=? and contrasenia=?";
    conexion.query(sql,[peticion.body.correo,peticion.body.contrasenia],
    (error,resultado)=>{
        if(error) return respuesta.json({mensaje:"error en la consulta"});
        if(resultado.length>0){
            const token=Jwt.sign({usuario:'administrador'},'12345678', {expiresIn:'1d'});
            respuesta.cookie(token);
            return respuesta.json({Estatus:"CORRECTO",Usuario:token})  
        }else{
            return respuesta.json({Estatus:"ERROR", Error:"Usuario o contraseña incorrecta"});
        }
    });
});

//Registro

app.post('/registrar', (peticion,respuesta)=>{
    const sql="INSERT INTO usuario(nombre_usuario,numero_telefono,direccion,correo,contrasenia) VALUES(?,?,?,?,?)";
    conexion.query(sql,[peticion.body.nombre_usuario,peticion.body.numero_telefono,peticion.body.direccion,peticion.body.correo,peticion.body.contrasenia],
    (error,resultado)=>{
        if(error) return respuesta.json({mensaje:"Error en la consulta"});
        if(resultado){
            return respuesta.json({Estatus:"CORRECTO"});
        }
    })
});

//Registrar categorias
app.post('/registrarcat', (peticion,respuesta)=>{
    const sql="INSERT INTO categoria(nombre_categoria,descripcion_categoria) VALUES(?,?)";
    conexion.query(sql,[peticion.body.nombre_categoria,peticion.body.descripcion_categoria],
    (error,resultado)=>{
        if(error) return respuesta.json({mensaje:"Error en la consulta"});
        if(resultado){
            return respuesta.json({Estatus:"CORRECTO"});
        }
    })
});

//Registrar mensajes de contacto
app.post('/registrarMensaje', (peticion,respuesta)=>{
    const sql="INSERT INTO contacto (nombre,correous,mensaje) VALUES(?,?,?)";
    conexion.query(sql,[peticion.body.nombre,peticion.body.correous,peticion.body.mensaje],
    (error,resultado)=>{
        if(error) return respuesta.json({mensaje:"Error en la consulta"});
        if(resultado){
            return respuesta.json({Estatus:"CORRECTO"});
        }
    })
});

//Obtener usuarios registrados
app.get('/obtenerUsuarios',(peticion, respuesta)=>{
    // 6.1 consulta sql
    const sql="SELECT * FROM usuario";
    // 6.2 lo envio a la conexion
    conexion.query(sql,(error,resultado)=>{
        // 6.3 compruebo el resultado
        if(error) return respuesta.json({Error:"Error en la consulta"});
        return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
    });
});

//INICIAR SERVIDOR
app.listen(8082,() =>{
    console.log("Servidor iniciado");
})
