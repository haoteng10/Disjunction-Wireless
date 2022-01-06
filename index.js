window.onload = () => {
  initialize();
};

// Initialize
const initialize = () => {
  //Pad
  const header = document.getElementById("header").getBoundingClientRect();
  document.getElementById("pad").style.marginTop = `${
    header.bottom - header.top
  }px`;

  // Get customer data
  const OUR_LORDS = JSON.parse(localStorage.getItem("OUR_LORDS"));
  displayTableData(OUR_LORDS);
  console.log(OUR_LORDS);

  // Get plan data
  const planUsage = JSON.parse(localStorage.getItem("PLAN_DETAILS"));
  displayPlanStats(planUsage);

  // Get percentage using best/worst plan
  displayCustomerSelection(customersUsingBestPlan(OUR_LORDS));

  // Get average customer overypayment
  displayCustomerOverpayment(OUR_LORDS);
};

// Get the number of customers by plan
// const getNumCustomerByPlan = (planName) => leMap.get(planName).length;

// Get the best plan for the customer

const getBestPlanForCustomer = (customer) => {
  const cost = {};
  customer.plans.forEach((plan) => {
    cost[plan.name] = calculateBill(customer, plan);
  });

  let bestPlan = ["Basic", cost["Basic"]];
  for (const plan in cost) {
    if (cost[plan] < bestPlan[1]) {
      bestPlan[0] = plan;
      bestPlan[1] = cost[plan];
    }
  }
  return bestPlan;
};

// Get percentage of customers using the best plan
const customersUsingBestPlan = (customers) => {
  let count = 0;

  customers.forEach((customer) => {
    if (customer.plan.name === getBestPlanForCustomer(customer)[0]) {
      count++;
    }
  });

  return Math.round((count / customers.length) * 100) / 100;
};

//Calculate the monthly bill of the customer depending on the plan
const calculateBill = (customer, plan) => {
  let monthlyBill = plan.basePrice;
  if (plan.mbUsed > plan.freeMb) {
    monthlyBill += plan.mbCharge * (plan.mbUsed - plan.freeMb);
  }

  monthlyBill = Math.ceil(monthlyBill * 100) / 100;

  return monthlyBill;
};

const calculateAvgOverpayment = (customers) => {
  let customerOverpayments = [];
  customers.forEach((customer) => {
    const bestPlan = getBestPlanForCustomer(customer);
    if (bestPlan[0] !== customer.plan.name) {
      customerOverpayments.push(
        calculateBill(customer, customer.plan) - bestPlan[1]
      );
    } else {
      customerOverpayments.push(0);
    }
  });

  let sum = 0;
  customerOverpayments.forEach((overpayment) => {
    sum += overpayment;
  });

  return Math.ceil((sum / customerOverpayments.length) * 100) / 100;
};

/* Need to talk abt this tmrw maybe lmao 
This CodeSandbox is really ruining ALOT more stuff than it first seems
const calculateAvgOverpayment = (customers) => {
  let overpay = 0;
  customers.forEach((customer) => {
    overpay += customer.calculateOverpayment();
  });

  return (overpay / customers.length).toFixed(2);
};
*/
// ===========================

// Display table data
const displayTableData = (customers) => {
  const customerTable = document.getElementsByClassName("customer-table")[0];
  customers.forEach((customer) => {
    const phoneNumber = customer.phoneNumber + "";
    customerTable.innerHTML += `<div class="item">(${phoneNumber.substring(
      0,
      3
    )}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}</div>`;

    customerTable.innerHTML += `<div class="item"> ${customer.plan.name} </div>`;

    customerTable.innerHTML +=
      '<div class="item">' + customer.dataUsage + " MB</div>";

    customerTable.innerHTML +=
      '<div class="item">$' + calculateBill(customer, customer.plan) + "</div>";
  });
};

const displayPlanStats = (planUsage) => {
  const basicPlan = document.getElementsByClassName("basic")[0];
  basicPlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.Basic.length}`;

  const comprehensivePlan = document.getElementsByClassName("comprehensive")[0];
  comprehensivePlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.Comprehensive.length}`;

  const suckerPlan = document.getElementsByClassName("sucker")[0];
  suckerPlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.Sucker.length}`;
};

const displayCustomerSelection = (data) => {
  const customerDiv = document.getElementsByClassName("customer")[0];

  customerDiv
    .getElementsByClassName("best")[0]
    .getElementsByClassName("plan-percentage")[0].innerHTML = `${data * 100}%`;
  customerDiv
    .getElementsByClassName("worst")[0]
    .getElementsByClassName("plan-percentage")[0].innerHTML = `${
    (1 - data) * 100
  }%`;
};

const displayCustomerOverpayment = (customers) => {
  const overpaymentDiv = document.getElementById("no-overpayment");
  overpaymentDiv.innerHTML = `$${calculateAvgOverpayment(customers)}`;
};
