
    const nomProduit = document.getElementById('nomProduit') ;
    const prixProduit = document.getElementById('prixProduit') ;
    const stockProduit = document.getElementById('stockProduit')  ;
    const categorieProduit = document.getElementById('categorieProduit') ;
    const categorieDuProduit = document.getElementById('categorieDuProduit') ;
    const ajouterProduit = document.getElementById('ajouterProduit') ;
    const listeProduits = document.getElementById('listeProduits') ;
    const totalStock = document.getElementById('totalStock') ;
    const rechercheProduit = document.getElementById('rechercheProduit');

    const statTotal = document.getElementById('statTotal') ;
    const statCount = document.getElementById('statCount') ;
    const statAvg = document.getElementById('statAvg');
    let indexModification = null;
    let produits = [] ;
    produits = JSON.parse(localStorage.getItem("produits")) || [] ;
  afficheProduit() ;

  rechercheProduit.addEventListener('input', () => {
  afficheProduit();
});

    ajouterProduit.addEventListener(('click') ,() =>{
        const nom = nomProduit.value.trim() ;
        const prix = Number(prixProduit.value.trim()) ;
        const stock = Number(stockProduit.value.trim()) ;
        const categorie = categorieProduit.value.trim() ;

        if(nomProduit.value.trim() ==="" || prixProduit.value.trim() === "" || 
         stockProduit.value.trim() === "" ||categorieProduit.value.trim() ==="" || Number.isNaN(Number(prixProduit.value))
          || Number.isNaN(Number(stockProduit.value)))  
        {
          alert('saisi incorrect') ;
          nomProduit.value = "" , prixProduit.value = "" , stockProduit.value = ""  ,categorieProduit.value = "";
          return ; 
        }
        const nouveauProduit = {
          nom: nom , 
          prix: prix , 
          stock:stock,
          valeurStock:prix * stock ,
          categorie:categorie 
        };
        if(indexModification === null ) {
          produits.push(nouveauProduit) ; 
        }
        else {
          produits[indexModification] = nouveauProduit ;
          indexModification = null ;
          ajouterProduit.textContent = "ajouter au stock" ;
         }
        console.log(produits) ;
        localStorage.setItem('produits',JSON.stringify(produits)) ;
        nomProduit.value = "" ; 
        prixProduit.value = "" ;
        stockProduit.value = "" ; 
        categorieProduit.value = "" ;
        afficheProduit() ;

    });
    function afficheProduit() {
        let totalDuStock = 0 ;
        

        listeProduits.textContent = "" ;
        totalStock.textContent = "";

        statTotal.textContent = "" ;
        statCount.textContent= "";
       
        statAvg.textContent = "" ;
      categorieDuProduit.textContent = "" ;

        const recherche = rechercheProduit.value.trim().toLowerCase() ;

        const produitsFiltres = produits.filter((produit) =>{
            return produit.nom.toLowerCase().includes(recherche) ;
         });

            produitsFiltres.forEach((element) => {

            const vraiIndex = produits.indexOf(element);
          totalDuStock+= element.prix  * element.stock ;
          
          const li = document.createElement('li');

          const spanNom = document.createElement('span');
            spanNom.textContent = element.nom;

              const spanPrix = document.createElement('span');
            spanPrix.textContent = `${element.prix} €`;

            const spanStock = document.createElement('span');
            spanStock.textContent = element.stock;

            const spanValeur = document.createElement('span');
            spanValeur.textContent = `${element.prix * element.stock} €`;

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
        
          btn.addEventListener(('click') , (e)=>{
            e.stopPropagation() ;
            li.remove() ;
            produits.splice(vraiIndex,1) ;
            localStorage.setItem('produits',JSON.stringify(produits)) ;

            afficheProduit();
          });
          li.addEventListener(('click') , () =>{
            statCount.textContent= element.nom ;
            statTotal.textContent = element.prix * element.stock ; 
            statAvg.textContent = element.prix  ;
            categorieDuProduit.textContent = element.categorie ;

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
                prixProduit.value = element.prix;
                stockProduit.value = element.stock;
                 categorieProduit.value = element.categorie;

                indexModification = vraiIndex;
                ajouterProduit.textContent = "Valider la modification";
                });
            });
       });
       totalStock.textContent = totalDuStock.toFixed(2) + " €";
     

     
    }
 