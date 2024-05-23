let cart = [];      // variável 'cart' é um array representando o carrinho de compras
let modalQt = 1;        // variável 
let modalKey = 0;           // sempre que o modal for aberto essa variável será preenchida com a identificação da pizza seleçionada

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
        modalQt = 1;        // seta a quantidade como 1
        modalKey = key;

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

c('.pizzaInfo--addButton'). addEventListener('click', ()=> {        // evento de 'click'
    let size = parseInt(c('.pizzaInfo--size.selected'). getAttribute('data-key'));      // pegando o 'tamanho' da pizza

    let identifier = pizzaJson[modalKey]. id + '@' + size;      // 'identier' é um identificador que junta o 'id' e o 'tamanho' da pizza

    let key = cart.findIndex((item)=> item.identifier == identifier);       // 'findIndex' verifica se já existe o item com mesmo 'identifier' no carrinho

    if(key > -1) {
        cart[key]. qt += modalQt;       // se encontra item com mesmo 'identifier', apenas será aumentada a quantidade
    } else {
        cart.push({     // se não encontrar item de mesmo 'identifier' adiçiona um 'objeto' no carrinho
            id:pizzaJson[modalKey]. id,     // id
            size,       // tamanho
            qt:modalQt      // quantidade
        });
    }

    updateCart();       // atualizando o carrinho de compras
    closeModal();
});

c('.menu-openner'). addEventListener('click', ()=> {
    if(cart.length > 0) {       // se tiver alguma pizza no carrinho de compras, o carrinho será aberto
        c('aside'). style.left = '0';
    }
});

c('.menu-closer'). addEventListener('click', ()=> {     // ação de fechamento de carrinho de compras 'mobile'
        c('aside'). style.left = '100vw';
});

function updateCart() {     // função de atualizar, tem a função de 'mostrar' ou 'não mostrar' o carrinho de compras
c('.menu-openner span'). innerHTML = cart.length;       // na 'div' de class 'menu-openner' inserindo a quantidade de itens do caarrinho de compras

    if(cart.length > 0) {
        c('aside'). classList. add('show');     // se estiver item no carrinho vai dar 'show', isso mostrará o carrinho
        c('.cart'). innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        
        for(let i in cart) {     // 'for' responsável por adiçionar as informações da pizza
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i]. id);        // identificando a pizza
            subtotal += pizzaItem.price * cart[i]. qt;      // calculando o subtotal, multiplicando a quantidade do carrinho de compras pelo preço

            let cartItem = c('.models .cart--item'). cloneNode(true);

            let pizzaSizeName;
            switch(cart[i]. size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`; 

            cartItem.querySelector('img'). src = pizzaItem.img;     // imagem da pizza
            cartItem.querySelector('.cart--item-nome'). innerHTML = pizzaName;      // nome concatenado com o tamanho
            cartItem.querySelector('.cart--item--qt'). innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos'). addEventListener('click', ()=> {     // ação de click no botão de remover pizza
                if(cart[i]. qt > 1) {       // condição para diminuir quantidades de pizza do carrinho de compras
                    cart[i]. qt--;
                } else {
                    cart.splice(i, 1);      // se a for apenas uma pizza, ela será removida
                }
                updateCart();
            });
            
            cartItem.querySelector('.cart--item-qtmais'). addEventListener('click', ()=> {
                cart[i]. qt++;
                updateCart();       // função atualizará o carrinho, toda vez que o botão for apertado
            });
            
            c('.cart'). append(cartItem);
        }

        desconto = subtotal * 0.1;      // calculo do desconto
        total = subtotal - desconto;        // calculo do total

        c('.subtotal span:last-child'). innerHTML = `R$: ${subtotal.toFixed(2)}`;       // exibindo na tela os valores calculados
        c('.desconto span:last-child'). innerHTML = `R$: ${desconto.toFixed(2)}`;
        c('.total span:last-child'). innerHTML = `R$: ${total.toFixed(2)}`;

    } else {
        c('aside'). classList. remove('show');      // removendo show, o carrinho não aparecerá
        // c('aside').style.left = '100vw';
    }
}