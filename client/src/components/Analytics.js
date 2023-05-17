import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransection }) => {
    
    // category
    const categories = [
        "Food",
        "Clothes",
        "Electronics",
        "Grocery",
        "Health",
        "bills",
        "Cashback",
        "Tax",
        "Salary"

    ];

    // total transaction
    const totalTransaction = allTransection.length;
    const totalIncomeTransactions = allTransection.filter(
        (transaction) => transaction.type === "income"
    );
    const totalExpenseTransactions = allTransection.filter(
        (transaction) => transaction.type === "expense"
    );
    const totalIncomePercent =
        (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent =
        (totalExpenseTransactions.length / totalTransaction) * 100;

    //total turnover
    const totalTurnover = allTransection.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalIncomeTurnover = allTransection
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenseTurnover = allTransection
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent =
        (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent =
        (totalExpenseTurnover / totalTurnover) * 100;
    return (
            <>
                
                <div className="analytic-page">
                    <div>
                        <div className="card" style={{height:"48vh"}}>
                            <div className="card-header">
                                Total Transactions : {totalTransaction}
                            </div>
                            <div className="card-body" style={{paddingTop:"20px"}}>
                                <div className="d-flex justify-content-around">
                                    <h5 className="text-success">
                                        Income : {totalIncomeTransactions.length}
                                    </h5>
                                    <h5 className="text-danger">
                                        Expense : {totalExpenseTransactions.length}
                                    </h5>
                                </div>
                                <div style={{paddingTop:"2rem"}}>
                                    <Progress
                                        type="circle"
                                        strokeColor={"green"}
                                        className="mx-2"
                                        percent={totalIncomePercent.toFixed(0)}
                                    />
                                    <Progress
                                        type="circle"
                                        strokeColor={"red"}
                                        className="mx-2"
                                        percent={totalExpensePercent.toFixed(0)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
            
                        <div className="card" style={{height:"48vh"}}>
                            <div className="card-header">Total TurnOver : {totalTurnover}</div>
                            <div className="card-body" style={{paddingTop:"20px"}}>
                                <div className="d-flex justify-content-around" >
                                    <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
                                    <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
                                </div>
                                <div style={{paddingTop:"2rem"}}>
                                    <Progress
                                        type="circle"
                                        strokeColor={"green"}
                                        className="mx-2"
                                        percent={totalIncomeTurnoverPercent.toFixed(0)}
                                    />
                                    <Progress
                                        type="circle"
                                        strokeColor={"red"}
                                        className="mx-2"
                                        percent={totalExpenseTurnoverPercent.toFixed(0)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="xyz-p">
                            <h5>Categorywise Income</h5>
                        </div>
                        <div className="xyz-p-container">
                            {categories.map((category) => {
                                // console.log(allTransection);
                                const amount = allTransection
                                    .filter(
                                        (transaction) =>
                                            transaction.type === "income" &&
                                            transaction.category === category
                                    )
                                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                                
                                console.log(amount);
                                return (
                                        <div className="card" style={{height:"10vh",width:"35vb"}}>
                                            <div className="card-body">
                                                <h6>{category}</h6>
                                                <Progress
                                                    percent={Number(((amount / totalIncomeTurnover) * 100).toFixed(0))} 
                                                />
                                            </div>
                                        </div>
                                    
                                );
                            })}
                        </div>
                    </div>

                    <div>
                            <div className="xyz-p">
                                <h5>Categorywise Expense</h5>
                            </div>    
                        <div className="xyz-p-container" >
                            {categories.map((category) => {
                                
                                console.log( category ,allTransection);
                                const amount = allTransection
                                    .filter(
                                        (transaction) =>
                                            transaction.type === "expense" &&
                                            transaction.category === category
                                    )
                                
                                 console.log(amount);
                                const value =amount.reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                     (
                                        <div className="card" style={{height:"10vh",width:"35vb"}}>
                                            <div className="card-body">
                                                <h6>{category}</h6>
                                                <Progress
                                                    percent={Number(((value / totalExpenseTurnover) * 100).toFixed(
                                                        0
                                                    ))}
                                                />
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
            
            </>
    );
};

export default Analytics;