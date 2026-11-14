'use client';
import {useEffect,useState,useRef} from 'react';
function Balloon({progress}){return <div className={`balloon balloon-${progress}`} aria-hidden="true"><span className="balloon-bob">❤️<span className="string"/></span></div>}
function Decorations(){return <><div className="flags" aria-hidden="true">🎉 ✨ ❤️ 🎈 ✨ 🎊 ❤️ 🎉</div><div className="lights" aria-hidden="true">{Array.from({length:15},(_,i)=><i key={i}/>)}</div><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div><div className="sparkle s3">✦</div><div className="party-side party-left" aria-hidden="true">
  <span>🎈</span>
  <span>✨</span>
  <span>❤️</span>
  <span>🎊</span>
  <span>🎈</span>
</div>

<div className="party-side party-right" aria-hidden="true">
  <span>❤️</span>
  <span>🎉</span>
  <span>🎈</span>
  <span>✨</span>
  <span>🎊</span>
</div></>}
function Fireworks() {
  return (
    <div className="fireworks" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <div className={`burst burst-${i}`} key={i}>
          {Array.from({ length: 24 }, (_, j) => (
            <i
              key={j}
              style={{
                '--angle': `${j * 15}deg`,
                '--color': `hsl(${(i * 47 + j * 29) % 360} 100% 65%)`
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Unicorn() {
  const rearRef = useRef(null);
  const [drops, setDrops] = useState([]);
  useEffect(() => {
    const symbols = ['8','6','♥','L','O','V','E','♥','Y','O','U','♥','8','2'];
    const released = new Set();
    let raf = 0;
    let started = performance.now();
    const tick = () => {
      const rear = rearRef.current;
      if (rear) {
        const r = rear.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const w = window.innerWidth;
        const pad = Math.max(20, Math.min(46, w * .05));
        const usable = Math.max(1, w - 2 * pad);
        const progress = (x - pad) / usable;
        symbols.forEach((letter, i) => {
          const threshold = (i + .5) / symbols.length;
          if (!released.has(i) && progress >= threshold && progress <= 1.12 && x > pad && x < w - pad) {
            released.add(i);
            const fall = Math.max(10, window.innerHeight - y - 36);
            setDrops(current => [...current, {id:i, letter, x, y, fall}]);
          }
        });
      }
      // One pass only; unicorn's CSS journey continues forever.
      if (performance.now() - started < 18000 && released.size < symbols.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className="unicorn-stage" aria-hidden="true">
      <div className="rainbow-drops">
        {drops.map(({id,letter,x,y,fall}) => (
          <div className="rainbow-drop" key={id} style={{left:x,top:y,'--fall':`${fall}px`}}>
            <svg viewBox="0 0 62 64" className="rainbow-poop" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id={`drop-gradient-${id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={`hsl(${id*36} 95% 80%)`}/>
                <stop offset=".55" stopColor={`hsl(${(id*36+40)%360} 95% 65%)`}/>
                <stop offset="1" stopColor={`hsl(${(id*36+85)%360} 90% 55%)`}/>
              </linearGradient></defs>
              <path d="M14 54 C3 54 1 40 12 36 C6 29 14 21 24 22 C19 16 26 11 33 11 C33 5 40 4 43 11 C49 16 44 22 42 24 C54 25 58 34 51 39 C64 47 54 57 43 57 L17 57 Q14 57 14 54Z" fill={`url(#drop-gradient-${id})`} stroke="#9b4a9a" strokeWidth="2.2"/>
              <path d="M16 38 Q31 30 48 38" fill="none" stroke="#fff" strokeWidth="3" opacity=".5" strokeLinecap="round"/>
              <text x="31" y="48" textAnchor="middle" fontSize="24" fontWeight="900" fill="#402044" stroke="#fff" strokeWidth=".6" paintOrder="stroke" fontFamily="Arial, sans-serif">{letter}</text>
            </svg>
          </div>
        ))}
      </div>
      <div className="unicorn-journey">
        <div className="unicorn-facing"><span ref={rearRef} className="unicorn-rear-anchor"/>
          <svg className="unicorn-svg" viewBox="0 0 280 205" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="unicornMane" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff7fb6"/><stop offset=".48" stopColor="#b18bff"/><stop offset="1" stopColor="#65d9ef"/>
              </linearGradient>
              <linearGradient id="unicornTail" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff8cae"/><stop offset=".5" stopColor="#f8d66c"/><stop offset="1" stopColor="#6de1c6"/>
              </linearGradient>
            </defs>
            <g className="unicorn-tail">
              <path d="M73 95 C22 54 8 110 45 122 C14 111 5 145 62 135 C31 156 70 169 91 127" fill="url(#unicornTail)" stroke="#b47db6" strokeWidth="3"/>
              <path d="M68 112 Q25 100 31 131" fill="none" stroke="#fff0a9" strokeWidth="5" opacity=".8"/>
            </g>
            <g className="unicorn-leg unicorn-leg-back-a"><path d="M104 127 L95 177 L111 177 L130 137" fill="#e4d9f3" stroke="#9d88ad" strokeWidth="3"/><path d="M94 172 L114 172 L114 184 L92 184Z" fill="#c98bd2"/></g>
            <g className="unicorn-leg unicorn-leg-back-b"><path d="M147 129 L156 176 L173 176 L169 130" fill="#e6ddf5" stroke="#9d88ad" strokeWidth="3"/><path d="M155 171 L177 171 L177 184 L154 184Z" fill="#c98bd2"/></g>
            <g className="unicorn-body-bob">
              <ellipse cx="129" cy="113" rx="75" ry="40" fill="#fffafc" stroke="#b7a4c3" strokeWidth="3"/>
              <path d="M168 104 Q179 65 197 64 Q218 62 223 89 L202 125 L169 133" fill="#fffafc" stroke="#b7a4c3" strokeWidth="3"/>
              <g className="unicorn-mane"><path d="M176 75 Q155 50 175 39 Q173 61 193 53 Q194 70 184 93 L172 108Z" fill="url(#unicornMane)" stroke="#b47db6" strokeWidth="2"/><path d="M198 65 Q183 38 204 33 Q197 51 217 57" fill="#fa90c1"/></g>
              <path d="M207 67 L217 23 L228 67" fill="#f5c65b" stroke="#c89337" strokeWidth="3"/>
              <path d="M195 67 L197 48 Q209 50 209 70" fill="#fffafc" stroke="#b7a4c3" strokeWidth="2"/>
              <path d="M200 60 L201 54 L205 60" fill="#e99bb8"/>
              <ellipse cx="222" cy="88" rx="29" ry="23" fill="#fffafc" stroke="#b7a4c3" strokeWidth="3"/>
              <circle cx="211" cy="78" r="4.5" fill="#3d2e51"/><circle cx="212" cy="76" r="1.4" fill="#fff"/>
              <ellipse cx="239" cy="91" rx="2.5" ry="3" fill="#b98da8"/><ellipse cx="217" cy="94" rx="7" ry="4" fill="#f7a6b6" opacity=".65"/>
            </g>
            <g className="unicorn-leg unicorn-leg-front-a"><path d="M97 132 L83 179 L102 179 L123 140" fill="#fffafc" stroke="#b7a4c3" strokeWidth="3"/><path d="M81 175 L105 175 L105 187 L80 187Z" fill="#c98bd2"/></g>
            <g className="unicorn-leg unicorn-leg-front-b"><path d="M167 130 L180 177 L198 177 L185 128" fill="#fffafc" stroke="#b7a4c3" strokeWidth="3"/><path d="M178 174 L200 174 L200 187 L178 187Z" fill="#c98bd2"/></g>
            <g className="unicorn-stars"><path d="M44 52 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" fill="#ffd26e"/><circle cx="64" cy="37" r="4" fill="#ff94c8"/><circle cx="253" cy="48" r="4" fill="#83dcef"/></g>
          </svg>
        </div>
      </div>
    </div>
  );
}


const QUESTIONS = [
 {question:'Hvorhen var jeres sidste fælles ferie?', answers:['Zakynthos'], symbol:'🌴'},
 {question:'Hvilket nummer har Odd og Karens nye hus?', answers:['37'], symbol:'🏡'},
 {question:'Hvad hedder det høje bjerg på hjørnet mellem Kettrup Bjergevej og Sylviavej?', answers:['Ørnbjerg','Ørnebjerg'], symbol:'⛰️'},
 {question:'Hvad hedder stinummeret, hvor broen er, hvor Alfred blæste væk i stormen?', answers:['17','sytten'], symbol:'🌬️'}
];
const normalize = value => String(value).trim().replace(/\s+/g,' ').toLocaleLowerCase('da-DK');
export default function Home() {
 const [progress,setProgress]=useState(0);
 const [accepted,setAccepted]=useState(false);
 const [ready,setReady]=useState(false);
 const [answer,setAnswer]=useState('');
 const [message,setMessage]=useState('');
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
   try {const p=Number(localStorage.getItem('secret-hunt-progress-v1'));setProgress(Number.isInteger(p)?Math.max(0,Math.min(4,p)):0);setAccepted(localStorage.getItem('secret-hunt-accepted-v1')==='yes');}catch{}
   setLoaded(true);
 },[]);
 function accept(){setAccepted(true);try{localStorage.setItem('secret-hunt-accepted-v1','yes')}catch{}}
 function submit(e){e.preventDefault();const q=QUESTIONS[progress];if(!q)return;
  if(q.answers.some(a=>normalize(a)===normalize(answer))){const next=progress+1;setProgress(next);setAnswer('');setMessage('');try{localStorage.setItem('secret-hunt-progress-v1',String(next))}catch{}}
  else setMessage('Ikke helt rigtigt. Prøv igen ❤️');
 }
 const question=QUESTIONS[progress];
 return <main className="scene"><Decorations/><Balloon progress={progress}/>{ready&&<><Fireworks/><Unicorn/></>}
 <section className="panel">{!loaded?<p className="intro">Gør festen klar…</p>:!accepted?<>
 <p className="eyebrow">✨ KUN FOR SÆRLIGT INDVIEDE ✨</p><h1>Velkommen til den hemmelige skattejagt! ❤️</h1>
 <p className="intro">Du er blevet udvalgt til en fantastisk og tophemmelig skattejagt. Kun ganske særligt indviede får lov at følge sporene til den skjulte belønning.</p>
 <p className="intro">Fire gåder står mellem dig og hemmeligheden. Hvert rigtigt svar bringer dig tættere på målet.</p>
 <p className="intro"><strong>Vigtig regel: Mobiltelefoner er forbudt under hele skattejagten.</strong> Læg telefonen væk, før du begynder.</p>
 <button onClick={accept}>Ja, jeg er indforstået 📵</button>
 </>:progress===4?<>
 <p className="eyebrow">✦ DEN HEMMELIGE FINALE ✦</p><h1>Du har fundet alle sporene! 🎉</h1>
 <p className="intro">Den hemmelige belønning er gemt et sted inde i bunkeren mellem Kettrup Bjergevej XX og XX.</p>
 <p className="intro">Men de to husnumre er blevet spist af en enhjørning! Heldigvis efterlader den spor, som kan afsløre hemmeligheden.</p>
 <p className="intro">Læs sporene fra venstre mod højre. De første og sidste tal er husnumrene.</p>
 {!ready?<button onClick={()=>setReady(true)}>Jeg er klar til enhjørning 🦄</button>:<p className="intro">Følg regnbuesporene! 🌈</p>}
 </>:<>
 <p className="eyebrow">✦ HEMMELIG OPGAVE ✦</p><div className="meter"><span style={{width:`${progress/4*100}%`}}/></div>
 <p className="counter">SPØRGSMÅL {progress+1} AF 4</p><div className="symbol">{question.symbol}</div><h2>{question.question}</h2>
 <form onSubmit={submit}><label htmlFor="hunt-answer">Skriv dit svar</label><input id="hunt-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setMessage('')}} required autoComplete="off" placeholder="Dit svar…"/><button>Mit svar ✨</button></form>
 {message&&<p role="alert" className="message">{message}</p>}
 </>}</section><div className="footer">❤️ KUN FOR DE SÆRLIGT INDVIEDE ❤️</div></main>
}
