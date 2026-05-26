<?php 

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";

$requete = $pdo->query("SELECT * FROM produits ORDER BY id DESC");

$produits = $requete->fetchAll();

echo json_encode($produits);

?>