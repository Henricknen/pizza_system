let modalQt = 1;        // variável 
const c = (el)=> {      // constante 'c' reçebe um elemento 'el' e retorna 'document.querySelector', será ultilizada para evitar extensão excessiva de código
    return document.querySelector(el);
}

const cs = (el)=> {     // 'cs' retorna um array com itens encontrados
    return document.querySelectorAll(el);
}

pizzaJson.map((item, index)=> {     // mapeando 'pizzaJson'
    let pizzaItem = c('.models .pizza-item'). cloneNode(true);       // função 'cloneNode' clona elemento de classe 'pizza-item' do html
 
    pizzaItem.setAttribute('data-key', index);       // setando atributo 'data-key'
    pizzaItem.querySelector('.pizza-item--img img'). src = item.img;     // seleçionando elemento de classe 'pizza-item--img' do html, 'src' inseri o caminho da imagem da pizza
    pizzaItem.querySelector('.pizza-item--price'). innerHTML = `R$ ${item.price.toFixed(2)}`;       // 'toFixed' fixa dois algarismos depois da virgula
    pizzaItem.querySelector('.pizza-item--name'). innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc'). innerHTML = item.description;
    pizzaItem.querySelector('a'). addEventListener('click', (e)=> {        // seleçionando tag 'a' e adiçionando um 'evento' de click
        e.preventDefault();     // 'preventDefault' vai previnir a ação padrão de 'click' da tag 'a'
        let key = e.target.closest('.pizza-item'). getAttribute('data-key');
        modalQt = 1;        // seta a quandida como 1

        c('.pizzaBig img').src = pizzaJson[key].img;       // preenchendo o 'modal' com informações da pizza
        c('.pizzaInfo h1'). innerHTML = pizzaJson[key]. name;
        c('.pizzaInfo--desc'). innerHTML = pizzaJson[key]. description;
        c('.pizzaInfo--actualPrice'). innerHTML = `R$ ${pizzaJson[key]. price.toFixed(2)}`;
        c('.pizzaInfo--size.selected'). classList.remove('selected');       // removendo 'selected' para desseleçionar o item
        cs('.pizzaInfo--size'). forEach((size, sizeIndex)=> {
            if(sizeIndex == 2) {        // verificando qual 'sizeIndex' para adiçionar o 'selected'
                size.classList.add('selected');
            }
            size.querySelector('span'). innerHTML = pizzaJson[key]. sizes[sizeIndex];
        });

        c('.pizzaInfo--qt'). innerHTML = modalQt;

        c('.pizzaWindowArea'). style.opacity = 0;
        c('.pizzaWindowArea'). style.display = 'flex';      // alterando 'display' do elemento de classe 'pizzaWindowArea' para torna-lo visivel na tela
        setTimeout(()=> {
            c('.pizzaWindowArea'). style.opacity = 1;
        }, 200);       // função aguarda '200' mili segundos ou seja 1/5 de segundo para executar a opaçidade, mostrando elemento de classe 'pizzaWindowArea' na tela
    });

    c('.pizza-area'). append(pizzaItem);       // 'append' adiçionando o elemento 'pizzaItem'
});

function closeModal() {     // função 'closeModal' será um evento para 'fechar' o modal
    c('.pizzaWindowArea'). style.opacity = 0;
    setTimeout(()=> {
        c('.pizzaWindowArea'). style.display = 'none';      // 'tirando' o modal da tela depois de '500', 1/5 segundos
    }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton'). forEach((item)=> {
    item.addEventListener('click', closeModal);     // colocando 'funçãocloseModal' como ação de click
});

c('.pizzaInfo--qtmenos'). addEventListener('click', ()=> {
    if(modalQt > 1) {       // 'limite' espeçificado para executar ação de diminuir quantidade
        modalQt--;      // 'decrementando' variável modalQt
        c('.pizzaInfo--qt'). innerHTML = modalQt;       // linha serve para 'atualizar' a variável modalQt
    }
});

c('.pizzaInfo--qtmais'). addEventListener('click', ()=> {
    modalQt++;
    c('.pizzaInfo--qt'). innerHTML = modalQt;
});
cs('.pizzaInfo--size'). forEach((size, sizeIndex)=> {       // seleçionando os tamanhos das pizzas
    size.addEventListener('click', (e)=> {
        c('.pizzaInfo--size.selected'). classList.remove('selected');       // seleçionando os itens seleçionados e 'removendo' a seleção
        size.classList.add('selected');
    });
});