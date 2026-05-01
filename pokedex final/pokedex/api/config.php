<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "pokemon_db";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    header('Content-Type: application/json');
    die(json_encode(["error" => "Error de conexión: " . mysqli_connect_error()]));
}
?>