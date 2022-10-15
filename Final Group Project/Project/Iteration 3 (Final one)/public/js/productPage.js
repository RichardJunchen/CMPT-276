var genderList = [];
var objectMap = {};
var sizeObjecct = [];
var jsonData;
var currentSelectedGender;
var currentSelectedColor;
var currentSelectedSize;

$(document).ready(function() {
    console.log( "document is ready!" );
    const path = window.location.href;
    const product_id = path.substring(path.lastIndexOf('/') + 1)
    var data = {
        id: product_id
    };
    console.log(data.id);
    $.ajax({
        url: '/getProductPageDetails',
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(response) {
            jsonData = response;
            console.log(jsonData);
            generateGenders(jsonData);
            generateGenderButtons(genderList);
        }
      });
});

function generateGenders (data) {
    for (var i = 0; i < data.length; i++) {
        var itemGender = data[i].gender;
        if (genderList.indexOf(itemGender) == -1) {
            genderList.push(itemGender)
        }    
    }
    console.log(genderList);
}

function generateGenderButtons(genderList) {
    var gendersDiv = document.getElementById("gendersDiv");
    for (var i = 0; i < genderList.length; i++) {
        var button = document.createElement("button");
        button.textContent = genderList[i];
        button.setAttribute('class','gender-button')
        gendersDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedGender = this.textContent;
            currentSelectedColor = null;
            currentSelectedSize = null;
            eraseColorSizeButtons();
            generateColorButtons(this.textContent);
            var genderButtons = gendersDiv.querySelectorAll(".gender-button");
            genderButtons.forEach(function(genderButton) {
                genderButton.style.border = "#e7e7e7";
                genderButton.style.background = "white";
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}

function eraseColorSizeButtons() {
    var sizesDiv = document.getElementById("sizesDiv");
    // add new sizes based on new gender/color option
    while (sizesDiv.hasChildNodes()) {
        sizesDiv.removeChild(sizesDiv.lastChild);
    }
    var colorsDiv = document.getElementById("colorsDiv");
    // add new sizes based on new gender/color option
    while (colorsDiv.hasChildNodes()) {
        colorsDiv.removeChild(colorsDiv.lastChild);
    }
}

function getAllColors(gender) {
    var colorList = [];
    for (var j = 0; j < jsonData.length;j++) {
        if (jsonData[j].gender == gender) {
            if (colorList.indexOf(jsonData[j].color) == -1) {
                colorList.push(jsonData[j].color);
            }
        }
    }
    return colorList;
}

function generateColorButtons(gender) {
    console.log("hit generateColorButtons!");
    var colors = getAllColors(gender);
    var colorsDiv = document.getElementById("colorsDiv");

    // remove all previous colors based on prev gender option
    while (colorsDiv.hasChildNodes()) {
        colorsDiv.removeChild(colorsDiv.lastChild);
    }
    // add new colors based on new gender option
    for (var i = 0; i < colors.length; i++) {
        var button = document.createElement("button");
        button.setAttribute('class','color-button')
        button.textContent = colors[i];
        colorsDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedColor = this.textContent;
            currentSelectedSize = null;
            generateSizeButtons(currentSelectedGender, currentSelectedColor);
            var colorButtons = colorsDiv.querySelectorAll(".color-button");
            colorButtons.forEach(function(colorButton) {
                colorButton.style.border = "#e7e7e7";
                colorButton.style.background = "white";
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}

function getAllSizes(gender,color) {
    var sizeList = [];
    for (var j = 0; j < jsonData.length;j++) {
        if (jsonData[j].gender == gender && jsonData[j].color == color) {
            if (sizeList.indexOf(jsonData[j].size) == -1) {
                sizeList.push(jsonData[j].size);
            }
        }
    }
    return sizeList;
}

function generateSizeButtons(gender,color) {
    var sizes = getAllSizes(gender,color);
    sizes = sizes.map(x => x.replace(/XS/g,"1"));
    sizes = sizes.map(x => x.replace(/S/g,"2"));
    sizes = sizes.map(x => x.replace(/M/g,"3"));
    sizes = sizes.map(x => x.replace(/L/g,"4"));
    sizes = sizes.map(x => x.replace(/XL/g,"5"));
    sizes.sort();
    sizes = sizes.map(x => x.replace(/1/g,"XS"));
    sizes = sizes.map(x => x.replace(/2/g,"S"));
    sizes = sizes.map(x => x.replace(/3/g,"M"));
    sizes = sizes.map(x => x.replace(/4/g,"L"));
    sizes = sizes.map(x => x.replace(/5/g,"XL"));
    var sizesDiv = document.getElementById("sizesDiv");
    // add new sizes based on new gender/color option
    while (sizesDiv.hasChildNodes()) {
        sizesDiv.removeChild(sizesDiv.lastChild);
    }
    for (var i = 0; i < sizes.length; i++) {
        var button = document.createElement("button");
        button.setAttribute('class','color-button')
        button.textContent = sizes[i];
        var count = 0;
        for (var j = 0; j < jsonData.length; j++) {
            if (jsonData[j].gender == gender && jsonData[j].color == color && jsonData[j].size == sizes[i]) {
                count = count + jsonData[j].quantity;
            }
        }
        console.log(count);
        if (count == 0) {
            button.disabled = "true";
            button.style.background = "lightgrey"
            button.setAttribute('class', 'outOfStock')
        }
        sizesDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedSize = this.textContent;
            var sizeButtons = sizesDiv.querySelectorAll(".color-button");
            sizeButtons.forEach(function(sizeButton) {
                if (!sizeButton.classList.contains('outOfStock')) {
                    sizeButton.style.border = "#e7e7e7";
                    sizeButton.style.background = "white";
                }
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}

function checkForm() {
    if (currentSelectedGender != null && currentSelectedColor != null && currentSelectedSize != null) {
        var sku_id;
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].gender == currentSelectedGender && jsonData[i].color == currentSelectedColor && jsonData[i].size == currentSelectedSize) {
                sku_id = jsonData[i].sku_id;
            }
        }
        console.log(sku_id);
        var form = document.getElementById("addToCartForm");
        var path = window.location.origin + "/after_add/" + jsonData[0].product_id + "/" + sku_id;
        form.action = path;
        console.log(form.action);
        return true;
    }
    else {
        alert('Please select a valid Gender/Color/Size combination!');
        return false;
    }
}