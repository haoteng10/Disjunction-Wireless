//--------------------PLAN SECTION---------------------------
class Plan {
  constructor(name, basePrice, freeMb, mbCharge, mbUsed) {
    this.name = name;
    this.basePrice = basePrice;
    this.freeMb = freeMb;
    this.mbCharge = mbCharge;
    this.mbUsed = mbUsed;
  }

  calculateCost = () =>
    this.basePrice + Math.max(0, (this.mbUsed - this.freeMb) * this.mbCharge);
}

const PLANS = [
  class extends Plan {
    constructor(mbUsed) {
      super("Basic", 19.99, 1000, 0.1, mbUsed);
    }
  },
  class extends Plan {
    constructor(mbUsed) {
      super("Comprehensive", 24.99, 4000, 0.25, mbUsed);
    }
  },
  class extends Plan {
    constructor(mbUsed) {
      super("Basic", 4.99, 0, 0.02, mbUsed);
    }
  },
  class extends Plan {
    constructor(mbUsed) {
      super("Unlimited", 49.99, 0, 0, mbUsed);
    }
  }
];

//--------------CUSTOMER SECTION---------------------------
//You have been promoted to customer lmao
//@see yeet function - the used numbers are generated there
class Customer {
  constructor() {
    this.phoneNumber = ((USED_NUMBERS) => {
      while (true) {
        var num = Math.round(Math.random() * 9000000000) + 1000000000;
        if (!USED_NUMBERS.has(num)) {
          USED_NUMBERS.add(num);
          return num;
        }
      }
    })();

    this.dataUsage = Math.ceil(Math.random() * 40000);
    this.plan = new PLANS[Math.floor(Math.random() * PLANS.length)](
      this.dataUsage
    );
  }

  //Generates random data usage amount and updates the plan accordingly
  randomMb() {
    this.dataUsage = Math.ceil(Math.random() * 40000);
    this.plan.mbUsed = this.dataUsage;
  }
}

//---------------------STUFF WE'LL USE SOMEWHERE ELSE LOL---------------------------
const yeet = () => {
  const USED_NUMBERS = new Set();
  return Array(Math.round(Math.random() * 9000) + 1000)
    .fill(0)
    .map((pineapplesGoOnPizza) => new Customer(USED_NUMBERS));
};

//Use this instead of yeet for annualized data
const veryYeet = () => {
  //To check: might backfire as all the things point to the same thing
  Array(12).fill
  return Array(12)
    .fill(yeet())
    .forEach((x) => x.randomMb());
};
