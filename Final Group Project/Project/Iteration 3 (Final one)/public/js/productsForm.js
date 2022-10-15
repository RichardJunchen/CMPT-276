var numberOfRows = 1;

window.addEventListener('load', function () {
    document.getElementById("addJacketBtn").addEventListener("click", addJacketRow);
    document.getElementById("deleteJacketBtn").addEventListener("click", deleteJacketRow);
});

function deleteJacketRow() {
    var rows = document.getElementById("rows-div");
    rows.removeChild(rows.lastChild);
    if (rows.childElementCount > 0) {
        numberOfRows--;
    }
    
}


function addJacketRow() {
    numberOfRows += 1;
    var rowsDiv = document.getElementById("rows-div");
    var formRow = document.createElement('div');
    formRow.className = "form-row";


    var skuGroup = document.createElement('div');
    skuGroup.className = "form-group col-md-1.5";

    var skuLabel = document.createElement('label')
    skuLabel.textContent = "SKU ID#"

    var skuInput = document.createElement('input')
    skuInput.setAttribute('type', 'text')
    skuInput.className = "form-control"
    skuInput.setAttribute("name", "sku" + numberOfRows);
    
    skuGroup.appendChild(skuLabel);
    skuGroup.appendChild(skuInput);

    // for gender
    var genderGroup = document.createElement('div');
    genderGroup.className = "form-group col-md-1.5";

    var genderLabel = document.createElement('label')
    genderLabel.textContent = "Gender"


    var genderList = document.createElement('select')
    genderList.className = "form-control";
    genderList.setAttribute("name", "gender" + numberOfRows);
    var male = document.createElement('option');
    male.text = "Male"
    var female = document.createElement('option');
    female.text = "Female"
    var unisex = document.createElement('option');
    unisex.text = "Unisex"

    genderList.appendChild(male);
    genderList.appendChild(female);
    genderList.appendChild(unisex);

    genderGroup.appendChild(genderLabel);
    genderGroup.appendChild(genderList);


    //sizes 
    var sizeGroup = document.createElement('div');
    sizeGroup.className = "form-group col-md-1.5";

    var sizeLabel = document.createElement('label')
    sizeLabel.textContent = "Size"

    var sizeList = document.createElement('select')
    sizeList.setAttribute("name", "size" + numberOfRows);
    sizeList.className = "form-control"
    var XS = document.createElement('option');
    XS.text = "XS"
    var S = document.createElement('option');
    S.text = "S"
    var M = document.createElement('option');
    M.text = "M"
    var L = document.createElement('option');
    L.text = "L"
    var XL = document.createElement('option');
    XL.text = "XL"

    sizeList.appendChild(XS);
    sizeList.appendChild(S);
    sizeList.appendChild(M);
    sizeList.appendChild(L);
    sizeList.appendChild(XL);

    sizeGroup.appendChild(sizeLabel);
    sizeGroup.appendChild(sizeList);

    // colors 
    var colorGroup = document.createElement('div');
    colorGroup.className = "form-group col-md-1.5";

    var colorLabel = document.createElement('label')
    colorLabel.textContent = "Color"

    var colorInput = document.createElement('input')
    colorInput.setAttribute('type', 'text')
    colorInput.className = "form-control"
    colorInput.setAttribute("name", "color" + numberOfRows);
    
    colorGroup.appendChild(colorLabel);
    colorGroup.appendChild(colorInput);

    // // location
    // var locationGroup = document.createElement('div');
    // locationGroup.className = "form-group col-md-1.5";

    // var locationLabel = document.createElement('label')
    // locationLabel.textContent = "Location"

    // var locationInput = document.createElement('input')
    // locationInput.setAttribute('type', 'text')
    // locationInput.className = "form-control"
    // locationInput.setAttribute("name", "location" + numberOfRows);

    // locationGroup.appendChild(locationLabel);
    // locationGroup.appendChild(locationInput);

    // image
    var imageGroup = document.createElement('div');
    imageGroup.className = "form-group col-md-1.5";

    var imageLabel = document.createElement('label')
    imageLabel.textContent = "Image Name"

    var imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'text')
    imageInput.className = "form-control"
    imageInput.setAttribute("name", "image" + numberOfRows);

    imageGroup.appendChild(imageLabel);
    imageGroup.appendChild(imageInput);

    // add the attributes to the row
    formRow.appendChild(skuGroup);
    formRow.appendChild(genderGroup);
    formRow.appendChild(sizeGroup);
    formRow.appendChild(colorGroup);
    // formRow.appendChild(locationGroup);
    // formRow.appendChild(countGroup);
    formRow.appendChild(imageGroup);

    // add the entire row to the div
    rowsDiv.appendChild(formRow);

}