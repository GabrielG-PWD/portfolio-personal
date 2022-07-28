window.addEventListener("load", () => {
  const sonidos = document.querySelectorAll(".sonido");
  const teclado = document.querySelectorAll(".teclado div");
  const visual = document.querySelector(".visual");
  const colores = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  teclado.forEach((pad, index) => {
    pad.addEventListener("click", function() {
      sonidos[index].currentTime = 0;
      sonidos[index].play();
      createBubble(index);
    });
  });

  const createBubble = index => {
    //Create bubbles
    const bolitas = document.createElement("div");
    visual.appendChild(bolitas);
    bolitas.style.backgroundColor = colores[index];
    bolitas.style.animation = `jump 1s ease`;
    bolitas.addEventListener("animationend", function() {
      visual.removeChild(this);
    });
  };
});

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}