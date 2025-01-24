const Total = document.getElementById("billTotal");
const oneDollarTotal = document.getElementById("oneDollarTotal");
const fiveDollarTotal = document.getElementById("fiveDollarTotal");
const tenDollarTotal = document.getElementById("tenDollarTotal");
const twentyDollarTotal = document.getElementById("twentyDollarTotal");
const fiftyDollarTotal = document.getElementById("fiftyDollarTotal");
const hundredDollarTotal = document.getElementById("hundredDollarTotal");
const pennyTotal = document.getElementById("pennyTotal");
const nickelTotal = document.getElementById("nickelTotal");
const dimeTotal = document.getElementById("dimeTotal");
const quarterTotal = document.getElementById("quarterTotal");
const pennyRollsTotal = document.getElementById("pennyRollsTotal");
const nickelRollsTotal = document.getElementById("nickelRollsTotal");
const dimeRollsTotal = document.getElementById("dimeRollsTotal");
const quarterRollsTotal = document.getElementById("quarterRollsTotal");

const oneDollarCount = document.getElementById("oneDollarCount");
const fiveDollarCount = document.getElementById("fiveDollarCount");
const tenDollarCount = document.getElementById("tenDollarCount");
const twentyDollarCount = document.getElementById("twentyDollarCount");
const fiftyDollarCount = document.getElementById("fiftyDollarCount");
const hundredDollarCount = document.getElementById("hundredDollarCount");
const pennyCount = document.getElementById("pennyCount");
const nickelCount = document.getElementById("nickelCount");
const dimeCount = document.getElementById("dimeCount");
const quarterCount = document.getElementById("quarterCount");
const pennyRollsCount = document.getElementById("pennyRollsCount");
const nickelRollsCount = document.getElementById("nickelRollsCount");
const dimeRollsCount = document.getElementById("dimeRollsCount");
const quarterRollsCount = document.getElementById("quarterRollsCount");
const outcomeOfRegister = document.getElementById("outcomeOfRegister");

const counts = document.querySelectorAll(".count");

const clickSound = document.getElementById('clickSound');

const idIndexPair = Array.from(counts).map((input, index) => ({
    id: input.id,
    index: index
}))

//console.log(idIndexPair);

var cashTotal = 0.00;

const money = [
    { name: 'One Dollar', value: 1, countID: oneDollarCount, TotalID: oneDollarTotal},
    { name: 'Five Dollars', value: 5, countID: fiveDollarCount, TotalID: fiveDollarTotal},
    { name: 'Ten Dollars', value: 10, countID: tenDollarCount, TotalID: tenDollarTotal },
    { name: 'Twenty Dollars', value: 20, countID: twentyDollarCount, TotalID: twentyDollarTotal },
    { name: 'Fifty Dollars', value: 50, countID: fiftyDollarCount, TotalID: fiftyDollarTotal },
    { name: 'Hundred Dollars', value: 100, countID: hundredDollarCount, TotalID: hundredDollarTotal },
    { name: 'Penny', value: .01, countID: pennyCount, TotalID: pennyTotal },
    { name: 'Nickel', value: .05, countID: nickelCount, TotalID: nickelTotal },
    { name: 'Dime', value: .10, countID: dimeCount, TotalID: dimeTotal },
    { name: 'Quarter', value: .25, countID: quarterCount, TotalID: quarterTotal },
    { name: 'Penny Roll', value: .50, countID: pennyRollsCount, TotalID: pennyRollsTotal},
    { name: 'Nickel Roll', value: 2, countID: nickelRollsCount, TotalID: nickelRollsTotal },
    { name: 'Dime Roll', value: 5, countID: dimeRollsCount, TotalID: dimeRollsTotal },
    { name: 'Quarter Roll', value: 10, countID: quarterRollsCount, TotalID: quarterRollsTotal }
];

var moneyAmount = [
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
    {total: 0,count: 0},
]


function addtoTotal(indx){
        moneyAmount[indx].count++;
        moneyAmount[indx].total += money[indx].value;
        money[indx].countID.value = moneyAmount[indx].count;
        money[indx].TotalID.value = moneyAmount[indx].total.toFixed(2);
        clickSound.play();
        calculateTotal();
}

function subtoTotal(indx){
    if(moneyAmount[indx].total > 0.000){
    moneyAmount[indx].count--;
    moneyAmount[indx].total -= money[indx].value;
    if(moneyAmount[indx].total < 0.001){
        moneyAmount[indx].total = 0.00;
    }
    money[indx].countID.value = moneyAmount[indx].count;
    money[indx].TotalID.value = moneyAmount[indx].total.toFixed(2);
    calculateTotal();
    }
}

counts.forEach((input,index) => input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
         //   console.log("hi");
        moneyAmount[index].count = input.value;
        moneyAmount[index].total = (moneyAmount[index].count)*(money[index].value);
        if(moneyAmount[index].total < 0.001){
            moneyAmount[index].total = 0.00;
        }
        input.value = moneyAmount[index].count;
        money[index].TotalID.value = moneyAmount[index].total.toFixed(2);
       calculateTotal();
    }

}
))

function calculateTotal(){
    total = 0.00;
    for(let i = 0;i<money.length;i++){
        total += moneyAmount[i].total;
    }
    if(total < 0.001){
        total = 0.00;
    }
    Total.value = total.toFixed(2);
    return Total.value;
}

function closeRegister(){
    if(calculateTotal() > 200){
    var j = 0;
    var text = "Bills in the envelope:<br>";
    var moneyInEnvelope = 0.00;
    revenue = Math.floor(calculateTotal()-200);
    console.log(revenue);
    for(let i = 5; i >= 4; i--){
        const bills = Math.min((Math.floor(revenue/(money[i].value))), moneyAmount[i].count || 0);
        revenue -= bills*money[i].value;
        console.log(bills);
        moneyInEnvelope += bills*money[i].value;
        if(bills != 0){
            text += "$" + money[i].value + ": " + bills + "<br>";
        }
    }
    for(let i = 3; i >= 0; i--){
        if(revenue > 4){
            const bills = Math.min((Math.floor(revenue/(money[i].value))), (moneyAmount[i].count)-1 || 0);
            revenue -= bills*money[i].value;
            console.log(bills);
            moneyInEnvelope += bills*money[i].value;
            if(bills != 0){
            text += "$" + money[i].value + ": " + bills + "<br>";
            }
        } 
    }
    var moneyInRegister = (calculateTotal() - moneyInEnvelope).toFixed(2);
    text += "money in envelope: $" + moneyInEnvelope.toFixed(2) + "<br>" + "money in register: $" + moneyInRegister;
    }else {
        text = "There must be more than $200 in the cash register <br> to close for the day";
    }
    outcomeOfRegister.innerHTML = text;
}

function clearTotal(){
    for(let i = 0; i < moneyAmount.length; i++){
        moneyAmount[i].total = 0.00;
        money[i].TotalID.value = moneyAmount[i].total.toFixed(2);
        moneyAmount[i].count = 0;
        money[i].countID.value = 0;
    }
    Total.value = (0.00).toFixed(2);
}