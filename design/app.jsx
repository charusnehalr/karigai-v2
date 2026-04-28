// karigai — composition: brand sheet + mobile screens (in iOS frames) + admin screens
// All inside a DesignCanvas with sections.

function App() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "showSafetyBanners": true,
    "density": "cozy",
    "darkMode": false
  }/*EDITMODE-END*/);

  const Phone = ({ label, w = 390, h = 844, children }) => (
    <DCArtboard id={label} label={label} width={w + 30} height={h + 60}>
      <div style={{ padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IOSDevice width={w} height={h}>
          {children}
        </IOSDevice>
      </div>
    </DCArtboard>
  );

  return (
    <>
      <DesignCanvas title="karigai · wellness intelligence platform">
        <DCSection id="brand" title="01 · Brand system">
          <DCArtboard id="brand-sheet" label="Brand sheet" width={1240} height={1850}>
            <BrandSheet/>
          </DCArtboard>
        </DCSection>

        <DCSection id="mobile" title="02 · Mobile · iOS">
          <Phone label="01 · Welcome"><S_Welcome/></Phone>
          <Phone label="02 · Onboarding · health context"><S_Onboarding/></Phone>
          <Phone label="03 · Starting analysis"><S_Analysis/></Phone>
          <Phone label="04 · Today dashboard"><S_Today/></Phone>
          <Phone label="05 · Cycle tracker"><S_Cycle/></Phone>
          <Phone label="06 · Meal logging"><S_Meals/></Phone>
          <Phone label="07 · Workout"><S_Workout/></Phone>
          <Phone label="08 · AI insights · chat"><S_AIChat/></Phone>
          <Phone label="09 · Privacy & data"><S_Privacy/></Phone>
        </DCSection>

        <DCSection id="admin" title="03 · Web · admin & clinical">
          <DCArtboard id="admin-overview" label="Operations overview" width={1440} height={1100}>
            <A_Overview/>
          </DCArtboard>
          <DCArtboard id="admin-rules" label="Rule manager" width={1440} height={1080}>
            <A_Rules/>
          </DCArtboard>
          <DCArtboard id="admin-ai" label="AI response review" width={1440} height={1100}>
            <A_AIReview/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio label="Density" value={tweaks.density} options={[{value:'cozy',label:'Cozy'},{value:'compact',label:'Compact'}]} onChange={v => setTweak('density', v)}/>
          <TweakToggle label="Show safety banners" value={tweaks.showSafetyBanners} onChange={v => setTweak('showSafetyBanners', v)}/>
          <TweakToggle label="Dark mode preview" value={tweaks.darkMode} onChange={v => setTweak('darkMode', v)}/>
        </TweakSection>
        <TweakSection title="About">
          <div style={{ fontFamily: KGFont.mono, fontSize: 10, color: '#888', letterSpacing: '0.1em', lineHeight: 1.5 }}>
            karigai · v0.1<br/>brand · mobile · admin<br/>not a medical device
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
