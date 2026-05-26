<?php

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";

// 1. On récupère l'id envoyé par le formulaire
$id = $_POST["id"] ?? "";

// 2. On vérifie que l'id est bien présent
if ($id === "") {
    echo json_encode([
        "success" => false,
        "message" => "ID du produit manquant"
    ]);
    exit;
}

// 3. On prépare la requête SQL de suppression
$requete = $pdo->prepare("
    DELETE FROM produits
    WHERE id = ?
");

// 4. On exécute la requête avec l'id reçu
$requete->execute([
    $id
]);

// 5. On renvoie une réponse JSON
echo json_encode([
    "success" => true,
    "message" => "Produit supprimé avec succès"
]);

?>