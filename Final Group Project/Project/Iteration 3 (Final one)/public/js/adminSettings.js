window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    document.getElementById("matter-2").style.display = "none"
    document.getElementById("matter-3").style.display = "none"
    document.getElementById("matter-4").style.display = "none"
    document.getElementById("matter-5").style.display = "none"

// https://stackoverflow.com/questions/35386064/jquery-editing-one-row-at-a-time

$('#product-table').find('.save, .cancel').hide();

$('.edit').on('click',function() {
    $('#product-table').find('.save, .cancel').hide();
    $('#product-table').find('.edit').show();
    $('*').prop('contenteditable', false)
    $(this).hide().siblings('.save, .cancel').show();
    currentTD = $(this).closest('td').siblings()
    $.each(currentTD, function () {
            $(this).attr("initialval", $(this).text())
        $(this).prop('contenteditable', true)
    });
});

$('.save').on('click', function() {
    var $btn = $(this);
    $('#product-table').find('.save, .cancel').hide();
    $btn.hide().siblings('.edit').show();
    currentTD = $(this).closest('td').siblings();
    $.each(currentTD, function () {
        $(this).prop('contenteditable', false)
    });
    var $row = $(this).closest("tr");
    var $tds = $row.find("td"); 
    var obj = {}
    var prevObj = {};
    var i = 0;
    $.each($tds, function() {               // Visits every single <td> element
        obj[i] = $(this).text()     // Prints out the text within the <td>
        prevObj[i] = $(this).attr("initialval")
        i++
    });
    

    // insert new values. undefined behavior for changing product/sku_id. other values should be fine.
    console.log(obj);
    console.log(prevObj);

    var data = {obj, prevObj}
    $.ajax({
        url: '/updateProduct',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data) {
            console.log('form submitted');
        }
      });
});

$('.cancel').on('click', function() {
    var $btn = $(this);
    $('#product-table').find('.save, .cancel').hide();
    $btn.hide().siblings('.edit').show();
    currentTD = $(this).closest('td').siblings()
    $.each(currentTD, function () {        
        $(this).text($(this).attr("initialval"));
        $(this).prop('contenteditable', false)
    });
});
});



function validateForm() {
    
    console.log("clicked submit");
    var $fileUpload = $("#files");
    if (parseInt($fileUpload.get(0).files.length) > 10) {
        alert("You are only allowed to upload a maximum of 10 files");
        return false;
    };
    return true;
}

function toggleMenu() {
let toggle = document.querySelector('.connect-toggle');
let navigation = document.querySelector('.connect-navigation');
let main = document.querySelector('.connect-main');
toggle.classList.toggle('active');
navigation.classList.toggle('active');
main.classList.toggle('active');
};


function get_option(obj) {
var temp = "none";
for (var i = 1; i < 6; i++) {
    if (i == obj)
        temp = "block";
    else
        temp = "none";
    document.getElementById("matter-" + i).style.display = temp;
}
}