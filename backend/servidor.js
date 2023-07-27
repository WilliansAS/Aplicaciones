import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from "bcryptjs";
import Jwt  from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

//CREAR LAS INSTANCIA DE EXPRESS
const app = express();
app.use(cors());
app.use(express.json());

//CREAR LA CONEXION
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bodas'
});

//VERIFICAMOS LA CONEXION
conexion.connect(function (error) {
  if (error) {
    console.log("ERROR AL CONECTAR A LA BASE DE DATOS")
  } else {
    console.log("CONEXION EXITOSA");
  }
});

// Registrar usuarios
app.post('/registrarUsuario', (peticion, respuesta) => {
  const { nombre_usuario, numero_telefono, direccion, correo, contrasenia } = peticion.body;

  // Validar que todos los campos requeridos estén presentes
  if (!nombre_usuario || !numero_telefono || !direccion || !correo || !contrasenia) {
    return respuesta.status(400).json({ mensaje: "Todos los campos son requeridos." });
  }

  // Generar el hash de la contraseña
  const hash = bcrypt.hashSync(contrasenia, 10);

  const sql = "INSERT INTO usuario (nombre_usuario, numero_telefono, direccion, correo, contrasenia) VALUES (?, ?, ?, ?, ?)";
  conexion.query(sql, [nombre_usuario, numero_telefono, direccion, correo, hash], (error, resultado) => {
    if (error) {
      console.error("Error en la consulta:", error.message);
      return respuesta.status(500).json({ mensaje: "Hubo un error en el servidor. Inténtalo de nuevo más tarde." });
    }
    if (resultado) {
      return respuesta.json({ Estatus: "CORRECTO" });
    }
  });
});


//Acceso
app.post('/acceso', (peticion, respuesta) => {
  const correo = peticion.body.correo;
  const contrasenia = peticion.body.contrasenia;

  const sql = "SELECT * FROM usuario WHERE correo=?";
  conexion.query(sql, [correo], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error en la consulta' });

    if (resultado.length > 0) {
      const usuario = resultado[0];
      const contraseniaAlmacenada = usuario.contrasenia;

      // Comparar la contraseña ingresada con la contraseña almacenada utilizando bcrypt
      bcrypt.compare(contrasenia, contraseniaAlmacenada, (error, coinciden) => {
        if (error) return respuesta.json({ mensaje: 'Error en la comparación de contraseñas' });

        if (coinciden) {
          const token = Jwt.sign({ usuario: 'administrador' }, '12345678', { expiresIn: '1d' });
          respuesta.cookie(token);

          // Devolver el nivel del usuario junto con el token en la respuesta
          return respuesta.json({ Estatus: 'CORRECTO', Usuario: token, Nivelusuario: usuario.nivel });
        } else {
          return respuesta.json({ Estatus: 'ERROR', Error: 'Usuario o contraseña incorrecta' });
        }
      });
    } else {
      return respuesta.json({ Estatus: 'ERROR', Error: 'Usuario o contraseña incorrecta' });
    }
  });
});


// 6. obtener la lista de productos
app.get('/obtenerProductos',(peticion, respuesta)=>{
    // 6.1 consulta sql
    const sql="SELECT * FROM productos INNER JOIN categoria ON id_categoria_id = id_categoria";
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

// 6. Ruta para obtener todas las categorias por id
app.get('/obtenerCategorias/:id',(peticion, respuesta)=>{
  const id = peticion.params.id;
  // 6.1 consulta sql
  const sql="SELECT * FROM categoria WHERE id_categoria = ?";
  // 6.2 lo envio a la conexion
  conexion.query(sql,[id],(error,resultado)=>{
      // 6.3 compruebo el resultado
      if(error) return respuesta.json({Error:"Error en la consulta"});
      return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
  });
});

// 6. Ruta para obtener todas los usuarios por id
app.get('/obtenerUsuario/:id',(peticion, respuesta)=>{
  const id = peticion.params.id;
  // 6.1 consulta sql
  const sql="SELECT * FROM usuario WHERE id_usuario = ?";
  // 6.2 lo envio a la conexion
  conexion.query(sql,[id],(error,resultado)=>{
      // 6.3 compruebo el resultado
      if(error) return respuesta.json({Error:"Error en la consulta"});
      return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
  });
});

// 6. Ruta para obtener todas los productos por id
app.get('/obtenerProducto/:id',(peticion, respuesta)=>{
  const id = peticion.params.id;
  // 6.1 consulta sql
  const sql="SELECT * FROM productos WHERE id_producto = ?";
  // 6.2 lo envio a la conexion
  conexion.query(sql,[id],(error,resultado)=>{
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

//subir imagenes al servidor
const almacenamiento = multer.diskStorage({
  destination: (peticion, archivo, funcion) => {
    funcion(null, "public/imagenes");
  },
  filename: (peticion, archivo, funcion) => {
    funcion(null, archivo.originalname);
  },
});

const subirFoto = multer({
  storage: almacenamiento,
});

//Registrar productos
app.post('/registrarprod', subirFoto.single("imagen"), (peticion,respuesta)=>{
  const { nombre_producto, precio_unitario, descripcion_producto, id_categoria_id } = peticion.body;
  const imagen = peticion.file.filename;
  const sql="INSERT INTO productos(nombre_producto, precio_unitario, descripcion_producto, imagen, id_categoria_id) VALUES(?,?,?,?,?)";
  conexion.query(sql,[nombre_producto, precio_unitario, descripcion_producto, imagen, id_categoria_id],
  (error,resultado)=>{
      if(error) return respuesta.json({mensaje:"Error en la consulta"});
      if(resultado){
          return respuesta.json({Estatus:"CORRECTO"});
      }
  })
});

//Registrar categorias
app.post('/registrarcat', subirFoto.single("imagen"), (peticion,respuesta)=>{
  const sql="INSERT INTO categoria(nombre_categoria,descripcion_categoria,imagen) VALUES(?,?,?)";
  conexion.query(sql,[peticion.body.nombre_categoria,peticion.body.descripcion_categoria,peticion.file.filename],
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

//Contar usuarios
app.get('/numUsuarios',(peticion, respuesta)=>{
  // 6.1 consulta sql
  const sql="SELECT id_usuario, COUNT(*) AS Usuarios FROM usuario";
  // 6.2 lo envio a la conexion
  conexion.query(sql,(error,resultado)=>{
      // 6.3 compruebo el resultado
      if(error) return respuesta.json({Error:"Error en la consulta"});
      return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
  });
});

//Contar productos
app.get('/numProductos',(peticion, respuesta)=>{
  // 6.1 consulta sql
  const sql="SELECT id_producto, COUNT(*) AS Productos FROM productos";
  // 6.2 lo envio a la conexion
  conexion.query(sql,(error,resultado)=>{
      // 6.3 compruebo el resultado
      if(error) return respuesta.json({Error:"Error en la consulta"});
      return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
  });
});

//Contar categorias
app.get('/numCategorias',(peticion, respuesta)=>{
  // 6.1 consulta sql
  const sql="SELECT id_categoria, COUNT(*) AS Categorias FROM categoria";
  // 6.2 lo envio a la conexion
  conexion.query(sql,(error,resultado)=>{
      // 6.3 compruebo el resultado
      if(error) return respuesta.json({Error:"Error en la consulta"});
      return respuesta.json({Estatus:"Exitoso",Resultado:resultado});
  });
});

// Ruta para eliminar un producto
app.delete('/eliminarProducto/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = 'DELETE FROM productos WHERE id_producto = ?';
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al eliminar el producto' });

    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Producto eliminado correctamente' });
  });
});

// Ruta para eliminar un usuario
app.delete('/eliminarUsuario/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al eliminar usuario' });

    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Usuario eliminado correctamente' });
  });
});


// Ruta para eliminar una categoria
app.delete('/eliminarCategoria/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al eliminar categoria' });
    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Categoria eliminada correctamente' });
  });
});

// Ruta para actualizar un producto
app.put('/actualizarProducto/:id', subirFoto.single("imagen"), (peticion, respuesta) => {
  const id = peticion.params.id;
  const { nombre_producto, precio_unitario, descripcion_producto, id_categoria_id } = peticion.body;
  const imagen = peticion.file.filename;
  const sql = 'UPDATE productos SET nombre_producto = ?, precio_unitario = ?, descripcion_producto = ?, imagen = ?, id_categoria_id = ? WHERE id_producto = ?';
  conexion.query(sql, [nombre_producto, precio_unitario, descripcion_producto, imagen, id_categoria_id, id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al actualizar el producto' });
    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Producto actualizado correctamente' });
  });
});

// Ruta para actualizar una categoria
app.put('/actualizarCategoria/:id', subirFoto.single("imagen"), (peticion, respuesta) => {
  const id = peticion.params.id;
  const { nombre_categoria, descripcion_categoria } = peticion.body;
  const imagen = peticion.file.filename;
  const sql = 'UPDATE categoria SET nombre_categoria = ?, descripcion_categoria = ?, imagen = ? WHERE id_categoria = ?';
  conexion.query(sql, [nombre_categoria, descripcion_categoria, imagen, id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al actualizar el producto' });
    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Producto actualizado correctamente' });
  });
});

// Ruta para actualizar una categoria
app.put('/actualizarUsuario/:id',(peticion, respuesta) => {
  const id = peticion.params.id;
  const { nombre_usuario, numero_telefono, direccion, correo } = peticion.body;
  const sql = 'UPDATE usuario SET nombre_usuario = ?, numero_telefono = ?, direccion = ?, correo = ? WHERE id_usuario = ?';
  conexion.query(sql, [nombre_usuario, numero_telefono, direccion, correo, id], (error, resultado) => {
    if (error) return respuesta.json({ mensaje: 'Error al actualizar usuario' });
    return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Usuario actualizado correctamente' });
  });
});

// Agregar esta ruta para recibir los datos del pedido y realizar la inserción
app.post("/crear-pedido", (peticion, respuesta) => {
  const sql =
    "INSERT INTO pedidos (id_usuario, fecha, detalles, total) VALUES (?, NOW(), ?, ?)";
  conexion.query(
    sql,
    [peticion.body.id_usuario, peticion.body.fecha, peticion.body.detalles, peticion.body.total],
    (error, resultado) => {
      if (error) {
        return respuesta.json({
          Estatus: "Error",
          Error: "Error al crear el pedido",
        });
      } else {
        return respuesta.json({ Estatus: "CORRECTO" });
      }
    }
  );
});

// Ruta para obtener la lista de pedidos con el nombre del usuario
app.get("/pedidos", (peticion, respuesta) => {
  const sql = `
  SELECT pedidos.id_pedido, usuario.nombre_usuario AS nombre_usuario, pedidos.fecha, pedidos.detalles, pedidos.total FROM pedidos INNER JOIN usuario ON pedidos.id_usuario_id = usuario.id_usuario;
  `;
  conexion.query(sql, (error, resultados) => {
    if (error) {
      return respuesta.status(500).json({ mensaje: "Error en la consulta" });
    }
    return respuesta.json(resultados);
  });
});

// Ruta para crear un nuevo pedido
app.post("/crear-pedido", (peticion, respuesta) => {
  // Obtener los datos del pedido desde el cuerpo de la solicitud
  const { id_usuario, detalles, total } = peticion.body;

  // Realizar la inserción del nuevo pedido en la base de datos
  const sql =
    "INSERT INTO pedidos (id_usuario, fecha, detalles, total) VALUES (?, NOW(), ?, ?)";
  conexion.query(sql, [id_usuario, detalles, total], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "Error al crear el pedido",
      });
    } else {
      return respuesta.json({ Estatus: "CORRECTO" });
    }
  });
});

// Ruta para eliminar un pedido por su ID
app.delete("/pedidos/:id", (peticion, respuesta) => {
  const idPedido = peticion.params.id;
  const sql = "DELETE FROM pedidos WHERE id_pedido = ?";
  conexion.query(sql, [idPedido], (error, resultado) => {
    if (error) {
      return respuesta.json({
        Estatus: "Error",
        Error: "Error al eliminar el pedido",
      });
    } else {
      return respuesta.json({ Estatus: "CORRECTO" });
    }
  });
});

//INICIAR SERVIDOR
app.listen(8082,() =>{
    console.log("Servidor iniciado");
});