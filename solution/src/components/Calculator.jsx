import { React, useState } from 'react'

export default function Calculator() {
    const[resultsActive, setResultsActive] = useState(false);
    const[monthlyRepayments, setMonthlyRepayments] = useState(0);
    const[repayOverTime, setRepayOverTime] = useState(0);
    const[data, setData] = useState({
        mortgageAmount: '',
        mortgageTerm: '',
        interestRate: '',
        mortgageType: ''
    });

    const changeData = e =>{
        setData({...data, [e.target.name]: e.target.value});
        console.log(data);
    }

    const handleCalculate = () => {
        const principal = parseFloat(data.mortgageAmount);
        const termInYears = parseFloat(data.mortgageTerm);
        const annualInterestRate = parseFloat(data.interestRate) / 100;
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = termInYears * 12;

        let monthlyRepayment = 0;
        let totalRepayOverTime = 0;

        if (data.mortgageType === 'repayment') {
            if (monthlyInterestRate > 0) {
                monthlyRepayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            } else {
                monthlyRepayment = principal / numberOfPayments;
            }
            totalRepayOverTime = monthlyRepayment * numberOfPayments;
        } else if (data.mortgageType === 'interest-only') {
            monthlyRepayment = principal * monthlyInterestRate;
            totalRepayOverTime = monthlyRepayment * numberOfPayments + principal;
        }

        setMonthlyRepayments(monthlyRepayment.toFixed(2));
        setRepayOverTime(totalRepayOverTime.toFixed(2));
        setResultsActive(true);
    }

    const handleClear = () => {
        setData({
            mortgageAmount: '',
            mortgageTerm: '',
            interestRate: '',
            mortgageType: ''
        });
        setMonthlyRepayments(0);
        setRepayOverTime(0);
        setResultsActive(false);
    }

    return (
        <div className="calculator">
            <div className="left">
                <div className="left-header">
                    <h2>Mortgage Calculator</h2>
                    <button onClick={handleClear}>Clear All</button>
                </div>
                <div className="inputs">
                    <div className="upper-input">
                        <p>Mortgage Amount</p>
                        <div className="upper-input-wrapper">
                            <i className="pound-sign">£</i>
                            <input type="text" name="mortgageAmount" value={data.mortgageAmount} className="mortgage-amount-input" onChange={changeData}/>
                        </div>
                    </div>
                    <div className="lower-input">  
                        <div className="mortgage-term-wrapper">
                            <p>Mortgage term</p>
                            <div className="mortgage-term-input-wrapper">
                                <input type="text" name="mortgageTerm" value={data.mortgageTerm} onChange={changeData}></input>
                                <span className="mortgage-term-sign">years</span>
                            </div>
                        </div>
                        <div className="interest-rate-wrapper">
                            <p>Interest Rate</p>
                            <div className="interest-rate-input-wrapper">
                                <input type="text" name="interestRate" value={data.interestRate} onChange={changeData}></input>
                                <span className="interest-rate-sign">%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="radios">
                <p>Mortgage Type</p>
                    <div className="repayment-radio">
                        <input type="radio" name="mortgageType" value="repayment" checked={data.mortgageType === "repayment"} onChange={changeData}></input>
                        <label htmlFor="repayment">Repayment</label>
                    </div>
                    <div className="interest-only-radio">
                        <input type="radio" name="mortgageType" value="interest-only" checked={data.mortgageType === "interest-only"} onChange={changeData}></input> 
                        <label htmlFor="interest-only">Interest Only</label>
                    </div>
                </div>
                <button className="calculate-button" onClick={handleCalculate}>
                    <img src="assets/images/icon-calculator.svg" alt="icon-calculator"/>
                    <b>Calculate Repayments</b>
                </button>
            </div>

            <div className="right">
            {resultsActive ? (
                <div className="results-wrapper">
                    <div className="results-description">
                        <h2>Your results</h2>
                        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                    </div>
                    <div className="results-details">
                        <div className="monthly-repayments">
                            <p>Your monthly repayments</p>
                            <h1>£{monthlyRepayments.toLocaleString()}</h1>
                        </div>
                        <div className="repay-over">
                            <p>Total you'll repay over the term</p>
                            <h2>£{repayOverTime.toLocaleString()}</h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-results-container">
                    <img src="assets/images/illustration-empty.svg" alt="illustration-empty" />
                    <h2>Results shown here</h2>
                    <p className="results-shown-here">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
                </div>
            )}
            </div>
        </div>
    )
}
