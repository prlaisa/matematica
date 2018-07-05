function sortfunction(x, y) {
    return (x - y);
}
const tabela = document.getElementById('tabela');
const button = document.getElementById('butao');
const cb = document.getElementById('cb');
const titulo = document.getElementById('titulo');
const x = 0;
function fa(x, y, u) {
    let r = 0;
    u.sort(sortfunction);
    console.log(u[u.length-1]);
    for (let i=0; i <= u.length; i++) {
        if (u[i] >= x && u[i] >= y && u[u.length-1] == y) {
            r++; }
        if (u[i] >= x && u[i]< y) {
            r++; }
    }
    return r;
}
function sol() {
    const FR = document.getElementById('FR').checked;
    const FRA = document.getElementById('FRA').checked;
    const Fi = document.getElementById('Fi').checked;
    const FiA = document.getElementById('FiA').checked; 
    let  refrigerante = document.getElementById('dados').value;
    const pesqu = ',';
    const pesquisa = ' ';
    const strpesqu = eval('/'+pesqu+'/g');
    const strpesquisa = eval('/'+pesquisa+'/g'); 
    let chama = refrigerante.replace(strpesqu,'.')							
    var chama1 = chama.replace(strpesquisa,'')				
    const entrada = chama1.split(';');
    const max = entrada.reduce(function(x, y) {
        return Math.max(x, y);
    });
    const min = entrada.reduce(function(x, y) {
        return Math.min(x, y);
    });
    const divisor = Math.round(1+(3.3*Math.log10(entrada.length)));
    const mediana = (max-min)/divisor;
    const rt = intervalo(max, min, mediana); 
    const lm = separar(max, min, mediana); 
    const fqa = [];
    for (let i= 0; i < rt.length; i++) {
        fqa[i] = fa(lm[0][i], lm[1][i], entrada); }
    let total = 0;
    for (let i=0; i< fqa.length; i++) {
        total+=fqa[i]; }
    tabela.innerHTML += `<caption>${titulo.value}</caption>`;
    tabela.innerHTML += `<thead><tr><th>${cb.value}</th><th class="z1" hidden >Fi</th><th class="z2" 
    hidden >FI</th><th class="z3" hidden >Fr</th><th class="z4" hidden>FR</th></tr></thead>`;
    let soma = 0;
    let sei = 0;
    for (let i=0; i<fqa.length; i++) {
		sei +=(((fqa[i]*100)/total).toFixed(2))*1;
		if (i === fqa.length-1) {
			sei = 100;
		}
        tabela.innerHTML+= `<tr class="w3-hover-green"><td>${rt[i]}</td><td class="z1" hidden>${fqa[i]}</td>
        <td class="z2" hidden >${soma+=fqa[i]}</td><td class="z3"
         hidden>${((fqa[i]*100)/total).toFixed(2)}%</td><td class="z4" hidden>${sei}%</td></tr>`;
    }
    tabela.innerHTML+= `<tr><td>Total</td><td class="z1"hidden>${soma}</td><td class="z2"hidden>---</td><td 
    class="z3"hidden>${100}%</td><td class="z4"hidden>---</td></tr><span>Fonte: 
    ${document.getElementById('fonte').value}</span>`;

    if (Fi === true) {
        for (let i = 0; i < document.querySelectorAll('.z1').length; i++) {
            document.querySelectorAll('.z1')[i].hidden = false;
        }
    }
    if (FiA === true) {
        for (let i = 0; i < document.querySelectorAll('.z2').length; i++) {
            document.querySelectorAll('.z2')[i].hidden = false;
        }
    }
    if (FRA === true) {
        for (let i = 0; i < document.querySelectorAll('.z4').length; i++) {
            document.querySelectorAll('.z4')[i].hidden = false;
        }
    }
    if (FR === true) {
        for (let i = 0; i < document.querySelectorAll('.z3').length; i++) {
            document.querySelectorAll('.z3')[i].hidden = false;
        }
    }
}
function intervalo(max, min, mediana) {
    let x = min;
    const e = max;
    let y = 0;
    const c = '';
    let i = 0;
    const vet = [];
    while ( y < max) {
        y = (x+mediana)*1;
        y= ((y*1).toFixed(2))*1;
        if (x === max-mediana) {
            vet[i] = x+' |--| '+y;
            i++;
            x = y;
        } else {
            vet[i] = x+' |-- '+y;
            i++;
            x = y;
        }
    }
    return vet;
}
function separar(max, min, mediana) {
    let x = min;
    const e = max;
    let y = 0;
    const c = '';
    let i = 0;
    const vet = [];
    const vet1 = [];
    while ( y < max) {
        y = (x+mediana)*1;
        y= ((y*1).toFixed(2))*1;
        vet1[i] = y;
        vet[i] = x;
        i++;
        x = y;
    }
    const vet2 = [vet, vet1];
    return vet2;
}
button.addEventListener('click', function() {
    const e = tabela.children.length;
    for (let i=0; i < e; i++) {
        document.querySelector('#tabela').children[0].remove();
    }
    sol();
});

