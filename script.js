const nomProduit = document.getElementById('nomProduit');
const prixProduit = document.getElementById('prixProduit');
const stockProduit = document.getElementById('stockProduit');
const categorieProduit = document.getElementById('categorieProduit');
const categorieDuProduit = document.getElementById('categorieDuProduit');
const ajouterProduit = document.getElementById('ajouterProduit');
const listeProduits = document.getElementById('listeProduits');
const totalStock = document.getElementById('totalStock');
const rechercheProduit = document.getElementById('rechercheProduit');

const statTotal = document.getElementById('statTotal');
const statCount = document.getElementById('statCount');
const statAvg = document.getElementById('statAvg');

let produits = [];

// Charger les produits depuis MySQL
async function chargerProduits() {
    const response = await fetch("api/get-produits.php");
    produits = await response.json();

    afficheProduit();
}

rechercheProduit.addEventListener('input', () => {
    afficheProduit();
});

ajouterProduit.addEventListener('click', async () => {
    const nom = nomProduit.value.trim();
    const prix = Number(prixProduit.value.trim());
    const stock = Number(stockProduit.value.trim());
    const categorie = categorieProduit.value.trim();

    if (
        nom === "" ||
        prixProduit.value.trim() === "" ||
        stockProduit.value.trim() === "" ||
        categorie === "" ||
        Number.isNaN(prix) ||
        Number.isNaN(stock)
    ) {
        alert('Saisie incorrecte');
        nomProduit.value = "";
        prixProduit.value = "";
        stockProduit.value = "";
        categorieProduit.value = "";
        return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("stock", stock);
    formData.append("categorie", categorie);

    const response = await fetch("api/ajouter-produit.php", {
        method: "POST",
        body: formData
    });

    const resultat = await response.json();
    console.log(resultat);

    if (resultat.success === true) {
        nomProduit.value = "";
        prixProduit.value = "";
        stockProduit.value = "";
        categorieProduit.value = "";

        chargerProduits();
    } else {
        alert(resultat.message);
    }
});

function afficheProduit() {
    let totalDuStock = 0;

    listeProduits.textContent = "";
    totalStock.textContent = "";

    statTotal.textContent = "";
    statCount.textContent = "";
    statAvg.textContent = "";
    categorieDuProduit.textContent = "";

    const recherche = rechercheProduit.value.trim().toLowerCase();

    const produitsFiltres = produits.filter((produit) => {
        return produit.nom.toLowerCase().includes(recherche);
    });

    produitsFiltres.forEach((element) => {
        const prix = Number(element.prix);
        const stock = Number(element.stock);

        totalDuStock += prix * stock;

        const li = document.createElement('li');

        const spanNom = document.createElement('span');
        spanNom.textContent = element.nom;

        const spanPrix = document.createElement('span');
        spanPrix.textContent = `${prix.toFixed(2)} €`;

        const spanStock = document.createElement('span');
        spanStock.textContent = stock;

        const spanValeur = document.createElement('span');
        spanValeur.textContent = `${(prix * stock).toFixed(2)} €`;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const btn = document.createElement('button');
        btn.textContent = "X";

        actions.appendChild(btn);

        li.appendChild(spanNom);
        li.appendChild(spanPrix);
        li.appendChild(spanStock);
        li.appendChild(spanValeur);
        li.appendChild(actions);

        listeProduits.appendChild(li);

        btn.addEventListener('click', async (e) => {
            e.stopPropagation();

            const formData = new FormData();
            formData.append("id", element.id);

            const response = await fetch("api/supprimer-produit.php", {
                method: "POST",
                body: formData
            });

            const resultat = await response.json();
            console.log(resultat);

            if (resultat.success === true) {
                chargerProduits();
            } else {
                alert(resultat.message);
            }
        });

        li.addEventListener('click', () => {
            statCount.textContent = element.nom;
            statTotal.textContent = `${(prix * stock).toFixed(2)} €`;
            statAvg.textContent = `${prix.toFixed(2)} €`;
            categorieDuProduit.textContent = element.categorie;

            if (li.querySelector('.btn-modifier')) {
                return;
            }

            const modifier = document.createElement('button');
            modifier.textContent = "Modifier";
            modifier.classList.add('btn-modifier');

            actions.insertBefore(modifier, btn);

            modifier.addEventListener('click', (event) => {
                event.stopPropagation();

                nomProduit.value = element.nom;
                prixProduit.value = prix;
                stockProduit.value = stock;
                categorieProduit.value = element.categorie;

                alert("La modification sera branchée après la création de modifier-produit.php");
            });
        });
    });

    totalStock.textContent = totalDuStock.toFixed(2) + " €";
}

// Démarrage
chargerProduits();