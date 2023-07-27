-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2023 a las 07:45:30
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bodas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_productocarrito` int(11) NOT NULL,
  `cantidad_productos` int(11) NOT NULL,
  `coste_total` decimal(10,2) NOT NULL,
  `id_producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(30) NOT NULL,
  `descripcion_categoria` varchar(200) NOT NULL,
  `imagen` varchar(100) DEFAULT 'sin-foto.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `imagen`) VALUES
(1, 'Salones', '¡Bienvenidos a nuestros elegantes salones de bodas! Nuestros espacios están diseñados para crear un ', 'catsalones.jpg'),
(2, 'Anillos', 'Los anillos de compromiso son una de las categorías más destacadas en nuestra página de bodas. Representan un símbolo especial de amor, compromiso y unión entre dos personas que han decidido dar el si', 'catani.jpg'),
(3, 'Decoraciones', 'Nuestras decoraciones de boda son cuidadosamente diseñadas para crear un ambiente mágico y romántic', 'catdecoraciones.jpg'),
(4, 'Vestuarios', 'Nuestros vestuarios de boda están diseñados con elegancia y estilo para hacer de tu día especial un ', 'catvestuarios.jpg'),
(5, 'Fotografías', 'Nuestros vestuarios de boda están diseñados con elegancia y estilo para hacer de tu día especial un ', 'catfoto.jpg'),
(18, 'Pasteles', '¡Bienvenidos a la deliciosa categoría de pasteles de nuestra página de bodas! Aquí encontrarás una exquisita selección de pasteles de boda diseñados para deleitar tus sentidos y hacer que tu día espec', 'prod12.jpeg'),
(19, 'juanjujjj', 'Holaa a todos', 'catsalones.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_pago` int(11) NOT NULL,
  `detalles` varchar(200) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id_mensaje` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correous` varchar(30) NOT NULL,
  `mensaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id_mensaje`, `nombre`, `correous`, `mensaje`) VALUES
(1, 'Anthony', 'ant123@gmail.com', 'Buenas tardes, tengo una duda con un producto '),
(2, 'Guillermo', 'gulle@gmail.com', 'Buenas tardes '),
(3, 'Euan', 'euan@gmail.com', 'Holaaaaaa'),
(4, 'Anthony', 'rvillegas@gmail.com', 'hola '),
(5, 'Anthony', 'antho@gmail.com', 'Hola buenas tardes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `detalles` varchar(300) NOT NULL,
  `total` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `descripcion_producto` varchar(1000) NOT NULL,
  `imagen` varchar(200) DEFAULT 'sin-foto.jpg',
  `id_categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `precio_unitario`, `descripcion_producto`, `imagen`, `id_categoria_id`) VALUES
(3, 'Pastel 3 leches', 823.67, 'Este pastel se destaca por su textura húmeda y esponjosa, que se logra al empapar las capas de bizcocho en una mezcla de tres tipos de leche: leche evaporada, leche condensada y crema de leche', 'prod2.jpeg', 6),
(5, 'Salón', 7504.32, 'Salón elegante de eventos, especial para bodas. Espacio suficiente para 100 invitados y cuenta con un ambiente limpio.', 'boda3.jpg', 3),
(6, 'Decoración Para Mesas', 202.21, 'Decoración: Rosas, platos, copas, tenedores y florales para tu boda ideal. ', 'img-cat4.jpeg', 3),
(17, 'Pastel de fresa', 568.32, 'Estas hermosas creaciones florales, diseñadas con esmero por expertos floristas, están pensadas para complementar y realzar la temática y estilo de la boda.', 'pastel.jpg', 6),
(18, 'Flores', 23.00, 'Estas hermosas creaciones florales, diseñadas con esmero por expertos floristas, están pensadas para complementar y realzar la temática y estilo de la boda.', 'flower.jpg', 3),
(19, 'Pastel de fresa', 152.98, 'import { useNavigate, Link } from \"react-router-dom\";', 'img-cat1.jpeg', 4),
(20, 'Anillo ', 1256.00, 'Anillo de titanio ', 'prod9.jpg', 2),
(21, 'Sesión fotográfica ', 231.32, 'Sesión fotográfica en tu lugar preferido para tu boda ', 'prod5.jpeg', 5),
(22, 'Anillos', 2345.21, 'Anillo de oro para matrimonio ', 'prod4.jpeg', 2),
(24, 'Flores', 534.00, 'sushuhvushvqs', 'flower.jpg', 3),
(25, 'Vestido de novia ', 2456.12, 'Vestido blanco de novia ', 'prod7.jpg', 4),
(27, 'Vestido de novia ', 345.00, 'Vestido blanco con florales ', 'prod9.jpg', 4),
(28, 'Pastel de fresa', 568.32, 'ccchhgvhgv', 'boda3.jpg', 5),
(29, 'Salón Elegante', 568.32, 'guguygygyg', 'proveedor.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `numero_telefono` int(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasenia` varchar(200) NOT NULL,
  `nivel` varchar(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `numero_telefono`, `direccion`, `correo`, `contrasenia`, `nivel`) VALUES
(29, 'Anthony', 2147483647, '9', 'gerry@gmail.com', '$2a$10$ux6hMCqk/SyfCPzoF/T0veAPkf3i0EBqcVQeZsVct.3CpU8qBBn9y', '1'),
(30, 'Willians', 21471234, 'Villas', 'willy@gmail.com', '$2a$10$XKd5eNPIY6wKzzyFnreAsupICbXIy1xDae/Zy8a6bTqDYa0lYla6m', '2'),
(31, 'Cochi', 2147483647, 'Puerto morelos', 'cochi@gmail.com', '$2a$10$V1014NOw8fqY6leALtPMGenNg3RSnoNve/ly2PySAhYF6VjflQe7y', '2'),
(32, 'Guillermo', 2147483647, 'PUERTAS DEL MAR ', 'guillermo.jesus.garcia.canul@gmail.com', '$2a$10$W95iQ8u5JfA82YJ9Mz.qVulWIHDfjsLaFHOoAjo1wocrN8l4HnkW.', '1'),
(33, 'Cochi', 63634545, 'Puerto', 'euan12@gmail.com', '$2a$10$Bz8LrQyg/TfkoQ27RyAEMO8DbCyRZLna9bNLWN61SwWC100V3nGRS', '2'),
(34, 'Gerardo', 1234567543, 'Bonfil', 'garc@gmail.com', '$2a$10$n/o8MIWMlWj4FJDNBuae..WpfJ201pnowZyKSNM9RvdwOyIrFvLai', '2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_productocarrito`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria_id` (`id_categoria_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_productocarrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
