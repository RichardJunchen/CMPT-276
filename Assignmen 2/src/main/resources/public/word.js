let divTyping = document.getElementById('text')
let i = 0,
timer = 0,
str = 'Please start with "ADD" button to add your first element!!!'
function typing () {
  if (i <= str.length) {
    divTyping.innerHTML = str.slice(0, i++) + '_'
    timer = setTimeout(typing, 100)
  }
  else {
    divTyping.innerHTML = str
    clearTimeout(timer)
  }
}
typing()

function jump_to_home(){
  window.location.href='introduction';
}

function jump_to_add(){
  window.location.href='rectangle';
}

function check_all(){
  window.location.href = 'all_rectangle';
}

function jump_to_delete(){
  window.location.href = 'delete_rectangle';
}



function back_to_home(){
  window.location.href='https://junchen-rectangle.herokuapp.com';
}

function view_rectangle(){
  var name = document.getElementById("name")
  var width = document.getElementById("width");
  var height = document.getElementById("height");
  var color = document.getElementById("color");
  var price = document.getElementById("price");


  document.getElementById("1").value = "The name is " + name.value;
  document.getElementById("2").value = "The width is " + width.value + " meter";
  document.getElementById("3").value = "The height is " + height.value + " meter";
  document.getElementById("4").value = "The color is " + color.value;
  document.getElementById("5").value = "The price is " + price.value + " CAD";

}
