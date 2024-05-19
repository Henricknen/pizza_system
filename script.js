const c = (el)=> {      // constante 'c' reçebe um elemento 'el' e retorna 'document.querySelector', será ultilizada para evitar extensão excessiva de código
    return document.querySelector(el);
}

const cs = (el)=> {     // 'cs' retorna um array com itens encontrados
    return document.querySelectorAll(el);
}

pizzaJson.map((item, index)=> {     // mapeando 'pizzaJson'
    let pizzaItem = c('.models .pizza-item'). cloneNode(true);       // função 'cloneNode' clona elemento de classe 'pizza-item' do html

    c('.pizza-area'). append(pizzaItem);       // 'append' adiçionando o elemento 'pizzaItem'
});