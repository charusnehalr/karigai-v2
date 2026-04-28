// karigai — brand sheet (presentation artboard)
// Self-contained spec board: logo, color, type, components

function BrandSheet() {
  const Section = ({ eyebrow, title, children }) => (
    <div style={{ marginBottom: 36 }}>
      <KEyebrow>{eyebrow}</KEyebrow>
      <div style={{ fontFamily: KGFont.display, fontSize: 28, color: KG.ink, marginTop: 6, marginBottom: 18, letterSpacing: '-0.01em' }}>{title}</div>
      {children}
    </div>
  );

  const Swatch = ({ name, hex, light }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ width: '100%', height: 64, background: hex, borderRadius: 10, border: light ? `1px solid ${KG.hairline}` : 'none' }}/>
      <div>
        <div style={{ fontFamily: KGFont.body, fontSize: 11, fontWeight: 500, color: KG.ink }}>{name}</div>
        <div style={{ fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.05em' }}>{hex.toUpperCase()}</div>
      </div>
    </div>
  );

  return (
    <div style={{
      width: 1240, padding: 64, background: KG.paper,
      fontFamily: KGFont.body, color: KG.ink,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 56, paddingBottom: 28, borderBottom: `1px solid ${KG.hairline}` }}>
        <div>
          <KEyebrow>brand system · v0.1 · 2026</KEyebrow>
          <div style={{ fontFamily: KGFont.display, fontSize: 88, lineHeight: 0.95, fontStyle: 'italic', color: KG.ink, marginTop: 14, letterSpacing: '-0.02em' }}>karigai</div>
          <div style={{ fontFamily: KGFont.body, fontSize: 14, color: KG.ink2, marginTop: 14, maxWidth: 540, lineHeight: 1.55 }}>
            A wellness, fitness and cycle intelligence platform for women. Supportive,
            premium, privacy-first. Not a medical product — guidance grounded in
            self-reported context, lifestyle data, and rule-checked AI.
          </div>
        </div>
        <KarigaiMark size={64} color={KG.ink}/>
      </div>

      {/* Logo lockups */}
      <Section eyebrow="01 · identity" title="Wordmark & lockups">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: KG.cream, padding: 36, borderRadius: 16, border: `1px solid ${KG.hairline}` }}>
            <KarigaiLogo size={28} tagline />
          </div>
          <div style={{ background: KG.ink, padding: 36, borderRadius: 16 }}>
            <KarigaiLogo size={28} color={KG.cream} tagline />
          </div>
          <div style={{ background: KG.clay, padding: 36, borderRadius: 16 }}>
            <KarigaiLogo size={28} color={KG.cream} />
          </div>
          <div style={{ background: KG.sage, padding: 36, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <KarigaiLogo size={28} color={KG.cream} />
            <span style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.cream, opacity: 0.7, letterSpacing: '0.18em', textTransform: 'uppercase' }}>min · 24px</span>
          </div>
        </div>
      </Section>

      {/* Color */}
      <Section eyebrow="02 · color" title="A warm, clinical palette">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 18 }}>
          <Swatch name="Cream" hex={KG.cream} light/>
          <Swatch name="Paper" hex={KG.paper} light/>
          <Swatch name="Shell" hex={KG.shell} light/>
          <Swatch name="Bone" hex={KG.bone} light/>
          <Swatch name="Hairline" hex={KG.hairline} light/>
          <Swatch name="Card" hex={KG.card} light/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 18 }}>
          <Swatch name="Ink" hex={KG.ink}/>
          <Swatch name="Ink 2" hex={KG.ink2}/>
          <Swatch name="Muted" hex={KG.muted}/>
          <Swatch name="Clay · primary" hex={KG.clay}/>
          <Swatch name="Sage" hex={KG.sage}/>
          <Swatch name="Blush" hex={KG.blush}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
          <Swatch name="Clay soft" hex={KG.claySoft} light/>
          <Swatch name="Sage soft" hex={KG.sageSoft} light/>
          <Swatch name="Amber · warn" hex={KG.amber}/>
          <Swatch name="Alert" hex={KG.alert}/>
          <Swatch name="Ink deep · dark surface" hex={KG.inkDeep}/>
          <Swatch name="Ink surf · dark card" hex={KG.inkSurf}/>
        </div>
      </Section>

      {/* Typography */}
      <Section eyebrow="03 · type" title="Editorial serif × clean grotesque">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <div style={{ background: KG.card, padding: 28, borderRadius: 16, border: `1px solid ${KG.hairline}` }}>
            <KEyebrow>display · instrument serif</KEyebrow>
            <div style={{ fontFamily: KGFont.display, fontSize: 86, lineHeight: 0.95, fontStyle: 'italic', letterSpacing: '-0.02em', marginTop: 10, color: KG.ink }}>Today, attuned.</div>
            <div style={{ fontFamily: KGFont.display, fontSize: 32, lineHeight: 1.1, color: KG.ink2, marginTop: 14 }}>A quiet daily plan, made from your context.</div>
            <div style={{ marginTop: 22, height: 1, background: KG.hairline }}/>
            <div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
              {[['Display 86 / 0.95', '86px italic'], ['Headline 32 / 1.1', '32px regular'], ['Title 22', '22px']].map(([l, m]) => (
                <div key={l}><div style={{ fontFamily: KGFont.body, fontSize: 11, color: KG.ink }}>{l}</div><div style={{ fontFamily: KGFont.mono, fontSize: 9, color: KG.muted, letterSpacing: '0.1em' }}>{m}</div></div>
              ))}
            </div>
          </div>
          <div style={{ background: KG.card, padding: 28, borderRadius: 16, border: `1px solid ${KG.hairline}` }}>
            <KEyebrow>body · geist · mono · geist mono</KEyebrow>
            <div style={{ fontFamily: KGFont.body, fontSize: 22, fontWeight: 500, color: KG.ink, marginTop: 12, lineHeight: 1.3 }}>The body sets a calm pace.</div>
            <div style={{ fontFamily: KGFont.body, fontSize: 14, color: KG.ink2, marginTop: 8, lineHeight: 1.55 }}>Default body text is 14/1.55. Numbers, units and metadata use Geist Mono — small, lettered, quietly technical.</div>
            <div style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.muted, marginTop: 14, letterSpacing: '0.1em' }}>BMI · 22.4 · NORMAL RANGE</div>
            <div style={{ marginTop: 22, height: 1, background: KG.hairline }}/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 14, fontSize: 11 }}>
              {[['Body L · 16', KGFont.body, 16, 400], ['Body · 14', KGFont.body, 14, 400], ['Label · 12 / 500', KGFont.body, 12, 500], ['Mono · 11 / 0.1em', KGFont.mono, 11, 400], ['Eyebrow · 10 / 0.2em', KGFont.mono, 10, 400], ['Caption · 11', KGFont.body, 11, 400]].map(([l, f, s, w]) => (
                <div key={l} style={{ fontFamily: f, fontSize: s, fontWeight: w, color: KG.ink2, letterSpacing: f === KGFont.mono ? '0.1em' : 'normal' }}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Components */}
      <Section eyebrow="04 · components" title="Atoms">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <KCard>
            <KEyebrow>chips</KEyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              <KChip>Luteal</KChip>
              <KChip tone="sage">Energy 6/10</KChip>
              <KChip tone="clay">Strength · 35m</KChip>
              <KChip tone="blush">Bloating</KChip>
              <KChip tone="bone">PCOS context</KChip>
              <KChip tone="alert">Heavy flow</KChip>
              <KChip tone="ink">Today</KChip>
            </div>
          </KCard>
          <KCard>
            <KEyebrow>rings</KEyebrow>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
              <KRing value={0.62} size={64} color={KG.clay} label="62%" sublabel="cal"/>
              <KRing value={0.48} size={64} color={KG.sage} label="48%" sublabel="protein"/>
              <KRing value={0.78} size={64} color="#6B8AA8" label="78%" sublabel="water"/>
            </div>
          </KCard>
          <KCard>
            <KEyebrow>buttons</KEyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <button style={{ height: 40, borderRadius: 12, background: KG.ink, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 13, fontWeight: 500 }}>Primary · Continue</button>
              <button style={{ height: 40, borderRadius: 12, background: KG.clay, color: KG.cream, border: 'none', fontFamily: KGFont.body, fontSize: 13, fontWeight: 500 }}>Accent · Log meal</button>
              <button style={{ height: 40, borderRadius: 12, background: 'transparent', color: KG.ink, border: `1px solid ${KG.ink}`, fontFamily: KGFont.body, fontSize: 13, fontWeight: 500 }}>Ghost · Skip</button>
            </div>
          </KCard>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <KSafetyBanner tone="info" title="Estimates, not diagnosis" body="All metrics shown are wellness estimates. We do not diagnose or treat medical conditions." />
          <KSafetyBanner tone="alert" title="Please seek urgent care" body="Heavy bleeding with dizziness can be serious. Consider speaking with a clinician now." />
        </div>
      </Section>

      {/* Voice */}
      <Section eyebrow="05 · voice" title="What we say, what we don't">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <KCard pad={22} style={{ background: '#EFE9DC' }}>
            <KEyebrow color={KG.sage}>we say</KEyebrow>
            <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Your fatigue may be linked to low sleep and your cycle phase.', 'Suggested today: switch HIIT to a walk and stretching.', 'Because you reported heavy periods, consider a clinician check-in if this recurs.', 'BMI 22.4 — wellness estimate, not a diagnosis.'].map(s => (
                <li key={s} style={{ fontFamily: KGFont.body, fontSize: 13, color: KG.ink2, lineHeight: 1.45, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: 99, background: KG.sage }}/>{s}
                </li>
              ))}
            </ul>
          </KCard>
          <KCard pad={22} style={{ background: '#F2D7D5' }}>
            <KEyebrow color={KG.alert}>we never say</KEyebrow>
            <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You have PCOS.', 'You are prediabetic.', 'Take 500 mg of inositol nightly.', 'This plan treats insulin resistance.'].map(s => (
                <li key={s} style={{ fontFamily: KGFont.body, fontSize: 13, color: '#5C1F1C', lineHeight: 1.45, paddingLeft: 16, position: 'relative', textDecoration: 'line-through', textDecorationColor: 'rgba(92,31,28,0.4)' }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: 99, background: KG.alert }}/>{s}
                </li>
              ))}
            </ul>
          </KCard>
        </div>
      </Section>

      <div style={{ borderTop: `1px solid ${KG.hairline}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', fontFamily: KGFont.mono, fontSize: 10, color: KG.muted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        <span>karigai · brand sheet</span>
        <span>not a medical device · wellness only</span>
      </div>
    </div>
  );
}

Object.assign(window, { BrandSheet });
