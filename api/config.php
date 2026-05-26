<?php

$host = "localhost";
$dbname = "u691512846_crud_produits";
$user = "u691512846_crud_user";
$password = "NathanVincenzo2189";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die(json_encode([
        "success" => false,
        "message" => "Erreur de connexion à la base de données",
        "error" => $e->getMessage()
    ]));
}