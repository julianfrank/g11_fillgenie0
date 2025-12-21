import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { formStore, FormState } from '../store';

const DataField = ({ label, value, unit }: { label: string, value: any, unit?: string }) => {
    let displayValue = String(value);
    let badgeClass = "";

    if (typeof value === 'boolean') {
        displayValue = value ? 'ENABLED' : 'DISABLED';
        badgeClass = value ? 'bg-success bg-opacity-10 text-success border-success' : 'bg-danger bg-opacity-10 text-danger border-danger';
    }

    return (
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-white border-opacity-10">
            <span className="text-secondary small text-uppercase fw-medium">{label.replace(/([A-Z])/g, ' $1')}</span>
            <div className="d-flex align-items-center gap-2">
                {badgeClass ? (
                    <span className={`badge border ${badgeClass} fw-bold small pb-1 px-2`}>{displayValue}</span>
                ) : (
                    <span className="font-monospace text-light fw-bold">
                        {unit && (value !== '' && value !== null) ? `${value}${unit}` : displayValue || '---'}
                    </span>
                )}
            </div>
        </div>
    );
};

const TopicCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="col-12 col-md-6 col-lg-4">
        <div className="p-4 h-100 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }}>
            <div className="d-flex align-items-center gap-2 mb-3 border-bottom border-secondary border-opacity-25 pb-2">
                <span className="text-warning">{icon}</span>
                <h6 className="mb-0 text-uppercase letter-spacing-1 text-primary-emphasis">{title}</h6>
            </div>
            {children}
        </div>
    </div>
);

export const AdminConsole = () => {
    const data = useStore(formStore);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        setLastUpdate(new Date());
    }, [data]);

    return (
        <div className="container-fluid px-4 py-5" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#f8fafc', fontFamily: "'Outfit', sans-serif" }}>
            {/* Header */}
            <nav className="navbar navbar-expand-lg py-3 sticky-top rounded-3 mb-4" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 1020 }}>
                <div className="container-fluid px-4">
                    <span className="navbar-brand fw-bold d-flex align-items-center gap-2 m-0">
                        <span className="text-warning">Helios</span>
                        <span className="text-white border-start border-secondary ps-2 ms-1 fs-6 text-uppercase letter-spacing-2">Live Underwriting Monitor</span>
                    </span>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center text-success small fw-bold letter-spacing-1">
                            <span className="d-inline-block rounded-circle me-2 bg-success animate-pulse" style={{ width: 8, height: 8, boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}></span>
                            SYNC ACTIVE
                        </div>
                        <div className="text-muted small d-none d-md-block">Last Packet: <span className="text-light">{lastUpdate.toLocaleTimeString()}</span></div>
                        <a href="./index.html" className="btn btn-sm btn-outline-warning px-3 rounded-pill text-uppercase small fw-bold">Open Form &rarr;</a>
                    </div>
                </div>
            </nav>

            <div className="row g-4">
                <TopicCard title="1. PPA & Jurisdiction" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" /><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>}>
                    <DataField label="PPA Zone" value={data.ppaZone} />
                    <DataField label="Grid Congestion" value={data.gridCongestionLevel} unit=" bps" />
                </TopicCard>

                <TopicCard title="2. Irradiance Profiles" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zM8 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM8 11.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM3.536 3.536a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L3.536 4.243a.5.5 0 0 1 0-.707zm9.192 9.192a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707zM3.536 12.464a.5.5 0 0 1 .707 0l1.414-1.414a.5.5 0 0 1-.707-.707L3.536 11.757a.5.5 0 0 1 0 .707zm9.192-9.192a.5.5 0 0 1 .707 0l1.414-1.414a.5.5 0 0 1-.707-.707l-1.414 1.414a.5.5 0 0 1 0 .707z" /></svg>}>
                    <DataField label="GHI" value={data.globalHorizontalIrradiance} unit=" kWh/m²" />
                    <DataField label="DHI" value={data.diffuseHorizontalIrradiance} unit=" kWh/m²" />
                    <DataField label="Shading Coef" value={data.shadingCoef} />
                </TopicCard>

                <TopicCard title="3. PV Specifications" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-grid-3x3" viewBox="0 0 16 16"><path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4h4V6H6v4zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0v4h4v-4H6zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0V1H6v4h4z" /></svg>}>
                    <DataField label="Efficiency" value={data.moduleEfficiency} />
                    <DataField label="Topology" value={data.inverterTopology} />
                    <DataField label="Bifacial Gain" value={data.bifacialGain} />
                </TopicCard>

                <TopicCard title="4. ESS Integration" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-battery-charging" viewBox="0 0 16 16"><path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" /><path d="M2 6h10v4H2V6zm10-1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10z" /><path d="M13 7v2a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H14a1 1 0 0 0-1 1z" /></svg>}>
                    <DataField label="Capacity" value={data.storageCapacityKwh} unit=" kWh" />
                    <DataField label="DoD" value={data.depthOfDischarge} unit="%" />
                    <DataField label="Cycle Life" value={data.cycleLife} />
                    <DataField label="Chemistry" value={data.batteryChemistry} />
                    <DataField label="RTE" value={data.roundTripEfficiency} unit="%" />
                </TopicCard>

                <TopicCard title="5. Interconnection" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-lightning" viewBox="0 0 16 16"><path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" /></svg>}>
                    <DataField label="PCC Voltage" value={data.pccVoltage} unit="V" />
                    <DataField label="Impedance" value={data.transformerImpedance} unit="%" />
                    <DataField label="Export Limit" value={data.exportLimitKw} unit=" kW" />
                    <DataField label="NEM Eligible" value={data.netMeteringCap} />
                </TopicCard>

                <TopicCard title="6. Structural" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16"><path d="M4 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-5 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" /><path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1zm11 0H3v14h3v-2h4v2h3V1z" /></svg>}>
                    <DataField label="Roof Pitch" value={data.roofPitchDegrees} unit="°" />
                    <DataField label="Rafter Spacing" value={data.rafterSpacing} unit=" in" />
                    <DataField label="Wind Uplift" value={data.windUpliftResistance} unit=" psf" />
                    <DataField label="Seismic Zone" value={data.seismicRiskZone} />
                </TopicCard>

                <TopicCard title="7. Financials" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16"><path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.444h-.2zm1.242.827c1.144.298 1.702.894 1.702 1.742 0 1.053-.782 1.828-2.046 1.938V6.151l.344.093z" /></svg>}>
                    <DataField label="WACC" value={data.wacc} unit="%" />
                    <DataField label="IRR Target" value={data.irrTarget} unit="%" />
                    <DataField label="Balloon Payment" value={data.balloonPayment} unit=" $" />
                </TopicCard>

                <TopicCard title="8. Tax & Incentives" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16"><path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg>}>
                    <DataField label="ITC Percentage" value={data.itcPercentage} unit="%" />
                    <DataField label="Depreciation" value={data.depreciationSchedule} />
                    <DataField label="SREC Value" value={data.srecValue} unit=" $/MWh" />
                </TopicCard>

                <TopicCard title="9. SCADA & Telemetry" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-broadcast" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656 0a4 4 0 0 0 0 5.656.5.5 0 0 1-.708-.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm2.122-2.122a7 7 0 0 0 0 9.9.5.5 0 0 1-.707-.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /></svg>}>
                    <DataField label="API Protocol" value={data.apiHandshakeProtocol} />
                    <DataField label="Polling Freq" value={data.dataAcquisitionIntervalSeconds} unit="s" />
                    <DataField label="Pyranometer" value={data.pyranometerClass} />
                    <DataField label="Weather Station" value={data.weatherStationRequired} />
                </TopicCard>

                <TopicCard title="10. O&M Service" icon={<svg width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16"><path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-1.657-1.343-3-3-3-.317 0-.617.05-.897.142L9.46 2.761l-.221-.221a.5.5 0 0 0-.707 0l-.822.822a.5.5 0 0 0 0 .707l.221.221-2.924 2.923L3.69 5.341a1 1 0 0 0-.584-.216H3.05A1 1 0 0 0 2.1 4.505l-2.1-3.1h1zM11.5 2c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5z" /></svg>}>
                    <DataField label="PM Interval" value={data.preventativeMaintenanceIntervalMonths} unit=" mo" />
                    <DataField label="Washing Freq" value={data.moduleCleaningFrequency} unit=" /yr" />
                    <DataField label="Inverter Reserve" value={data.inverterReplacementReserve} unit=" $/kW" />
                </TopicCard>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-pulse {
                    animation: pulse 2s infinite ease-in-out;
                }
                .letter-spacing-1 { letter-spacing: 1px; }
                .letter-spacing-2 { letter-spacing: 2px; }
            `}</style>
        </div>
    );
};
