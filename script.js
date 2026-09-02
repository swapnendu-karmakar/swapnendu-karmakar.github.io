const greetings = [
  { text: "Hello, World", lang: "English" },
  { text: "Hola, Mundo", lang: "Spanish" },
  { text: "Bonjour, Monde", lang: "French" },
  { text: "Ciao, Mondo", lang: "Italian" },
  { text: "Hallo, Welt", lang: "German" },
  { text: "こんにちは、世界", lang: "Japanese" },
  { text: "안녕, 세상아", lang: "Korean" },
  { text: "नमस्ते, दुनिया", lang: "Hindi" },
  { text: "Привет, мир", lang: "Russian" },
  { text: "Habari, Dunia", lang: "Swahili" },
  { text: "Geia sou, Kosme", lang: "Greek" },
];

const editor = document.getElementById('editor');
const stringLit = document.getElementById('stringLit');
const output = document.getElementById('output');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let order = shuffle([...Array(greetings.length).keys()]);
let orderPos = 0;
let running = false;

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextGreeting(){
  if(orderPos >= order.length){
    order = shuffle([...Array(greetings.length).keys()]);
    orderPos = 0;
  }
  return greetings[order[orderPos++]];
}

function typeOutput(text, done){
  if(reduceMotion){
    output.textContent = text;
    done();
    return;
  }
  output.textContent = '';
  let i = 0;
  const speed = Math.max(18, 220 / text.length);
  (function step(){
    output.textContent = text.slice(0, i);
    i++;
    if(i <= text.length){
      setTimeout(step, speed);
    } else {
      done();
    }
  })();
}

function run(){
  if(running) return;
  running = true;
  editor.classList.add('running');

  const g = nextGreeting();

  stringLit.style.color = 'transparent';
  output.textContent = '';

  setTimeout(() => {
    stringLit.textContent = '"' + g.text + '"';
    stringLit.style.color = '';
    editor.classList.remove('running');

    typeOutput(g.text, () => {
      running = false;
    });
  }, 160);
}

editor.addEventListener('click', run);
editor.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    run();
  }
});