document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".page");
  const canvas = document.getElementById("drawCanvas");
  const ctx = canvas.getContext("2d");

  let cursorDot = document.querySelector(".cursor-dot");
  if (!cursorDot) {
      cursorDot = document.createElement("div");
      cursorDot.classList.add("cursor-dot");
      document.body.appendChild(cursorDot);
  }

  let lastX, lastY;
  let drawnPixels = 0;
  let totalPixels = window.innerWidth * window.innerHeight * 0.5;
  let currentPageIndex = 0;

  function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleScroll() {
      let scrollY = window.scrollY;
      let windowHeight = window.innerHeight;

      pages.forEach((section, index) => {
          let sectionTop = section.offsetTop;
          let sectionHeight = section.offsetHeight;

          if (scrollY >= sectionTop - windowHeight / 1.5 && scrollY < sectionTop + sectionHeight) {
              section.classList.add("visible");

              let nextPage = pages[index + 1];
              let previousPage = pages[index - 1];

              let nextBgColor = nextPage ? nextPage.getAttribute("data-bg") : section.getAttribute("data-bg");

              if (currentPageIndex !== index) {
                  currentPageIndex = index;
                  drawnPixels = 0;

                  if (previousPage) {
                      let previousBrushColor = previousPage.getAttribute("data-brush");

                      gsap.to(canvas, { opacity: 1, duration: 0.5 });
                      ctx.fillStyle = previousBrushColor;
                      ctx.fillRect(0, 0, canvas.width, canvas.height);

                      gsap.to(document.body, { backgroundColor: previousBrushColor, duration: 1 });

                      setTimeout(() => {
                          gsap.to(canvas, { opacity: 0, duration: 1 });
                          setTimeout(() => {
                              ctx.clearRect(0, 0, canvas.width, canvas.height);
                              gsap.to(canvas, { opacity: 1, duration: 0.1 });
                          }, 1000);
                      }, 1000);
                  }
              }

              if (nextPage) {
                  section.setAttribute("data-brush", nextBgColor);
              }
          }
      });
  }

  function draw(e) {
    if (!lastX || !lastY) {
        lastX = e.clientX;
        lastY = e.clientY;
    }

    let brushColor = pages[currentPageIndex].getAttribute("data-brush");

    ctx.lineWidth = 150;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    lastX = e.clientX;
    lastY = e.clientY;

    drawnPixels += 300;

    if (drawnPixels >= totalPixels) {
        gsap.to(document.body, { backgroundColor: brushColor, duration: 0.8 });
    }
  }

  function updateCursor(e) {
      cursorDot.style.left = e.pageX + "px";
      cursorDot.style.top = e.pageY + "px";
      draw(e);
  }

  window.addEventListener("mousemove", updateCursor);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", setupCanvas);

  setupCanvas();
  handleScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  function createWords(text, color) {
      let container = document.querySelector(".word-container");
      if (!container) {
          container = document.createElement("div");
          container.classList.add("word-container");
          document.body.appendChild(container);
      }

      for (let i = 0; i < 50; i++) {
          let word = document.createElement("span");
          word.classList.add("floating-word");
          word.textContent = text;
          word.style.position = "absolute";
          word.style.left = Math.random() * 100 + "vw";
          word.style.top = Math.random() * 100 + "vh";
          word.style.color = color;
          word.style.fontSize = "2rem";
          word.style.opacity = "0";

          container.appendChild(word);

          setTimeout(() => {
              word.style.opacity = "1";
              word.style.transform = "scale(1.2)";
          }, Math.random() * 1000);

          setInterval(() => {
              word.style.transform = word.style.transform === "scale(1.2)" ? "scale(1)" : "scale(1.2)";
          }, 1000);
      }
  }

  function removeWords() {
      document.querySelectorAll(".floating-word").forEach((word) => {
          word.style.opacity = "0";
          setTimeout(() => word.remove(), 1000);
      });
  }

  document.getElementById("water").addEventListener("click", () => {
      let existingWords = document.querySelectorAll(".floating-word");
      if (existingWords.length > 0) {
          removeWords();
      } else {
          createWords("water", "#689FBD");
      }
  });

  document.getElementById("sandstorms").addEventListener("click", () => {
      let existingWords = document.querySelectorAll(".floating-word");
      if (existingWords.length > 0) {
          removeWords();
      } else {
          createWords("sandstorms", "#FDFA69");
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const lines = document.querySelectorAll(".interactive-line");

  lines.forEach((line) => {
      line.addEventListener("mouseover", () => {
          line.style.letterSpacing = "5px";
          line.style.transform = "scale(1.1)";
      });

      line.addEventListener("mouseout", () => {
          line.style.letterSpacing = "0";
          line.style.transform = "scale(1)";
      });
  });
});

document.querySelectorAll(".mirage-text").forEach((text) => {
  text.addEventListener("click", () => {
      text.classList.add("revealed");
      setTimeout(() => {
          text.classList.remove("revealed");
      }, 3000);
  });
});

document.querySelector(".typing-text").addEventListener("mouseover", function() {
  let text = "The desert spoke to me: Wait.";
  let index = 0;
  this.innerHTML = "";
  this.style.opacity = "1";

  function typeEffect() {
      if (index < text.length) {
          document.querySelector(".typing-text").innerHTML += text[index];
          index++;
          setTimeout(typeEffect, 100);
      }
  }
  typeEffect();
});

document.querySelectorAll(".heavy-word").forEach((word) => {
  word.addEventListener("mousedown", () => {
      let fontSize = parseFloat(window.getComputedStyle(word).fontSize);
      word.style.fontSize = (fontSize + 2) + "px";
  });
});

document.querySelectorAll(".shadow-word").forEach((word) => {
  word.addEventListener("mousemove", (event) => {
      let x = (Math.random() - 0.5) * 10;
      let y = (Math.random() - 0.5) * 10;
      word.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.querySelectorAll(".final-word").forEach((word) => {
  word.addEventListener("click", () => {
      word.style.opacity = "0";
      word.style.filter = "blur(10px)";
  });
});

document.querySelectorAll(".floating-word").forEach((word) => {
  word.addEventListener("mouseover", () => {
      let x = (Math.random() - 0.5) * 300; 
      let y = (Math.random() - 0.5) * 200;
      word.style.transform = `translate(${x}px, ${y}px)`;
      word.style.opacity = "0.2"; 
  });

  word.addEventListener("mouseout", () => {
      word.style.transform = "translate(0, 0)"; 
      word.style.opacity = "1";
  });
});
