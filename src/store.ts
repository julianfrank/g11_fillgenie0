import { map, atom } from 'nanostores';

export type FormState = {
    // Topic 1: PPA Availability
    ppaZone: string;
    gridCongestionLevel: number;

    // Topic 2: Irradiance
    globalHorizontalIrradiance: number;
    diffuseHorizontalIrradiance: number;
    shadingCoef: number;

    // Topic 3: PV Config
    moduleEfficiency: string;
    inverterTopology: 'string' | 'micro' | 'optimizer';
    bifacialGain: number;

    // Topic 4: ESS
    storageCapacityKwh: number;
    depthOfDischarge: number;
    cycleLife: number;
    batteryChemistry: 'LFP' | 'NMC' | 'Flow';
    roundTripEfficiency: number;

    // Topic 5: Interconnection
    interconnectionAgreementStatus: string;
    netMeteringCap: boolean;
    exportLimitKw: number;
    pccVoltage: number;
    transformerImpedance: number;

    // Topic 6: Structural
    roofPitchDegrees: number;
    rafterSpacing: number;
    windUpliftResistance: number;
    seismicRiskZone: string;

    // Topic 7: Financial
    irrTarget: number;
    wacc: number; // Weighted Average Cost of Capital
    balloonPayment: number;

    // Topic 8: Tax & Incentives
    itcPercentage: number;
    depreciationSchedule: 'MACRS-5' | 'Straight-Line';
    srecValue: number;

    // Topic 9: SCADA
    dataAcquisitionIntervalSeconds: number;
    weatherStationRequired: boolean;
    pyranometerClass: string;
    apiHandshakeProtocol: 'REST' | 'SOAP' | 'GraphQL';

    // Topic 10: O&M
    preventativeMaintenanceIntervalMonths: number;
    moduleCleaningFrequency: number;
    inverterReplacementReserve: number;
};

export const formStore = map<FormState>({
    ppaZone: '',
    gridCongestionLevel: 0,
    globalHorizontalIrradiance: 0,
    diffuseHorizontalIrradiance: 0,
    shadingCoef: 0,
    moduleEfficiency: '',
    inverterTopology: 'string',
    bifacialGain: 0,
    storageCapacityKwh: 0,
    depthOfDischarge: 0,
    cycleLife: 0,
    batteryChemistry: 'LFP',
    roundTripEfficiency: 92.5,
    interconnectionAgreementStatus: '',
    netMeteringCap: false,
    exportLimitKw: 0,
    pccVoltage: 480,
    transformerImpedance: 5.5,
    roofPitchDegrees: 0,
    rafterSpacing: 0,
    windUpliftResistance: 0,
    seismicRiskZone: 'D',
    irrTarget: 0,
    wacc: 0,
    balloonPayment: 0,
    itcPercentage: 30,
    depreciationSchedule: 'MACRS-5',
    srecValue: 0,
    dataAcquisitionIntervalSeconds: 300,
    weatherStationRequired: false,
    pyranometerClass: 'Secondary Standard',
    apiHandshakeProtocol: 'REST',
    preventativeMaintenanceIntervalMonths: 12,
    moduleCleaningFrequency: 2,
    inverterReplacementReserve: 0
});

export const nextStep = () => {
    const current = stepStore.get();
    if (current < 10) stepStore.set(current + 1);
}

export const prevStep = () => {
    const current = stepStore.get();
    if (current > 1) stepStore.set(current - 1);
}

export const stepStore = atom<number>(1); // 1 to 10 for the topics

// --- Persistence Bridge ---
const STORAGE_KEY = 'helios_form_data';

// 1. Save to localStorage whenever store changes
formStore.subscribe(value => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
        // Ignore storage errors
    }
});

// 2. Hydrate from localStorage on load (if available)
try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        formStore.set({ ...formStore.get(), ...JSON.parse(saved) });
    }
} catch (e) { }

// 3. Listen for changes from other tabs
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
            try {
                const newData = JSON.parse(e.newValue);
                formStore.set({ ...formStore.get(), ...newData });
            } catch (err) { }
        }
    });
}
