// karigai — mobile screens
// All screens render INSIDE an IOSDevice frame at 390×844.
// Width-internal = 390. Use safe-area top padding ~50px (status bar) and bottom ~92 for tab bar.

const SCR_W = 390, SCR_H = 844;

// Reusable shells ────────────────────────────────────────────
function ScreenBase({ children, bg = KG.paper, dark }) {
  return (
    <div style={{
      width: SCR_W, minHeight: SCR_H, background: dark ? KG.inkDeep : bg,
      paddingTop: 54, position: 'relative', color: dark ? KG.cream : KG.ink,
      fontFamily: KGFont.body,
    }}>
      {children}
    </div>
  );
}

function TabBar({ active = 'home', dark }) {
  const items = [
    { id: 'home',   icon: 'home',     label: 'Today' },
    { id: 'cycle',  icon: 'cycle',    label: 'Cycle' },
    { id: 'meal',   icon: 'meal',     label: 'Meals' },
    { id: 'move',   icon: 'dumbbell', label: 'Move' },
    { id: 'me',     icon: 'user',     label: 'Me' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 84, paddingBottom: 22,
      background: dark ? 'rgba(15,14,12,0.85)' : 'rgba(250,246,239,0.85)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `1px solid ${dark ? KG.inkLine : KG.hairline}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {items.map(it => {
        const on = it.id === active;
        const c = on ? (dark ? KG.cream : KG.ink) : (dark ? '#7A7066' : KG.muted);
        return (
          <div key={it.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Icon d={Icons[it.icon]} color={c} size={22} sw={on ? 1.8 : 1.5}/>
            <span style={{ fontFamily: KGFont.body, fontSize: 9.5, color: c, fontWeight: on ? 600 : 400, letterSpacing: '0.02em' }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ScreenHeader({ title, eyebrow, action, sub, dark }) {
  return (
    <div style={{ padding: '8px 22px 14px' }}>
      {eyebrow && <KEyebrow>{eyebrow}</KEyebrow>}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
        <div style={{ fontFamily: KGFont.display, fontSize: 32, fontStyle: 'italic', letterSpacing: '-0.02em', color: dark ? KG.cream : KG.ink, lineHeight: 1 }}>{title}</div>
        {action}
      </div>
      {sub && <div style={{ fontFamily: KGFont.body, fontSize: 12.5, color: dark ? '#A99F92' : KG.muted, marginTop: 8, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

// 01 · Welcome ───────────────────────────────────────────────
function S_Welcome() {
  return (
    <div style={{ width: SCR_W, height: SCR_H, background: KG.cream, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Editorial top half */}
      <div style={{ flex: 1, padding: '90px 30px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <KarigaiLogo size={20} tagline />
        <div>
          <KEyebrow>est. 2026 · wellness, not medicine</KEyebrow>
          <div style={{ fontFamily: KGFont.display, fontSize: 64, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-0.02em', color: KG.ink, marginTop: 14 }}>
            A quiet<br/>plan, made<br/>from <span style={{ color: KG.clay }}>you.</span>
          </div>
          <div style={{ fontFamily: KGFont.body, fontSize: 14, color: KG.ink2, marginTop: 18, maxWidth: 300, lineHeight: 1.5 }}>
            Cycle, fitness, nutrition and habits — gently personalized, never diagnostic.
          </div>
        </div>
      </div>
      {/* Lower */}
      <div style={{ padding: '20px 22px 50px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ height: 52, borderRadius: 16, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 15, fontWeight: 500 }}>Begin</button>
        <button style={{ height: 52, borderRadius: 16, background: 'transparent', color: KG.ink, border: 'none', fontFamily: KGFont.body, fontSize: 14 }}>I already have an account</button>
        <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center', marginTop: 6 }}>private by default · data stays yours</div>
      </div>
    </div>
  );
}

// 02 · Onboarding (health context) ───────────────────────────
function S_Onboarding() {
  const Step = ({ n, label, on, done }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 22, height: 22, borderRadius: 99, background: on ? KG.ink : (done ? KG.sage : 'transparent'), border: `1px solid ${on || done ? 'transparent' : KG.hairline}`, color: on || done ? KG.cream : KG.muted, fontFamily: KGFont.mono, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done ? '✓' : n}</div>
      <span style={{ fontFamily: KGFont.body, fontSize: 11, color: on ? KG.ink : KG.muted, fontWeight: on ? 600 : 400 }}>{label}</span>
    </div>
  );
  const Toggle = ({ label, on, tone = 'neutral' }) => (
    <div style={{
      padding: '12px 14px', borderRadius: 12,
      background: on ? (tone === 'clay' ? '#F4DCCD' : KG.ink) : KG.card,
      color: on ? (tone === 'clay' ? '#6E3D24' : KG.cream) : KG.ink2,
      border: `1px solid ${on ? 'transparent' : KG.hairline}`,
      fontFamily: KGFont.body, fontSize: 12.5, fontWeight: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span>{label}</span>
      {on && <Icon d={Icons.check} size={14} color={tone === 'clay' ? '#6E3D24' : KG.cream}/>}
    </div>
  );

  return (
    <ScreenBase>
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <Icon d={Icons.back} size={22}/>
          <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.18em' }}>04 / 09</div>
          <span style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.muted }}>Skip</span>
        </div>
        {/* progress */}
        <div style={{ height: 3, background: KG.hairline, borderRadius: 99, overflow: 'hidden', marginBottom: 22 }}>
          <div style={{ width: '44%', height: '100%', background: KG.clay }}/>
        </div>
      </div>
      <div style={{ padding: '0 22px' }}>
        <KEyebrow>health context</KEyebrow>
        <div style={{ fontFamily: KGFont.display, fontSize: 30, fontStyle: 'italic', lineHeight: 1.05, color: KG.ink, marginTop: 8, letterSpacing: '-0.01em' }}>
          Anything we should know,<br/>so we plan more gently?
        </div>
        <div style={{ fontFamily: KGFont.body, fontSize: 12.5, color: KG.muted, marginTop: 10, lineHeight: 1.45 }}>
          Self-reported only. We use this to adjust workouts and meals — never to diagnose.
        </div>

        <div style={{ marginTop: 22 }}>
          <KEyebrow>self-reported conditions</KEyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
            <Toggle label="PCOS" on tone="clay"/>
            <Toggle label="Thyroid" />
            <Toggle label="Iron deficiency" on tone="clay"/>
            <Toggle label="Prediabetes" />
            <Toggle label="Endometriosis" />
            <Toggle label="None of these" />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <KEyebrow>life stage</KEyebrow>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {['Cycling', 'Trying', 'Pregnant', 'Postpartum', 'Breastfeeding', 'Perimenopause'].map(t => (
              <span key={t} style={{ padding: '8px 14px', borderRadius: 99, border: `1px solid ${t === 'Cycling' ? KG.ink : KG.hairline}`, background: t === 'Cycling' ? KG.ink : 'transparent', color: t === 'Cycling' ? KG.cream : KG.ink2, fontFamily: KGFont.body, fontSize: 12, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        <KSafetyBanner tone="info" title="Wellness, not diagnosis" body="We provide fitness, nutrition and lifestyle support based on what you tell us. Please consult a clinician for diagnosis or treatment." style={{ marginTop: 22 }}/>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: 22, right: 22 }}>
        <button style={{ width: '100%', height: 52, borderRadius: 16, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Continue <Icon d={Icons.arrow} size={16} color={KG.cream}/></button>
      </div>
    </ScreenBase>
  );
}

// 03 · Starting Analysis ─────────────────────────────────────
function S_Analysis() {
  const Metric = ({ label, value, unit, tone = 'neutral', note }) => (
    <div style={{ padding: '14px 16px', borderBottom: `1px solid ${KG.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink2 }}>{label}</div>
        {note && <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{note}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: KGFont.display, fontSize: 24, fontWeight: 400, color: KG.ink }}>{value}</span>
        <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.08em' }}>{unit}</span>
      </div>
    </div>
  );
  return (
    <ScreenBase bg={KG.cream}>
      <div style={{ padding: '8px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon d={Icons.back} size={22}/>
        <KarigaiMark size={22}/>
        <div style={{ width: 22 }}/>
      </div>
      <div style={{ padding: '20px 22px 12px' }}>
        <KEyebrow>your starting point</KEyebrow>
        <div style={{ fontFamily: KGFont.display, fontSize: 36, fontStyle: 'italic', lineHeight: 1, color: KG.ink, marginTop: 8, letterSpacing: '-0.02em' }}>Hello, Aria.</div>
        <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink2, marginTop: 10, lineHeight: 1.5 }}>
          Here's what we estimated from what you shared. These are wellness numbers — references, not verdicts.
        </div>
      </div>
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: KG.shell }}>
            <div>
              <KEyebrow>focus suggested</KEyebrow>
              <div style={{ fontFamily: KGFont.display, fontSize: 22, fontStyle: 'italic', color: KG.ink, marginTop: 4 }}>Steady energy week</div>
              <div style={{ fontFamily: KGFont.body, fontSize: 11.5, color: KG.ink2, marginTop: 4 }}>Gentle strength + protein anchored meals + sleep hygiene.</div>
            </div>
            <KRing value={0.7} size={64} color={KG.clay} label="A" sublabel="grade"/>
          </div>
          <Metric label="BMI"                  value="22.4" unit="kg/m²"  note="reference range"/>
          <Metric label="Waist-to-hip"         value="0.78" unit="ratio"  note="estimate"/>
          <Metric label="Waist-to-height"      value="0.46" unit="ratio"  note="self-reported"/>
          <Metric label="BRI · body roundness" value="3.1"  unit="index"  note="estimate"/>
          <Metric label="BMR"                  value="1,392" unit="kcal/day" note="resting"/>
          <Metric label="TDEE"                 value="2,015" unit="kcal/day" note="moderate activity"/>
        </KCard>
        <KSafetyBanner tone="info" title="These are estimates" body="None of these numbers diagnose a condition. Use them as gentle reference points alongside a clinician's guidance." />
      </div>
      <div style={{ height: 40 }}/>
      <div style={{ position: 'absolute', bottom: 24, left: 22, right: 22 }}>
        <button style={{ width: '100%', height: 52, borderRadius: 16, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 15, fontWeight: 500 }}>See my plan</button>
      </div>
    </ScreenBase>
  );
}

// 04 · Today dashboard ───────────────────────────────────────
function S_Today() {
  const ChecklistRow = ({ done, label, sub }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${KG.hairline}` }}>
      <div style={{ width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${done ? KG.sage : KG.hairline}`, background: done ? KG.sage : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {done && <Icon d={Icons.check} size={12} color={KG.cream} sw={2.4}/>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: KGFont.body, fontSize: 13, color: done ? KG.muted : KG.ink, textDecoration: done ? 'line-through' : 'none' }}>{label}</div>
        {sub && <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
  return (
    <ScreenBase>
      <div style={{ padding: '6px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <KarigaiLogo size={16}/>
        <div style={{ display: 'flex', gap: 10 }}>
          <Icon d={Icons.bell} size={20}/>
          <div style={{ width: 28, height: 28, borderRadius: 99, background: KG.claySoft, border: `1px solid ${KG.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: KGFont.display, fontSize: 14, color: '#6E3D24', fontStyle: 'italic' }}>A</div>
        </div>
      </div>
      <ScreenHeader eyebrow="tuesday · 28 apr" title="Today, attuned." sub="Day 24 — luteal phase estimate. Energy a little quieter than last week." />

      <div style={{ padding: '0 22px 110px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Cycle + energy strip */}
        <KCard pad={16} style={{ background: KG.cream }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <KEyebrow>cycle</KEyebrow>
              <div style={{ fontFamily: KGFont.display, fontSize: 22, color: KG.ink, marginTop: 4, fontStyle: 'italic' }}>Day 24 · Luteal</div>
              <div style={{ fontFamily: KGFont.body, fontSize: 11.5, color: KG.ink2, marginTop: 4 }}>Period likely in 4–6 days · 72% confidence</div>
            </div>
            <KRing value={24/28} size={70} color={KG.clay} track={KG.bone} label="24" sublabel="of 28"/>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, height: 6, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ flex: 5, background: KG.alert, opacity: 0.8 }}/>
            <div style={{ flex: 9, background: KG.claySoft }}/>
            <div style={{ flex: 1, background: KG.sageSoft }}/>
            <div style={{ flex: 13, background: KG.bone, position: 'relative' }}>
              <div style={{ position: 'absolute', right: '24%', top: -3, width: 12, height: 12, borderRadius: 99, background: KG.ink, border: `2px solid ${KG.cream}` }}/>
            </div>
          </div>
        </KCard>

        {/* Energy check-in */}
        <KCard pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <KEyebrow>energy check-in</KEyebrow>
              <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink2, marginTop: 4 }}>How are you, really?</div>
            </div>
            <div style={{ fontFamily: KGFont.display, fontSize: 28, fontStyle: 'italic', color: KG.clay }}>6<span style={{ fontSize: 14, color: KG.muted }}>/10</span></div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 28, borderRadius: 6, background: i < 6 ? KG.clay : KG.shell, opacity: i < 6 ? (0.4 + i*0.08) : 1 }}/>
            ))}
          </div>
        </KCard>

        {/* Macro rings */}
        <KCard pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <KEyebrow>nutrition · target</KEyebrow>
            <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted }}>1,750 kcal</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {[
              { v: 0.62, c: KG.clay,  l: '1,085', s: 'kcal' },
              { v: 0.48, c: KG.sage,  l: '48g',   s: 'protein' },
              { v: 0.40, c: '#A48B62', l: '11g',  s: 'fiber' },
              { v: 0.78, c: '#6B8AA8', l: '1.95L', s: 'water' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <KRing value={r.v} size={62} color={r.c} stroke={5}/>
                <div style={{ fontFamily: KGFont.body, fontSize: 12, fontWeight: 600, color: KG.ink }}>{r.l}</div>
                <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.s}</div>
              </div>
            ))}
          </div>
        </KCard>

        {/* Workout */}
        <KCard pad={16} style={{ background: KG.ink, color: KG.cream }}>
          <KEyebrow color="rgba(245,239,230,0.55)">today · move</KEyebrow>
          <div style={{ fontFamily: KGFont.display, fontSize: 26, fontStyle: 'italic', marginTop: 4, color: KG.cream }}>Lower body, gently.</div>
          <div style={{ fontFamily: KGFont.body, fontSize: 12, color: 'rgba(245,239,230,0.7)', marginTop: 4 }}>35 min · strength · cycle-aware adjustment</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
            <button style={{ flex: 1, height: 42, borderRadius: 12, background: KG.clay, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 13, fontWeight: 500 }}>Start workout</button>
            <button style={{ height: 42, padding: '0 14px', borderRadius: 12, background: 'transparent', color: KG.cream, border: `1px solid rgba(245,239,230,0.3)`, fontFamily: KGFont.body, fontSize: 12 }}>25-min walk instead</button>
          </div>
        </KCard>

        {/* AI insight */}
        <KCard pad={16} style={{ background: '#EFE9DC', border: `1px solid ${KG.bone}` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: 99, background: KG.ink, color: KG.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={Icons.spark} size={14} color={KG.cream}/>
            </div>
            <div>
              <KEyebrow>insight · 1 of today</KEyebrow>
              <div style={{ fontFamily: KGFont.display, fontSize: 17, fontStyle: 'italic', color: KG.ink, marginTop: 4, lineHeight: 1.3 }}>"Lower energy in luteal is normal — protein at breakfast often helps."</div>
              <div style={{ fontFamily: KGFont.body, fontSize: 11, color: KG.muted, marginTop: 6 }}>Tap to read why · 38s</div>
            </div>
          </div>
        </KCard>

        {/* Checklist */}
        <KCard pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <KEyebrow>checklist</KEyebrow>
            <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted }}>2 / 5</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <ChecklistRow done label="Log breakfast" sub="oatmeal · 380 kcal"/>
            <ChecklistRow done label="500 ml water"/>
            <ChecklistRow label="Lower-body strength" sub="35 min"/>
            <ChecklistRow label="Symptom check-in" sub="evening"/>
            <ChecklistRow label="Evening reflection"/>
          </div>
        </KCard>

      </div>
      <TabBar active="home"/>
    </ScreenBase>
  );
}

// 05 · Cycle tracker ─────────────────────────────────────────
function S_Cycle() {
  const Day = ({ n, phase, today, period, predicted }) => {
    const colors = { menstrual: KG.alert, follicular: KG.claySoft, ovulation: KG.sage, luteal: KG.bone };
    const bg = period ? colors.menstrual : colors[phase] || 'transparent';
    return (
      <div style={{
        width: 36, height: 44, borderRadius: 12,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: today ? KG.ink : (predicted ? 'transparent' : bg),
        border: predicted ? `1px dashed ${KG.muted}` : 'none',
        color: today ? KG.cream : KG.ink2,
      }}>
        <span style={{ fontFamily: KGFont.body, fontSize: 12, fontWeight: today ? 700 : 500 }}>{n}</span>
        {period && !today && <div style={{ width: 4, height: 4, borderRadius: 99, background: KG.alert, marginTop: 2 }}/>}
      </div>
    );
  };
  const days = [];
  // Build a 7×5 calendar centered around day 24
  for (let i = 1; i <= 28; i++) {
    let phase = 'follicular';
    if (i <= 5) phase = 'menstrual';
    else if (i >= 13 && i <= 16) phase = 'ovulation';
    else if (i >= 17) phase = 'luteal';
    days.push({ n: i, phase, period: i <= 5, today: i === 24 });
  }
  // Add predicted next period days 29–32
  for (let i = 29; i <= 32; i++) days.push({ n: i, period: true, predicted: true });

  const Symptom = ({ icon, label, on, tone = 'clay' }) => (
    <div style={{
      padding: '10px 12px', borderRadius: 14, minWidth: 84,
      background: on ? (tone === 'clay' ? '#F4DCCD' : KG.shell) : KG.card,
      border: `1px solid ${on ? 'transparent' : KG.hairline}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <Icon d={Icons[icon]} size={20} color={on ? '#6E3D24' : KG.ink2}/>
      <span style={{ fontFamily: KGFont.body, fontSize: 11, color: on ? '#6E3D24' : KG.ink2, fontWeight: on ? 600 : 400 }}>{label}</span>
    </div>
  );

  return (
    <ScreenBase>
      <ScreenHeader eyebrow="cycle" title="Day 24 · Luteal" sub="Estimated. Period likely 4–6 days. Confidence 72% — your cycle was irregular last month."
        action={<Icon d={Icons.history} size={22}/>}/>
      <div style={{ padding: '0 22px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Phase legend */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <KChip tone="alert">● Menstrual</KChip>
          <KChip tone="clay">● Follicular</KChip>
          <KChip tone="sage">● Ovulation</KChip>
          <KChip tone="bone">● Luteal</KChip>
          <KChip>◌ Predicted</KChip>
        </div>

        {/* Calendar */}
        <KCard pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: KGFont.display, fontSize: 18, fontStyle: 'italic', color: KG.ink }}>April</span>
            <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.12em' }}>← →</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em', padding: '4px 0' }}>{d}</div>
            ))}
            {days.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                <Day {...d}/>
              </div>
            ))}
          </div>
        </KCard>

        {/* Today's logging */}
        <KCard pad={16}>
          <KEyebrow>log today · day 24</KEyebrow>
          <div style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink2, marginTop: 6, marginBottom: 12 }}>How is your body talking?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            <Symptom icon="drop"   label="Spotting" />
            <Symptom icon="flame"  label="Cramps" on/>
            <Symptom icon="moon"   label="Fatigue" on/>
            <Symptom icon="bolt"   label="Cravings"/>
            <Symptom icon="spark"  label="Bloating" on/>
            <Symptom icon="star"   label="Mood low"/>
            <Symptom icon="bell"   label="Headache"/>
            <Symptom icon="plus"   label="Add"/>
          </div>

          <div style={{ marginTop: 16 }}>
            <KEyebrow>pain level</KEyebrow>
            <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 8, borderRadius: 99, background: i < 4 ? KG.clay : KG.shell }}/>
              ))}
              <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.ink2, marginLeft: 6 }}>4/10</span>
            </div>
          </div>
        </KCard>

        <KSafetyBanner tone="warn" title="Heavy or painful?" body="If pain is unusually severe, or you feel dizzy with heavy bleeding, consider speaking with a clinician." />

      </div>
      <TabBar active="cycle"/>
    </ScreenBase>
  );
}

// 06 · Meal logging ──────────────────────────────────────────
function S_Meals() {
  const MealRow = ({ time, name, kcal, p, items, logged = true }) => (
    <KCard pad={14}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <KEyebrow>{time}</KEyebrow>
          <div style={{ fontFamily: KGFont.display, fontSize: 18, fontStyle: 'italic', color: KG.ink, marginTop: 4 }}>{name}</div>
          <div style={{ fontFamily: KGFont.body, fontSize: 11.5, color: KG.muted, marginTop: 4 }}>{items}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.ink, fontWeight: 600 }}>{kcal} kcal</div>
          <div style={{ fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.08em', marginTop: 2 }}>{p}g protein</div>
        </div>
      </div>
      {!logged && (
        <button style={{ marginTop: 10, height: 34, padding: '0 12px', borderRadius: 10, background: 'transparent', border: `1px dashed ${KG.hairline}`, color: KG.ink2, fontFamily: KGFont.body, fontSize: 12, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Icon d={Icons.plus} size={14}/> Log {name.toLowerCase()}
        </button>
      )}
    </KCard>
  );
  return (
    <ScreenBase>
      <ScreenHeader eyebrow="nutrition · today" title="Meals" sub="PCOS-aware meal plan · vegetarian · no gluten"
        action={<Icon d={Icons.plus} size={22}/>}/>

      <div style={{ padding: '0 22px 110px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Top stats card */}
        <KCard pad={18} style={{ background: KG.ink, color: KG.cream }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <KEyebrow color="rgba(245,239,230,0.5)">remaining</KEyebrow>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <span style={{ fontFamily: KGFont.display, fontSize: 48, fontStyle: 'italic', color: KG.cream, lineHeight: 1 }}>665</span>
                <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: 'rgba(245,239,230,0.6)' }}>kcal</span>
              </div>
              <div style={{ fontFamily: KGFont.body, fontSize: 11, color: 'rgba(245,239,230,0.7)', marginTop: 4 }}>of 1,750 kcal target</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <KRing value={0.62} size={56} color={KG.clay} track="rgba(245,239,230,0.15)"/>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(245,239,230,0.15)' }}>
            {[['Protein', '48 / 100g', 0.48, KG.sage], ['Fiber', '11 / 28g', 0.40, KG.clay], ['Carbs', '120 / 180g', 0.66, '#C9A875'], ['Fat', '35 / 60g', 0.58, '#A48B62']].map(([l, v, p, c]) => (
              <div key={l} style={{ flex: 1 }}>
                <div style={{ fontFamily: KGFont.mono, fontSize: 9.5, color: 'rgba(245,239,230,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
                <div style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.cream, marginTop: 4 }}>{v}</div>
                <div style={{ height: 3, background: 'rgba(245,239,230,0.1)', borderRadius: 99, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${p*100}%`, height: '100%', background: c }}/>
                </div>
              </div>
            ))}
          </div>
        </KCard>

        <MealRow time="08:14 · breakfast" name="Oats, berries, nut butter" kcal="380" p="14" items="½ cup oats · blueberries · 1 tbsp almond butter"/>
        <MealRow time="13:02 · lunch" name="Rajma, brown rice, salad" kcal="540" p="22" items="kidney bean curry · ¾ cup rice · cucumber-tomato"/>
        <MealRow time="16:00 · snack" name="Suggested · Greek yogurt + seeds" kcal="165" p="12" items="blood-sugar steady, protein anchor" logged={false}/>
        <MealRow time="20:30 · dinner" name="Suggested · Paneer bowl" kcal="565" p="32" items="paneer · roasted veg · quinoa · tahini" logged={false}/>

        <KSafetyBanner tone="info" title="Why these meals?" body="Protein-anchored, fiber-forward, even carb distribution. Supportive for blood-sugar steadiness — not a treatment." />

      </div>
      <TabBar active="meal"/>
    </ScreenBase>
  );
}

// 07 · Workout ───────────────────────────────────────────────
function S_Workout() {
  const Exercise = ({ n, name, sets, sub, swap }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: KG.card, border: `1px solid ${KG.hairline}`, borderRadius: 14 }}>
      <div style={{ width: 36, height: 36, borderRadius: 99, background: KG.shell, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: KGFont.display, fontSize: 16, fontStyle: 'italic', color: KG.ink2 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: KGFont.body, fontSize: 13.5, color: KG.ink, fontWeight: 500 }}>{name}</div>
        <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.08em', marginTop: 3 }}>{sets}</div>
        {sub && <div style={{ fontFamily: KGFont.body, fontSize: 11, color: KG.clay, marginTop: 4 }}>{sub}</div>}
      </div>
      {swap && <span style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>swap</span>}
    </div>
  );
  return (
    <ScreenBase>
      <ScreenHeader eyebrow="move · 35 min · strength" title="Lower body, gently."
        sub="Cycle-aware — luteal phase. Lighter load, fuller rest."
        action={<Icon d={Icons.more} size={22}/>}/>

      <div style={{ padding: '0 22px 110px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <KPlaceholder h={150} label="hero · seated leg press / floor work"/>
          <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 18 }}>
              <div><div style={{ fontFamily: KGFont.display, fontSize: 22, color: KG.ink, fontStyle: 'italic' }}>6</div><div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em' }}>EXERCISES</div></div>
              <div><div style={{ fontFamily: KGFont.display, fontSize: 22, color: KG.ink, fontStyle: 'italic' }}>35</div><div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em' }}>MINUTES</div></div>
              <div><div style={{ fontFamily: KGFont.display, fontSize: 22, color: KG.ink, fontStyle: 'italic' }}>RPE 5</div><div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em' }}>EFFORT</div></div>
            </div>
          </div>
        </KCard>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 2, height: 48, borderRadius: 14, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon d={Icons.bolt} size={16} color={KG.cream} fill={KG.cream}/> Start
          </button>
          <button style={{ flex: 1, height: 48, borderRadius: 14, background: 'transparent', color: KG.ink, border: `1px solid ${KG.ink}`, fontFamily: KGFont.body, fontSize: 13 }}>Backup · 25 min walk</button>
        </div>

        <Exercise n="1" name="Glute bridge" sets="3 × 12 · 60s rest" sub="If knee injury — single-leg variation"/>
        <Exercise n="2" name="Goblet squat (light)" sets="3 × 10 · 8 kg" swap/>
        <Exercise n="3" name="Romanian deadlift" sets="3 × 10 · 12 kg"/>
        <Exercise n="4" name="Step-ups" sets="2 × 12 each side" sub="Use a low step today"/>
        <Exercise n="5" name="Wall sit" sets="3 × 30s" swap/>
        <Exercise n="6" name="Cool-down stretch" sets="5 min · pigeon, child's pose"/>

        <KSafetyBanner tone="warn" title="Stop if you feel chest pain or dizziness" body="Sit, hydrate, and rest. If symptoms persist, please contact a clinician." />
      </div>
      <TabBar active="move"/>
    </ScreenBase>
  );
}

// 08 · AI chat ───────────────────────────────────────────────
function S_AIChat() {
  return (
    <ScreenBase>
      <div style={{ padding: '6px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon d={Icons.back} size={22}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 99, background: KG.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={Icons.spark} size={14} color={KG.cream}/>
          </div>
          <div>
            <div style={{ fontFamily: KGFont.body, fontSize: 13, fontWeight: 600, color: KG.ink }}>karigai · insights</div>
            <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.sage, letterSpacing: '0.14em' }}>● RULE-CHECKED</div>
          </div>
        </div>
        <Icon d={Icons.history} size={22}/>
      </div>

      <div style={{ padding: '14px 22px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* User message */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '75%', background: KG.ink, color: KG.cream, padding: '12px 16px', borderRadius: '20px 20px 6px 20px', fontFamily: KGFont.body, fontSize: 13, lineHeight: 1.45 }}>
          Why am I so tired this week? I barely slept last night.
        </div>

        {/* AI structured response */}
        <KCard pad={0} style={{ overflow: 'hidden', background: KG.cream, border: `1px solid ${KG.bone}` }}>
          <div style={{ padding: '14px 16px 10px' }}>
            <KEyebrow>response · structured · 3 sources</KEyebrow>
            <div style={{ fontFamily: KGFont.display, fontSize: 19, fontStyle: 'italic', color: KG.ink, marginTop: 6, lineHeight: 1.3 }}>
              Your fatigue may be linked to a few patterns at once.
            </div>
          </div>
          <div style={{ padding: '0 16px 14px' }}>
            {[
              { n: 1, t: 'Low sleep over the last 3 nights', s: 'avg 5h 20m vs your 7h baseline' },
              { n: 2, t: 'Eating below your target', s: 'avg 1,420 kcal vs 1,750 over 4 days' },
              { n: 3, t: 'Period likely approaching', s: 'day 24 · luteal · 4–6 days estimate' },
            ].map(it => (
              <div key={it.n} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${KG.hairline}` }}>
                <div style={{ width: 22, height: 22, borderRadius: 99, background: KG.ink, color: KG.cream, fontFamily: KGFont.mono, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{it.n}</div>
                <div>
                  <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink, fontWeight: 500 }}>{it.t}</div>
                  <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.08em', marginTop: 2 }}>{it.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', background: '#EFE9DC', borderTop: `1px solid ${KG.bone}` }}>
            <KEyebrow>suggested today</KEyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <KChip tone="sage">Swap HIIT → walk + stretch</KChip>
              <KChip tone="clay">Add protein-carb snack</KChip>
              <KChip tone="bone">Hit 2.5L water</KChip>
              <KChip>Earlier wind-down</KChip>
            </div>
          </div>
        </KCard>

        {/* Safety footer */}
        <KSafetyBanner tone="warn" title="A note from us" body="You also report heavy periods and iron deficiency. If fatigue is recurring, severe, or comes with dizziness or shortness of breath, please consider a clinician." />

        {/* Quick prompts */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          <KChip tone="ink">Why this workout?</KChip>
          <KChip>Why these meals?</KChip>
          <KChip>What's my cycle pattern?</KChip>
        </div>
      </div>

      {/* Composer */}
      <div style={{ position: 'absolute', bottom: 84, left: 14, right: 14, background: KG.card, border: `1px solid ${KG.hairline}`, borderRadius: 22, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 16px rgba(31,27,22,0.05)' }}>
        <Icon d={Icons.plus} size={18} color={KG.muted}/>
        <span style={{ flex: 1, fontFamily: KGFont.body, fontSize: 13, color: KG.muted }}>Ask about your patterns…</span>
        <div style={{ width: 32, height: 32, borderRadius: 99, background: KG.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={Icons.arrow} size={14} color={KG.cream}/>
        </div>
      </div>
      <TabBar active="me"/>
    </ScreenBase>
  );
}

// 09 · Privacy / Settings ────────────────────────────────────
function S_Privacy() {
  const Row = ({ icon, label, sub, value, danger }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: `1px solid ${KG.hairline}` }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: danger ? '#F2D7D5' : KG.shell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon d={Icons[icon]} size={16} color={danger ? KG.alert : KG.ink2}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: KGFont.body, fontSize: 13, fontWeight: 500, color: danger ? KG.alert : KG.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: KGFont.body, fontSize: 11, color: KG.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {value && <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.muted, letterSpacing: '0.08em' }}>{value}</span>}
    </div>
  );
  return (
    <ScreenBase>
      <ScreenHeader eyebrow="settings" title="Privacy & data" sub="Your data is yours. Export it, delete it, control what we see — anytime."/>

      <div style={{ padding: '0 22px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px' }}>
            <KEyebrow>your data</KEyebrow>
          </div>
          <Row icon="lock"     label="End-to-end encrypted health log" sub="Last sync · 2 min ago" value="ON"/>
          <Row icon="device"   label="Apple Health · HealthKit" sub="cycle · steps · sleep · weight" value="LINKED"/>
          <Row icon="device"   label="Android Health Connect" sub="not connected" value="OFF"/>
          <Row icon="download" label="Export my data" sub="json · csv · pdf summary"/>
          <Row icon="history"  label="Consent history" sub="3 versions · last accepted apr 12"/>
        </KCard>

        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px' }}>
            <KEyebrow>what we use ai for</KEyebrow>
          </div>
          <Row icon="spark"  label="Personalized insights" sub="Rule-checked. Never sold or shared." value="ON"/>
          <Row icon="chart"  label="Anonymous research" sub="aggregate trends, no identifiers" value="OFF"/>
          <Row icon="shield" label="Red-flag safety detection" sub="Strongly recommended" value="ON"/>
        </KCard>

        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px' }}>
            <KEyebrow>account</KEyebrow>
          </div>
          <Row icon="trash" label="Delete account & data" sub="Irreversible. 30-day grace window." danger/>
        </KCard>

        <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.6, padding: '12px 20px' }}>
          karigai is not a medical device.<br/>we provide wellness, fitness & lifestyle support.<br/>v 0.1 · 2026
        </div>
      </div>
      <TabBar active="me"/>
    </ScreenBase>
  );
}

Object.assign(window, {
  S_Welcome, S_Onboarding, S_Analysis, S_Today, S_Cycle, S_Meals, S_Workout, S_AIChat, S_Privacy,
});
