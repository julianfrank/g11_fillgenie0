import React from 'react';
import { useStore } from '@nanostores/react';
import { formStore, stepStore, nextStep, prevStep } from '../store';

const Step1_PPA = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4 animate-fade-in">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">1. PPA & Jurisdictional Analysis</h3>
            <div className="mb-3">
                <label className="form-label text-light">Poly-PPA Zoning Classification</label>
                <select className="form-select" value={data.ppaZone} onChange={e => formStore.setKey('ppaZone', e.target.value)}>
                    <option value="">Select Zone Classification...</option>
                    <option value="unregulated">Unregulated (Merchant Market)</option>
                    <option value="regulated_vertical">Regulated Vertical Utility</option>
                    <option value="cca_community">Community Choice Aggregation (CCA)</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label text-light">Nodal Congestion Index (LMP Basis)</label>
                <input type="range" className="form-range" min="0" max="100" value={data.gridCongestionLevel} onChange={e => formStore.setKey('gridCongestionLevel', parseInt(e.target.value))} />
                <div className="text-end text-muted small">{data.gridCongestionLevel} basis points</div>
            </div>
        </div>
    );
};

const Step2_Irradiance = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">2. Irradiance & Insolation Profiles</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label text-light">Global Horizontal Irradiance (GHI) [kWh/m²/day]</label>
                    <input type="number" className="form-control" value={data.globalHorizontalIrradiance} onChange={e => formStore.setKey('globalHorizontalIrradiance', parseFloat(e.target.value))} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Diffuse Horizontal Irradiance (DHI)</label>
                    <input type="number" className="form-control" value={data.diffuseHorizontalIrradiance} onChange={e => formStore.setKey('diffuseHorizontalIrradiance', parseFloat(e.target.value))} />
                </div>
                <div className="col-12">
                    <label className="form-label text-light">Horizon Shading Coefficient (SunPath Analysis)</label>
                    <input type="number" step="0.01" className="form-control" value={data.shadingCoef} onChange={e => formStore.setKey('shadingCoef', parseFloat(e.target.value))} />
                </div>
            </div>
        </div>
    );
};

const Step3_PVConfig = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">3. Photovoltaic Array Specifications</h3>
            <div className="mb-3">
                <label className="form-label text-light">Inverter Topology</label>
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
            <div className="mb-3">
                <label className="form-label text-light">Bifacial Gain Factor</label>
                <input type="number" className="form-control" value={data.bifacialGain} onChange={e => formStore.setKey('bifacialGain', parseFloat(e.target.value))} />
            </div>
            <div className="mb-3">
                <label className="form-label text-light">Module Efficiency Rating (STC)</label>
                <input type="text" className="form-control" placeholder="e.g. 22.8%" value={data.moduleEfficiency} onChange={e => formStore.setKey('moduleEfficiency', e.target.value)} />
            </div>
        </div>
    );
};

const Step4_ESS = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">4. ESS Integration Protocol</h3>
            <div className="row g-3">
                <div className="col-12">
                    <label className="form-label text-light">Electrochemical Cell Chemistry</label>
                    <select className="form-select" value={data.batteryChemistry} onChange={e => formStore.setKey('batteryChemistry', e.target.value as any)}>
                        <option value="LFP">Lithium Ferro Phosphate (LFP)</option>
                        <option value="NMC">Nickel Manganese Cobalt (NMC)</option>
                        <option value="Flow">Vanadium Redox Flow</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Nameplate Capacity (kWh)</label>
                    <input type="number" className="form-control" value={data.storageCapacityKwh} onChange={e => formStore.setKey('storageCapacityKwh', parseFloat(e.target.value))} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Round-Trip Efficiency (RTE) %</label>
                    <input type="number" className="form-control" step="0.1" value={data.roundTripEfficiency} onChange={e => formStore.setKey('roundTripEfficiency', parseFloat(e.target.value))} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Max Depth of Discharge (DoD)</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.depthOfDischarge} onChange={e => formStore.setKey('depthOfDischarge', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">%</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Cycle Life @ 80% EOL</label>
                    <input type="number" className="form-control" value={data.cycleLife} onChange={e => formStore.setKey('cycleLife', parseFloat(e.target.value))} />
                </div>
            </div>
        </div>
    );
}

const Step5_Interconnection = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">5. Interconnection & Grid Physics</h3>
            <div className="mb-3">
                <label className="form-label text-light">Point of Common Coupling (PCC) Voltage</label>
                <div className="input-group">
                    <input type="number" className="form-control" value={data.pccVoltage} onChange={e => formStore.setKey('pccVoltage', parseFloat(e.target.value))} />
                    <span className="input-group-text bg-transparent text-light border-light">V</span>
                </div>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label text-light">Transformer Impedance (%Z)</label>
                    <input type="number" step="0.01" className="form-control" value={data.transformerImpedance} onChange={e => formStore.setKey('transformerImpedance', parseFloat(e.target.value))} />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Export Limit (kW AC)</label>
                    <input type="number" className="form-control" value={data.exportLimitKw} onChange={e => formStore.setKey('exportLimitKw', parseFloat(e.target.value))} />
                </div>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="netMet" checked={data.netMeteringCap} onChange={e => formStore.setKey('netMeteringCap', e.target.checked)} />
                <label className="form-check-label text-light" htmlFor="netMet">NEM 3.0 Grandfathering Eligibility</label>
            </div>
        </div>
    );
}

const Step6_Structural = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">6. Structural Load Engineering</h3>
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label text-light">Roof Pitch</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.roofPitchDegrees} onChange={e => formStore.setKey('roofPitchDegrees', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">deg</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label text-light">Rafter Spacing</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.rafterSpacing} onChange={e => formStore.setKey('rafterSpacing', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">in. o.c.</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label text-light">Wind Uplift (Ult)</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.windUpliftResistance} onChange={e => formStore.setKey('windUpliftResistance', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">psf</span>
                    </div>
                </div>
                <div className="col-12">
                    <label className="form-label text-light">Seismic Design Category (SDC)</label>
                    <select className="form-select" value={data.seismicRiskZone} onChange={e => formStore.setKey('seismicRiskZone', e.target.value)}>
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
}

const Step7_Financial = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">7. Financial Instrument Calibration</h3>
            <div className="mb-3">
                <label className="form-label text-light">Weighted Average Cost of Capital (WACC)</label>
                <input type="range" className="form-range" min="0" max="20" step="0.1" value={data.wacc} onChange={e => formStore.setKey('wacc', parseFloat(e.target.value))} />
                <div className="d-flex justify-content-between text-muted small">
                    <span>0%</span>
                    <span className="text-primary fw-bold">{data.wacc}%</span>
                    <span>20%</span>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label text-light">Unlevered IRR Target</label>
                    <div className="input-group">
                        <input type="number" className="form-control" step="0.1" value={data.irrTarget} onChange={e => formStore.setKey('irrTarget', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">%</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Balloon Payment (Year 7)</label>
                    <div className="input-group">
                        <span className="input-group-text bg-transparent text-light border-light">$</span>
                        <input type="number" className="form-control" value={data.balloonPayment} onChange={e => formStore.setKey('balloonPayment', parseFloat(e.target.value))} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Step8_Tax = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">8. Fiscal Incentive Taxonomy</h3>
            <div className="mb-3">
                <label className="form-label text-light">Depreciation MACRS Schedule</label>
                <div className="btn-group w-100" role="group">
                    <input type="radio" className="btn-check" name="depreciation" id="macrs5" checked={data.depreciationSchedule === 'MACRS-5'} onChange={() => formStore.setKey('depreciationSchedule', 'MACRS-5')} />
                    <label className="btn btn-outline-light" htmlFor="macrs5">5-Year MACRS</label>

                    <input type="radio" className="btn-check" name="depreciation" id="straight" checked={data.depreciationSchedule === 'Straight-Line'} onChange={() => formStore.setKey('depreciationSchedule', 'Straight-Line')} />
                    <label className="btn btn-outline-light" htmlFor="straight">Straight Line</label>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label text-light">ITC Basis Multiplier</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.itcPercentage} onChange={e => formStore.setKey('itcPercentage', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">%</span>
                    </div>
                    <div className="form-text text-muted">Include domestic content adders.</div>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">SREC Stripe Value ($/MWh)</label>
                    <div className="input-group">
                        <span className="input-group-text bg-transparent text-light border-light">$</span>
                        <input type="number" className="form-control" value={data.srecValue} onChange={e => formStore.setKey('srecValue', parseFloat(e.target.value))} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Step9_SCADA = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4">
            <h3 className="h4 mb-3 text-primary border-bottom border-secondary pb-2">9. SCADA & Telemetry Architecture</h3>
            <div className="mb-3">
                <label className="form-label text-light">API Handshake Protocol</label>
                <select className="form-select" value={data.apiHandshakeProtocol} onChange={e => formStore.setKey('apiHandshakeProtocol', e.target.value as any)}>
                    <option value="REST">HTTPS RESTful API</option>
                    <option value="GraphQL">GraphQL Federation</option>
                    <option value="SOAP">Legacy SOAP/XML</option>
                </select>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label text-light">Polling Frequency</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.dataAcquisitionIntervalSeconds} onChange={e => formStore.setKey('dataAcquisitionIntervalSeconds', parseInt(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">seconds</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Pyranometer ISO Class</label>
                    <select className="form-select" value={data.pyranometerClass} onChange={e => formStore.setKey('pyranometerClass', e.target.value)}>
                        <option>Secondary Standard</option>
                        <option>First Class</option>
                        <option>Second Class</option>
                    </select>
                </div>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="weather" checked={data.weatherStationRequired} onChange={e => formStore.setKey('weatherStationRequired', e.target.checked)} />
                <label className="form-check-label text-light" htmlFor="weather">On-site MET Station Redundancy</label>
            </div>
        </div>
    );
}

const Step10_OM = () => {
    const data = useStore(formStore);
    return (
        <div className="glass-panel p-4 rounded-3 mb-4 border-warning">
            <h3 className="h4 mb-3 text-warning border-bottom border-warning pb-2">10. O&M Service Level Agreement</h3>
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label text-light">Preventative Maint Interval</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.preventativeMaintenanceIntervalMonths} onChange={e => formStore.setKey('preventativeMaintenanceIntervalMonths', parseInt(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">months</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label text-light">Module Washing Frequency</label>
                    <div className="input-group">
                        <input type="number" className="form-control" value={data.moduleCleaningFrequency} onChange={e => formStore.setKey('moduleCleaningFrequency', parseInt(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">/ year</span>
                    </div>
                </div>
                <div className="col-12">
                    <label className="form-label text-light">Inverter Replacement Reserve</label>
                    <div className="input-group">
                        <span className="input-group-text bg-transparent text-light border-light">$</span>
                        <input type="number" className="form-control" value={data.inverterReplacementReserve} onChange={e => formStore.setKey('inverterReplacementReserve', parseFloat(e.target.value))} />
                        <span className="input-group-text bg-transparent text-light border-light">/ kWdc</span>
                    </div>
                </div>
            </div>

            <div className="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-25 text-warning d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill me-3 flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>
                    <strong>PWA Compliance Warning</strong>: Ensure prevailing wage labor rates are factored into O&M modeling.
                </div>
            </div>

            <button className="btn btn-warning w-100 mt-2 fw-bold text-dark p-3 text-uppercase letter-spacing-1 shadow-lg" onClick={() => alert("Underwriting Packet Submitted to Credit Committee.")}>
                Submit Application Packet
            </button>
        </div>
    );
}

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
                <button className="btn btn-outline-secondary px-4" onClick={prevStep} disabled={step === 1}>Previous Protocol</button>
                {step < 10 && <button className="btn btn-primary px-4" onClick={nextStep}>Next Vector</button>}
            </div>
        </div>
    );
};
