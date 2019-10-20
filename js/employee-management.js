/*eslint-env browser*/

var employee_list;
employee_list = [["vinay", "Software Dev", "5678"], 
                ["Krishna", "Marketing", "7789"], 
                ["John", "Manager", "6767"],
                ["Andy", "VP", "3245"], 
                ["Jeff", "CEO", "8989"]];


var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};


function addRow(rowList) {
    "use strict";
    var tableBody , rowNode, cellNode, textNode, buttonNode;

    /**
     * Create and add row
     */
    tableBody = document.getElementsByTagName("tbody").item(0);
    rowNode = document.createElement("tr");
    rowList.forEach(function(item) {
            cellNode = document.createElement("td");
            textNode = document.createTextNode(item);
            cellNode.appendChild(textNode);
            rowNode.appendChild(cellNode);
    });

    /**
     * Create button and add to the row
     */
    cellNode = document.createElement("td");
    buttonNode = document.createElement("BUTTON")
    textNode = document.createTextNode("Delete")
    buttonNode.classList.add("button");
    buttonNode.appendChild(textNode);
    cellNode.appendChild(buttonNode);
    rowNode.appendChild(cellNode);
    buttonNode.setAttribute('onclick', 'removeRow(this)');

    tableBody.appendChild(rowNode);

}


function removeRow(clickButton) {
    "use strict";
    var tableBody = document.getElementsByTagName("tbody").item(0);
    var rowIndex = clickButton.parentNode.parentNode.rowIndex - 1;
    tableBody.deleteRow(rowIndex);
    employee_list.splice(rowIndex, 1);
    updateTableCaption();
}


function validateFields() {
    "use strict";
    var name, title, extension, required, allFieldsFilled;

    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
    allFieldsFilled = true;

    required = "<span>Required field</span>";

    if(name == "" || title == "" || extension == "") {
        allFieldsFilled = false;
    }

    if(name == "") {
        $("error-name").innerHTML = required;
    }
    else{
        $("error-name").innerHTML = "";
    }

    if(title == "") {
        $("error-title").innerHTML = required;
    }
    else{
        $("error-title").innerHTML = "";
    }

    if(extension == "") {
        $("error-extension").innerHTML = required;
    }
    else{
        $("error-extension").innerHTML = "";
    }

    return allFieldsFilled;
}

function updateTableCaption() {
    "use strict";
    var caption = $("table-caption");
    var caption_text = `<b>Showing ${employee_list.length} Employees</b>`;
    caption.innerHTML = caption_text;
}

function getForumValues() {
    "use strict";
    var name, title, extension;

    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;

    return [name, title, extension];

}

function populateTable() {
    "use strict";
    for(var row in employee_list) {
        addRow(employee_list[row])
    }
}

function clearForm() {
    "use strict";
    $("name").value = "";
    $("title").value = "";
    $("extension").value = "";
}

function main() {
    "use strict";

    updateTableCaption();
    populateTable();

    $("addButton").addEventListener("click", function() {
        if(validateFields()) {
            var newRow = getForumValues();
            employee_list.push(newRow);
            addRow(newRow);
            updateTableCaption();
            clearForm();
        }
    });

}

main();