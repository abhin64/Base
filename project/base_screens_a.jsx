// BASE — Onboarding (multi-step) + Prescribed Workout Screen

// ─── DATA ────────────────────────────────────────────────────────────────────

const EXP_OPTIONS = [
  {id:'beginner',     label:'Just starting out',    sub:'Little or no gym experience'},
  {id:'novice',       label:'A little experience',  sub:"Been a few times, but not consistent"},
  {id:'intermediate', label:'Some experience',      sub:'Trained on and off for a while'},
  {id:'advanced',     label:'Pretty experienced',   sub:'2+ years of consistent training'},
];

const GOAL_OPTIONS = [
  {id:'muscle',  label:'Build muscle',    sub:'Get stronger and add size'},
  {id:'lean',    label:'Get lean',        sub:'Lose weight while keeping muscle'},
  {id:'fitness', label:'Overall fitness', sub:'Feel good and move well'},
  {id:'habit',   label:'Build a habit',   sub:'Just start moving consistently'},
];

const DAY1_WORKOUTS = {
  beginner: {
    name:'Foundation Push', focus:'Chest · Shoulders · Arms',
    exercises:[
      {id:'pushup',  name:'Push-up',           sets:3, reps:'8–10', wt:0,  unit:'BW',  muscles:['chest','shoulders','arms'],
       tip:'Lower slow. Push through the whole palm. It\'s ok to go to your knees.'},
      {id:'goblet',  name:'Goblet Squat',       sets:3, reps:'10',   wt:15, unit:'lbs', muscles:['quads','glutes','core'],
       tip:'Hold a light dumbbell at chest height. Squat deep, keep chest up.'},
      {id:'dbpress', name:'DB Shoulder Press',  sets:3, reps:'10',   wt:10, unit:'lbs', muscles:['shoulders','arms'],
       tip:'Sit with back supported. Push straight overhead, don\'t flare elbows too wide.'},
    ]
  },
  novice: {
    name:'Upper Push', focus:'Chest · Shoulders · Triceps',
    exercises:[
      {id:'bench',   name:'Bench Press',         sets:3, reps:'10',  wt:65,  unit:'lbs', muscles:['chest','shoulders','arms'],
       tip:'Control the bar down to your chest. Drive it back up smoothly.'},
      {id:'ohpress', name:'Overhead Press',       sets:3, reps:'10',  wt:45,  unit:'lbs', muscles:['shoulders','arms'],
       tip:'Brace your core. Press bar directly overhead, not in front.'},
      {id:'dips',    name:'Assisted Dips',        sets:3, reps:'8',   wt:0,   unit:'BW',  muscles:['chest','arms'],
       tip:'Use an assist machine or bands. Lean slightly forward for more chest.'},
    ]
  },
  intermediate: {
    name:'Push A', focus:'Chest · Shoulders · Triceps',
    exercises:[
      {id:'bench',   name:'Bench Press',          sets:4, reps:'8',   wt:115, unit:'lbs', muscles:['chest','shoulders','arms'],
       tip:'Full range of motion. Control the eccentric — don\'t bounce it off your chest.'},
      {id:'incline', name:'Incline DB Press',      sets:3, reps:'10',  wt:40,  unit:'lbs', muscles:['chest','shoulders'],
       tip:'45° incline. Full stretch at the bottom, squeeze at the top.'},
      {id:'ohpress', name:'Overhead Press',        sets:3, reps:'8',   wt:75,  unit:'lbs', muscles:['shoulders','arms'],
       tip:'Tight core, slight forward lean. Flare elbows slightly on the press.'},
    ]
  },
  advanced: {
    name:'Hypertrophy Push', focus:'Chest · Shoulders · Triceps',
    exercises:[
      {id:'bench',   name:'Bench Press',           sets:4, reps:'6–8', wt:155, unit:'lbs', muscles:['chest','shoulders','arms'],
       tip:'RPE 8. Leave 1–2 reps in the tank on your working sets.'},
      {id:'incline', name:'Incline DB Press',       sets:3, reps:'10',  wt:60,  unit:'lbs', muscles:['chest','shoulders'],
       tip:'Pause 1s at the bottom. Maximize chest stretch each rep.'},
      {id:'lateral', name:'Cable Lateral Raise',    sets:3, reps:'15',  wt:10,  unit:'lbs', muscles:['shoulders'],
       tip:'Keep elbow slightly bent. Control the eccentric — 2 seconds down.'},
    ]
  },
};

// ─── ONBOARDING — STEP 0: Intro ──────────────────────────────────────────────

function IntroStep({onNext}) {
  return (
    <div className="view">
      <StatusBar/>
      <div className="scroll" style={{padding:'0 28px 56px'}}>
        <div style={{paddingTop:24,paddingBottom:44}}>
          <span style={{font:'800 26px/1 var(--font)',letterSpacing:'-.055em',color:BC}}>BASE</span>
        </div>
        <div className="su" style={{animationDelay:'40ms',marginBottom:30}}>
          <div style={{font:'800 42px/1.04 var(--font)',letterSpacing:'-.044em',marginBottom:14}}>
            Base Camp.
          </div>
          <div style={{font:'400 16px/1.6 var(--font)',color:'var(--fg2)'}}>
            Before we build your training plan, we need 2 weeks to learn how your body works. BASE takes care of the programming — you just show up and lift.
          </div>
        </div>
        <div className="su" style={{animationDelay:'110ms',background:'var(--surf)',
          borderRadius:20,padding:'18px 18px 22px',marginBottom:32}}>
          <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
            letterSpacing:'.07em',marginBottom:14}}>How it works</div>
          {[
            ['Tell us your level','We ask 2 quick questions about your experience and goals.'],
            ['BASE builds your plan','We generate a 14-day calibration workout program for you.'],
            ['You train, we learn','Log your weights and how your body feels. That\'s it.'],
            ['Your real plan drops','After 14 days, your permanent program is built around you.'],
          ].map(([t,d],i) => (
            <div key={i} className="su" style={{animationDelay:`${160+i*50}ms`,
              display:'flex',gap:14,marginBottom:i<3?18:0,alignItems:'flex-start'}}>
              <div style={{width:28,height:28,borderRadius:99,background:BCS,flexShrink:0,
                display:'flex',alignItems:'center',justifyContent:'center',marginTop:2}}>
                <span style={{font:'700 12px/1 var(--font)',color:BC}}>{i+1}</span>
              </div>
              <div>
                <div style={{font:'600 14px/1 var(--font)',letterSpacing:'-.01em',marginBottom:3}}>{t}</div>
                <div style={{font:'400 13px/1.45 var(--font)',color:'var(--fg2)'}}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'14px 28px 40px',flexShrink:0,background:'#fff',
        boxShadow:'0 -1px 0 rgba(0,0,0,.06)'}}>
        <BtnP onClick={onNext}>
          Let's do this
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </BtnP>
        <div style={{textAlign:'center',font:'400 12px/1 var(--font)',color:'var(--fg3)',marginTop:10}}>
          Takes 2 minutes to set up
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING — STEP 1: Experience ─────────────────────────────────────────

function StepDots({total, current}) {
  return (
    <div style={{display:'flex',gap:6,justifyContent:'center',padding:'12px 0 6px'}}>
      {Array.from({length:total},(_,i)=>(
        <div key={i} style={{width:i===current?20:6,height:6,borderRadius:99,
          background:i===current?BC:'var(--surf2)',transition:'all 250ms var(--ease)'}}/>
      ))}
    </div>
  );
}

function SelectCard({label, sub, selected, onClick}) {
  return (
    <button onClick={onClick}
      style={{width:'100%',padding:'14px 16px',borderRadius:16,textAlign:'left',cursor:'pointer',
        border:`1.5px solid ${selected?BC:'rgba(0,0,0,.08)'}`,
        background:selected?BCS:'#fff',
        display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,
        transition:'all 160ms var(--ease)',marginBottom:10}}>
      <div>
        <div style={{font:'600 15px/1 var(--font)',letterSpacing:'-.01em',color:'var(--fg)',marginBottom:3}}>{label}</div>
        <div style={{font:'400 13px/1 var(--font)',color:'var(--fg2)'}}>{sub}</div>
      </div>
      <div style={{width:20,height:20,borderRadius:99,flexShrink:0,
        border:`2px solid ${selected?BC:'rgba(0,0,0,.15)'}`,
        background:selected?BC:'transparent',
        display:'flex',alignItems:'center',justifyContent:'center',transition:'all 160ms'}}>
        {selected && <svg width="10" height="10" viewBox="0 0 24 20" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><path d="M2 10l7 8L22 2"/></svg>}
      </div>
    </button>
  );
}

function ExpStep({value, onChange, onNext}) {
  return (
    <div className="view">
      <StatusBar/>
      <TopBar/>
      <StepDots total={2} current={0}/>
      <div className="scroll" style={{padding:'8px 24px 56px'}}>
        <div style={{marginBottom:28}}>
          <div style={{font:'800 28px/1.1 var(--font)',letterSpacing:'-.035em',marginBottom:10}}>
            How much time have you spent in the gym?
          </div>
          <div style={{font:'400 15px/1.5 var(--font)',color:'var(--fg2)'}}>
            No wrong answer. BASE starts exactly where you are.
          </div>
        </div>
        {EXP_OPTIONS.map(opt => (
          <SelectCard key={opt.id} label={opt.label} sub={opt.sub}
            selected={value===opt.id} onClick={()=>onChange(opt.id)}/>
        ))}
      </div>
      <div style={{padding:'12px 24px 36px',flexShrink:0,background:'#fff',
        boxShadow:'0 -1px 0 rgba(0,0,0,.06)'}}>
        <BtnP onClick={onNext} disabled={!value}>Continue</BtnP>
      </div>
    </div>
  );
}

// ─── ONBOARDING — STEP 2: Goal ───────────────────────────────────────────────

function GoalStep({value, onChange, onNext}) {
  return (
    <div className="view">
      <StatusBar/>
      <TopBar/>
      <StepDots total={2} current={1}/>
      <div className="scroll" style={{padding:'8px 24px 56px'}}>
        <div style={{marginBottom:28}}>
          <div style={{font:'800 28px/1.1 var(--font)',letterSpacing:'-.035em',marginBottom:10}}>
            What's your main goal right now?
          </div>
          <div style={{font:'400 15px/1.5 var(--font)',color:'var(--fg2)'}}>
            This shapes how BASE programs your 14-day plan.
          </div>
        </div>
        {GOAL_OPTIONS.map(opt => (
          <SelectCard key={opt.id} label={opt.label} sub={opt.sub}
            selected={value===opt.id} onClick={()=>onChange(opt.id)}/>
        ))}
      </div>
      <div style={{padding:'12px 24px 36px',flexShrink:0,background:'#fff',
        boxShadow:'0 -1px 0 rgba(0,0,0,.06)'}}>
        <BtnP onClick={onNext} disabled={!value}>Build my plan</BtnP>
      </div>
    </div>
  );
}

// ─── ONBOARDING — STEP 3: Generating ─────────────────────────────────────────

function GeneratingStep({progress}) {
  const msgs = ['Analysing your experience level…','Selecting the right exercises…','Calibrating starting weights…','Setting your 14-day schedule…','Almost there…'];
  const idx = Math.min(Math.floor(progress / 22), msgs.length-1);
  return (
    <div className="view" style={{alignItems:'center',justifyContent:'center',padding:'40px 32px',gap:0}}>
      <div style={{marginBottom:32,textAlign:'center'}}>
        <div style={{font:'800 26px/1 var(--font)',letterSpacing:'-.05em',color:BC,marginBottom:4}}>BASE</div>
      </div>
      <Ring value={Math.round(progress)} size={110} stroke={8}>
        <span style={{font:'800 26px/1 var(--font)',letterSpacing:'-.04em',color:'var(--fg)'}}>
          {Math.round(progress)}%
        </span>
      </Ring>
      <div style={{marginTop:28,font:'700 20px/1.2 var(--font)',letterSpacing:'-.025em',
        textAlign:'center',marginBottom:12}}>
        Building your plan.
      </div>
      <div className="fi" key={idx} style={{font:'400 14px/1 var(--font)',color:'var(--fg3)',
        textAlign:'center',minHeight:20}}>
        {msgs[idx]}
      </div>
    </div>
  );
}

// ─── ONBOARDING — STEP 4: Plan reveal ────────────────────────────────────────

function PlanRevealStep({experience, goal, onStart}) {
  const exp = EXP_OPTIONS.find(e=>e.id===experience) || EXP_OPTIONS[0];
  const g   = GOAL_OPTIONS.find(g=>g.id===goal)       || GOAL_OPTIONS[0];
  const workout = DAY1_WORKOUTS[experience] || DAY1_WORKOUTS.beginner;
  const week1 = ['Foundation Push','Foundation Pull','Active Recovery','Foundation Lower','Rest','Full Body','Rest'];

  return (
    <div className="view">
      <StatusBar/>
      <div className="scroll" style={{padding:'0 24px 56px'}}>
        <div style={{paddingTop:28,marginBottom:28}}>
          <div style={{font:'500 13px/1 var(--font)',color:BC,letterSpacing:'-.01em',marginBottom:8}}>
            Your plan is ready.
          </div>
          <div style={{font:'800 32px/1.05 var(--font)',letterSpacing:'-.04em',marginBottom:14}}>
            Base Camp: 14 days.
          </div>
          <div style={{font:'400 15px/1.5 var(--font)',color:'var(--fg2)'}}>
            Calibrated for your level. Each workout teaches BASE how your body responds.
          </div>
        </div>

        {/* Profile summary */}
        <div style={{background:'var(--surf)',borderRadius:18,padding:'14px 16px',marginBottom:20,
          display:'flex',gap:10}}>
          <div style={{flex:1,borderRight:'1px solid rgba(0,0,0,.07)',paddingRight:12}}>
            <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
              letterSpacing:'.06em',marginBottom:5}}>Level</div>
            <div style={{font:'600 14px/1 var(--font)'}}>{exp.label}</div>
          </div>
          <div style={{flex:1,paddingLeft:4}}>
            <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
              letterSpacing:'.06em',marginBottom:5}}>Goal</div>
            <div style={{font:'600 14px/1 var(--font)'}}>{g.label}</div>
          </div>
        </div>

        {/* Week 1 preview */}
        <div style={{background:'#fff',borderRadius:18,padding:'16px 18px',
          border:'1px solid rgba(0,0,0,.06)',marginBottom:16}}>
          <div style={{font:'600 14px/1 var(--font)',letterSpacing:'-.01em',marginBottom:14}}>Week 1 schedule</div>
          {week1.map((w,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,
              padding:'9px 0',borderBottom:i<6?'1px solid rgba(0,0,0,.05)':0}}>
              <div style={{width:24,height:24,borderRadius:99,flexShrink:0,
                background:i===0?BC:'var(--surf2)',
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{font:`${i===0?700:500} 11px/1 var(--font)`,
                  color:i===0?'#fff':'var(--fg3)'}}>
                  {i+1}
                </span>
              </div>
              <div style={{flex:1,font:i===0?'600 14px/1 var(--font)':'400 14px/1 var(--font)',
                letterSpacing:'-.01em',color:i===0?'var(--fg)':'var(--fg2)'}}>
                {i===0?workout.name:w}
              </div>
              {i===0 && (
                <div style={{background:BCS,borderRadius:99,padding:'3px 9px',
                  font:'500 11px/1 var(--font)',color:BC}}>Today</div>
              )}
            </div>
          ))}
        </div>

        {/* Day 1 preview card */}
        <div style={{background:BC,borderRadius:20,padding:'18px 20px',marginBottom:4,
          color:'#fff',position:'relative',overflow:'hidden'}}>
          <div style={{font:'500 10px/1 var(--font)',color:'rgba(255,255,255,.55)',
            textTransform:'uppercase',letterSpacing:'.07em',marginBottom:8}}>Day 1 · Right now</div>
          <div style={{font:'700 20px/1 var(--font)',letterSpacing:'-.025em',marginBottom:4}}>
            {workout.name}
          </div>
          <div style={{font:'400 13px/1 var(--font)',color:'rgba(255,255,255,.65)'}}>
            {workout.focus} · {workout.exercises.length} exercises
          </div>
          <div style={{position:'absolute',right:-20,bottom:-20,width:100,height:100,
            borderRadius:99,background:'rgba(255,255,255,.07)'}}/>
        </div>
      </div>

      <div style={{padding:'12px 24px 36px',flexShrink:0,background:'#fff',
        boxShadow:'0 -1px 0 rgba(0,0,0,.06)'}}>
        <BtnP onClick={onStart}>
          Start Day 1
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </BtnP>
      </div>
    </div>
  );
}

// ─── ONBOARDING — MAIN ORCHESTRATOR ──────────────────────────────────────────

function OnboardingScreen({onStart}) {
  const [step, setStep]     = React.useState(0);
  const [exp,  setExp]      = React.useState(null);
  const [goal, setGoal]     = React.useState(null);
  const [prog, setProg]     = React.useState(0);

  const runGeneration = () => {
    setStep(3);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        clearInterval(iv);
        setProg(100);
        setTimeout(() => setStep(4), 500);
      } else {
        setProg(p);
      }
    }, 100);
  };

  if (step === 0) return <IntroStep onNext={()=>setStep(1)}/>;
  if (step === 1) return <ExpStep value={exp} onChange={setExp} onNext={()=>setStep(2)}/>;
  if (step === 2) return <GoalStep value={goal} onChange={setGoal} onNext={runGeneration}/>;
  if (step === 3) return <GeneratingStep progress={prog}/>;
  if (step === 4) return <PlanRevealStep experience={exp} goal={goal} onStart={()=>onStart(exp)}/>;
  return null;
}

// ─── WORKOUT SCREEN (prescribed) ─────────────────────────────────────────────

function Stepper({val, onChange, min=0, sfx}) {
  const step = sfx === 'lbs' ? 5 : 1;
  return (
    <div style={{display:'flex',alignItems:'center'}}>
      <button onClick={()=>onChange(Math.max(min, val-step))}
        style={{width:34,height:34,borderRadius:'9px 0 0 9px',border:'1.5px solid rgba(0,0,0,.09)',
          background:'var(--surf)',font:'600 18px/1 var(--font)',cursor:'pointer',
          color:'var(--fg2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        −
      </button>
      <div style={{minWidth:52,height:34,background:'var(--surf)',
        borderTop:'1.5px solid rgba(0,0,0,.09)',borderBottom:'1.5px solid rgba(0,0,0,.09)',
        display:'flex',alignItems:'center',justifyContent:'center',gap:3}}>
        <span style={{font:'600 14px/1 var(--font)',letterSpacing:'-.01em'}}>{val>0?val:'BW'}</span>
        {sfx && val>0 && <span style={{font:'400 11px/1 var(--font)',color:'var(--fg3)'}}>{sfx}</span>}
      </div>
      <button onClick={()=>onChange(val+step)}
        style={{width:34,height:34,borderRadius:'0 9px 9px 0',border:'1.5px solid rgba(0,0,0,.09)',
          background:'var(--surf)',font:'600 18px/1 var(--font)',cursor:'pointer',
          color:BC,display:'flex',alignItems:'center',justifyContent:'center'}}>
        +
      </button>
    </div>
  );
}

function WorkoutScreen({day=1, experience='beginner', onDone}) {
  const workout = DAY1_WORKOUTS[experience] || DAY1_WORKOUTS.beginner;

  const [weights,   setWeights]   = React.useState(
    Object.fromEntries(workout.exercises.map(e=>[e.id, e.wt]))
  );
  const [setsDone,  setSetsDone]  = React.useState(
    Object.fromEntries(workout.exercises.map(e=>[e.id, 0]))
  );
  const [checkin,   setCheckin]   = React.useState(false);
  const [view,      setView]      = React.useState('front');
  const [mode,      setMode]      = React.useState('muscles');
  const [sore,      setSore]      = React.useState([]);

  const logSet = id => setSetsDone(p => ({...p, [id]: Math.min(p[id]+1,
    workout.exercises.find(e=>e.id===id)?.sets || 3)}));

  const exDone  = id => setsDone[id] >= (workout.exercises.find(e=>e.id===id)?.sets||3);
  const allDone = workout.exercises.every(e=>exDone(e.id));

  const allMuscles = [...new Set(workout.exercises.flatMap(e=>e.muscles||[]))];
  const curAct  = mode === 'muscles' ? allMuscles : [];
  const curList = mode === 'muscles' ? (view==='front'?MUSCLE_F:MUSCLE_B) : JOINTS;
  const toggleSore = id => setSore(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  return (
    <div className="view">
      <StatusBar/>
      <TopBar title={`Day ${day} of 14`}
        right={<span style={{font:'500 12px/1 var(--font)',color:'var(--fg3)',marginRight:4}}>Base Camp</span>}/>

      {/* Progress */}
      <div style={{padding:'0 20px 14px',flexShrink:0}}>
        <div style={{height:4,background:'var(--surf2)',borderRadius:99}}>
          <div style={{height:'100%',width:`${(day/14)*100}%`,background:BC,borderRadius:99}}/>
        </div>
      </div>

      <div className="scroll" style={{padding:'4px 20px 28px'}}>

        {/* Workout header */}
        <div style={{marginBottom:20}}>
          <div style={{font:'500 12px/1 var(--font)',color:BC,letterSpacing:'-.005em',marginBottom:6}}>
            Today's workout
          </div>
          <div style={{font:'700 22px/1.05 var(--font)',letterSpacing:'-.03em',marginBottom:4}}>
            {workout.name}
          </div>
          <div style={{font:'400 14px/1 var(--font)',color:'var(--fg2)'}}>{workout.focus}</div>
        </div>

        {/* Exercise cards */}
        {workout.exercises.map((ex, i) => {
          const done = exDone(ex.id);
          const sets = ex.sets;
          const completed = setsDone[ex.id];
          const wt = weights[ex.id];

          return (
            <div key={ex.id} style={{background:done?BCS:'#fff',borderRadius:20,
              padding:'16px 18px',marginBottom:12,
              border:`1.5px solid ${done?BC:'rgba(0,0,0,.07)'}`,
              transition:'all 220ms var(--ease)'}}>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div>
                  <div style={{font:'600 16px/1 var(--font)',letterSpacing:'-.015em',marginBottom:4}}>
                    {ex.name}
                  </div>
                  <div style={{font:'400 12px/1 var(--font)',color:'var(--fg3)'}}>
                    {sets} sets × {ex.reps} reps
                  </div>
                </div>
                {done && (
                  <div style={{width:28,height:28,borderRadius:99,background:BC,
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="12" height="12" viewBox="0 0 24 20" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><path d="M2 10l7 8L22 2"/></svg>
                  </div>
                )}
              </div>

              {/* Tip */}
              <div style={{background:done?'rgba(29,158,117,.08)':'var(--surf)',borderRadius:10,
                padding:'9px 11px',marginBottom:12,
                font:'400 12px/1.45 var(--font)',color:done?BCH:'var(--fg2)'}}>
                {ex.tip}
              </div>

              {/* Weight + sets */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                <div>
                  <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',
                    textTransform:'uppercase',letterSpacing:'.05em',marginBottom:7}}>Your weight</div>
                  {ex.unit === 'BW'
                    ? <span style={{font:'600 15px/1 var(--font)',color:'var(--fg2)'}}>Bodyweight</span>
                    : <Stepper val={wt} onChange={v=>setWeights(p=>({...p,[ex.id]:v}))} min={0} sfx="lbs"/>
                  }
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',
                    textTransform:'uppercase',letterSpacing:'.05em',marginBottom:7}}>Sets done</div>
                  <div style={{display:'flex',gap:5,alignItems:'center',justifyContent:'flex-end'}}>
                    {Array.from({length:sets},(_,j)=>(
                      <div key={j} style={{width:22,height:22,borderRadius:99,
                        background:j<completed?BC:'var(--surf2)',
                        border:`1.5px solid ${j<completed?BC:'rgba(0,0,0,.1)'}`,
                        transition:'all 150ms'}}/>
                    ))}
                  </div>
                </div>
              </div>

              {!done && (
                <button onClick={()=>logSet(ex.id)}
                  style={{marginTop:14,width:'100%',height:40,borderRadius:11,
                    background:BC,color:'#fff',border:0,
                    font:'600 14px/1 var(--font)',cursor:'pointer'}}>
                  Log set {completed+1} of {sets}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{padding:'12px 20px 30px',flexShrink:0,background:'#fff',
        boxShadow:'0 -1px 0 rgba(0,0,0,.06)'}}>
        <BtnP onClick={()=>allDone&&setCheckin(true)} disabled={!allDone}>
          {allDone ? 'Done — body check-in →' : `Complete all exercises first`}
        </BtnP>
      </div>

      {/* Body check-in sheet */}
      <Sheet open={checkin} onClose={()=>setCheckin(false)} title="How's your body feeling?">
        <div style={{padding:'16px 20px 0'}}>
          <div style={{display:'flex',gap:8,marginBottom:13}}>
            {['muscles','joints'].map(m=>(
              <button key={m} onClick={()=>setMode(m)}
                style={{flex:1,height:34,borderRadius:99,cursor:'pointer',
                  border:`1.5px solid ${mode===m?BC:'rgba(0,0,0,.1)'}`,
                  background:mode===m?BC:'#fff',color:mode===m?'#fff':'var(--fg2)',
                  font:'600 13px/1 var(--font)',textTransform:'capitalize'}}>{m}</button>
            ))}
          </div>
          <div style={{display:'flex',gap:8,marginBottom:14}}>
            {['front','back'].map(v=>(
              <button key={v} onClick={()=>setView(v)}
                style={{flex:1,height:30,borderRadius:99,cursor:'pointer',
                  border:`1.5px solid ${view===v?'rgba(0,0,0,.2)':'rgba(0,0,0,.07)'}`,
                  background:view===v?'var(--surf2)':'#fff',color:'var(--fg2)',
                  font:'500 12px/1 var(--font)',textTransform:'capitalize'}}>{v}</button>
            ))}
          </div>
          <BodyMap activated={curAct} sore={sore} onToggle={toggleSore} view={view} mode={mode}/>
          <div style={{font:'500 10px/1 var(--font)',color:'var(--fg3)',textTransform:'uppercase',
            letterSpacing:'.06em',margin:'12px 0 9px'}}>Tap what's sore (or skip)</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:20}}>
            {(curList||[]).map(item=>(
              <Chip key={item.id} label={item.label} active={sore.includes(item.id)}
                onClick={()=>toggleSore(item.id)}/>
            ))}
          </div>
          <BtnP onClick={()=>{setCheckin(false); onDone&&onDone({sore});}}>All done</BtnP>
          <div style={{height:8}}/>
        </div>
      </Sheet>
    </div>
  );
}

Object.assign(window, {
  OnboardingScreen, WorkoutScreen,
  DAY1_WORKOUTS, EXP_OPTIONS, GOAL_OPTIONS,
});
