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

//Paginação
//totalPages = 20
//selectedPage = 15
//[1, ..., 13, 14, 15, 16, 17, ..., 20]

function paginate(selectedPage, totalPages){

    let pages = [],
    oldPage;

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...');
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1);
            }

            pages.push(currentPage);
            oldPage = currentPage;
        }
    }

    return pages;
}

function createPagination(pagination){
    const filter = pagination.dataset.filter;
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);

    let elements = '';

    for (let page of pages){
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`;
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
            }else{
                elements += `<a href="?page=${page}">${page}</a>`;
            }
        }
    }

    pagination.innerHTML = elements;

}

const pagination = document.querySelector('.pagination');

if(pagination){
    createPagination(pagination);
}