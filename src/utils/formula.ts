import { Alternatif } from "@src/global";

// formula = akar ~ (jumlah nilai kriteria per alternatif ^ 2)
export const dividerNormalizedMatrix = (
  alternatives: Alternatif[]
): Alternatif[] => {
  // Get all criterion names from the first alternative's value array
  const criteriaNames = alternatives[0].value.map((v: any) => v.name);
  const dividers: { [key: string]: number } = {};

  // Calculate the divider for each criterion
  criteriaNames.forEach((name: string) => {
    let sumOfSquares = 0;

    alternatives.forEach((alt) => {
      const criterion = alt.value.find((v: any) => v.name === name);
      if (criterion) {
        sumOfSquares += Math.pow(parseFloat(criterion.value), 2);
      }
    });

    dividers[name] = Math.sqrt(sumOfSquares);
  });

  // Add the divider to each value object
  const updatedAlternatives = alternatives.map((alt) => ({
    ...alt,
    value: alt.value.map((v: any) => ({
      ...v,
      divider: dividers[v.name],
    })),
  }));

  return updatedAlternatives;
};

// nilai dibagi pembagi
export const getNormalizedValue = (alternatives: Alternatif[]) => {
  return alternatives.map((a) => ({
    ...a,
    value: a.value.map((v: any) => ({
      ...v,
      normalizedValue: parseFloat(v.value) / (v.divider || 1),
    })),
  }));
};

// nilai normalisasi dikali bobot
export const getNormalizedWeightValue = (
  alternatives: Alternatif[]
): Alternatif[] => {
  return alternatives.map((a) => ({
    ...a,
    value: a.value.map((v: any) => {
      const normalizedValue =
        v.normalizedValue !== undefined ? v.normalizedValue : 0;
      const weight = parseFloat(v.weight) || 0;

      return {
        ...v,
        normalizedWeightValue: normalizedValue * weight,
      };
    }),
  }));
};

// nilai solusi ideal positif
// formula = jika type benefit maka cari nilai max, jika type cost maka cari nilai min
export const getIdealPositiveValue = (
  alternatives: Alternatif[]
): Alternatif[] => {
  if (alternatives.length === 0) {
    return alternatives;
  }

  const criteriaNames = alternatives[0].value.map(
    (criterion: any) => criterion.name
  );

  const idealValues: { [key: string]: number } = {};

  criteriaNames.forEach((name: string) => {
    let maxBenefit = -Infinity;
    let minCost = Infinity;
    let type: "benefit" | "cost" = "benefit";

    alternatives.forEach((alternative) => {
      const criterion = alternative.value.find((v: any) => v.name === name);
      if (criterion) {
        type = criterion.type;
        const value = criterion.normalizedWeightValue ?? 0;

        if (type === "benefit") {
          if (!isNaN(value) && value > maxBenefit) {
            maxBenefit = value;
          }
        } else if (type === "cost") {
          if (!isNaN(value) && value < minCost) {
            minCost = value;
          }
        }
      }
    });

    idealValues[name] = type === "benefit" ? maxBenefit : minCost;
  });

  const updatedAlternatives = alternatives.map((alternative) => ({
    ...alternative,
    value: alternative.value.map((criterion: any) => ({
      ...criterion,
      idealPositiveValue: idealValues[criterion.name],
    })),
  }));

  return updatedAlternatives;
};

// nilai solusi ideal negatif
// formula = jika type benefit maka cari nilai min, jika type cost maka cari nilai max
export const getIdealNegativeValue = (
  alternatives: Alternatif[]
): Alternatif[] => {
  if (alternatives.length === 0) {
    return alternatives;
  }

  const criteriaNames = alternatives[0].value.map(
    (criterion: any) => criterion.name
  );

  const idealValues: { [key: string]: number } = {};

  criteriaNames.forEach((name: string) => {
    let minBenefit = Infinity;
    let maxCost = -Infinity;
    let type: "benefit" | "cost" = "benefit";

    alternatives.forEach((alternative) => {
      const criterion = alternative.value.find((v: any) => v.name === name);
      if (criterion) {
        type = criterion.type;
        const value = criterion.normalizedWeightValue ?? 0;

        if (type === "benefit") {
          if (!isNaN(value) && value < minBenefit) {
            minBenefit = value;
          }
        } else if (type === "cost") {
          if (!isNaN(value) && value > maxCost) {
            maxCost = value;
          }
        }
      }
    });

    idealValues[name] = type === "benefit" ? minBenefit : maxCost;
  });

  const updatedAlternatives = alternatives.map((alternative) => ({
    ...alternative,
    value: alternative.value.map((criterion: any) => ({
      ...criterion,
      idealNegativeValue: idealValues[criterion.name],
    })),
  }));

  return updatedAlternatives;
};

export const getRangeIdealPositive = (alternative: Alternatif[]) => {
  const result = alternative.map((a) => {
    let total = 0;
    a.value.map((v: any) => {
      total += Math.pow(v.idealPositiveValue - v.normalizedWeightValue, 2);
    });

    a.rangeIdealPositive = Math.sqrt(total);

    return a;
  });

  return result;
};
export const getRangeIdealNegative = (alternative: Alternatif[]) => {
  const result = alternative.map((a) => {
    let total = 0;
    a.value.map((v: any) => {
      total += Math.pow(v.idealNegativeValue - v.normalizedWeightValue, 2);
    });

    a.rangeIdealNegative = Math.sqrt(total);

    return a;
  });

  return result;
};

// formula : jarak ideal negatif/(jarak ideal negatif + jarak ideal positif)
export const getPreferences = (alternative: Alternatif[]) => {
  const result = alternative.map((a) => {
    if (a.rangeIdealNegative && a.rangeIdealPositive) {
      a.preferences =
        a.rangeIdealNegative / (a.rangeIdealNegative + a.rangeIdealPositive);
    }
    return a;
  });

  return result;
};
