// BASE — Home, Stats, Recap, Activity Detection, Weight Recommendation

function greet() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({nav, onActivity, onWeights, userName='Alex'}) {
  const [notif, setNotif] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setNotif(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="view">
      <StatusBar/>

      {/* Activity notification banner */}
      {notif && (
        <div style={{padding:'0 16px 8px',flexShrink:0}}>
          <div onClick={()=>{setNotif(false); onActivity();}}
            className="fi"
            style={{background:'#1A1A1A',borderRadius:16,padding:'12px 14px',
              display:'flex',gap:12,alignItems:'center',cursor:'pointer',
              boxShadow:'0 6px 24px rgba(0,0,0,.25)',
              animation:'dropIn 420ms cubic-bezier(0.32,0.72,0,1)'}}>
            <div style={{width:38,height:38,borderRadius:11,background:BCS,flexShrink:0,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BC} strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="7"/>
                <polyline points="12 9 12 12 14 14"/>
                <line x1="12" y1="5" x2="12" y2="3"/>
                <line x1="19" y1="12" x2="21" y2="12"/>
                <line x1="12" y1="19" x2="12" y2="21"/>
                <line x1="5" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{font:'600 14px/1 var(--font)',color:'#fff',marginBottom:3}}>Activity detected</div>
              <div style={{font:'400 12px/1.3 var(--font)',color:'rgba(255,255,255,.5)'}}>
                Looks like a run. Tap to log it.
              </div>
            </div>
            <button onClick={e=>{e.stopPropagation(); setNotif(false);}}
              style={{background:'rgba(255,255,255,.12)',border:0,borderRadius:99,
                width:22,height:22,cursor:'pointer',color:'rgba(255,255,255,.5)',
                display:'flex',alignItems:'center',justifyContent:'center',
                font:'600 15px/1 var(--font)',flexShrink:0}}>
              ×
            </button>
          </div>
        </div>
      )}

      <div className="scroll" style={{padding:'6px 20px 24px'}}>

        {/* Greeting */}
        <div style={{marginBottom:22,paddingTop:6}}>
          <div style={{font:'400 15px/1 var(--font)',color:'var(--fg3)',marginBottom:4}}>{greet()}</div>
          <div style={{font:'800 30px/1 var(--font)',letterSpacing:'-.038em'}}>{userName}.</div>
        </div>

        {/* Readiness card */}
        <div style={{background:BCS,borderRadius:22,padding:'18px 20px',marginBottom:12,
          display:'flex',alignItems:'center',gap:18}}>
          <Ring value={82} size={86} stroke={7}>
            <span style={{font:'800 24px/1 var(--font)',letterSpacing:'-.045em',color:'var(--fg)'}}>82</span>
          </Ring>
          <div style={{flex:1,minWidth:0}}>
            <div style={{font:'700 19px/1.1 var(--font)',letterSpacing:'-.025em',marginBottom:5}}>
              Ready to train.
            </div>
            <div style={{font:'400 13px/1.45 var(--font)',color:'var(--fg2)',marginBottom:9}}>
              Recovery is strong. Good day to push.
            </div>
            <div style={{display:'flex',gap:5,alignItems:'center'}}>
              <div style={{width:7,height:7,borderRadius:99,background:BC}}/>
              <span style={{font:'500 11px/1 var(--font)',color:BC}}>Readiness score</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <StatCard label="Bio Age" value="26" sub="↓ 2 from real" color={BC}/>
          <StatCard label="Body Battery" value="78%" sub="High energy"/>
          <StatCard label="Streak" value="5" unit="d" sub="Best: 12"/>
        </div>

        {/* Today's workout card */}
        <div onClick={onWeights}
          style={{background:'#1A1A1A',borderRadius:22,padding:'18px 20px',marginBottom:12,
            cursor:'pointer',position:'relative',overflow:'hidden'}}>
          <div style={{font:'500 10px/1 var(--font)',color:'rgba(255,255,255,.32)',
            textTransform:'uppercase',letterSpacing:'.07em',marginBottom:8}}>
            Today · Strength
          </div>
          <div style={{font:'700 20px/1 var(--font)',letterSpacing:'-.025em',color:'#fff',marginBottom:5}}>
            Upper Body Push
          </div>
          <div style={{font:'400 13px/1.4 var(--font)',color:'rgba(255,255,255,.4)',marginBottom:18}}>
            Bench Press · Overhead Press · Dips
          </div>
          <div style={{display:'inline-flex',background:BC,borderRadius:99,height:33,
            padding:'0 15px',alignItems:'center',gap:6,font:'600 13px/1 var(--font)',color:'#fff'}}>
            See weights
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div style={{position:'absolute',right:-28,top:-28,width:120,height:120,
            borderRadius:99,background:BC,opacity:.07}}/>
          <div style={{position:'absolute',right:40,bottom:-40,width:80,height:80,
            borderRadius:99,background:BC,opacity:.05}}/>
        </div>

        {/* Base Camp progress */}
        <div style={{background:'var(--surf)',borderRadius:18,padding:'14px 16px',marginBottom:12,
          border:'1px solid rgba(0,0,0,.05)',display:'flex',alignItems:'center',gap:14}}>
          <div style={{flex:1}}>
            <div style={{font:'600 14px/1 var(--font)',letterSpacing:'-.01em',marginBottom:7}}>
              Base Camp — Day 3 of 14
            </div>
            <div style={{height:5,background:'var(--surf2)',borderRadius:99}}>
              <div style={{height:'100%',width:'21%',background:BC,borderRadius:99,
                transition:'width 600ms var(--ease)'}}/>
            </div>
          </div>
          <span style={{font:'700 24px/1 var(--font)',color:BC,letterSpacing:'-.03em',flexShrink:0}}>3</span>
        </div>

        {/* Quick links */}
        <div style={{display:'flex',gap:8}}>
          {[['Stats →', ()=>nav('stats')],['Weekly recap →', ()=>nav('recap')]].map(([lbl,fn]) => (
            <button key={lbl} onClick={fn}
              style={{flex:1,height:46,borderRadius:14,background:'var(--surf)',
                border:'1px solid rgba(0,0,0,.06)',font:'600 13px/1 var(--font)',
                cursor:'pointer',color:'var(--fg)'}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <TabBar active="home" nav={nav}/>
    </div>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function StatsScreen({onBack, nav}) {
  const milestones = ['Week 1','First PR','Week 2','30-day streak','Top 25%'];
  return (
    <div className="view">
      <StatusBar/>
      <TopBar title="Stats" onBack={onBack}/>
      <div className="scroll" style={{padding:'6px 20px 32px'}}>

        {/* Bio age hero */}
        <div style={{background:BCS,borderRadius:22,padding:'20px 22px',marginBottom:12}}>
          <div style={{font:'500 10px/1 var(--font)',color:BCH,textTransform:'uppercase',
            letterSpacing:'.07em',marginBottom:10}}>Biological age</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:12,marginBottom:10}}>
            <span style={{font:'800 56px/1 var(--font)',letterSpacing:'-.055em',color:BC}}>26</span>
            <div style={{paddingBottom:6}}>
              <div style={{font:'400 14px/1.3 var(--font)',color:'var(--fg2)'}}>chronological: 28</div>
              <div style={{font:'700 13px/1 var(--font)',color:BC,marginTop:3}}>↓ 2 years younger</div>
            </div>
          </div>
          <div style={{font:'400 13px/1.5 var(--font)',color:'var(--fg2)'}}>
            Based on recovery speed, HRV trends, and strength progression over 14 days.
          </div>
        </div>

        {/* Stats grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
          {[
            {label:'Recovery Speed', value:'87', unit:'%',   sub:'Improving ↑',      color:BC},
            {label:'Consistency',    value:'72', unit:'%',   sub:'5 of 7 days'},
            {label:'Strength %ile',  value:'Top 34',         sub:'All BASE users'},
            {label:'New PRs',        value:'3',              sub:'This month',        color:BC},
          ].map((s,i) => <StatCard key={i} {...s} style={{minHeight:84}}/>)}
        </div>

        {/* Goal progress track */}
        <div style={{background:'var(--surf)',borderRadius:20,padding:'16px 18px 20px',marginBottom:12}}>
          <div style={{font:'600 15px/1 var(--font)',letterSpacing:'-.015em',marginBottom:18}}>
            Base Camp progress
          </div>
          <div style={{position:'relative',height:5,background:'var(--surf2)',borderRadius:99,marginBottom:22}}>
            <div style={{position:'absolute',left:0,top:0,height:'100%',
              width:'21%',background:BC,borderRadius:99}}/>
            <div style={{position:'absolute',left:'21%',top:'50%',
              transform:'translate(-50%,-50%)',
              width:14,height:14,borderRadius:99,background:BC,
              border:'2.5px solid #fff',boxShadow:`0 0 0 2px ${BC}`}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            {milestones.map((m,i) => (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,flex:1}}>
                <div style={{width:7,height:7,borderRadius:99,
                  background:i===0?BC:'rgba(0,0,0,.12)',
                  border:`1.5px solid ${i===0?BC:'rgba(0,0,0,.15)'}`}}/>
                <div style={{font:'500 9px/1.3 var(--font)',color:i===0?BC:'var(--fg3)',
                  textAlign:'center',letterSpacing:'.01em'}}>
                  {m}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal records */}
        <div style={{background:'#fff',borderRadius:20,padding:'16px 18px',
          border:'1px solid rgba(0,0,0,.06)'}}>
          <div style={{font:'600 15px/1 var(--font)',letterSpacing:'-.015em',marginBottom:12}}>
            Personal records
          </div>
          {[['Bench Press','165 lbs','↑ +10'],['Squat','205 lbs','↑ +15'],['Overhead Press','105 lbs','↑ +5']].map(([n,v,d]) => (
            <div key={n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
              padding:'11px 0',borderBottom:'1px solid rgba(0,0,0,.05)'}}>
              <span style={{font:'500 14px/1 var(--font)'}}>{n}</span>
              <div style={{textAlign:'right'}}>
                <div style={{font:'700 14px/1 var(--font)',letterSpacing:'-.01em'}}>{v}</div>
                <div style={{font:'600 11px/1 var(--font)',color:BC,marginTop:2}}>{d} lbs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="stats" nav={nav}/>
    </div>
  );
}

// ─── WEEKLY RECAP ─────────────────────────────────────────────────────────────

function RecapScreen({onBack, nav}) {
  return (
    <div className="view">
      <StatusBar/>
      <TopBar title="Week 1 recap" onBack={onBack}/>
      <div className="scroll" style={{padding:'6px 20px 36px'}}>

        {/* Hero */}
        <div style={{background:BC,borderRadius:24,padding:'22px 22px 26px',
          marginBottom:12,color:'#fff',position:'relative',overflow:'hidden'}}>
          <div style={{font:'500 10px/1 var(--font)',color:'rgba(255,255,255,.5)',
            textTransform:'uppercase',letterSpacing:'.07em',marginBottom:10}}>Week 1 complete</div>
          <div style={{font:'800 60px/1 var(--font)',letterSpacing:'-.055em',marginBottom:4}}>5</div>
          <div style={{font:'600 18px/1 var(--font)',letterSpacing:'-.02em',marginBottom:12}}>
            workouts logged.
          </div>
          <div style={{font:'400 14px/1.5 var(--font)',color:'rgba(255,255,255,.72)'}}>
            You showed up when it counted. That's the whole thing.
          </div>
          <div style={{position:'absolute',right:-32,bottom:-32,width:150,height:150,
            borderRadius:99,background:'rgba(255,255,255,.07)'}}/>
          <div style={{position:'absolute',right:60,top:-20,width:80,height:80,
            borderRadius:99,background:'rgba(255,255,255,.05)'}}/>
        </div>

        {/* Stats */}
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <StatCard label="Consistency" value="71%" sub="5 of 7 days" color={BC}/>
          <StatCard label="Recovery" value="↑ up" sub="Trending better"/>
          <StatCard label="Avg Ready" value="78" sub="Strong week"/>
        </div>

        {/* Biggest improvement */}
        <div style={{background:'var(--surf)',borderRadius:20,padding:'16px 18px',marginBottom:12}}>
          <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
            letterSpacing:'.07em',marginBottom:10}}>Biggest improvement</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{font:'700 18px/1 var(--font)',letterSpacing:'-.02em',marginBottom:3}}>
                Bench Press
              </div>
              <div style={{font:'400 13px/1 var(--font)',color:'var(--fg2)'}}>145 → 165 lbs</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{font:'800 30px/1 var(--font)',letterSpacing:'-.045em',color:BC}}>+20</div>
              <div style={{font:'500 12px/1 var(--font)',color:'var(--fg3)'}}>lbs</div>
            </div>
          </div>
        </div>

        {/* Quote card */}
        <div style={{background:'#1A1A1A',borderRadius:20,padding:'18px 20px',marginBottom:20}}>
          <div style={{font:'600 15px/1.5 var(--font)',letterSpacing:'-.01em',color:'#fff',marginBottom:10}}>
            "Your body learns faster than you think. Keep showing it what you can do."
          </div>
          <div style={{font:'500 11px/1 var(--font)',color:'rgba(255,255,255,.3)'}}>
            BASE · Week 1 analysis
          </div>
        </div>

        {/* Share */}
        <BtnS onClick={()=>{}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
          Share this recap
        </BtnS>
      </div>
      <TabBar active="home" nav={nav}/>
    </div>
  );
}

// ─── ACTIVITY DETECTION ───────────────────────────────────────────────────────

function ActivityScreen({onBack}) {
  const [view, setView]  = React.useState('front');
  const [mode, setMode]  = React.useState('muscles');
  const [sore, setSore]  = React.useState([]);

  const runMus  = ['quads','hamstrings','calves','glutes'];
  const runJnt  = ['hip','knee','ankle'];
  const curAct  = mode === 'muscles' ? runMus : runJnt;
  const curList = mode === 'muscles' ? (view==='front' ? MUSCLE_F : MUSCLE_B) : JOINTS;

  const toggleSore = id => setSore(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  return (
    <div className="view">
      <StatusBar/>
      <TopBar title="Activity detected" onBack={onBack}/>
      <div className="scroll" style={{padding:'8px 20px 36px'}}>

        {/* Detection summary */}
        <div style={{background:'var(--surf)',borderRadius:20,padding:'18px 20px',marginBottom:20,
          border:'1px solid rgba(0,0,0,.05)'}}>
          <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:16}}>
            <div style={{width:50,height:50,borderRadius:14,background:BCS,flexShrink:0,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div>
              <div style={{font:'700 18px/1 var(--font)',letterSpacing:'-.02em',marginBottom:4}}>
                Outdoor run
              </div>
              <div style={{font:'400 13px/1 var(--font)',color:'var(--fg2)'}}>
                32 min · 3.2 km detected via watch
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            {[['Peak HR','168 bpm'],['Avg pace','6:12 /km'],['Calories','~280 kcal']].map(([l,v]) => (
              <div key={l} style={{flex:1,background:'#fff',borderRadius:10,padding:'10px 10px',
                border:'1px solid rgba(0,0,0,.06)'}}>
                <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',
                  textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{l}</div>
                <div style={{font:'700 13px/1 var(--font)',letterSpacing:'-.01em'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body feel check */}
        <div style={{font:'600 16px/1 var(--font)',letterSpacing:'-.015em',marginBottom:14}}>
          How does your body feel?
        </div>

        <div style={{display:'flex',gap:8,marginBottom:12}}>
          {['muscles','joints'].map(m => (
            <button key={m} onClick={()=>setMode(m)}
              style={{flex:1,height:34,borderRadius:99,cursor:'pointer',
                border:`1.5px solid ${mode===m?BC:'rgba(0,0,0,.1)'}`,
                background:mode===m?BC:'#fff',color:mode===m?'#fff':'var(--fg2)',
                font:'600 13px/1 var(--font)',textTransform:'capitalize'}}>
              {m}
            </button>
          ))}
        </div>

        <div style={{display:'flex',gap:8,marginBottom:14}}>
          {['front','back'].map(v => (
            <button key={v} onClick={()=>setView(v)}
              style={{flex:1,height:30,borderRadius:99,cursor:'pointer',
                border:`1.5px solid ${view===v?'rgba(0,0,0,.2)':'rgba(0,0,0,.07)'}`,
                background:view===v?'var(--surf2)':'#fff',color:'var(--fg2)',
                font:'500 12px/1 var(--font)',textTransform:'capitalize'}}>
              {v}
            </button>
          ))}
        </div>

        <BodyMap activated={curAct} sore={sore} onToggle={toggleSore} view={view} mode={mode}/>

        <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
          letterSpacing:'.06em',margin:'14px 0 10px'}}>Tap what's sore</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:24}}>
          {(curList||[]).map(item => (
            <Chip key={item.id} label={item.label}
              active={sore.includes(item.id)}
              onClick={()=>toggleSore(item.id)}/>
          ))}
        </div>

        <BtnP onClick={onBack}>Log it — looks right</BtnP>
        <div style={{height:8}}/>
        <BtnG onClick={onBack}>Skip this time</BtnG>
      </div>
    </div>
  );
}

// ─── WEIGHT RECOMMENDATION ────────────────────────────────────────────────────

function WeightsScreen({onBack}) {
  const init = [
    {name:'Bench Press',    rec:155, unit:'lbs', tag:'Progressing',  reason:'Up 5 lbs from last session. Form was strong.'},
    {name:'Overhead Press', rec:95,  unit:'lbs', tag:'Hold steady',  reason:'Recovery is moderate — stay here to lock in the pattern.'},
    {name:'Dips',           rec:0,   unit:'BW',  tag:'Stay light',   reason:'Body is still adapting. Bodyweight keeps the quality high.'},
  ];
  const [items, setItems] = React.useState(init.map(x=>({...x,accepted:false})));
  const accept = i => setItems(p => p.map((x,j)=>j===i?{...x,accepted:true}:x));
  const acceptAll = () => setItems(p => p.map(x=>({...x,accepted:true})));
  const allDone = items.every(x=>x.accepted);

  const tagStyle = {
    'Progressing': {bg:'#E6F7F1', color:BC},
    'Hold steady': {bg:'#FEF9EC', color:'#D97706'},
    'Stay light':  {bg:'#F5F5F2', color:'var(--fg3)'},
  };

  return (
    <div className="view">
      <StatusBar/>
      <TopBar title="Today's weights" onBack={onBack}/>
      <div className="scroll" style={{padding:'6px 20px 36px'}}>

        <div style={{font:'400 14px/1.5 var(--font)',color:'var(--fg2)',marginBottom:20}}>
          Based on your recovery, last session, and current goal.
        </div>

        {items.map((ex,i) => {
          const ts = tagStyle[ex.tag] || tagStyle['Stay light'];
          return (
            <div key={ex.name}
              style={{background:ex.accepted?BCS:'#fff',borderRadius:20,padding:'16px 18px',
                marginBottom:10,border:`1.5px solid ${ex.accepted?BC:'rgba(0,0,0,.07)'}`,
                transition:'all 220ms var(--ease)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div>
                  <div style={{font:'600 16px/1 var(--font)',letterSpacing:'-.015em',marginBottom:7}}>
                    {ex.name}
                  </div>
                  <div style={{display:'inline-flex',background:ts.bg,borderRadius:99,padding:'4px 10px'}}>
                    <span style={{font:'600 11px/1 var(--font)',color:ts.color,letterSpacing:'.02em'}}>
                      {ex.tag}
                    </span>
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{font:'800 30px/1 var(--font)',letterSpacing:'-.045em',
                    color:ex.accepted?BC:'var(--fg)'}}>
                    {ex.rec > 0 ? ex.rec : 'BW'}
                  </div>
                  <div style={{font:'500 12px/1 var(--font)',color:'var(--fg3)',marginTop:2}}>{ex.unit}</div>
                </div>
              </div>

              <div style={{font:'400 13px/1.45 var(--font)',color:'var(--fg2)',marginBottom:12}}>
                {ex.reason}
              </div>

              {!ex.accepted ? (
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>accept(i)}
                    style={{flex:1,height:38,borderRadius:10,background:BC,color:'#fff',
                      border:0,font:'600 13px/1 var(--font)',cursor:'pointer'}}>
                    Accept
                  </button>
                  <button style={{flex:1,height:38,borderRadius:10,background:'var(--surf)',
                    color:'var(--fg2)',border:0,font:'600 13px/1 var(--font)',cursor:'pointer'}}>
                    Adjust
                  </button>
                </div>
              ) : (
                <div style={{display:'flex',alignItems:'center',gap:7}}>
                  <div style={{width:20,height:20,borderRadius:99,background:BC,
                    display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg width="10" height="10" viewBox="0 0 24 20" fill="none"
                      stroke="white" strokeWidth="3" strokeLinecap="round">
                      <path d="M2 10l7 8L22 2"/>
                    </svg>
                  </div>
                  <span style={{font:'500 13px/1 var(--font)',color:BC}}>Accepted</span>
                </div>
              )}
            </div>
          );
        })}

        <div style={{marginTop:8}}>
          <BtnP onClick={acceptAll} disabled={allDone}>
            {allDone ? 'All set — start your workout' : 'Accept all recommendations'}
          </BtnP>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {HomeScreen, StatsScreen, RecapScreen, ActivityScreen, WeightsScreen});
