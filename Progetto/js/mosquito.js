var delayTime = 1000; // quanto aspettare per eseguire la transizione

// definisci i margini di dove posizionare l'svg
var margin = {top: 20, right: 20, bottom: 30, left: 40};

// larghezza e altezza dell'svg
var width = 960 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// definisci il range delle x
var xScale =  d3.scaleLinear().range([0,width])

// definisci il range delle y
var yScale = d3.scaleLinear().range([height,0]) // altrimenti avremmo un asse che dall'alto al basso passa da 10 a 0

// definisco dove sono gli assi x e y
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

console.log("Creating svg inside body")

// creo l'oggetto d3.sj: svg 
var svg = d3.select("body")
             .append("svg")
             .attr("width", width + margin.left + margin.right) 
             .attr("height", height + margin.bottom + margin.top)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // sposto quello che sta dentro l'svg (nel g) del margine dato

console.log("loading json");

// disegna gli assi
function drawAxis(){
    // asse x
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") // la sposto in basso
        .call(xAxis);
    
    // asse y
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
};

// funzione che disegna la zanzara nella posizione in cui si trova il primo data case accessibile dai dati passati come parametro
function drawMosquito(firstDataCase){
    // coordinate del primo data case
    let x = firstDataCase["x"]
    let y = firstDataCase["y"]
    console.log("primo data case = (" + x + "," + y + ")")
    // prendo il valore associato alle coordinate, rispetto agli assi
    xMosquito = xScale(x)
    yMosquito = yScale(y)
    console.log("posizione zanzara = (" + xMosquito + "," + yMosquito + ")")

    svg.append("path")
        .attr("id", "mosquito")
        .attr("d", "M15.526 8.207c0.55 -0.147 1.519 -0.439 1.829 -0.739 0.249 -0.241 0.309 -0.594 0.156 -0.922 -0.223 -0.478 -0.807 -0.741 -1.488 -0.67 -0.452 0.048 -1.45 0.344 -2.506 0.658 -0.875 0.26 -1.923 0.572 -2.502 0.682v-0.326c0 -0.053 -0.004 -0.104 -0.012 -0.155l1.079 -0.647c0.408 -0.244 0.661 -0.692 0.661 -1.167V3.869l2.027 -3.379a0.324 0.324 0 0 0 -0.111 -0.444 0.324 0.324 0 0 0 -0.444 0.111l-2.073 3.456a0.324 0.324 0 0 0 -0.046 0.167v1.141c0 0.249 -0.133 0.483 -0.346 0.611l-1.045 0.627a1.016 1.016 0 0 0 -0.38 -0.231V3.089c0 -0.179 -0.145 -0.324 -0.324 -0.324s-0.324 0.145 -0.324 0.324v2.839a1.016 1.016 0 0 0 -0.38 0.231l-1.045 -0.627c-0.213 -0.128 -0.346 -0.362 -0.346 -0.611V3.78a0.324 0.324 0 0 0 -0.046 -0.167l-2.073 -3.456a0.324 0.324 0 0 0 -0.556 0.333l2.027 3.379v1.051c0 0.475 0.253 0.922 0.661 1.167l1.079 0.647a1.02 1.02 0 0 0 -0.012 0.155v0.326c-0.579 -0.11 -1.627 -0.421 -2.502 -0.682 -1.056 -0.314 -2.054 -0.611 -2.506 -0.658 -0.681 -0.072 -1.265 0.191 -1.488 0.67 -0.153 0.328 -0.093 0.681 0.156 0.922 0.31 0.3 1.279 0.592 1.829 0.739 0.91 0.244 1.781 0.389 2.33 0.389 0.44 0 0.911 -0.049 1.328 -0.111l-0.727 0.606a2.051 2.051 0 0 0 -0.633 0.927l-0.863 2.589 -2.728 3.411a0.324 0.324 0 0 0 0.506 0.405l2.765 -3.456a0.324 0.324 0 0 0 0.054 -0.1l0.881 -2.644a1.403 1.403 0 0 1 0.433 -0.635l1.164 -0.97v0.231l-0.933 1.166a2.059 2.059 0 0 0 -0.45 1.282v2.432l-2.734 5.809a0.324 0.324 0 0 0 0.155 0.431 0.322 0.322 0 0 0 0.138 0.031 0.324 0.324 0 0 0 0.293 -0.186l2.765 -5.875a0.324 0.324 0 0 0 0.031 -0.138v-2.504a1.409 1.409 0 0 1 0.308 -0.877l0.427 -0.533v1.15c0 0.973 0.436 1.706 1.015 1.706s1.015 -0.734 1.015 -1.706v-1.15l0.427 0.533a1.409 1.409 0 0 1 0.308 0.877v2.504a0.324 0.324 0 0 0 0.031 0.138l2.765 5.875a0.324 0.324 0 0 0 0.293 0.186 0.324 0.324 0 0 0 0.293 -0.462l-2.734 -5.809v-2.432a2.059 2.059 0 0 0 -0.45 -1.282l-0.933 -1.166v-0.231l1.164 0.97a1.403 1.403 0 0 1 0.433 0.635l0.881 2.644c0.012 0.036 0.03 0.07 0.054 0.1l2.765 3.456a0.323 0.323 0 0 0 0.253 0.122 0.324 0.324 0 0 0 0.253 -0.526l-2.728 -3.411 -0.863 -2.589a2.051 2.051 0 0 0 -0.633 -0.927l-0.727 -0.606c0.417 0.062 0.887 0.111 1.328 0.111 0.549 0 1.42 -0.145 2.33 -0.389zm-1.824 -1.051c0.982 -0.292 1.996 -0.594 2.389 -0.635 0.457 -0.048 0.748 0.116 0.833 0.299 0.035 0.075 0.028 0.136 -0.019 0.182 -0.262 0.253 -2.527 0.946 -3.71 0.946 -0.564 0 -1.199 -0.091 -1.677 -0.178 0.541 -0.129 1.275 -0.344 2.184 -0.614zm-4.069 1.483v-0.803c0.114 0.044 0.238 0.069 0.367 0.069s0.253 -0.025 0.367 -0.069v0.803h-0.734zm0.734 0.648v0.734h-0.734v-0.734h0.734zm-0.367 -2.765c0.202 0 0.367 0.165 0.367 0.367s-0.165 0.367 -0.367 0.367 -0.367 -0.165 -0.367 -0.367 0.165 -0.367 0.367 -0.367zM3.095 7.002c-0.048 -0.046 -0.054 -0.107 -0.019 -0.182 0.075 -0.162 0.31 -0.308 0.676 -0.308 0.05 0 0.102 0.003 0.157 0.009 0.393 0.041 1.408 0.343 2.389 0.635 0.909 0.27 1.643 0.485 2.184 0.614 -0.478 0.087 -1.113 0.178 -1.677 0.178 -1.183 0 -3.447 -0.693 -3.71 -0.946zm6.905 5.093c-0.091 0 -0.367 -0.375 -0.367 -1.058v-0.367h0.734v0.367c0 0.683 -0.276 1.058 -0.367 1.058z")
        .attr("transform", "translate(" + xMosquito + "," + yMosquito + ")")
}

// aggiorna la posizione delle zanzara in base al datacase
// @TODO: passare direttamente il nuovo datacase?
function updateMosquitoPosition(data, idxNextDataCase){
    // @TODO: calcola quanti datacase ci sono
    let dbLen = 10; // in questo caso lo sappiamo
    
    // indice del prossimo data case
    // @TODO: cambia il nome della varibile
    idxNewDataCase = idxNextDataCase % dbLen

    // x e y del datacase
    x = data[idxNewDataCase]["x"]
    y = data[idxNewDataCase]["y"]

    // x e y del mosquito
    xMosquito = xScale(x) 
    yMosquito = yScale(y)

    d3.select("#mosquito").attr("transform", "translate(" + xMosquito + "," + yMosquito + ")")
    
};

// il dominio va da [0, max(data[]["x"])]
function updateXScaleDomain(data){
    xScale.domain([0, d3.max(data, d => d["x"])])
};

// il dominio è [0, max(data[]["y"])]
function updateYScaleDomain(data){
    yScale.domain([0, d3.max(data, d => d["y"])])
};

/* NB: 
    per accedere ai data case basta scrivere data[i]
    per accedere al primo campo del nono datacase scrivere: datacase[8]["y"]
*/
        
// caricamento del dataset
d3.json("dataset/dataset.json")
    .then(function(data){
        var idxDataCase = 0
        // update della dominio di x e y
        updateXScaleDomain(data)
        updateYScaleDomain(data)

        // disegno assi
        drawAxis()

        console.log("disegno la mosca")
        // disegna la zanzara
        drawMosquito(data[idxDataCase]);
        idxDataCase += 1;

        var mosquito = d3.select("#mosquito");
        console.log("Ecco il mosquito trovato " + mosquito);

        // @TODO: se clicca sul background la zanzara si sposta in maniera fluida sul datacase successivo

        // @TODO: se l'utente clicca sull'svg allora ritorna al datacase precedente
        mosquito.on('click', function() {
            // @TODO: capisci come fare a aggiungere event listener sulla mosca per capire quando si sta cliccando su di essa
            var coords = d3.mouse(this);
            console.log("Ho cliccato qui " + coords);
            updateMosquitoPosition(data, idxDataCase);
            console.log("Ho disegnato il " + idxDataCase + " data case")
            idxDataCase += 1;
        })

    })
    .catch(function(error){
        // stampa che c'è stato un errore e abortisci
        console.log(error);
    });