var text=document.getElementById('name');
var amnt=document.getElementById('amnt');
var top=document.getElementById('bal');
var balance=0.00;

const values=localStorage.getItem('transactions') !== null ? JSON.parse(localStorage.getItem('transactions')) : [];
count1=values.length>0?values.length:0;
//alert(values);
function update(){
    localStorage.setItem('transactions',JSON.stringify(values));
}
function addtrans(){
    json={'id':Date.now(),'text':text.value,'amnt':amnt.value};
    values.push(json);
    count1++;
    showbalance();
    showdiff();
    showhistory();
    text.value='';
    amnt.value='';
    update();
}
function showbalance(){
    balance=0;
    for(var i=0;i<values.length;i++)
    balance=balance+parseFloat(values[i].amnt);
    //alert(balance);
    document.getElementById('bal').innerHTML="Rs: "+balance;
}
function showdiff(){
    var income=0.00;
    var expense=0.00;
    for(var i=0;i<values.length;i++){
        (parseFloat(values[i].amnt)<0)?expense=expense+parseFloat(values[i].amnt):income=income+parseFloat(values[i].amnt);
    }
    document.getElementById('incamnt').innerHTML="Rs: "+income;
    document.getElementById('expamnt').innerHTML="Rs: "+expense;
}
function showhistory(){
    var count=values.length;
    document.getElementById('history').innerHTML="";
    for(var i=0;i<count;i++){
        var st1="<div class='row' id='r1'><div class='col-md-7'>"+values[i].text+"</div>"+"<div class='col-md-3'>"+values[i].amnt+"</div>"+"<div class='col-md-1'><button class='close' onclick='deleteam(\""+values[i].id+"\")'>&times;</button></div></div>";
        var st2="<div class='row' id='r2'><div class='col-md-7'>"+values[i].text+"</div>"+"<div class='col-md-3'>"+values[i].amnt+"</div>"+"<div class='col-md-1'><button class='close' onclick='deleteam(\""+values[i].id+"\")'>&times;</button></div></div>";
        (parseFloat(values[i].amnt)<0)?document.getElementById('history').innerHTML+=st2:document.getElementById('history').innerHTML+=st1;
    }
}
function deleteam(id1){
    //alert(text1);
    var count=values.length;
    for(var i=0;i<count;i++){
        if(values[i].id== id1)
        values.splice(i,1);
    }
    showhistory();
    showdiff();
    showbalance();
    update();
}
showbalance();
showdiff();
showhistory();