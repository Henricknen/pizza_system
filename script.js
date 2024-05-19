const c = (el)=> {      // constante 'c' reçebe um elemento 'el' e retorna 'document.querySelector', será ultilizada para evitar extensão excessiva de código
    return document.querySelector(el);
}

const cs = (el)=> {     // 'cs' retorna um array com itens encontrados
    return document.querySelectorAll(el);
}

pizzaJson.map((item, index)=> {     // mapeando 'pizzaJson'
    let pizzaItem = c('.models .pizza-item'). cloneNode(true);       // função 'cloneNode' clona elemento de classe 'pizza-item' do html

    pizzaItem.querySelector('.pizza-item--img img'). src = item.img;     // seleçionando elemento de classe 'pizza-item--img' do html, 'src' inseri o caminho da imagem da pizza
    pizzaItem.querySelector('.pizza-item--price'). innerHTML = `R$ ${item.price.toFixed(2)}`;       // 'toFixed' fixa dois algarismos depois da virgula
    pizzaItem.querySelector('.pizza-item--name'). innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc'). innerHTML = item.description;

    c('.pizza-area'). append(pizzaItem);       // 'append' adiçionando o elemento 'pizzaItem'
});