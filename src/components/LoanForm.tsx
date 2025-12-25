import React from 'react';
import { useStore } from '@nanostores/react';
import { formStore, stepStore, nextStep, prevStep } from '../store';
import { ConvAI } from './ConvAI';


const SliderInput = ({ label, value, min, max, step = 1, unit = '', onChange, title }: {
    label: string,
    value: number,
    min: number,
    max: number,
    step?: number,
    unit?: string,
    onChange: (val: number) => void,
    title: string
}) => (
    <div className="mb-4">
        <label className="form-label text-light d-flex justify-content-between">
            <span className="small text-uppercase letter-spacing-1 opacity-75">{label}</span>
            <span className="text-primary fw-bold font-monospace">{value}{unit}</span>
        </label>
        <input
            type="range"
            className="form-range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(parseFloat(e.target.value))}
            title={title}
        />
        <div className="d-flex justify-content-between text-muted opacity-25" style={{ fontSize: '0.7rem' }}>
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
        </div>
    </div>
);

const Step1_PPA = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4 animate-fade-in">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">1. PPA & Jurisdictional Analysis</h3>
            <div className="mb-4">
                <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">Poly-PPA Zoning Classification</label>
                <select className="form-select bg-dark text-light border-secondary" value={data.ppaZone} onChange={e => formStore.setKey('ppaZone', e.target.value)} title="Imagine you're opening a lemonade stand. In some towns, only one big company is allowed to sell lemonade, and they own everything from the lemons to the stand itself—this is like a 'Regulated Vertical Utility'. In other towns, anyone can set up a stand and compete to sell lemonade at the best price—this is the 'Unregulated' or 'Merchant Market'. There are also neighborhoods that band together to buy lemons in bulk for everyone, which is like 'Community Choice Aggregation'. This setting tells us who makes the rules for your solar power. It's crucial because it determines if you can set your own prices or if you must follow a price list from the utility.">
                    <option value="">Select Zone Classification...</option>
                    <option value="unregulated">Unregulated (Merchant Market)</option>
                    <option value="regulated_vertical">Regulated Vertical Utility</option>
                    <option value="cca_community">Community Choice Aggregation (CCA)</option>
                </select>
            </div>
            <SliderInput
                label="Nodal Congestion Index (LMP Basis)"
                value={data.gridCongestionLevel}
                min={0}
                max={100}
                unit=" bps"
                onChange={v => formStore.setKey('gridCongestionLevel', v)}
                title="Think of the electrical grid like a highway system for electricity. When too many cars (electrons) try to use the same road at rush hour, traffic jams happen, and everything slows down. This index measures how 'traffic-jammed' the grid is at your specific location. A high score means the wires are crowded, and it might be hard to push your solar energy onto the grid when everyone else is doing the same. If the congestion is too high, the price you get paid for your electricity might drop because the grid operators have to discourage people from adding more power to an already stuffed line. We need to know this risk upfront."
            />
        </div>
    );
};

const Step2_Irradiance = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">2. Irradiance & Insolation Profiles</h3>
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Global Horizontal Irradiance (GHI)"
                        value={data.globalHorizontalIrradiance}
                        min={0} max={12} step={0.1} unit=" kWh/m²/day"
                        onChange={v => formStore.setKey('globalHorizontalIrradiance', v)}
                        title="This is basically measuring the total 'sun power' that hits a flat patch of ground at your site. Imagine you laid a towel flat on the beach; GHI is all the sunlight landing on that towel from every direction—directly from the sun and also the light bouncing off clouds. It's the most basic number we use to guess how much energy your solar panels can make. A higher number means more fuel for your solar engine. If you're building in a cloudy place like Seattle, this number is lower than in the Arizona desert. We need this to calculate your potential 'miles per gallon' for the solar plant."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Diffuse Horizontal Irradiance (DHI)"
                        value={data.diffuseHorizontalIrradiance}
                        min={0} max={8} step={0.1} unit=" kWh/m²/day"
                        onChange={v => formStore.setKey('diffuseHorizontalIrradiance', v)}
                        title="Not all sunlight comes in a straight line (laser beam) from the sun. Some of it gets scattered by clouds, dust, and pollution in the atmosphere before it hits the ground. This scattered light is called 'Diffuse Horizontal Irradiance'. Think of it like a cloudy day where it's still bright outside, but you can't see the sun itself—that brightness is DHI. This is important because solar panels can still generate power from this scattered light. If your site has a lot of hazy or cloudy days, having panels that are good at catching this 'indirect' light becomes very important for your bottom line."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Horizon Shading Coefficient"
                        value={data.shadingCoef}
                        min={0} max={1} step={0.01}
                        onChange={v => formStore.setKey('shadingCoef', v)}
                        title="This number tells us how much of the sky is blocked by things like mountains, tall buildings, or trees around your site. Imagine standing in the middle of your solar field and looking at the horizon in a full circle. If you're in a valley or next to a skyscraper, you'll lose some sunlight in the early morning or late afternoon because the sun hides behind those obstacles. We use this 'coefficient' (a fancy math multiplier) to adjust our predictions. A score of 1.0 means a perfect, flat horizon with zero blockage. A lower score means we have to subtract anticipated energy production because of those shadows."
                    />
                </div>
            </div>
        </div>
    );
};

const Step3_PVConfig = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">3. Photovoltaic Array Specifications</h3>
            <div className="mb-4">
                <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75 d-block mb-3" title="The inverter is the device that changes the DC electricity (raw power from panels) into AC electricity (usable power for the grid). The 'topology' is the strategy we use to connect them. 'String' means we chain many panels together like old Christmas lights—if one fails, it affects the whole chain. 'Micro' means every single panel gets its own tiny inverter, so they work independently, which is great but expensive. 'Optimizer' is a middle ground where we make the panels smart enough to talk to a central inverter. Choosing the right one balances cost with how much control and reliability you generally need for the system.">Inverter Topology</label>
                <div className="btn-group w-100" role="group">
                    {['string', 'micro', 'optimizer'].map(type => (
                        <React.Fragment key={type}>
                            <input type="radio" className="btn-check" name="inverterTopology" id={type} autoComplete="off"
                                checked={data.inverterTopology === type} onChange={() => formStore.setKey('inverterTopology', type as any)} />
                            <label className="btn btn-outline-light text-capitalize" htmlFor={type}>{type}</label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <SliderInput
                label="Bifacial Gain Factor"
                value={data.bifacialGain}
                min={0} max={25} step={0.5} unit="%"
                onChange={v => formStore.setKey('bifacialGain', v)}
                title="Standard solar panels only catch light on the front side, facing the sky. Bifacial panels are like double-sided tape—they catch light on the front, but also on the back from sunlight reflecting off the ground (albedo). This 'Gain Factor' is the bonus energy we expect to get from the back side. If you put these panels over white gravel or snow, they pick up a lot of reflected light. If they are over dark grass, they pick up less. This number is a percentage bonus—like getting a tip on top of your hourly wage. It can significantly boost your total energy output without buying more panels."
            />
            <div className="mb-3">
                <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">Module Efficiency Rating (STC)</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="e.g. 22.8%" value={data.moduleEfficiency} onChange={e => formStore.setKey('moduleEfficiency', e.target.value)} title="This measures how good your solar panels are at converting sunlight into electricity. If a panel has 20% efficiency, it means it captures 20% of the sun's energy hitting it and turns it into power; the rest is lost as heat. Think of it like a car engine's fuel efficiency. A higher efficiency panel is like a hybrid car—it gets more miles (power) out of the same amount of gas (sunlight). High-efficiency panels are more expensive, but they are great if you have limited roof space because you can make more power in a smaller area. We need this to size the system correctly." />
            </div>
        </div>
    );
};

const Step4_ESS = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">4. ESS Integration Protocol</h3>
            <div className="row g-4">
                <div className="col-12">
                    <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">Electrochemical Cell Chemistry</label>
                    <select className="form-select bg-dark text-light border-secondary" value={data.batteryChemistry} onChange={e => formStore.setKey('batteryChemistry', e.target.value as any)} title="Just like AA batteries are different from the battery in your phone, huge grid batteries use different chemicals to store energy. 'LFP' (Lithium Iron Phosphate) is like the safe, reliable workhorse—it doesn't catch fire easily and lasts a long time. 'NMC' (Nickel Manganese Cobalt) is like a high-performance sports car battery—it packs more energy into a smaller space but needs careful cooling. 'Flow' batteries are like giant tanks of liquid electrolytes—great for storing power for very long times but they take up a ton of room. The choice changes how safe, small, or long-lasting your energy storage system will be.">
                        <option value="LFP">Lithium Ferro Phosphate (LFP)</option>
                        <option value="NMC">Nickel Manganese Cobalt (NMC)</option>
                        <option value="Flow">Vanadium Redox Flow</option>
                    </select>
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Nameplate Capacity"
                        value={data.storageCapacityKwh}
                        min={0} max={2000} step={10} unit=" kWh"
                        onChange={v => formStore.setKey('storageCapacityKwh', v)}
                        title="This is the total size of the gas tank for your battery system, measured in kilowatt-hours (kWh). It tells us specifically how much energy the battery can hold when it is 100% full. If you have a 100 kWh battery, you could run a 100 kW machine for one hour, or a 1 kW lightbulb for 100 hours. It's the headline number for the battery's size. We need to match this to your energy needs—too small and you run out of power at night; too big and you paid for a giant tank you never fill up. It directly drives the cost of the project."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Round-Trip Efficiency (RTE)"
                        value={data.roundTripEfficiency}
                        min={50} max={100} step={0.1} unit="%"
                        onChange={v => formStore.setKey('roundTripEfficiency', v)}
                        title="Batteries aren't perfect; you always lose some energy when you charge them and take it back out, mostly as heat. This efficiency number tells us what percentage of the electricity we put IN can actually be taken OUT later. If you put 100 units of energy in and only get 90 units back, your efficiency is 90%. Think of it like a tax on saving energy. A higher number is better because you waste less request electricity. We need to account for this loss in our financial models because buying power you can't sell back is basically throwing money away."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Max Depth of Discharge (DoD)"
                        value={data.depthOfDischarge}
                        min={0} max={100} unit="%"
                        onChange={v => formStore.setKey('depthOfDischarge', v)}
                        title="Consistently draining a battery to 0% creates chemical stress that ruins it quickly, just like running your phone to 0% every day isn't great for it. 'Depth of Discharge' is the safety limit we set—like saying 'never go below 20%'. If we set this at 80%, it means we only use the top 80% of the battery's capacity to keep it healthy for years. This trade-off is important: using less of the battery makes it last longer (saves replacement costs) but means you have less usable energy each day (earns less revenue). We have to find the sweet spot."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Cycle Life @ 80% EOL"
                        value={data.cycleLife}
                        min={0} max={10000} step={100} unit=" cycles"
                        onChange={v => formStore.setKey('cycleLife', v)}
                        title="This is the lifespan of your battery, measured in 'cycles'. One cycle is fully charging it up and draining it down once. If a battery is rated for 5,000 cycles, and you use it once a day, it acts like an expiration date—it will last about 13-14 years before it starts getting too weak to be useful. It's like how tires wear down after a certain number of miles. We need to know this number to predict when we'll need to spend a huge chunk of money to replace the batteries. A longer life means better long-term profit."
                    />
                </div>
            </div>
        </div>
    );
};

const Step5_Interconnection = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">5. Interconnection & Grid Physics</h3>
            <SliderInput
                label="Point of Common Coupling (PCC) Voltage"
                value={data.pccVoltage}
                min={120} max={69000} step={10} unit="V"
                onChange={v => formStore.setKey('pccVoltage', v)}
                title="The 'Point of Common Coupling' (PCC) is the exact spot where your private solar plant connects to the public electric grid. The voltage here is the 'pressure' of the electricity at that handshake point. It's like knowing the water pressure where your house pipe meets the city main. If the voltage is very high (like on big transmission lines), we need expensive, heavy-duty equipment to match it safely. If it's lower (distribution lines), the equipment is cheaper. This number dictates exactly what kind of transformers and safety gear we have to buy to plug your system in without blowing anything up."
            />
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Transformer Impedance (%Z)"
                        value={data.transformerImpedance}
                        min={1} max={15} step={0.05} unit="%"
                        onChange={v => formStore.setKey('transformerImpedance', v)}
                        title="A transformer changes the voltage of electricity, but it inherently resists the flow of current a little bit—this resistance is called 'impedance', measured as a percentage. Think of it like friction in a pipe. Higher impedance limits the maximum 'rush' of power that can flow during a short circuit (which is safer) but also causes a slight voltage drop during normal operation (which is less efficient). We have to tune this number just right. If it's too low, a fault could explode equipment; if it's too high, we lose valuable power and struggle to push energy onto the grid properly."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Export Limit"
                        value={data.exportLimitKw}
                        min={0} max={5000} step={50} unit=" kW"
                        onChange={v => formStore.setKey('exportLimitKw', v)}
                        title="Sometimes the utility company says, 'You can build a huge solar plant, but the local wire isn't big enough to handle all that power at noon.' So, they set a speed limit call an 'Export Limit'. Even if your panels are making 5,000 kW, the grid might only allow you to send 3,000 kW. You either have to throw away the extra power (curtailment) or store it in a battery for later. Knowing this limit is vital because it caps the maximum revenue you can make instantly. It's a hard ceiling on your factory's output to the market."
                    />
                </div>
            </div>
            <div className="form-check form-switch mt-3">
                <input className="form-check-input" type="checkbox" id="netMet" checked={data.netMeteringCap} onChange={e => formStore.setKey('netMeteringCap', e.target.checked)} title="Net Metering (NEM) is the billing deal where the utility pays you for the extra power you send them. 'NEM 3.0' is a newer rule in places like California that pays solar owners much less than the old rules (NEM 2.0). 'Grandfathering' means you got your paperwork in early enough to lock in the old, better rates for 20 years. Checking this box means this project is lucky enough to use the old, profitable math. Unchecking it means we have to use the new, tougher math where batteries are almost required to make money. It makes a massive difference in the project's bankability." />
                <label className="form-check-label text-light small text-uppercase letter-spacing-1 opacity-75" htmlFor="netMet">NEM 3.0 Grandfathering Eligibility</label>
            </div>
        </div>
    );
};

const Step6_Structural = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">6. Structural Load Engineering</h3>
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Roof Pitch"
                        value={data.roofPitchDegrees}
                        min={0} max={60} unit=" deg"
                        onChange={v => formStore.setKey('roofPitchDegrees', v)}
                        title="This is simply the slope or steepness of the roof where the panels will sit, measured in degrees. A flat commercial roof is near 0 degrees; a steep house roof might be 30 or 45 degrees. This matters for two reasons: physics and sunshine. Steeper roofs catch more wind (like a sail), so we need stronger bolts. But a steeper roof might also face the sun better, catching more rays. We need to enter this accurately so the structural engineer knows how much wind force to design for and the yield model knows how much sun the panels will actually see."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Rafter Spacing"
                        value={data.rafterSpacing}
                        min={12} max={48} step={4} unit=" in. o.c."
                        onChange={v => formStore.setKey('rafterSpacing', v)}
                        title="Underneath the roof surface, there are beams called rafters that hold everything up. We can't just screw solar panels into the thin plywood; we have to drill into these strong beams. This number tells us how far apart those beams are (usually 16 or 24 inches). It dictates the layout of the metal racking system that holds the panels. If the rafters are weirdly spaced or too far apart, we might need a more expensive, heavy-duty racking system to span the gaps safely. It's a key detail for figuring out the construction cost and safety."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Wind Uplift (Ult)"
                        value={data.windUpliftResistance}
                        min={0} max={150} step={5} unit=" psf"
                        onChange={v => formStore.setKey('windUpliftResistance', v)}
                        title="When wind blows over a solar panel on a roof, it creates suction that tries to rip the panel off, just like an airplane wing generates lift. This 'Uplift Resistance' is the strength rating of the roof and our attachment system—how hard the wind can pull before things break. If you are in a hurricane zone, this number needs to be huge, requiring more screws and heavier steel. We track this to ensure the design meets local building codes and that your investment doesn't literally fly away in the first big storm."
                    />
                </div>
                <div className="col-12">
                    <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">Seismic Design Category (SDC)</label>
                    <select className="form-select bg-dark text-light border-secondary" value={data.seismicRiskZone} onChange={e => formStore.setKey('seismicRiskZone', e.target.value)} title="This classifies how shaky the ground is likely to get during an earthquake at your site. 'Class A' is rock solid and stable. 'Class D' or 'E' is essentially an earthquake danger zone, like near a fault line in San Francisco. If you are in a high-risk zone, the solar racking must be built with flexibility and extra bracing so it sways instead of snapping when the ground moves. This adds cost to the hardware and engineering. We need to know the risk level to buy the right verified safety gear that complies with the strict building codes in earthquake areas.">
                        <option value="A">Class A (Low Risk)</option>
                        <option value="B">Class B</option>
                        <option value="C">Class C</option>
                        <option value="D">Class D (High Risk)</option>
                        <option value="E">Class E (Near Field)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const Step7_Financial = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">7. Financial Instrument Calibration</h3>
            <SliderInput
                label="Weighted Average Cost of Capital (WACC)"
                value={data.wacc}
                min={0} max={20} step={0.1} unit="%"
                onChange={v => formStore.setKey('wacc', v)}
                title="WACC is basically the 'interest rate' for the entire project's money pile. Since you usually borrow some money (debt) and use some of your own cash (equity) to build this, the WACC counts the average cost of all that money combined. Ideally, your solar plant makes a profit (return) higher than this WACC number. If your WACC is 8% but the project only earns 6%, you are losing value. It's the hurdle rate—the minimum bar the project must jump over to be considered a financial success. High perceived risk usually means a higher WACC."
            />
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Unlevered IRR Target"
                        value={data.irrTarget}
                        min={0} max={30} step={0.1} unit="%"
                        onChange={v => formStore.setKey('irrTarget', v)}
                        title="IRR stands for 'Internal Rate of Return'. It's the true annual interest rate your money earns by investing in this project, without looking at bank loans yet (that's the 'Unlevered' part). Think of it like the interest rate on a savings account: you want the highest number possible. This input is your *target*—the goal you are aiming for. The model uses this to work backward and tell you, 'If you want to earn 10% a year, here is the maximum you can afford to pay for construction.' It helps set the budget to ensure the deal is worth your time."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Balloon Payment (Year 7)"
                        value={data.balloonPayment}
                        min={0} max={1000000} step={5000} unit="$"
                        onChange={v => formStore.setKey('balloonPayment', v)}
                        title="In some loans, you pay small monthly payments for a few years, but you still owe a huge chunk of money at the end—that final big check is the 'Balloon Payment'. This field asks how much that lump sum will be in Year 7. Banks do this to lower your monthly bills so you have more cash flow now, assuming you'll refinance or sell the project later to pay off the balloon. It can be risky; if you can't come up with that big pile of cash in Year 7, the bank could take your solar plant. We need to plan for this cash 'cliff'."
                    />
                </div>
            </div>
        </div>
    );
};

const Step8_Tax = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">8. Fiscal Incentive Taxonomy</h3>
            <div className="mb-4">
                <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75 d-block mb-3" title="The government lets businesses write off the cost of equipment as a tax deduction over time—this is 'depreciation'. For solar, you get a special fast-lane deal called 'MACRS-5'. It lets you deduct the entire cost of the solar plant from your taxes in just 5 years, even though the plant lasts 30 years. This creates huge tax savings immediately, which is like getting cash back early. The 'Straight-Line' option spreads it out evenly over more years, which is slower. Choosing MACRS usually boosts your short-term profit significantly, making the investment much more attractive to tax-equity investors.">Depreciation MACRS Schedule</label>
                <div className="btn-group w-100" role="group">
                    <input type="radio" className="btn-check" name="depreciation" id="macrs5" checked={data.depreciationSchedule === 'MACRS-5'} onChange={() => formStore.setKey('depreciationSchedule', 'MACRS-5')} />
                    <label className="btn btn-outline-light" htmlFor="macrs5">5-Year MACRS</label>

                    <input type="radio" className="btn-check" name="depreciation" id="straight" checked={data.depreciationSchedule === 'Straight-Line'} onChange={() => formStore.setKey('depreciationSchedule', 'Straight-Line')} />
                    <label className="btn btn-outline-light" htmlFor="straight">Straight Line</label>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="ITC Basis Multiplier"
                        value={data.itcPercentage}
                        min={0} max={60} unit="%"
                        onChange={v => formStore.setKey('itcPercentage', v)}
                        title="The Investment Tax Credit (ITC) is a federal coupon off the price of your solar system. The base coupon is usually 30%, but you can get bonus 'adders'—like 10% more for using US-made steel (Domestic Content) or 10% for building in a low-income area. This input is the *total* percent you expect to claim (e.g., 30%, 40%, or even 50%+). It's incredibly powerful; a 40% ITC effectively means the government pays for nearly half your project through tax refunds. We need to get this right because it's typically the single biggest source of value in the entire deal structure."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="SREC Stripe Value"
                        value={data.srecValue}
                        min={0} max={500} step={5} unit=" $/MWh"
                        onChange={v => formStore.setKey('srecValue', v)}
                        title="In some states, for every megawatt-hour of clean power you generate, you earn a certificate called an SREC (Solar Renewable Energy Credit). These are separate from the electricity itself—you can sell the electricity to a home and the SREC to a polluting factory that needs to offset its emissions. This input is the estimated price you can sell those certificates for. In places like New Jersey or DC, SRECs can be very expensive, adding a massive second stream of income. In other places, they are worthless. This value can make or break the profitability of a project in specific states."
                    />
                </div>
            </div>
        </div>
    );
};

const Step9_SCADA = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-4 text-primary border-bottom border-secondary pb-2">9. SCADA & Telemetry Architecture</h3>
            <div className="mb-4">
                <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">API Handshake Protocol</label>
                <select className="form-select bg-dark text-light border-secondary" value={data.apiHandshakeProtocol} onChange={e => formStore.setKey('apiHandshakeProtocol', e.target.value as any)} title="This is the digital language your solar plant's computer uses to talk to the control center's servers. 'REST' is the modern standard of the web—simple and universally understood, like speaking English. 'SOAP' is an older, stricter, and more complex language, like Latin legalese—harder to use but very rigid. 'GraphQL' is a newer method that lets you ask for exactly the data you want. We need to select the one that matches the software systems your company already uses so the new solar plant can 'plug and play' into your existing monitoring dashboard without needing expensive custom coding.">
                    <option value="REST">HTTPS RESTful API</option>
                    <option value="GraphQL">GraphQL Federation</option>
                    <option value="SOAP">Legacy SOAP/XML</option>
                </select>
            </div>
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Polling Frequency"
                        value={data.dataAcquisitionIntervalSeconds}
                        min={1} max={3600} step={1} unit=" s"
                        onChange={v => formStore.setKey('dataAcquisitionIntervalSeconds', v)}
                        title="This is how often we check the solar plant's vitals— 'Are you running? How much power? Any errors?' calling home. Checking every 1 second gives you incredible real-time data but creates a mountain of files to store and analyze (expensive storage). Checking every 15 minutes saves space but means you might not notice a broken inverter until it's been down for a while. We set this interval (in seconds) to balance the need for operational visibility against the cost of data management and bandwidth. For a large plant, fast polling is critical to catch grid blips."
                    />
                </div>
                <div className="col-12">
                    <label className="form-label text-light small text-uppercase letter-spacing-1 opacity-75">Pyranometer ISO Class</label>
                    <select className="form-select bg-dark text-light border-secondary" value={data.pyranometerClass} onChange={e => formStore.setKey('pyranometerClass', e.target.value)} title="A pyranometer is a sensor that measures sunlight intensity. Like cameras, they come in different quality grades. 'Secondary Standard' is the lab-grade, super-accurate sensor—expensive but precise. 'Second Class' is a cheaper, rougher sensor. Banks often demand high-quality sensors (First Class or better) because if your sensor is wrong, you can't prove if the plant is underperforming or it's just a cloudy day. We need to choose a class that satisfies the bank's engineer so they trust our performance reports and don't declare the project in default.">
                        <option>Secondary Standard</option>
                        <option>First Class</option>
                        <option>Second Class</option>
                    </select>
                </div>
            </div>
            <div className="form-check form-switch mt-4">
                <input className="form-check-input" type="checkbox" id="weather" checked={data.weatherStationRequired} onChange={e => formStore.setKey('weatherStationRequired', e.target.checked)} title="This switch asks: 'Do you want a backup weather station?' A weather station (MET station) measures sun, wind, and temperature so you know how much power the plant *should* make. If you only have one and it breaks, you are flying blind—you won't know if a power drop is due to clouds or a broken panel. Adding redundancy means installing a second backup station. It costs more money upfront but guarantees you always have the data needed to enforce warranties and prove performance to investors. For big projects, this insurance is usually worth the cost." />
                <label className="form-check-label text-light small text-uppercase letter-spacing-1 opacity-75" htmlFor="weather">On-site MET Station Redundancy</label>
            </div>
        </div>
    );
};

const Step10_OM = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4 border-warning">
            <h3 className="h4 mb-4 text-warning border-bottom border-warning pb-2">10. O&M Service Level Agreement</h3>
            <div className="row g-4">
                <div className="col-12">
                    <SliderInput
                        label="Preventative Maint Interval"
                        value={data.preventativeMaintenanceIntervalMonths}
                        min={1} max={24} step={1} unit=" months"
                        onChange={v => formStore.setKey('preventativeMaintenanceIntervalMonths', v)}
                        title="Just like changing the oil in your car every 5,000 miles, solar plants need check-ups. This number sets how often a technician drives out to inspect connections, check torque on bolts, and look for damage. A 6-month interval is standard; waiting 12 months is cheaper (fewer truck rolls) but risky because a small problem could grow into a big fire or failure during that long gap. This input drives the annual O&M (Operations & Maintenance) budget. We want to find the longest interval that doesn't void your equipment warranties or risk safety."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Module Washing Frequency"
                        value={data.moduleCleaningFrequency}
                        min={0} max={12} step={1} unit=" / year"
                        onChange={v => formStore.setKey('moduleCleaningFrequency', v)}
                        title="Dirt, pollen, bird droppings, and dust settle on solar panels and block the light, killing your power output. This input is how many times per year we hire a crew to wash the panels. In a rainy place, nature does it for free (0 washes). In a dusty desert, you might need 2 or 4 washes a year. Each wash costs money but restores power. We have to balance the cost of the cleaning crew against the value of the extra electricity we gain. It's a simple math problem: spend $1,000 to wash, gain $1,500 in power? Do it."
                    />
                </div>
                <div className="col-12">
                    <SliderInput
                        label="Inverter Replacement Reserve"
                        value={data.inverterReplacementReserve}
                        min={0} max={100} step={1} unit=" $/kWdc"
                        onChange={v => formStore.setKey('inverterReplacementReserve', v)}
                        title="Inverters (the boxes converting power) act like computers; they wear out faster than the solar panels themselves. Typically, they die around year 10-15. This 'Reserve' is a savings account where we tuck away a little money every year (per kW) so that when the inverters inevitably fail, we have a pile of cash ready to buy new ones without asking investors for more money. It's prudent financial planning. If we save too little (e.g., $0), the project looks profitable now but will go bankrupt in Year 15 when the equipment breaks."
                    />
                </div>
            </div>

            <div className="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-25 text-warning d-flex align-items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill me-3 flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div className="small">
                    <strong>PWA Compliance Warning</strong>: Ensure prevailing wage labor rates are factored into O&M modeling.
                </div>
            </div>

            <button className="btn btn-warning w-100 mt-2 fw-bold text-dark p-3 text-uppercase letter-spacing-1 shadow-lg" onClick={() => alert("Underwriting Packet Submitted to Credit Committee.")}>
                Submit Application Packet
            </button>
        </div>
    );
};

export const LoanForm = () => {
    const step = useStore(stepStore);

    // Render specific step
    const renderStep = () => {
        switch (step) {
            case 1: return <Step1_PPA />;
            case 2: return <Step2_Irradiance />;
            case 3: return <Step3_PVConfig />;
            case 4: return <Step4_ESS />;
            case 5: return <Step5_Interconnection />;
            case 6: return <Step6_Structural />;
            case 7: return <Step7_Financial />;
            case 8: return <Step8_Tax />;
            case 9: return <Step9_SCADA />;
            case 10: return <Step10_OM />;
            default: return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="card bg-transparent border-0">
            <ConvAI />
            <div className="card-header bg-transparent border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge bg-primary text-dark rounded-pill px-3">Step {step} of 10</span>
                    <span className="text-light-emphasis small text-uppercase letter-spacing-2">Topic: {['PPA', 'Irradiance', 'PV Config', 'ESS', 'Interconnection', 'Structural', 'Financial', 'Tax', 'SCADA', 'O&M'][step - 1]}</span>
                </div>
                <div className="progress mb-5">
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${(step / 10) * 100}%` }}></div>
                </div>
            </div>
            <div className="card-body">
                {renderStep()}
            </div>
            <div className="card-footer bg-transparent border-0 d-flex justify-content-between mt-4">
                <button className="btn btn-outline-secondary px-4" onClick={prevStep} disabled={step === 1}>Previous</button>
                {step < 10 && <button className="btn btn-primary px-4" onClick={nextStep}>Next</button>}
            </div>

        </div>
    );
};
