<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $where = ["1=1"];

    if (!empty($_GET['nombre'])) {
        $nom = mysqli_real_escape_string($conn, $_GET['nombre']);
        $where[] = "name LIKE '%$nom%'";
    }
    if (!empty($_GET['tipo'])) {
        $tipo = mysqli_real_escape_string($conn, $_GET['tipo']);
        $where[] = "(type1 = '$tipo' OR type2 = '$tipo')";
    }
    if (isset($_GET['generacion']) && $_GET['generacion'] !== '') {
        $gen = intval($_GET['generacion']);
        $where[] = "generation = $gen";
    }
    if (isset($_GET['legendario']) && $_GET['legendario'] !== '') {
        $leg = intval($_GET['legendario']);
        $where[] = "is_legendary = $leg";
    }

    $sql = "SELECT * FROM pokemon WHERE " . implode(" AND ", $where);
    $result = mysqli_query($conn, $sql);
    
    $pokemons = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $pokemons[] = $row;
    }
    echo json_encode($pokemons);
}
?>