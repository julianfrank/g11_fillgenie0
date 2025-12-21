import { map } from 'nanostores';

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

    // Topic 5: Interconnection
    interconnectionAgreementStatus: string;
    netMeteringCap: boolean;
    exportLimitKw: number;

    // Topic 6: Structural
    roofPitchDegrees: number;
    rafterSpacing: number;
    windUpliftResistance: number;

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
    interconnectionAgreementStatus: '',
    netMeteringCap: false,
    exportLimitKw: 0,
    roofPitchDegrees: 0,
    rafterSpacing: 0,
    windUpliftResistance: 0,
    irrTarget: 0,
    wacc: 0,
    balloonPayment: 0,
    itcPercentage: 30,
    depreciationSchedule: 'MACRS-5',
    srecValue: 0,
    dataAcquisitionIntervalSeconds: 300,
    weatherStationRequired: false,
    pyranometerClass: 'Secondary Standard',
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

export const stepStore = map<number>(1); // 1 to 10 for the topics
