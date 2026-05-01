-- Crear la base de datos
CREATE DATABASE pokemon_db;
USE pokemon_db;

-- Crear tabla principal
CREATE TABLE pokemon (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    type1 VARCHAR(20),
    type2 VARCHAR(20),
    generation INT,
    is_legendary BOOLEAN
);

-- Insertar datos de muestra (Primera y Segunda Generación)
INSERT INTO pokemon (id, name, type1, type2, generation, is_legendary) VALUES
(1, 'Bulbasaur', 'Grass', 'Poison', 1, 0),
(2, 'Ivysaur', 'Grass', 'Poison', 1, 0),
(3, 'Venusaur', 'Grass', 'Poison', 1, 0),
(4, 'Charmander', 'Fire', NULL, 1, 0),
(5, 'Charmeleon', 'Fire', NULL, 1, 0),
(6, 'Charizard', 'Fire', 'Flying', 1, 0),
(7, 'Squirtle', 'Water', NULL, 1, 0),
(8, 'Wartortle', 'Water', NULL, 1, 0),
(9, 'Blastoise', 'Water', NULL, 1, 0),
(144, 'Articuno', 'Ice', 'Flying', 1, 1),
(145, 'Zapdos', 'Electric', 'Flying', 1, 1),
(146, 'Moltres', 'Fire', 'Flying', 1, 1),
(152, 'Chikorita', 'Grass', NULL, 2, 0),
(153, 'Bayleef', 'Grass', NULL, 2, 0),
(154, 'Meganium', 'Grass', NULL, 2, 0),
(155, 'Cyndaquil', 'Fire', NULL, 2, 0),
(156, 'Quilava', 'Fire', NULL, 2, 0),
(157, 'Typhlosion', 'Fire', NULL, 2, 0),
(243, 'Raikou', 'Electric', NULL, 2, 1),
(244, 'Entei', 'Fire', NULL, 2, 1),
(245, 'Suicune', 'Water', NULL, 2, 1);