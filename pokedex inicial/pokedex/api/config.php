<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "pokemon_db";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    // Si hay error, enviamos un JSON para que JS no rompa
    header('Content-Type: application/json');
    die(json_encode(["error" => "Fallo de conexion: " . mysqli_connect_error()]));
}
?>