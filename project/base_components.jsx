// BASE App — Shared Components + Body Map
const BC='#1D9E75', BCS='#E8F7F2', BCH='#178A64';

// STATUS BAR
function StatusBar() {
  const t = new Date(), h = ((t.getHours() % 12) || 12), m = String(t.getMinutes()).padStart(2,'0');
  return (
    <div style={{height:50,padding:'15px 30px 0',display:'flex',alignItems:'center',
      justifyContent:'space-between',background:'#fff',flexShrink:0}}>
      <span style={{font:'600 15px/1 var(--font)',letterSpacing:'-.02em'}}>{h}:{m}</span>
      <div style={{display:'flex',gap:7,alignItems:'center'}}>
        <svg width="15" height="11" viewBox="0 0 15 11">
          {[0,1,2,3].map(i=><rect key={i} x={i*3.5} y={11-(i+2)*2.2} width="2.5" height={(i+2)*2.2} rx=".4" fill="var(--fg)"/>)}
        </svg>
        <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
          <rect x=".5" y=".5" width="21" height="12" rx="2.5" stroke="var(--fg)" strokeOpacity=".35"/>
          <rect x="22" y="4" width="3" height="5" rx="1" fill="var(--fg)" fillOpacity=".4"/>
          <rect x="2" y="2" width="16" height="9" rx="1.5" fill="var(--fg)"/>
        </svg>
      </div>
    </div>
  );
}

// TOP BAR
function TopBar({title, onBack, right}) {
  return (
    <div style={{height:52,padding:'0 20px',display:'flex',alignItems:'center',
      justifyContent:'space-between',background:'#fff',flexShrink:0}}>
      {onBack
        ? <button onClick={onBack} style={{background:'none',border:0,cursor:'pointer',
            color:BC,padding:'8px 8px 8px 0',display:'flex',alignItems:'center',gap:5,
            font:'500 15px/1 var(--font)'}}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M8 1 1.5 7.5 8 14"/></svg>
            Back
          </button>
        : <div style={{width:64}}/>}
      {title && <span style={{font:'600 17px/1 var(--font)',letterSpacing:'-.02em'}}>{title}</span>}
      {right || <div style={{width:64}}/>}
    </div>
  );
}

// TAB BAR
function TabBar({active, nav}) {
  const tabs = [
    {id:'home', d:['M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z','M9 21V12h6v9']},
    {id:'workout', d:['M6.5 6.5h11','M6.5 17.5h11','M3 10h3v4H3z','M18 10h3v4h-3z']},
    {id:'stats', d:['M18 20V10','M12 20V4','M6 20v-6']},
    {id:'profile', d:['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2','M12 11a4 4 0 100-8 4 4 0 000 8z']},
  ];
  return (
    <div style={{height:72,paddingBottom:10,flexShrink:0,
      background:'rgba(255,255,255,.93)',backdropFilter:'blur(20px)',
      borderTop:'1px solid rgba(0,0,0,.07)',
      display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      {tabs.map(t => {
        const sel = active === t.id;
        return (
          <button key={t.id} onClick={()=>nav(t.id)}
            style={{border:0,background:'none',cursor:'pointer',padding:'6px 18px',
              color:sel?BC:'#ABABAB',transition:'color 150ms',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={sel?2.2:1.6} strokeLinecap="round" strokeLinejoin="round">
              {t.d.map((p,i)=><path key={i} d={p}/>)}
            </svg>
          </button>
        );
      })}
    </div>
  );
}

// PRIMARY BUTTON
function BtnP({children, onClick, disabled, style}) {
  return (
    <button onClick={onClick} disabled={!!disabled}
      style={{background:BC,color:'#fff',border:0,height:52,borderRadius:14,
        font:'600 16px/1 var(--font)',letterSpacing:'-.01em',
        cursor:disabled?'not-allowed':'pointer',opacity:disabled?.4:1,
        width:'100%',display:'flex',alignItems:'center',justifyContent:'center',
        gap:8,transition:'transform 120ms',...style}}>
      {children}
    </button>
  );
}

// SECONDARY BUTTON
function BtnS({children, onClick, style}) {
  return (
    <button onClick={onClick}
      style={{background:'transparent',color:BC,border:`1.5px solid ${BC}`,height:48,borderRadius:14,
        font:'600 15px/1 var(--font)',cursor:'pointer',width:'100%',
        display:'flex',alignItems:'center',justifyContent:'center',gap:8,...style}}>
      {children}
    </button>
  );
}

// GHOST BUTTON
function BtnG({children, onClick, style}) {
  return (
    <button onClick={onClick}
      style={{background:'transparent',color:'var(--fg2)',border:0,height:40,
        font:'500 14px/1 var(--font)',cursor:'pointer',width:'100%',
        display:'flex',alignItems:'center',justifyContent:'center',gap:6,...style}}>
      {children}
    </button>
  );
}

// PROGRESS RING
function Ring({value, max=100, size=96, stroke=7, color=BC, bg=BCS, children}) {
  const r = (size-stroke)/2, circ = r*2*Math.PI, off = circ-(value/max)*circ;
  return (
    <div style={{position:'relative',width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)',position:'absolute',top:0,left:0}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{transition:'stroke-dashoffset 700ms cubic-bezier(0.32,0.72,0,1)'}}/>
      </svg>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center'}}>
        {children}
      </div>
    </div>
  );
}

// STAT CARD
function StatCard({label, value, unit, sub, bg='var(--surf)', color='var(--fg)', style}) {
  return (
    <div style={{background:bg,borderRadius:14,padding:'12px 14px',flex:1,
      border:'1px solid rgba(0,0,0,.06)',display:'flex',flexDirection:'column',gap:3,...style}}>
      <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',letterSpacing:'.05em'}}>{label}</div>
      <div style={{display:'flex',alignItems:'baseline',gap:3}}>
        <span style={{font:`800 ${String(value).length>4?18:22}px/1 var(--font)`,letterSpacing:'-.035em',color}}>{value}</span>
        {unit && <span style={{font:'500 11px/1 var(--font)',color:'var(--fg3)'}}>{unit}</span>}
      </div>
      {sub && <div style={{font:'500 11px/1.3 var(--font)',color:'var(--fg3)'}}>{sub}</div>}
    </div>
  );
}

// BOTTOM SHEET
function Sheet({open, onClose, title, children}) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(0,0,0,.32)',
      zIndex:200,display:'flex',alignItems:'flex-end',animation:'fadeIn 200ms'}}>
      <div onClick={e=>e.stopPropagation()}
        style={{width:'100%',background:'#fff',borderRadius:'24px 24px 0 0',
          maxHeight:'90%',overflow:'auto',
          boxShadow:'0 -4px 32px rgba(0,0,0,.12)',
          animation:'riseUp 320ms cubic-bezier(0.32,0.72,0,1)'}}>
        <div style={{width:36,height:4,background:'#E0E0DE',borderRadius:999,margin:'14px auto 0'}}/>
        {title && <div style={{padding:'14px 20px 0',font:'700 19px/1 var(--font)',letterSpacing:'-.025em'}}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// CHIP
function Chip({label, active, onClick}) {
  return (
    <button onClick={onClick}
      style={{background:active?BC:'#fff',color:active?'#fff':'var(--fg2)',
        border:`1.5px solid ${active?BC:'rgba(0,0,0,.1)'}`,
        borderRadius:999,height:32,padding:'0 13px',font:'500 13px/1 var(--font)',
        cursor:'pointer',whiteSpace:'nowrap',transition:'all 150ms',flexShrink:0}}>
      {label}
    </button>
  );
}

// ─── BODY MAP ───────────────────────────────────────────────────────────────

// Each muscle entry has `paths` (SVG d strings) and optionally `rects` ([x,y,w,h,rx] tuples)
const MUSCLE_F = [
  { id:'chest', label:'Chest', paths:[
    'M80,58 C76,57 65,60 55,69 C49,75 47,84 51,92 C55,99 64,101 73,98 C79,95 80,86 80,58Z',
    'M80,58 C84,57 95,60 105,69 C111,75 113,84 109,92 C105,99 96,101 87,98 C81,95 80,86 80,58Z',
  ]},
  { id:'shoulders', label:'Shoulders', paths:[
    'M38,55 C27,55 20,63 22,74 C24,85 34,91 45,89 C53,87 57,79 55,70 C53,62 47,55 38,55Z',
    'M122,55 C133,55 140,63 138,74 C136,85 126,91 115,89 C107,87 103,79 105,70 C107,62 113,55 122,55Z',
  ]},
  { id:'arms', label:'Arms', paths:[
    // left bicep
    'M29,77 C22,82 19,96 20,111 C21,124 27,133 35,133 C42,133 45,124 44,111 C43,98 38,83 29,77Z',
    // right bicep
    'M131,77 C138,82 141,96 140,111 C139,124 133,133 125,133 C118,133 115,124 116,111 C117,98 122,83 131,77Z',
    // left forearm
    'M21,124 C16,129 13,142 14,156 C15,167 20,174 26,173 C32,172 35,164 34,153 C33,142 28,130 21,124Z',
    // right forearm
    'M139,124 C144,129 147,142 146,156 C145,167 140,174 134,173 C128,172 125,164 126,153 C127,142 132,130 139,124Z',
  ]},
  { id:'core', label:'Core', rects:[
    [61,95,17,13,4],[82,95,17,13,4],
    [61,113,17,13,4],[82,113,17,13,4],
    [61,131,17,13,4],[82,131,17,13,4],
  ]},
  { id:'quads', label:'Quads', paths:[
    'M64,168 C57,173 53,187 52,202 C51,216 54,227 60,232 C65,237 72,236 76,230 C80,222 80,208 79,194 C78,181 72,172 64,168Z',
    'M96,168 C103,173 107,187 108,202 C109,216 106,227 100,232 C95,237 88,236 84,230 C80,222 80,208 81,194 C82,181 88,172 96,168Z',
  ]},
  { id:'calves', label:'Calves', paths:[
    'M65,236 C59,242 56,256 58,269 C60,278 66,283 72,281 C78,279 80,271 79,263 C78,252 74,241 65,236Z',
    'M95,236 C101,242 104,256 102,269 C100,278 94,283 88,281 C82,279 80,271 81,263 C82,252 86,241 95,236Z',
  ]},
];

const MUSCLE_B = [
  { id:'back', label:'Upper Back', paths:[
    // left lat — sweeps from spine out to armpit
    'M80,60 C77,60 68,65 57,75 C49,83 45,96 48,107 C51,116 60,118 70,115 C78,113 80,102 80,88Z',
    // right lat
    'M80,60 C83,60 92,65 103,75 C111,83 115,96 112,107 C109,116 100,118 90,115 C82,113 80,102 80,88Z',
    // trapezius top band
    'M58,53 C54,53 48,57 46,62 C52,60 66,58 80,58 C94,58 108,60 114,62 C112,57 106,53 102,53 C94,49 86,47 80,47 C74,47 66,49 58,53Z',
  ]},
  { id:'triceps', label:'Triceps', paths:[
    'M31,79 C24,84 21,99 22,114 C23,127 29,136 37,135 C44,134 47,125 46,113 C45,100 40,85 31,79Z',
    'M129,79 C136,84 139,99 138,114 C137,127 131,136 123,135 C116,134 113,125 114,113 C115,100 120,85 129,79Z',
  ]},
  { id:'lower_back', label:'Lower Back', paths:[
    'M64,102 C62,102 59,106 59,113 L59,136 C59,141 63,143 67,143 L93,143 C97,143 101,141 101,136 L101,113 C101,106 98,102 96,102Z',
  ]},
  { id:'glutes', label:'Glutes', paths:[
    'M68,150 C59,155 53,166 53,178 C53,190 59,198 70,200 C81,202 88,195 89,184 C90,173 83,158 68,150Z',
    'M92,150 C101,155 107,166 107,178 C107,190 101,198 90,200 C79,202 72,195 71,184 C70,173 77,158 92,150Z',
  ]},
  { id:'hamstrings', label:'Hamstrings', paths:[
    'M63,196 C56,204 51,219 51,234 C51,247 57,256 67,256 C77,256 82,245 82,232 C82,217 76,203 63,196Z',
    'M97,196 C104,204 109,219 109,234 C109,247 103,256 93,256 C83,256 78,245 78,232 C78,217 84,203 97,196Z',
  ]},
  { id:'calves', label:'Calves', paths:[
    'M65,238 C59,244 56,258 58,271 C60,280 66,285 72,283 C78,281 80,273 79,265 C78,254 74,243 65,238Z',
    'M95,238 C101,244 104,258 102,271 C100,280 94,285 88,283 C82,281 80,273 81,265 C82,254 86,243 95,238Z',
  ]},
];

const JOINTS = [
  {id:'shoulder', label:'Shoulder', pts:[[36,62],[124,62]]},
  {id:'elbow',    label:'Elbow',    pts:[[22,118],[138,118]]},
  {id:'wrist',    label:'Wrist',    pts:[[15,157],[145,157]]},
  {id:'hip',      label:'Hip',      pts:[[63,166],[97,166]]},
  {id:'knee',     label:'Knee',     pts:[[65,230],[95,230]]},
  {id:'ankle',    label:'Ankle',    pts:[[65,272],[95,272]]},
];

// ── Silhouette ───────────────────────────────────────────────────────────────

function Silhouette({view}) {
  const bp = {fill:'#FFFFFF', stroke:'rgba(0,0,0,0.13)', strokeWidth:1.4, strokeLinejoin:'round'};
  return (
    <>
      <ellipse cx="80" cy="21" rx="17" ry="19" {...bp}/>
      <path d="M74,37 C72,42 72,50 74,54 L86,54 C88,50 88,42 86,37 Q80,40 74,37Z" {...bp}/>
      <path d="M74,54 C70,54 60,53 50,58 C42,62 33,68 29,77 C26,86 31,95 38,99 C45,103 51,108 54,118 C57,128 57,138 59,149 C61,159 66,167 80,169 C94,167 99,159 101,149 C103,138 103,128 106,118 C109,108 115,103 122,99 C129,95 134,86 131,77 C127,68 118,62 110,58 C100,53 90,54 86,54Z" {...bp}/>
      <path d="M29,77 C23,77 17,87 17,99 C17,113 20,126 24,137 C27,144 30,149 33,153 C37,156 42,154 44,149 C46,142 43,129 43,116 C43,103 43,91 45,83 C46,76 38,74 29,77Z" {...bp}/>
      <path d="M24,137 C19,141 15,154 16,167 C17,178 22,185 28,184 C34,183 37,175 36,163 C35,151 30,140 24,137Z" {...bp}/>
      <ellipse cx="22" cy="185" rx="8" ry="5" {...bp}/>
      <path d="M131,77 C137,77 143,87 143,99 C143,113 140,126 136,137 C133,144 130,149 127,153 C123,156 118,154 116,149 C114,142 117,129 117,116 C117,103 117,91 115,83 C114,76 122,74 131,77Z" {...bp}/>
      <path d="M136,137 C141,141 145,154 144,167 C143,178 138,185 132,184 C126,183 123,175 124,163 C125,151 130,140 136,137Z" {...bp}/>
      <ellipse cx="138" cy="185" rx="8" ry="5" {...bp}/>
      <path d="M59,169 C53,174 48,189 47,206 C46,221 49,234 54,243 C57,249 59,255 59,263 C59,272 58,280 58,286 L72,288 C74,286 74,280 73,272 C72,263 71,255 73,247 C75,239 80,234 80,220 C80,206 80,192 80,180 L59,169Z" {...bp}/>
      <path d="M101,169 C107,174 112,189 113,206 C114,221 111,234 106,243 C103,249 101,255 101,263 C101,272 102,280 102,286 L88,288 C86,286 86,280 87,272 C88,263 89,255 87,247 C85,239 80,234 80,220 C80,206 80,192 80,180 L101,169Z" {...bp}/>
      <ellipse cx="66" cy="286" rx="15" ry="6" {...bp}/>
      <ellipse cx="94" cy="286" rx="15" ry="6" {...bp}/>

      {/* Anatomical detail lines */}
      {view==='front' && <>
        <line x1="80" y1="57" x2="50" y2="69" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="80" y1="57" x2="110" y2="69" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="80" y1="58" x2="80" y2="164" stroke="rgba(0,0,0,.04)" strokeWidth="1" strokeLinecap="round"/>
      </>}
      {view==='back' && <>
        <line x1="80" y1="57" x2="80" y2="150" stroke="rgba(0,0,0,.09)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M57,70 C53,78 53,88 57,94" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M103,70 C107,78 107,88 103,94" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </>}
    </>
  );
}

// ── Muscle region renderer ───────────────────────────────────────────────────

function MuscleRegion({muscle, fill, active, onClick}) {
  const sp = {
    fill:        active ? fill : 'rgba(29,158,117,0.04)',
    stroke:      active ? BC  : 'rgba(29,158,117,0.22)',
    strokeWidth: active ? 1.4 : 0.9,
    onClick,
    style: {cursor:'pointer', transition:'all 200ms'},
  };
  return (
    <g>
      {(muscle.paths||[]).map((d,i) => <path key={`p${i}`} d={d} {...sp}/>)}
      {(muscle.rects||[]).map(([x,y,w,h,rx],i) => (
        <rect key={`r${i}`} x={x} y={y} width={w} height={h} rx={rx} {...sp}/>
      ))}
    </g>
  );
}

// ── Main BodyMap component ───────────────────────────────────────────────────

function BodyMap({activated=[], sore=[], onToggle, view='front', mode='muscles'}) {
  const isSore = id => sore.includes(id);
  const isOn   = id => activated.includes(id) || sore.includes(id);
  const fill   = id => isSore(id) ? BC : '#7ECFB0';
  const active = id => isOn(id) || isSore(id);

  const muscles = view === 'front' ? MUSCLE_F : MUSCLE_B;

  return (
    <div style={{background:'#F2F2EF', borderRadius:14, padding:'12px 8px 8px'}}>
      <svg viewBox="0 0 160 294" style={{width:'100%',maxWidth:210,display:'block',margin:'0 auto'}}>
        <Silhouette view={view}/>

        {mode === 'muscles' && muscles.map(m => (
          <MuscleRegion key={m.id} muscle={m}
            fill={fill(m.id)} active={active(m.id)}
            onClick={()=>onToggle&&onToggle(m.id)}/>
        ))}

        {mode === 'joints' && JOINTS.map(j => (
          <g key={j.id} onClick={()=>onToggle&&onToggle(j.id)} style={{cursor:'pointer'}}>
            {j.pts.map(([x,y],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={10}
                  fill={isSore(j.id)?BC:isOn(j.id)?'#7ECFB0':'rgba(0,0,0,0.06)'}
                  stroke={isOn(j.id)||isSore(j.id)?BC:'rgba(0,0,0,0.18)'} strokeWidth={1.5}
                  style={{cursor:'pointer',transition:'fill 200ms'}}/>
                <circle cx={x} cy={y} r={3.5}
                  fill={isSore(j.id)?'#fff':isOn(j.id)?'#fff':'rgba(0,0,0,0.25)'}/>
              </g>
            ))}
          </g>
        ))}

        <text x="80" y="292" textAnchor="middle"
          style={{font:'500 8px/1 Inter,sans-serif',fill:'#B8B8B2',letterSpacing:'.1em',textTransform:'uppercase'}}>
          {view} view
        </text>
      </svg>
    </div>
  );
}

Object.assign(window, {
  BC, BCS, BCH,
  StatusBar, TopBar, TabBar,
  BtnP, BtnS, BtnG,
  Ring, StatCard, Sheet, Chip,
  BodyMap, MUSCLE_F, MUSCLE_B, JOINTS,
});
