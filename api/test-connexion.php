<?php

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";

echo json_encode([
    "success" => true,
    "message" => "Connexion à la base de données réussie"
]);