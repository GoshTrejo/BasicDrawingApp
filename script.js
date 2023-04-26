alert("Doble click Navigation Menu to hide and double click Workspace to show Navigation Menu")
const canvas = document.getElementById("canvas") //Almacenamos nuestro canvas(area de dibujo)
const body = document.querySelector('body');//Almacenamos el body de nuestra pagina

canvas.height = window.innerHeight
canvas.width = window.innerWidth
var theColor = '';
var lineW = 5;
let prevX = null
let prevY = null
let draw = false

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function(){
  theColor = theInput.value;
  body.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext("2d") //Variable declarada para acceder al canvas 2D donde sera el espacio de dibujo
ctx.lineWidth = lineW;

//Codigo para cambiar el grosor del trazo del lapiz
document.getElementById("ageInputId").oninput = function() {
    draw = null
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
    console.log("Line width: " + ctx.lineWidth )
};  

//Código para selección de colores
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
        console.log(ctx.strokeStyle);
    })
})

//Código para limpiar por completo nuestro espacio de trabajo
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //Limpieza de nuestra area de dibujo
    console.clear(); //Limpieza de consola
})

//Código para guardar nuestro espacio de trabajo
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "mySketch.png"
    a.click()
    try {
        console.log("Download Completed")
    }
    catch(e){
        console.log("There was an error...")
    }
})

//El primer evento "mousedown" ocurre cuando el usuario hace click el mouse entonces empezara a dibujar
window.addEventListener("mousedown", (e) =>
 {
    draw = true;
    
})

//Nuestro segundo evento "mouseup" ocurre cuando el usuario deja de presionar el boton click al hacer eso se dejara de hacer los trazos del lápiz
window.addEventListener("mouseup", (e) =>
{
     draw = false;
     
})

//Tercer evento "mousemove" ocurre cuando el usuario mueve el cursor el en espacio de trabajo en ese caso ejeS (X,Y) plano 2D
window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        
        return
    }

    //Las siguientes variables seran nuestras coordenadas (X,Y) donde realizaremos los trazos
    let currentX = e.clientX
    let currentY = e.clientY

    //El lapiz hara los trazos en nuestro canvas segun nuestra coordenadas del cursor
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke() //stroke = trazar

    prevX = currentX
    console.log("Position:  " + prevX);
    prevY = currentY
    console.log("Position:  " + prevX);

    
})


// const navHide = () => {
//     console.log("Hidden Nav Bar");
//     document.getElementById("navMenu").style.opacity = "0"
// }

// const navShow = ()=> {
//     console.log("Showing Nav Bar");
//     document.getElementById("navMenu").style.opacity = "0.9"

// }

canvas.addEventListener("mouseover", () => {
    
    document.getElementById("navMenu").style.opacity="0";
   
})

canvas.addEventListener("mouseout", () => {
    
    document.getElementById("navMenu").style.opacity="0.9";
   
})
