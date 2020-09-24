const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');

for(item of menuItems){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active');
    }
}

/* O currentPage significa ques está "pegando" a localização da página, ex="/instructor";
   O menuItems está "pegando" o 'a', que está dentro da div .links, que está dentro do header;
   O includes está "pegando" tudo que está depois do ex="/instructor", que no caso está sendo
   "pego", pelo getAttribute, que no caso é o href;
   Dentro do for, o item está "pegando" dentro do menuItems o 'a', e então colocando na condição,
   se a localização da página for igual a localização do 'a', atribuir a classe active, que 
   ai entra na regra de css; */