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

  const OUR_LORDS = yeet();
  displayTableData(OUR_LORDS);
  displayPlanStats(leMap);
  displayCustomerSelection(customersUsingBestPlan(OUR_LORDS));
  displayCustomerOverpayment(OUR_LORDS);
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
    const phoneNumber = customer.phoneNumber + "";
    customerTable.innerHTML += `<div class="item">(${phoneNumber.substring(
      0,
      3
    )}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}</div>`;

    customerTable.innerHTML += `<div class="item"> ${customer.plan.name} </div>`;

    customerTable.innerHTML +=
      '<div class="item">' + customer.dataUsage + " MB</div>";

    customerTable.innerHTML +=
      '<div class="item">$' + customer.plan.calculateCost().toFixed(2) + "</div>";
  });
};

const displayPlanStats = (planUsage) => {
  const basicPlan = document.getElementsByClassName("basic")[0];
  basicPlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.get("Basic").length}`;

  const comprehensivePlan = document.getElementsByClassName("comprehensive")[0];
  comprehensivePlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.get("Comprehensive").length}`;

  const suckerPlan = document.getElementsByClassName("sucker")[0];
  suckerPlan.getElementsByClassName(
    "no-customer"
  )[0].innerHTML = `${planUsage.get("Sucker").length}`;
};

const displayCustomerSelection = (data) => {
  const customerDiv = document.getElementsByClassName("customer")[0];

  customerDiv
    .getElementsByClassName("best")[0]
    .getElementsByClassName("plan-percentage")[0].innerHTML = `${(data * 100).toFixed(2)}%`;
  customerDiv
    .getElementsByClassName("worst")[0]
    .getElementsByClassName("plan-percentage")[0].innerHTML = `${
    ((1 - data) * 100).toFixed(2)
  }%`;
};

const displayCustomerOverpayment = (customers) => {
  const overpaymentDiv = document.getElementById("no-overpayment");
  overpaymentDiv.innerHTML = `$${calculateAvgOverpayment(customers).toFixed(2)}`;
};
