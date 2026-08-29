/**
 * WASTE2WATT SCIENTIFIC CONVERSION MODELS & MODULAR CALCULATORS
 * Based on anaerobic digestion bio-methanation kinetics and EPA WARM / IPCC factors.
 * Modular and configurable for calibration with real-world sensor telemetry.
 */

export interface ConversionParameters {
  biogasYieldPerKgOrganic: number; // m3 biogas per kg organic waste (default: 0.062 m3/kg)
  methaneContentPercent: number;    // % CH4 in biogas (default: 64.5%)
  chpElectricalEfficiency: number;  // CHP electrical conversion efficiency (default: 0.38 / 38%)
  biogasEnergyDensityKwhPerM3: number; // Energy density of 100% pure CH4 is ~9.97 kWh/m3, for 64.5% raw biogas is ~6.43 kWh/m3 thermal
  co2eAvoidedPerKgLandfillDiverted: number; // kg CO2e avoided per kg food waste diverted (default: 1.58 kg CO2e/kg)
  coalAvoidedPerKwh: number; // kg coal displacement per kWh clean electricity (default: 0.42 kg coal/kWh)
}

export const DEFAULT_CONVERSION_PARAMS: ConversionParameters = {
  biogasYieldPerKgOrganic: 0.062,      // 62 Litres / 0.062 m3 biogas per kg organic wet waste
  methaneContentPercent: 64.5,         // 64.5% methane
  chpElectricalEfficiency: 0.38,       // 38% electrical turbine efficiency
  biogasEnergyDensityKwhPerM3: 6.43,   // ~6.43 kWh thermal per m3 of raw biogas
  co2eAvoidedPerKgLandfillDiverted: 1.58, // 1.58 kg CO2e greenhouse gas mitigated per kg organic waste
  coalAvoidedPerKwh: 0.42,              // 0.42 kg coal avoided per kWh grid electricity
};

/**
 * Calculates estimated biogas volume (m3) from organic waste mass (kg)
 */
export function calculateBiogasOutput(
  organicKg: number,
  params: ConversionParameters = DEFAULT_CONVERSION_PARAMS
): number {
  return Number((organicKg * params.biogasYieldPerKgOrganic).toFixed(2));
}

/**
 * Calculates estimated clean electricity output (kWh) from biogas volume (m3)
 */
export function calculateElectricityOutput(
  biogasM3: number,
  params: ConversionParameters = DEFAULT_CONVERSION_PARAMS
): number {
  // Electricity (kWh) = Biogas (m3) * Energy Density (kWh/m3) * CHP Electrical Efficiency
  const kwh = biogasM3 * params.biogasEnergyDensityKwhPerM3 * params.chpElectricalEfficiency;
  return Number(kwh.toFixed(2));
}

/**
 * Calculates complete environmental mitigation impact from organic waste mass
 */
export function calculateEnvironmentalMitigation(
  organicKg: number,
  params: ConversionParameters = DEFAULT_CONVERSION_PARAMS
) {
  const biogasM3 = calculateBiogasOutput(organicKg, params);
  const electricityKwh = calculateElectricityOutput(biogasM3, params);
  const co2eAvoidedKg = Number((organicKg * params.co2eAvoidedPerKgLandfillDiverted).toFixed(2));
  const coalAvoidedKg = Number((electricityKwh * params.coalAvoidedPerKwh).toFixed(2));
  const treesEquivalence = Number((co2eAvoidedKg / 22).toFixed(1)); // 1 mature tree absorbs ~22 kg CO2/year
  const dieselSavedLiters = Number((electricityKwh * 0.27).toFixed(2)); // ~0.27 L diesel per kWh

  return {
    biogasM3,
    electricityKwh,
    co2eAvoidedKg,
    coalAvoidedKg,
    treesEquivalence,
    dieselSavedLiters,
  };
}

/**
 * Calculates community Eco-Points earned based on waste report parameters
 */
export function calculateEcoPoints(
  organicKg: number,
  segregationAccuracy: number = 0.95,
  isHighPriority: boolean = false
): number {
  const basePoints = Math.round(organicKg * 4); // 4 points per kg
  const accuracyBonus = Math.round(segregationAccuracy * 20); // up to +20 points for clean segregation
  const urgencyBonus = isHighPriority ? 15 : 0;
  return basePoints + accuracyBonus + urgencyBonus;
}
