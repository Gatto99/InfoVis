var delayTime = 300; // quanto aspettare per eseguire la transizione

// definisci i margini di dove posizionare l'svg
var margin = {top: 50, right: 50, bottom: 80, left: 80};

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// larghezza e altezza dell'svg
var width = windowWidth - margin.left - margin.right;
var height = windowHeight - margin.top - margin.bottom;

// TODO: prendi grandezza finestra e aggiornala ogni volta

// function widthResizer(){
//     windowWidth = window.innerWidth;
//     windowHeight = window.innerHeight;
// }

// window.addEventListener("resize", widthResizer)

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

// gruppo in cui ci sono gli assi cartesiani
var cartesian = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // sposto quello che sta dentro l'svg (nel g) del margine dato

console.log("loading json");

// disegna gli assi
function drawAxis(){
    // asse x
    cartesian.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") // la sposto in basso
        .call(xAxis);
    
    // asse y
    cartesian.append("g")
        .attr("class", "y axis")
        .call(yAxis);
};

// funzione che disegna la zanzara nella posizione in cui si trova il primo data case accessibile dai dati passati come parametro
function drawMosquito(firstDataCase){
    // coordinate del primo data case
    let x = firstDataCase["x"]
    let y = firstDataCase["y"]
    console.log("primo data case = (" + x + "," + y + ")")
    // prendo il valore associato alle coordinate, rispetto agli assi (leggi sotto perché sommiamo i margini)
    xMosquito = xScale(x)+margin.left
    yMosquito = yScale(y)+margin.top
    console.log("posizione zanzara = (" + xMosquito + "," + yMosquito + ")")

    // la zanzara viene disegnata dentro un svg != da quello usato per contenere gli assi, di modo che essa non venga clippata.
    // (i.e. se la zanzara fosse dentro l'svg contenente il piano e fosse posizionata sul contorno, 
    //       poiché il path associato ha l'origine nel centro, la zanzara verrebbe clippata poiché uscirebbe dall'svg)
    // N.B. poiché il group contenente gli assi (ma non la zanzara!) è traslato, dovremmo tener conto della traslazione anche per la zanzara
    
    // crea un gruppo in cui mettere il rettangolo e la zanzara
    var mos = svg.append("g")
                 .attr("id", "mosquitoGroup")
                 .attr("transform", "translate(" + xMosquito + "," + yMosquito + ")")

    // crea un rettangolo che fa da hitbox
    mos.append("rect")
        .attr("id","mosquitoRect")
        .attr("fill","transparent")
        .attr("style","cursor:pointer")
        .attr("width","32") // TODO: prendi la grandezza della zanzara
        .attr("height","41")
        .attr("transform", "translate(" + (-16) + "," + (-20) + ")") // centra il rettangolo togliendo metà della larghezza della zanzara e altezza
    
    mos.append("path")
        .attr("id", "mosquito")
        .attr("d", "M 11.052 -2.586 c 1.1 -0.294 3.038 -0.878 3.658 -1.478 c 0.498 -0.482 0.618 -1.188 0.312 -1.844 c -0.446 -0.956 -1.614 -1.482 -2.976 -1.34 c -0.904 0.096 -2.9 0.688 -5.012 1.316 c -1.75 0.52 -3.846 1.144 -5.004 1.364 v -0.652 c 0 -0.106 -0.008 -0.208 -0.024 -0.31 l 2.158 -1.294 c 0.816 -0.488 1.322 -1.384 1.322 -2.334 V -11.262 l 4.054 -6.758 a 0.648 0.648 90 0 0 -0.222 -0.888 a 0.648 0.648 90 0 0 -0.888 0.222 l -4.146 6.912 a 0.648 0.648 90 0 0 -0.092 0.334 v 2.282 c 0 0.498 -0.266 0.966 -0.692 1.222 l -2.09 1.254 a 2.032 2.032 90 0 0 -0.76 -0.462 V -12.822 c 0 -0.358 -0.29 -0.648 -0.648 -0.648 s -0.648 0.29 -0.648 0.648 v 5.678 a 2.032 2.032 90 0 0 -0.76 0.462 l -2.09 -1.254 c -0.426 -0.256 -0.692 -0.724 -0.692 -1.222 V -11.44 a 0.648 0.648 90 0 0 -0.092 -0.334 l -4.146 -6.912 a 0.648 0.648 90 0 0 -1.112 0.666 l 4.054 6.758 v 2.102 c 0 0.95 0.506 1.844 1.322 2.334 l 2.158 1.294 a 2.04 2.04 90 0 0 -0.024 0.31 v 0.652 c -1.158 -0.22 -3.254 -0.842 -5.004 -1.364 c -2.112 -0.628 -4.108 -1.222 -5.012 -1.316 c -1.362 -0.144 -2.53 0.382 -2.976 1.34 c -0.306 0.656 -0.186 1.362 0.312 1.844 c 0.62 0.6 2.558 1.184 3.658 1.478 c 1.82 0.488 3.562 0.778 4.66 0.778 c 0.88 0 1.822 -0.098 2.656 -0.222 l -1.454 1.212 a 4.102 4.102 90 0 0 -1.266 1.854 l -1.726 5.178 l -5.456 6.822 a 0.648 0.648 90 0 0 1.012 0.81 l 5.53 -6.912 a 0.648 0.648 90 0 0 0.108 -0.2 l 1.762 -5.288 a 2.806 2.806 90 0 1 0.866 -1.27 l 2.328 -1.94 v 0.462 l -1.866 2.332 a 4.118 4.118 90 0 0 -0.9 2.564 v 4.864 l -5.468 11.618 a 0.648 0.648 90 0 0 0.31 0.862 a 0.644 0.644 90 0 0 0.276 0.062 a 0.648 0.648 90 0 0 0.586 -0.372 l 5.53 -11.75 a 0.648 0.648 90 0 0 0.062 -0.276 v -5.008 a 2.818 2.818 90 0 1 0.616 -1.754 l 0.854 -1.066 v 2.3 c 0 1.946 0.872 3.412 2.03 3.412 s 2.03 -1.468 2.03 -3.412 v -2.3 l 0.854 1.066 a 2.818 2.818 90 0 1 0.616 1.754 v 5.008 a 0.648 0.648 90 0 0 0.062 0.276 l 5.53 11.75 a 0.648 0.648 90 0 0 0.586 0.372 a 0.648 0.648 90 0 0 0.586 -0.924 l -5.468 -11.618 v -4.864 a 4.118 4.118 90 0 0 -0.9 -2.564 l -1.866 -2.332 v -0.462 l 2.328 1.94 a 2.806 2.806 90 0 1 0.866 1.27 l 1.762 5.288 c 0.024 0.072 0.06 0.14 0.108 0.2 l 5.53 6.912 a 0.646 0.646 90 0 0 0.506 0.244 a 0.648 0.648 90 0 0 0.506 -1.052 l -5.456 -6.822 l -1.726 -5.178 a 4.102 4.102 90 0 0 -1.266 -1.854 l -1.454 -1.212 c 0.834 0.124 1.774 0.222 2.656 0.222 c 1.098 0 2.84 -0.29 4.66 -0.778 z m -3.648 -2.102 c 1.964 -0.584 3.992 -1.188 4.778 -1.27 c 0.914 -0.096 1.496 0.232 1.666 0.598 c 0.07 0.15 0.056 0.272 -0.038 0.364 c -0.524 0.506 -5.054 1.892 -7.42 1.892 c -1.128 0 -2.398 -0.182 -3.354 -0.356 c 1.082 -0.258 2.55 -0.688 4.368 -1.228 z m -8.138 2.966 v -1.606 c 0.228 0.088 0.476 0.138 0.734 0.138 s 0.506 -0.05 0.734 -0.138 v 1.606 h -1.468 z m 1.468 1.296 v 1.468 h -1.468 v -1.468 h 1.468 z m -0.734 -5.53 c 0.404 0 0.734 0.33 0.734 0.734 s -0.33 0.734 -0.734 0.734 s -0.734 -0.33 -0.734 -0.734 s 0.33 -0.734 0.734 -0.734 z M -13.81 -4.996 c -0.096 -0.092 -0.108 -0.214 -0.038 -0.364 c 0.15 -0.324 0.62 -0.616 1.352 -0.616 c 0.1 0 0.204 0.006 0.314 0.018 c 0.786 0.082 2.816 0.686 4.778 1.27 c 1.818 0.54 3.286 0.97 4.368 1.228 c -0.956 0.174 -2.226 0.356 -3.354 0.356 c -2.366 0 -6.894 -1.386 -7.42 -1.892 z m 13.81 10.186 c -0.182 0 -0.734 -0.75 -0.734 -2.116 v -0.734 h 1.468 v 0.734 c 0 1.366 -0.552 2.116 -0.734 2.116 z")    
        .attr("style","cursor:pointer")
}

// funzione che disegna un punto sul piano per ogni datacases
function drawDatacases(data){
    // crea un gruppo dentro l'svg del grafico
    d3.select("body").select("svg").select("g").append("g").selectAll("rect").data(data).enter().append("circle")
    .attr("cx",function(d){return xScale(d["x"])}).attr("cy",function(d){return yScale(d["y"])}).attr("r","2").attr("fill","red")

    // TODO: scegli un colore non puro
}

// aggiorna la posizione delle zanzara in base al datacase
// @TODO: passare direttamente il nuovo datacase?
function updateMosquitoPosition(data, idxNextDataCase){

    let numDataCase = data.length; // numero di datacases nel dataset
    
    // indice del prossimo data case riportato nel dominio [0,numDataCase]
    idxNextDataCase = idxNextDataCase % numDataCase

    // x e y del datacase
    x = data[idxNextDataCase]["x"]
    y = data[idxNextDataCase]["y"]

    // x e y del mosquito
    xMosquito = xScale(x)+margin.left
    yMosquito = yScale(y)+margin.top

    // spostamento del path della zanzara e della sua hitbox
    d3.select("#mosquitoGroup").transition().ease(d3.easeQuad).duration(delayTime).attr("transform", "translate(" + xMosquito + "," + yMosquito + ")")
    
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
        
        var idxDataCase = 0;
        var dataLength = data.length; // numero datacases
        console.log("Lunghezza dataset:" + dataLength);

        // update della dominio di x e y
        updateXScaleDomain(data);
        updateYScaleDomain(data);

        // disegno assi
        drawAxis();

        console.log("disegno la mosca");
        // disegna la zanzara
        drawMosquito(data[idxDataCase]);

        // disegna datacase
        drawDatacases(data);

        var mosquitoRect = d3.select("#mosquitoRect"); // hitbox zanzara
        var mosquito = d3.select("#mosquito");         // path zanzara
        var background = d3.select("body")             // body del DOM
        console.log("Ecco il mosquito trovato " + mosquito);

        // TODO: trovare un modo per non mettere gli eventListeners sia sulla hitbox che sul path

        // Se l'utente clicca sul path allora ritorna al datacase precedente
        // eventListener per il path
        mosquito.on('click', function(event) {
            idxDataCase -= 1;
            console.log("Ho cliccato il mosquito: next datacase è " + idxDataCase % dataLength)
            // se è diventato negativo, il datacase in cui mi voglio spostare è l'ultimo (decimo)
            if(idxDataCase < 0){
                idxDataCase = dataLength - 1; // indice del decimo elemento (0-based array)
                console.log("NEGATIVE! torno all'elemento " + idxDataCase % dataLength)
            }
            updateMosquitoPosition(data, idxDataCase);
            event.stopPropagation(); // evita che l'evento si propaghi e triggeri l'event listener sul body
        })

        // eventListener per la hitbox
        mosquitoRect.on('click', function(event) {
            idxDataCase -= 1;
            console.log("Ho cliccato il mosquito: next datacase è " + idxDataCase % dataLength)
            // se è diventato negativo, il datacase in cui mi voglio spostare è l'ultimo (decimo)
            if(idxDataCase < 0){
                idxDataCase = dataLength - 1; // indice del decimo elemento (0-based array)
                console.log("NEGATIVE! torno all'elemento " + idxDataCase % dataLength)
            }
            updateMosquitoPosition(data, idxDataCase);
            event.stopPropagation(); // evita che l'evento si propaghi e triggeri l'event listener sul body
        })

        // Se utente clicca sul background la zanzara si sposta in maniera fluida sul datacase successivo
        background.on("click", function() {
            idxDataCase += 1;
            updateMosquitoPosition(data, idxDataCase);
            console.log("Ho cliccato il background: " + idxDataCase % dataLength + " data case")
        })
    })
    .catch(function(error){
        // stampa che c'è stato un errore e abortisci
        console.log(error);
    });