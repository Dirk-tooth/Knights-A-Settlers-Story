const meta = {
  gold: {
    richest: 1,
    poorest: -2,
    affect: true,
  },
  settlements: 1,
  cities: 2,
  harbors: {
    threshold: 3,
    score: 2,
    affect: true,
  },
  roads: {
    threshold: 5,
    score: 2,
    affect: true,
  },
  knights: {
    threshold: 5,
    score: 2,
    affect: true,
  },
  fish: {
    score: 1,
    limit: 8,
  },
  spices(numSpices) {
    switch (numSpices) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 5;
      case 5: return 8;
      case 6: return 13;
      default: return 0;
    }
  },
  pirates(numPirates) {
    switch (numPirates) {
      case 1: return 1;
      case 2: return 4;
      case 3: return 8;
      case 4: return 14;
      default: return 0;
    }
  },
  trade: {
    threshold: 4,
    score: 2,
    affect: true,
  },
  politics: {
    threshold: 4,
    score: 2,
    affect: true,
  },
  science: {
    threshold: 4,
    score: 2,
    affect: true,
  },
  defenders: 1,
  merchant: {
    score: 1,
    affect: true,
  },
  constitution: {
    score: 1,
  },
  printer: {
    score: 1,
  },
  boot: 1,
};

export default meta;
