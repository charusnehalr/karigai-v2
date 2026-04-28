// karigai — admin / web app screens (1440px-wide artboards)

const ADMIN_W = 1440;

function AdminShell({ active = 'dashboard', children, page, sub }) {
  const nav = [
    { id: 'dashboard', icon: 'home',  label: 'Overview' },
    { id: 'flags',     icon: 'flag',  label: 'Safety flags',  count: 12 },
    { id: 'rules',     icon: 'shield',label: 'Rule manager' },
    { id: 'ai',        icon: 'spark', label: 'AI review',     count: 4 },
    { id: 'exercises', icon: 'dumbbell', label: 'Exercise library' },
    { id: 'meals',     icon: 'meal',  label: 'Meal templates' },
    { id: 'content',   icon: 'edit',  label: 'Content review' },
    { id: 'consent',   icon: 'lock',  label: 'Consent versions' },
    { id: 'flagsf',    icon: 'filter',label: 'Feature flags' },
    { id: 'analytics', icon: 'chart', label: 'Analytics' },
    { id: 'audit',     icon: 'history', label: 'Audit logs' },
  ];

  return (
    <div style={{ width: ADMIN_W, minHeight: 900, background: KG.paper, fontFamily: KGFont.body, color: KG.ink, display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 250, background: KG.cream, borderRight: `1px solid ${KG.hairline}`, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ padding: '4px 10px 22px' }}>
          <KarigaiLogo size={18}/>
          <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>admin · clinical content</div>
        </div>
        {nav.map(n => {
          const on = n.id === active;
          return (
            <div key={n.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 10,
              background: on ? KG.ink : 'transparent',
              color: on ? KG.cream : KG.ink2,
            }}>
              <Icon d={Icons[n.icon]} size={16} color={on ? KG.cream : KG.ink2}/>
              <span style={{ fontFamily: KGFont.body, fontSize: 12.5, fontWeight: on ? 600 : 400, flex: 1 }}>{n.label}</span>
              {n.count != null && (
                <span style={{ fontFamily: KGFont.mono, fontSize: 9.5, fontWeight: 500, padding: '2px 7px', borderRadius: 99, background: on ? 'rgba(245,239,230,0.15)' : KG.shell, color: on ? KG.cream : KG.ink2 }}>{n.count}</span>
              )}
            </div>
          );
        })}
        <div style={{ flex: 1 }}/>
        <div style={{ padding: 12, borderRadius: 12, background: KG.shell, fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.1em', lineHeight: 1.5 }}>
          ENV · production<br/>RULES v 4.2.1<br/>BUILD · 2026.04.27
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', marginTop: 4 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: KG.sage, color: KG.cream, fontFamily: KGFont.display, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>R</div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink, fontWeight: 500 }}>Dr. R. Anand</div>
            <div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em' }}>CLINICAL · ADMIN</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '24px 36px 36px' }}>
        {/* topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: `1px solid ${KG.hairline}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: KG.card, border: `1px solid ${KG.hairline}`, borderRadius: 10, width: 360 }}>
              <Icon d={Icons.search} size={14} color={KG.muted}/>
              <span style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.muted }}>Search users, rules, audit ID…</span>
              <span style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, padding: '2px 6px', border: `1px solid ${KG.hairline}`, borderRadius: 4, marginLeft: 'auto' }}>⌘K</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <KChip tone="sage">● All systems green</KChip>
            <KChip>Apr 27, 2026 · IST</KChip>
            <Icon d={Icons.bell} size={18}/>
          </div>
        </div>

        {/* page header */}
        <div style={{ marginBottom: 28 }}>
          <KEyebrow>{active}</KEyebrow>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 }}>
            <div>
              <div style={{ fontFamily: KGFont.display, fontSize: 40, fontStyle: 'italic', color: KG.ink, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{page}</div>
              {sub && <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.muted, marginTop: 6, maxWidth: 620 }}>{sub}</div>}
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

// Sparkline
function Sparkline({ data, color = KG.clay, h = 40 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 160;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(' ');
  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={w} cy={h - ((data[data.length-1] - min) / (max-min||1)) * h} r={2.5} fill={color}/>
    </svg>
  );
}

// 01 · Admin overview ────────────────────────────────────────
function A_Overview() {
  const StatCard = ({ label, value, unit, delta, deltaTone = 'sage', spark, color }) => (
    <KCard pad={20} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <KEyebrow>{label}</KEyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: KGFont.display, fontSize: 38, fontStyle: 'italic', color: KG.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.1em' }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <KChip tone={deltaTone}>{delta}</KChip>
        {spark && <Sparkline data={spark} color={color || KG.clay}/>}
      </div>
    </KCard>
  );

  return (
    <AdminShell active="dashboard" page="Operations overview" sub="Active state of the platform — user activity, content health, and safety. Refreshes every 60s.">
      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Active users · 7d" value="48,210" unit="users"  delta="↑ 6.2% wow"  spark={[20,22,21,24,26,28,30,32,31,34,38,42,46,48]}/>
        <StatCard label="Onboarding completion" value="71" unit="%"      delta="↓ 1.1% wow"  deltaTone="alert" spark={[78,76,75,74,73,72,72,71,71,72,71,71,72,71]} color={KG.alert}/>
        <StatCard label="Meal logging rate"     value="62" unit="%"      delta="↑ 3.4% wow"  spark={[55,56,58,59,60,60,61,62,63,62,61,62,62,62]}/>
        <StatCard label="Workout completion"    value="54" unit="%"      delta="↑ 0.9% wow"  spark={[51,50,52,53,52,54,53,54,55,54,53,54,54,54]} color={KG.sage}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Cycle logging rate" value="68" unit="%" delta="↑ 2.0% wow" color="#A48B62" spark={[60,61,63,64,65,66,67,67,68,68,68,69,68,68]}/>
        <StatCard label="AI chat usage · 7d" value="22,440" unit="msgs" delta="↑ 11.2%" color={KG.clay} spark={[14,15,16,17,18,19,20,21,21,22,23,22,22,22]}/>
        <StatCard label="Safety flags raised" value="12" unit="open" delta="3 urgent" deltaTone="alert" color={KG.alert} spark={[3,4,5,6,7,8,9,10,11,12,12,11,12,12]}/>
        <StatCard label="Content awaiting review" value="14" unit="items" delta="2 SLA-due" deltaTone="bone" color="#A48B62" spark={[6,7,9,10,11,12,12,13,13,13,14,14,14,14]}/>
      </div>

      {/* Two columns: live safety flags + rule status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${KG.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <KEyebrow>safety flags · live queue</KEyebrow>
              <div style={{ fontFamily: KGFont.display, fontSize: 20, fontStyle: 'italic', color: KG.ink, marginTop: 4 }}>12 open · 3 urgent</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <KChip tone="alert">3 urgent</KChip>
              <KChip tone="bone">5 high</KChip>
              <KChip tone="sage">4 review</KChip>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 130px 130px 90px 80px', padding: '10px 22px', fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: `1px solid ${KG.hairline}` }}>
            <span>level</span><span>signal</span><span>user</span><span>opened</span><span>rule</span><span></span>
          </div>
          {[
            { lvl: 'urgent', sig: 'Heavy bleeding + dizziness reported', user: 'u_8821 · 28', t: '4 min', rule: 'R-029', tone: 'alert' },
            { lvl: 'urgent', sig: 'Chest pain logged during workout',     user: 'u_6190 · 34', t: '12 min', rule: 'R-014', tone: 'alert' },
            { lvl: 'urgent', sig: 'Calorie intake < 900 kcal · 5 days',   user: 'u_3318 · 22', t: '38 min', rule: 'R-041', tone: 'alert' },
            { lvl: 'high',   sig: 'Missed period · pregnancy possible',   user: 'u_7734 · 30', t: '1 h',    rule: 'R-018', tone: 'bone' },
            { lvl: 'high',   sig: 'Severe abdominal pain repeated',       user: 'u_2271 · 26', t: '2 h',    rule: 'R-022', tone: 'bone' },
            { lvl: 'review', sig: 'AI response flagged · medication ref', user: 'u_4408 · 31', t: '3 h',    rule: 'R-007', tone: 'sage' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 130px 130px 90px 80px', padding: '14px 22px', alignItems: 'center', borderBottom: `1px solid ${KG.hairline}` }}>
              <KChip tone={f.tone}>{f.lvl}</KChip>
              <span style={{ fontFamily: KGFont.body, fontSize: 12.5, color: KG.ink }}>{f.sig}</span>
              <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.muted, letterSpacing: '0.05em' }}>{f.user}</span>
              <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.muted }}>{f.t}</span>
              <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.ink2 }}>{f.rule}</span>
              <button style={{ height: 28, padding: '0 10px', borderRadius: 8, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 11, fontWeight: 500 }}>Review</button>
            </div>
          ))}
        </KCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <KCard pad={20}>
            <KEyebrow>rule version status</KEyebrow>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <div>
                <div style={{ fontFamily: KGFont.display, fontSize: 22, fontStyle: 'italic' }}>v 4.2.1</div>
                <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.1em' }}>DEPLOYED · APR 21</div>
              </div>
              <KChip tone="sage">stable</KChip>
            </div>
            <div style={{ height: 1, background: KG.hairline, margin: '14px 0' }}/>
            {[
              ['PCOS-supportive lifestyle', 'v4.2.1', 'sage'],
              ['Prediabetes lifestyle',     'v4.2.0', 'sage'],
              ['Pregnancy & breastfeeding', 'v4.2.1', 'sage'],
              ['Eating disorder risk',      'v4.2.1', 'sage'],
              ['Red-flag escalation',       'v4.3.0-rc', 'bone'],
            ].map(([n, v, t]) => (
              <div key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink2 }}>{n}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted }}>{v}</span>
                  <KChip tone={t}>{t === 'sage' ? '● live' : '● staged'}</KChip>
                </div>
              </div>
            ))}
          </KCard>

          <KCard pad={20}>
            <KEyebrow>content awaiting review</KEyebrow>
            {[
              ['Meal · Iron-friendly bowl',  '2h SLA', 'bone'],
              ['Exercise · Glute bridge v2', 'today', 'sage'],
              ['AI response template · luteal', '4h SLA', 'bone'],
              ['Onboarding copy · life stage', '1d', 'sage'],
            ].map(([n, sla, t], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i ? `1px solid ${KG.hairline}` : 'none' }}>
                <span style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink2 }}>{n}</span>
                <KChip tone={t}>{sla}</KChip>
              </div>
            ))}
          </KCard>
        </div>
      </div>
    </AdminShell>
  );
}

// 02 · Rule manager ──────────────────────────────────────────
function A_Rules() {
  const Rule = ({ id, name, cat, status, version, updated, owner, tone }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 130px 100px 80px 130px 100px 80px', padding: '14px 22px', alignItems: 'center', borderBottom: `1px solid ${KG.hairline}` }}>
      <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.ink2, letterSpacing: '0.04em' }}>{id}</span>
      <span style={{ fontFamily: KGFont.body, fontSize: 12.5, color: KG.ink, fontWeight: 500 }}>{name}</span>
      <KChip>{cat}</KChip>
      <KChip tone={tone}>{status}</KChip>
      <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted }}>{version}</span>
      <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.04em' }}>{updated}</span>
      <span style={{ fontFamily: KGFont.body, fontSize: 11, color: KG.ink2 }}>{owner}</span>
      <Icon d={Icons.more} size={16} color={KG.muted}/>
    </div>
  );

  return (
    <AdminShell active="rules" page="Rule manager" sub="Lifestyle, safety and adjustment rules used by the engine before any AI response reaches a user.">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <KChip tone="ink">All · 84</KChip>
        <KChip>PCOS-supportive · 14</KChip>
        <KChip>Prediabetes · 9</KChip>
        <KChip>Pregnancy & breastfeeding · 11</KChip>
        <KChip>Deficiency · 8</KChip>
        <KChip>Injury restrictions · 12</KChip>
        <KChip>Eating disorder risk · 7</KChip>
        <KChip>Cycle adjustment · 10</KChip>
        <KChip tone="alert">Red-flag escalation · 13</KChip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>
        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 130px 100px 80px 130px 100px 80px', padding: '12px 22px', fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.14em', textTransform: 'uppercase', borderBottom: `1px solid ${KG.hairline}`, background: KG.cream }}>
            <span>id</span><span>rule</span><span>category</span><span>status</span><span>v</span><span>updated</span><span>owner</span><span></span>
          </div>
          <Rule id="R-001" name="PCOS · suggest balanced macros, fiber forward" cat="PCOS"     status="live"   tone="sage" version="4.2.1" updated="apr 18" owner="R. Anand"/>
          <Rule id="R-002" name="PCOS · avoid 'treats insulin resistance' phrasing" cat="PCOS"  status="live"   tone="sage" version="4.2.1" updated="apr 18" owner="R. Anand"/>
          <Rule id="R-007" name="AI · never recommend supplement doses"   cat="AI safety" status="live"   tone="sage" version="4.2.1" updated="apr 12" owner="L. Chen"/>
          <Rule id="R-014" name="Workout · stop on chest pain · escalate" cat="Red-flag"  status="live"   tone="sage" version="4.2.1" updated="apr 09" owner="R. Anand"/>
          <Rule id="R-018" name="Missed period · pregnancy possibility check" cat="Cycle" status="live"   tone="sage" version="4.2.1" updated="apr 06" owner="P. Iyer"/>
          <Rule id="R-022" name="Severe abdominal pain · escalation" cat="Red-flag"     status="live"   tone="sage" version="4.2.1" updated="apr 06" owner="R. Anand"/>
          <Rule id="R-029" name="Heavy bleeding + dizziness · urgent care" cat="Red-flag" status="staged" tone="bone" version="4.3.0-rc" updated="apr 24" owner="R. Anand"/>
          <Rule id="R-031" name="Iron deficiency · fatigue messaging adjustment" cat="Deficiency" status="live" tone="sage" version="4.2.0" updated="mar 28" owner="P. Iyer"/>
          <Rule id="R-041" name="Calorie intake < 900 kcal · ED risk" cat="ED risk" status="live" tone="sage" version="4.2.1" updated="apr 12" owner="L. Chen"/>
          <Rule id="R-052" name="Pregnancy · forbid weight-loss messaging" cat="Pregnancy" status="live" tone="sage" version="4.2.1" updated="apr 02" owner="R. Anand"/>
          <Rule id="R-061" name="Luteal phase · suggest reduced HIIT" cat="Cycle"   status="live"   tone="sage" version="4.2.1" updated="mar 22" owner="P. Iyer"/>
          <Rule id="R-074" name="Knee injury · forbid plyometrics" cat="Injury"     status="draft"  tone="bone" version="—"      updated="apr 27" owner="L. Chen"/>
        </KCard>

        {/* Rule detail */}
        <KCard pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${KG.hairline}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <KEyebrow>rule · R-029</KEyebrow>
              <KChip tone="bone">staged · 4.3.0-rc</KChip>
            </div>
            <div style={{ fontFamily: KGFont.display, fontSize: 22, fontStyle: 'italic', color: KG.ink, marginTop: 6, lineHeight: 1.2 }}>
              Heavy bleeding + dizziness → urgent care escalation
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <KChip>Red-flag</KChip>
              <KChip>cycle</KChip>
              <KChip>safety</KChip>
            </div>
          </div>

          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <KEyebrow>trigger</KEyebrow>
              <div style={{ background: KG.cream, border: `1px solid ${KG.hairline}`, borderRadius: 10, padding: 12, marginTop: 6, fontFamily: KGFont.mono, fontSize: 11, color: KG.ink2, lineHeight: 1.6 }}>
                cycle.flow == 'heavy' AND<br/>
                symptoms.includes('dizziness' | 'shortness_of_breath') AND<br/>
                duration_days &gt;= 1
              </div>
            </div>
            <div>
              <KEyebrow>action</KEyebrow>
              <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Show urgent-care banner in chat & today screen', 'Suppress workout suggestion for 24h', 'Flag to safety queue · level: urgent', 'Log audit event SAFETY_HEAVY_BLEED'].map(s => (
                  <li key={s} style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink2, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 6, width: 5, height: 5, borderRadius: 99, background: KG.clay }}/>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <KEyebrow>history</KEyebrow>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[['v4.3.0-rc', 'apr 24 · R. Anand', 'add SoB symptom'], ['v4.2.1', 'apr 18 · R. Anand', 'tighten copy'], ['v4.2.0', 'mar 28 · L. Chen', 'initial'] ].map(([v, who, what]) => (
                  <div key={v} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.04em', padding: '4px 0', borderBottom: `1px dashed ${KG.hairline}` }}>
                    <span>{v}</span><span>{who}</span><span>{what}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button style={{ flex: 1, height: 38, borderRadius: 10, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 12, fontWeight: 500 }}>Promote to live</button>
              <button style={{ flex: 1, height: 38, borderRadius: 10, background: 'transparent', color: KG.ink, border: `1px solid ${KG.ink}`, fontFamily: KGFont.body, fontSize: 12 }}>Edit rule</button>
            </div>
          </div>
        </KCard>
      </div>
    </AdminShell>
  );
}

// 03 · AI response review ────────────────────────────────────
function A_AIReview() {
  return (
    <AdminShell active="ai" page="AI response review" sub="Sampled and flagged AI responses awaiting clinical review. Approve, revise, or hard-block before they ship into production.">
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
        {/* List */}
        <KCard pad={0} style={{ overflow: 'hidden', alignSelf: 'flex-start' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${KG.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <KEyebrow>queue · 4 awaiting</KEyebrow>
            <Icon d={Icons.filter} size={14} color={KG.muted}/>
          </div>
          {[
            { id: '#A-2841', topic: 'Fatigue · luteal · iron', flag: 'no flags', tone: 'sage', sel: true, t: '4 min' },
            { id: '#A-2839', topic: 'PCOS · "should I take inositol"', flag: 'supplement ref', tone: 'alert', t: '21 min' },
            { id: '#A-2837', topic: 'Cravings · pre-period', flag: 'no flags', tone: 'sage', t: '38 min' },
            { id: '#A-2832', topic: 'Workout · knee pain', flag: 'injury rule check', tone: 'bone', t: '1 h' },
          ].map((it, i) => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: `1px solid ${KG.hairline}`, background: it.sel ? KG.shell : 'transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: KGFont.mono, fontSize: 10.5, color: KG.ink2, letterSpacing: '0.06em' }}>{it.id}</span>
                <span style={{ fontFamily: KGFont.mono, fontSize: 10, color: KG.muted }}>{it.t}</span>
              </div>
              <div style={{ fontFamily: KGFont.body, fontSize: 12.5, color: KG.ink, marginTop: 4, fontWeight: it.sel ? 600 : 500 }}>{it.topic}</div>
              <div style={{ marginTop: 6 }}><KChip tone={it.tone}>{it.flag}</KChip></div>
            </div>
          ))}
        </KCard>

        {/* Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <KCard pad={22}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <KEyebrow>response · A-2841 · v3 candidate</KEyebrow>
                <div style={{ fontFamily: KGFont.display, fontSize: 26, fontStyle: 'italic', color: KG.ink, marginTop: 6, lineHeight: 1.2 }}>
                  Fatigue + luteal + iron-deficient context
                </div>
                <div style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.muted, marginTop: 6 }}>User: u_8821 · 28 · cycle day 24 · iron deficient (self-reported) · sleep 5h 20m avg</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <KChip tone="sage">5 / 5 rules pass</KChip>
                <KChip>policy v4.2.1</KChip>
              </div>
            </div>
          </KCard>

          {/* Two side-by-side: prompt + response */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 }}>
            <KCard pad={22}>
              <KEyebrow>user prompt</KEyebrow>
              <div style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink2, marginTop: 10, lineHeight: 1.5, padding: 14, background: KG.cream, borderRadius: 12, border: `1px solid ${KG.hairline}` }}>
                "Why am I so tired this week? I barely slept last night."
              </div>
              <div style={{ marginTop: 18 }}>
                <KEyebrow>context attached</KEyebrow>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                  {[['cycle', 'day 24 · luteal'], ['sleep · 7d', 'avg 5h 20m'], ['kcal · 4d', 'avg 1,420 / 1,750'], ['iron deficiency', 'self-reported'], ['workouts · 7d', '4 sessions']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: KGFont.mono, fontSize: 10.5, color: KG.muted, letterSpacing: '0.04em', padding: '4px 0', borderBottom: `1px dashed ${KG.hairline}` }}>
                      <span>{k}</span><span style={{ color: KG.ink2 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </KCard>

            <KCard pad={22}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <KEyebrow>candidate response</KEyebrow>
                <span style={{ fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted }}>generated · 4m ago · 280 tokens</span>
              </div>
              <div style={{ marginTop: 12, padding: 16, background: KG.cream, borderRadius: 12, border: `1px solid ${KG.hairline}`, fontFamily: KGFont.body, fontSize: 12.5, color: KG.ink2, lineHeight: 1.55 }}>
                <p style={{ margin: 0 }}>Your fatigue may be linked to a few patterns at once — low sleep over the last 3 nights, eating below your target, and your period likely approaching.</p>
                <p style={{ marginTop: 10, marginBottom: 0 }}>For today: switch HIIT to a walk and stretch, add a balanced snack with protein and carbs, hit your water target, and try an earlier wind-down.</p>
                <p style={{ marginTop: 10, marginBottom: 0, padding: 10, background: '#F4E4D5', borderRadius: 8 }}>
                  <strong>A note from us:</strong> because you also report heavy periods and iron deficiency, please consider speaking with a clinician if fatigue is recurring, severe, or comes with dizziness or shortness of breath.
                </p>
              </div>

              <div style={{ marginTop: 14 }}>
                <KEyebrow>rule checks</KEyebrow>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                  {[
                    ['R-007', 'no supplement dose recommended', true],
                    ['R-031', 'iron-deficiency wording adjusted', true],
                    ['R-029', 'red-flag check inserted', true],
                    ['R-061', 'luteal phase HIIT swap', true],
                    ['R-002', 'no diagnostic phrasing', true],
                  ].map(([id, what, ok]) => (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: KGFont.mono, fontSize: 11, color: KG.ink2, padding: '5px 10px', background: KG.cream, borderRadius: 6 }}>
                      <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ width: 14, height: 14, borderRadius: 99, background: KG.sage, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon d={Icons.check} size={9} color={KG.cream} sw={2.6}/>
                        </span>
                        {id}
                      </span>
                      <span>{what}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <button style={{ flex: 1, height: 42, borderRadius: 12, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 13, fontWeight: 500 }}>Approve & ship</button>
                <button style={{ flex: 1, height: 42, borderRadius: 12, background: 'transparent', color: KG.ink, border: `1px solid ${KG.ink}`, fontFamily: KGFont.body, fontSize: 13 }}>Revise</button>
                <button style={{ height: 42, padding: '0 16px', borderRadius: 12, background: '#F2D7D5', color: KG.alert, border: `1px solid #E2A9A4`, fontFamily: KGFont.body, fontSize: 13 }}>Block</button>
              </div>
            </KCard>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

Object.assign(window, { A_Overview, A_Rules, A_AIReview });
