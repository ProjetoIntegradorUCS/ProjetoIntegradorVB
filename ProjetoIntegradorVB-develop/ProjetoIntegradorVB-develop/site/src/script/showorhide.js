// Array.from(document.getElementsByClassName("item"));
//     hideElements();

// showOrHideElements('vendas')

// items.forEach(item => {
//     item.addEventListener('click', onItemClick);
// })

// function onItemClick(event) {
//     const selectedAttribute = event.target.getAttribute("data");
//     showOrHideElements(selectedAttribute);
// }

// function showOrHideElements(selectedAttribute){
//     hideElements();

//     if(selectedAttribute === 'produto'){
//       const myElement = document.getElementById("vendas-Produto");
// myElement.style.display = "flex";
       
//     }
//     if(selectedAttribute === 'período'){
//        const myElement = document.getElementById("vendas-Periodo");
// myElement.style.display = "flex";
//     }
//     if(selectedAttribute === 'marca'){
//       const myElement = document.getElementById("vendas-Marca");
// myElement.style.display = "flex";
//     }
//     if(selectedAttribute === 'colaborador'){
//       const myElement = document.getElementById("vendas-Colaborador");
// myElement.style.display = "flex";
//     }
   
// }

// function hideElements(){
//     document.getElementById('vendas-Produto').style.display = 'none';
//     document.getElementById('vendas-Periodo').style.display = 'none';
//     document.getElementById('vendas-Marca').style.display = 'none';
//     document.getElementById('vendas-Colaborador').style.display = 'none';
// }