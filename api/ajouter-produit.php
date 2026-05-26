<?php

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";

$nom = $_POST["nom"] ?? "";
$prix = $_POST["prix"] ?? "";
$stock = $_POST["stock"] ?? "";
$categorie = $_POST["categorie"] ?? "";

$nom = trim($nom);
$categorie = trim($categorie);

if ($nom === "" || $prix === "" || $stock === "" || $categorie === "") {
    echo json_encode([
        "success" => false,
        "message" => "Tous les champs sont obligatoires"
    ]);
    exit;
}

$requete = $pdo->prepare("
    INSERT INTO produits (nom, prix, stock, categorie)
    VALUES (?, ?, ?, ?)
");

$requete->execute([
    $nom,
    $prix,
    $stock,
    $categorie
]);

echo json_encode([
    "success" => true,
    "message" => "Produit ajouté avec succès"
]);

?>