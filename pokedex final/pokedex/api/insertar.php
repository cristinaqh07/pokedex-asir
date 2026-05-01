<?php
include 'config.php';
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo en formato JSON como pide el PDF
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $name = mysqli_real_escape_string($conn, $data['name']);
    $type1 = mysqli_real_escape_string($conn, $data['type1']);
    $gen = intval($data['generation']);

    $sql = "INSERT INTO pokemon (name, type1, generation) VALUES ('$name', '$type1', $gen)";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Pokémon añadido"]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
    }
}
?>