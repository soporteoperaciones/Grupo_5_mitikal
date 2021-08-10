CREATE DATABASE mitikal;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(18) DEFAULT NULL,
  `description` varchar(18) DEFAULT NULL,
  `category` varchar(19) DEFAULT NULL,
  `color` varchar(13) DEFAULT NULL,
  `size` varchar(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `destacados` tinyint(1) DEFAULT NULL,
  `novedades` tinyint(1) DEFAULT NULL,
  `image2` varchar(200) DEFAULT NULL,
  `image3` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;



CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(36) DEFAULT NULL,
  `image` varchar(28) DEFAULT NULL,
  `name` varchar(18) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `password1` varchar(60) DEFAULT NULL,
  `password2` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
