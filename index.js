window.onload = () => {
  initialize();
  document.getElementById("shuffle").onclick = initialize;
};

// Initialize
const initialize = () => {
  //Pad
  const header = document.getElementById("header").getBoundingClientRect();
  document.getElementById("pad").style.marginTop = `${
    header.bottom - header.top
  }px`;

  const OUR_LORDS = yeet();
  displayTableData(OUR_LORDS);
  displayPlanStats(leMap);
  displayCustomerSelection(customersUsingBestPlan(OUR_LORDS));
  displayCustomerOverpayment(OUR_LORDS);
  displayBWP(OUR_LORDS);
  displayColorbox(leMap);
};

//Returns decimal number; we will do the rounding in the frontend
const customersUsingBestPlan = (customers) => {
  let count = 0;
  customers.forEach(customer => customer.isUsingBestPlan() && count++);

  return (count / customers.length);
};

const calculateAvgOverpayment = (customers) => {
  let overpay = 0;
  customers.forEach((customer) => {
    overpay += customer.calculateOverpayment();
  });

  return (overpay / customers.length);
};

//=============FRONTEND========================

const displayTableData = (customers) => {
  const customerTable = document.getElementsByClassName("customer-table")[0];
  customers.forEach((customer) => {
    let phoneDiv = document.createElement("div");
    phoneDiv.className = "item";
    phoneDiv.innerHTML = `(${(customer.phoneNumber + "").substring(0, 3)}) ${(customer.phoneNumber + "").substring(3, 6)}-${(customer.phoneNumber + "").substring(6)}`;

    let nameDiv = document.createElement("div");
    nameDiv.className = "item";
    nameDiv.innerHTML = customer.plan.name;

    let memoryDiv = document.createElement("div");
    memoryDiv.className = "item";
    memoryDiv.innerHTML = `${customer.dataUsage} MB`;

    let costDiv = document.createElement("div");
    costDiv.className = "item";
    costDiv.innerHTML = "$" + customer.plan.calculateCost().toFixed(2);

    customerTable.append(phoneDiv, nameDiv, memoryDiv, costDiv);
  });
};

const displayPlanStats = (planUsage) => {
  const plans = document.getElementsByClassName("plans")[0];
  plans.querySelector(".basic .no-customer").innerHTML = `${planUsage.get("Basic").length}`;
  plans.querySelector(".comprehensive .no-customer").innerHTML = `${planUsage.get("Comprehensive").length}`;
  plans.querySelector(".sucker .no-customer").innerHTML = `${planUsage.get("Sucker").length}`;
  //plans.querySelector(".unlimited .no-customer").innerHTML = `${planUsage.get("Unlimited").length}`;
};

const displayCustomerSelection = (data) => {
  const customerDiv = document.getElementsByClassName("customer")[0];
  customerDiv.querySelector(".best .plan-percentage").innerHTML = `${(data * 100).toFixed(2)}%`;
  customerDiv.querySelector(".worst .plan-percentage").innerHTML = `${
    ((1 - data) * 100).toFixed(2)
  }%`;
};

const displayCustomerOverpayment = (customers) => {
  document.getElementById("no-overpayment").innerHTML = `$${calculateAvgOverpayment(customers).toFixed(2)}`;
};

//MAKE SURE TO COLLAPSE THE CUSTOMER ARRAY!!!
const displayBWP = (customers) => {
  const bwpJSON = aggregateBestWorstPlan(customers);
  document.querySelector(".best .plan-rating-plan").innerHTML = bwpJSON.best;
  document.querySelector(".worst .plan-rating-plan").innerHTML = bwpJSON.worst;
}

const displayColorbox = (mappo) => {;
  const lePie = document.getElementById("pie");
  const names = Array.from(mappo.keys());
  const colors = ['#FF652F', '#FFE400', '#14A76C', '#52b4fa']; //4 values lol
  let background = `radial-gradient(
    circle closest-side at center,
    transparent 100%,
    #272727 0
  ), conic-gradient(`;
  
  var total = names.reduce((cumL, curr) => cumL + +mappo.get(curr).length, 0);
  let currGradientPercent = 0;
  names.forEach((plan, idx) => {
    var percent = +(+mappo.get(plan).length / total * 100).toFixed(2);
    background += `${colors[idx]} ${currGradientPercent}% ${currGradientPercent + percent}%, `;
    currGradientPercent += percent;
  });
  
  background = background.replace(/, $/gm, ")");
  lePie.style.background = background;
}