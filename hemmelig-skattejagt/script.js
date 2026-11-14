const QUESTIONS=[
 {q:'Hvorhen var jeres sidste fælles ferie?',answers:['Zakynthos']},
 {q:'Hvilket nummer har Odd og Karens nye hus?',answers:['37']},
 {q:'Hvad hedder det høje bjerg på hjørnet mellem Kettrup Bjergevej og Sylviavej?',answers:['Ørnbjerg','Ørnebjerg']},
 {q:'Hvad hedder stinummeret, hvor broen er, hvor Alfred blæste væk i stormen?',answers:['17','sytten']}
];
const STORAGE='hemmelig-skattejagt-v1';
let saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{}
let accepted=!!saved.accepted,progress=Math.max(0,Math.min(4,Number(saved.progress)||0)),unicornStarted=false;
const app=document.getElementById('app');
const save=()=>localStorage.setItem(STORAGE,JSON.stringify({accepted,progress}));
const norm=s=>String(s).trim().replace(/\s+/g,' ').toLocaleLowerCase('da-DK');
function render(){
 if(!accepted){app.innerHTML=`<p class="eyebrow">✦ KUN FOR SÆRLIGT INDVIEDE ✦</p><h1>Velkommen til den fantastiske hemmelige skattejagt! ❤️</h1><p>Du er blevet udvalgt til en ganske særlig oplevelse. Fire gåder står mellem dig og en hemmelig belønning. Kun de særligt indviede får adgang til at afsløre mysteriet.</p><p><strong>Vigtig regel: Mobiltelefoner er forbudt under hele skattejagten.</strong></p><p>Er du indforstået med dette?</p><button id="agree">Ja, jeg er indforstået ✨</button>`;document.getElementById('agree').onclick=()=>{accepted=true;save();render()};return}
 if(progress<4){const q=QUESTIONS[progress];app.innerHTML=`<p class="eyebrow">✦ DEN HEMMELIGE SKATTEJAGT ✦</p><div class="meter"><div style="width:${progress*25}%"></div></div><p class="eyebrow">SPØRGSMÅL ${progress+1} AF 4</p><h2>${q.q}</h2><form id="answer-form"><input id="answer" aria-label="Dit svar" placeholder="Skriv dit svar her" autocomplete="off" required><button type="submit">Bekræft svar ✨</button></form><p id="feedback" class="error" aria-live="polite"></p>`;document.getElementById('answer-form').onsubmit=e=>{e.preventDefault();const value=document.getElementById('answer').value;if(q.answers.some(a=>norm(a)===norm(value))){progress++;save();render()}else document.getElementById('feedback').textContent='Det var ikke helt rigtigt. Prøv igen!'};return}
 app.innerHTML=`<p class="eyebrow">✦ DEN STORE FINALE ✦</p><h1>Du klarede alle fire gåder! ❤️</h1><p>Den hemmelige belønning er gemt et sted inde i bunkeren mellem <strong>Kettrup Bjergevej XX og XX</strong>.</p><p>Men husnumrene er desværre blevet spist af en enhjørning! Måske kan den hjælpe dig med at finde dem igen …</p><button id="start-unicorn">Jeg er klar til enhjørning 🦄</button>

<p class="hint">
  Hold øje med enhjørningens regnbuefarvede spor.
</p>

<button id="restart" class="restart-button">
  Genstart 🔄
</button>`;
 document.getElementById('start-unicorn').onclick=()=>{document.getElementById('start-unicorn').disabled=true;document.getElementById('start-unicorn').textContent='Enhjørningen er på vej! 🌈';startUnicorn()}; document.getElementById('restart').onclick = () => {
  localStorage.removeItem(STORAGE);
  window.location.reload();
};
}
function startUnicorn(){if(unicornStarted)return;unicornStarted=true;document.getElementById('unicorn-stage').classList.remove('hidden');const unicorn=document.getElementById('unicorn');const holder=document.getElementById('drops');const symbols=['8','6','♥','L','O','V','E','♥','Y','O','U','♥','8','2'];let next=0;const padding=window.innerWidth<500?15:22;const start=padding,end=window.innerWidth-padding;let lastX=-Infinity;const t0=performance.now();function frame(now){if(next>=symbols.length)return;const rect=unicorn.getBoundingClientRect();const x=rect.left+rect.width*.25;const target=start+(end-start)*next/(symbols.length-1);if(x>=target&&x>lastX){const el = document.createElement('div');
el.className = 'drop';

const id = next;
const hue = (id * 36) % 360;

el.innerHTML = `
  <svg class="rainbow-poop"
       viewBox="0 0 62 64"
       xmlns="http://www.w3.org/2000/svg">

    <defs>
      <linearGradient id="poop-${id}"
                      x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"
              stop-color="hsl(${hue},95%,80%)"/>
        <stop offset="55%"
              stop-color="hsl(${(hue + 40) % 360},95%,65%)"/>
        <stop offset="100%"
              stop-color="hsl(${(hue + 85) % 360},90%,55%)"/>
      </linearGradient>
    </defs>

    <path
      d="M14 54
         C3 54 1 40 12 36
         C6 29 14 21 24 22
         C19 16 26 11 33 11
         C33 5 40 4 43 11
         C49 16 44 22 42 24
         C54 25 58 34 51 39
         C64 47 54 57 43 57
         L17 57 Q14 57 14 54Z"
      fill="url(#poop-${id})"
      stroke="#9b4a9a"
      stroke-width="2.2"
    />

    <path
      d="M16 38 Q31 30 48 38"
      fill="none"
      stroke="#fff"
      stroke-width="3"
      opacity=".5"
      stroke-linecap="round"
    />

    <text
      x="31"
      y="48"
      text-anchor="middle"
      font-size="24"
      font-weight="900"
      fill="#402044"
      stroke="#fff"
      stroke-width=".6"
      paint-order="stroke"
      font-family="Arial, sans-serif"
    >${symbols[next]}</text>
  </svg>
`;const y=rect.top+rect.height*.58;el.style.left=`${Math.min(end,Math.max(start,x))}px`;el.style.top=`${y}px`;el.style.setProperty('--fall',`${Math.max(10,window.innerHeight-y-48)}px`);holder.appendChild(el);lastX=x;next++}if(now-t0<17500)requestAnimationFrame(frame)}requestAnimationFrame(frame)}
render();
