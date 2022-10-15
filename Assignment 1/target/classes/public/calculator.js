count_total = 4;

function sum(obj,index){

  var key_index
  for (each_index = 0; each_index < index.length; each_index++){
    if (index[each_index] >= '0' && index[each_index] <= '9'){
      key_index = index[each_index]
    }
  }

  var first = document.getElementById("got"+key_index);
  var second = document.getElementById("total"+key_index);

  if (first.value != ''){
    temp1 = parseFloat(first.value)
  }

  if (second.value != ''){
    temp2 = parseFloat(second.value)
    if (second.value == 0){
      document.getElementById("ans"+key_index).value = "INVALID";
      alert(" The total score can NOT be zero");
      return;
    }
  }

  temp3 = (temp1/temp2).toFixed(4);
  document.getElementById("ans"+key_index).value = (temp3 * 100).toFixed(4) + "%";
}

function grab_value (index){
  var first = document.getElementById("got"+index);
  var second = document.getElementById("total"+index);
  if (first.value != ''){
    temp1 = parseFloat(first.value)
  }

  if (second.value != ''){
    temp2 = parseFloat(second.value)
  }
  if (first.value=='' || second.value == ''){
    return 0;
  }
  temp3 = (temp1/temp2).toFixed(4);
  return temp3;
}

function mean(obj){
  total = 0;
  count = 0;
  for (i = 1; i <=count_total; i++ ){
    if (grab_value(i) != 0){
      count += 1;
    }
    total += parseFloat(grab_value(i));
  }
  ans = (total / count).toFixed(2);
  document.getElementById("mean").value = "The mean of grades is " + ans;
}

function grab_weight(order){
  weight_in_page = document.getElementById("weight"+order);

  return_value = parseFloat(weight_in_page.value);

  if (weight_in_page.value == ''){
    return 0;
  }
  return return_value;
}

function weight(obj){
  num = 0;
  total_score = 0;
  each_weight = new Array();
  scores = new Array();
  for (j = 1; j <= count_total; j++){
    scores[j] = parseFloat(grab_value(j));
    if (parseFloat(grab_value(j)) !=0){
    }
    each_weight[j] = grab_weight(j);
  }

  for (k = 1; k <= count_total; k++){
    total_score += parseFloat(scores[k]*each_weight[k]);
    num += each_weight[k];
  }

  final_ans = (total_score / num).toFixed(3);
  document.getElementById("weighted").value = "The weight of grade is " + final_ans;
}


function clean_all(){

  for (k = 1; k <= count_total; k++){
    document.getElementById('total' + k).value = '';
    document.getElementById('got' + k).value = '';
    document.getElementById('ans' + k).value = '';
  }
}

function addRow(){
  count_total ++;

  if (count_total >= 9){
    document.getElementById("new_line").style.cursor = "not-allowed";
    document.getElementById("new_line").style.opacity = 0.6;
    count_total -- ;
    return;
  }
  var table = document.getElementsByTagName('table')[0];
  var newRow = table.insertRow(table.rows.length);

  var cel1 = newRow.insertCell(0);
  var cel2 = newRow.insertCell(1);
  var cel3 = newRow.insertCell(2);
  var cel4 = newRow.insertCell(3);
  var cel5 = newRow.insertCell(4);


  cel1.innerHTML = "Activity "+ count_total
  cel2.innerHTML = "A" + count_total
  cel3.innerHTML = '<td><input type="text" id= "weight" value="" placeholder = "Weight"></td>'
  document.getElementById("weight").id = 'weight' + count_total;
  cel4.innerHTML = '<td><input type="text" id="got" value="" placeholder = "Score"> / <br> <input type="text" id="total" value="" onkeyup="sum(this,this.id)" placeholder = "Total"></td>'
  document.getElementById("got").id = 'got' + count_total;
  document.getElementById("total").id = 'total' + count_total;
  cel5.innerHTML = '<td> <input type="text" id="ans" style="border: 0; background-color: rgb(234,239,241);font-size: 1em; text-align:center"></td>'
  document.getElementById("ans").id = 'ans' + count_total;

 }
