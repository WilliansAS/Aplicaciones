import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

//CREAR LAS INSTANCIA DE EXPRESS
const app=express();
app.use(cors());

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



//INICIAR SERVIDOR
app.listen(8082,() =>{
    console.log("Servidor iniciado");
})
