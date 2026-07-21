// ===============================
// NEXOTECH - app.js
// ===============================

// ---------- FECHA ----------
const hoy = new Date();

document.getElementById("fecha").textContent =
hoy.toLocaleDateString("es-MX");

// ---------- FOLIO AUTOMÁTICO ----------

let consecutivo =
localStorage.getItem("nexotech_folio");

if(consecutivo==null){

    consecutivo=1;

}else{

    consecutivo=parseInt(consecutivo);

}

const folio=
"NV-"+
hoy.getFullYear()+
String(hoy.getMonth()+1).padStart(2,"0")+
String(hoy.getDate()).padStart(2,"0")+
"-"+
String(consecutivo).padStart(4,"0");

document.getElementById("folio").textContent=folio;


// =====================================
// AGREGAR PRODUCTO
// =====================================

function agregarProducto(){

const tbody=document.getElementById("productos");

const fila=document.createElement("tr");

fila.innerHTML=`

<td contenteditable>1</td>

<td contenteditable></td>

<td contenteditable>0.00</td>

<td contenteditable>0.00</td>

`;

tbody.appendChild(fila);

}


// =====================================
// ELIMINAR ÚLTIMO
// =====================================

function eliminarProducto(){

const tbody=document.getElementById("productos");

if(tbody.rows.length>1){

tbody.deleteRow(-1);

}

}


// =====================================
// CALCULAR TOTALES
// =====================================

function calcular(){

const filas=document.querySelectorAll("#productos tr");

let total=0;

filas.forEach(f=>{

const cantidad=parseFloat(f.cells[0].innerText)||0;

const precio=parseFloat(f.cells[2].innerText)||0;

const subtotal=cantidad*precio;

f.cells[3].innerText=subtotal.toFixed(2);

total+=subtotal;

});

const anticipo=total/2;

const saldo=total-anticipo;

const tabla=document.querySelector(".totales table");

tabla.rows[0].cells[1].innerHTML=
"$"+total.toLocaleString("es-MX",{
minimumFractionDigits:2
});

tabla.rows[1].cells[1].innerHTML=
"$"+anticipo.toLocaleString("es-MX",{
minimumFractionDigits:2
});

tabla.rows[2].cells[1].innerHTML=
"$"+saldo.toLocaleString("es-MX",{
minimumFractionDigits:2
});

}


// =====================================
// RECALCULAR AL EDITAR
// =====================================

document.addEventListener("input",function(e){

if(e.target.closest("#productos")){

calcular();

}

});


// =====================================
// IMPRIMIR
// =====================================

function imprimir(){

window.print();

localStorage.setItem(

"nexotech_folio",

consecutivo+1

);

}


// =====================================
// BOTONES
// =====================================

const barra=document.createElement("div");

barra.style.position="fixed";

barra.style.bottom="25px";

barra.style.right="25px";

barra.style.display="flex";

barra.style.gap="10px";

barra.innerHTML=`

<button onclick="agregarProducto()">➕ Producto</button>

<button onclick="eliminarProducto()">➖ Producto</button>

<button onclick="calcular()">🧮 Calcular</button>

<button onclick="imprimir()">🖨 Imprimir / PDF</button>

`;

document.body.appendChild(barra);


// =====================================
// ESTILO BOTONES
// =====================================

const style=document.createElement("style");

style.innerHTML=`

button{

background:#0058b7;

color:white;

border:none;

padding:12px 20px;

border-radius:6px;

font-size:15px;

cursor:pointer;

box-shadow:0 3px 10px rgba(0,0,0,.2);

}

button:hover{

background:#003f82;

}

@media print{

div[style*="position: fixed"]{

display:none !important;

}

}

`;

document.head.appendChild(style);


// =====================================

calcular();