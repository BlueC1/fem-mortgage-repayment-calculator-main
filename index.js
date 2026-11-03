const form = document.querySelector('form');
const clearBtn = document.querySelector('.clear-btn');
const errorText = document.querySelectorAll('.error-text');
const submitBtn = document.querySelector('.submit-btn');

const amount = document.getElementById('mortgage-amount');
const term = document.getElementById('mortgage-term');
const rate = document.getElementById('interest-rate');
const repayment = document.querySelector('.repayment');
const interest = document.querySelector('.interest');

clearBtn.addEventListener('click', () => {
  form.reset();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkEmpty();
  getRepayments();
});

function checkEmpty() {
  const amountText = document.querySelector('.m-amount-text');
  const termText = document.querySelector('.term-text');
  const rateText = document.querySelector('.rate-text');
  const typeText = document.querySelector('.type-text');

  const amountSign = document.querySelector('.amount-text');
  const termSign = document.querySelector('.term-sign');
  const rateSign = document.querySelector('.rate-sign');

  if (!amount.value) {
    amountText.classList.remove('hidden');
    amount.style.borderColor = 'var(--clr-red)';
    amountSign.style.backgroundColor = 'var(--clr-red)';
    amountSign.style.color = 'white';
  } else if (amount.value) {
    amountText.classList.add('hidden');
    amount.style.borderColor = 'var(--clr-blue-500)';
    amountSign.style.backgroundColor = 'var(--clr-blue-100)';
    amountSign.style.color = 'var(--clr-blue-700)';
  }

  if (!term.value) {
    termText.classList.remove('hidden');
    term.style.borderColor = 'var(--clr-red)';
    termSign.style.backgroundColor = 'var(--clr-red)';
    termSign.style.color = 'white';
  } else if (term.value) {
    termText.classList.add('hidden');
    term.style.borderColor = 'var(--clr-blue-500)';
    termSign.style.backgroundColor = 'var(--clr-blue-100)';
    termSign.style.color = 'var(--clr-blue-700)';
  }

  if (!rate.value) {
    rateText.classList.remove('hidden');
    rate.style.borderColor = 'var(--clr-red)';
    rateSign.style.backgroundColor = 'var(--clr-red)';
    rateSign.style.color = 'white';
  } else if (rate.value) {
    rateText.classList.add('hidden');
    rate.style.borderColor = 'var(--clr-blue-500)';
    rateSign.style.backgroundColor = 'var(--clr-blue-100)';
    rateSign.style.color = 'var(--clr-blue-700)';
  }

  if (!repayment.checked && !interest.checked) {
    typeText.classList.remove('hidden');
  } else if (repayment.checked || interest.checked) {
    typeText.classList.add('hidden');
  }
}

function getRepayments() {
  const emptyResults = document.querySelector('.results-container-empty');
  const finalResults = document.querySelector('.results-container-complete');
  const repaymentsFinal = document.getElementById('repayments');
  const total = document.getElementById('total');

  const principle = amount.value;
  const termLength = term.value * 12;
  const interestRate = rate.value / 100 / 12;

  const percentage = interestRate + 1;
  const exponentiation = percentage ** termLength;
  const first = interestRate * exponentiation;
  const second = exponentiation - 1;
  const division = first / second;
  const mortgage = principle;
  const results = mortgage * division;

  const interestTotal = results * termLength - principle;

  const totalRepayment = +interestTotal + +principle;

  const monthlyInterest = interestTotal / 360;

  if (repayment.checked && amount.value && term.value && rate.value) {
    emptyResults.classList.add('hidden');
    finalResults.classList.remove('hidden');

    repaymentsFinal.textContent = `$${results.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
    total.textContent = `$${totalRepayment.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  if (interest.checked && amount.value && term.value && rate.value) {
    emptyResults.classList.add('hidden');
    finalResults.classList.remove('hidden');

    repaymentsFinal.textContent = `$${monthlyInterest.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

    total.textContent = `$${interestTotal.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
}
