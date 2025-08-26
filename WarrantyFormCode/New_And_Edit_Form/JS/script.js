"use strict";

//Fields to Hide
//let hideFieldsArray = ["current_part_entry", "View"];

//*** ON Load  ***/
document.onreadystatechange = function () {
  //Check the value on the DOM state - if it's 'interactive' then the DOM has loaded
  if (document.readyState === "interactive") {
    /**MAIN**/
    //Run StratusForms to move fields into custom html form
    setupStratusForms();
    //All Inputs add bootstrap form-control Class
    addFormControl();
    //Set Read only fields
    //    setReadOnly();
    //Run code based on new or edit form
     formSpecificRoutines();
    //Data Validation
     setFormDataValidation();
    //Initialize Tooltips
      initializeToolTips();
    //Initialize Click Events  
     //  setupPageClickEvents();

  } //End Interactive
}; //onReadyStateChange

// ****  MAIN FUNCTIONS **** 

/**
 * FUNCTION: Run stratus forms setup
 */
function setupStratusForms() {
  $().StratusFormsLight();
  //Remove BR from stratus forms elements
  $(".StratusFormsTemplate").find("br").remove();
}

/**
 * FUNCTION: Add Form Control to Text Boxes for Bootstrap
 */
function addFormControl() {
  //All input boxes add form-control Class
  //	$("input").addClass("form-control form-control-sm");
  $("select").addClass("form-control form-control-sm");
  //	$("select").addClass("custom-select form-control-sm");
  $("textarea").addClass("form-control form-control-sm");
  //Add inputs to all type text
  var textInputs = document.querySelectorAll("input[type=text]");
    textInputs.forEach(function (textInputs) {
    textInputs.classList.add("form-control");
    textInputs.classList.add("form-control-sm");
  });
}

/**
 * Function: setFormDataValidation()
 */
function setFormDataValidation() {
  //Disable by default toolTips
  $('[data-toggle="tooltip"]').tooltip("disable");
  //Set select Default()
   setSelectDefault();
  //Check if Empty
     setEmptyCheck();
}

/**
 * FUNCTION: Run form specific routines
 */
function formSpecificRoutines() {
  //* GET DATA VARIABLES *//
  //Check to see what mode the page is in and runs the appropriate javascript
  //i.e: Display Mode, Edit Mode, View Mode
  var isNewMode = document.location.pathname.indexOf("/NewForm.aspx") > -1;
  //	var isDisplayMode = document.location.pathname.indexOf("/DispForm.aspx") > -1;
  var isEditMode = document.location.pathname.indexOf("/EditForm.aspx") > -1;
  //RUN Code based on current form mode
  if (isNewMode) {
    hideNewFormFields();
   // initializeNewFormHideCheckBoxes();
     console.log("New Mode");
  }
  //THIS CODE RUNS IF EDIT MODE
  if (isEditMode) {    
    //Initialize Field with check box    
   // initializeNewFormHideCheckBoxes();

    //Show 
    console.log("Edit Mode");
  }
}

/**
 * FUNCTION: setReadOnly
 */
function setReadOnly() {
  document.querySelector("[title = 'Chosen Supplier']").readOnly = true;
 
}

/**
 * FUNCTION: Setup Page Click Events
 */
function setupPageClickEvents() {
   //Add this click event   
     addChosenSupplierClickEvent();
 
}
 
// **  MAIN HELPER FUNCTIONS ** 

/**
 * FUNCTION: setSelectDefault
 */
function setSelectDefault() {  //
  defSelect("OEM", "Audi");
  defSelect("Pangea Facility", "Leon");
}

/**
 * FUNCTION: Check if Fields are Empty/Blank
 *  @param {*}: element title
 *  @param {*}: Tool Tip Id
 */
function setEmptyCheck() {
  //Inputs
  inputCheckEmpty("Defect", "idDefect");
  inputCheckEmpty("OEM Claim Number", "idEmpClmNum");
  inputCheckEmpty("Program","idPrg");
  inputCheckEmpty("Part Number","idPartNumber");
  inputCheckEmpty("Ship to Customer","idShipToCust");
  inputCheckEmpty("Vehicle Model","idVehModel");
  inputCheckEmpty("Mileage","idMileage");
  inputCheckEmpty("Repair Location","idRepLocation");
  inputCheckEmpty("Build Date","idBuildDate");
  inputCheckEmpty("Repair Date", "idRepairDate");
  inputCheckEmpty("Customer Narrative", "idCustNarrative");
  inputCheckEmpty("Max Response Time", "idMaxResponseTime");
  
  //Check People Picker Empty
  checkEmptyPeoplePicker("FQE", "idFldQualEng");
  checkEmptyPeoplePicker("Warranty Leader", "idWarrLeader");

}
/**
 * Input Check Empty
 * This Function Checks if the text field is empty
 * @param {*} elTitle
 * @param {*} toolTipId
 */
function inputCheckEmpty(elTitle, toolTipId) {
  //Get Value
  let elNode = document.querySelector("[title='" + elTitle + "']");

  elNode.addEventListener("blur", function () {
    //Get current Value
    let curValue = elNode.value;
    //Check if Current Value == NULL
    if (isEmptyFunction(curValue)) {
      //Make Border Red
      elNode.style.setProperty("border-color", "red");

      //Show Tooltip
      $("#" + toolTipId).tooltip("enable");
      $("#" + toolTipId).tooltip("show");

      //Move Cursor to current field
      elNode.focus();
    } else {
      //Make Border Green
      elNode.style.setProperty("border-color", "green");
      //Hide Tooltip
      //$("#" + toolTipId).tooltip("disable");
      disableToolTip(toolTipId);
    }
  });
}

/**
 * Hide Fields on the New Form
 * @param {*} hideFieldsArray
 */
function hideNewFormFields(){

 //Warranty Leader Section
    var addClass = document.getElementById("warrLeaderId");
    addClass.classList.add("d-none");


  //Warranty Leader Section
    var addClass = document.getElementById("seventhRowId");
    addClass.classList.add("d-none");
  //Next Section
   var addClass2 = document.getElementById("eightRowId");
   addClass2.classList.add("d-none");

}

/**
 * Initialize ToolTips
 */
function initializeToolTips() {
  $('[data-toggle="tooltip"]').tooltip({
    placement: "top",
  });
}

/**
 *  FUNCTION:Add departmental click event
 */
function addChosenSupplierClickEvent() {
    let elSupplierChoice = document.querySelector("[title='Select Supplier']");
     elSupplierChoice.addEventListener("change", setSupplierChoiceOnClick); 
}

/**
 * FUNCTION: setSupplierChoiceOnClick
 
 */
function setSupplierChoiceOnClick() {

      //On change Hide all check boxes first
      initializeNewFormHideCheckBoxes();

      //Get element of the dropdown
      const selectedValue = document.querySelector("[title='Select Supplier']").value;
      
      //Get the value of the element
       let textSupplierName; 
       let supplierName;
      
       //Test
      console.log("Selected Value: " + selectedValue);

   //Get the value of the selected option
     if (selectedValue == "Undecided") { 
       //If Undecided then set the value to empty
            textSupplierName = "Undecided";
            initializeNewFormHideCheckBoxes();
        } 
        else if(selectedValue == "Supplier 1")     
        {
            //Supplier 1
            supplierName = document.querySelector(".supplier1 > span > input");
            //Set Text
            textSupplierName = supplierName.value;

            toggleDivById("checkSupplier1", "show");
            
          
        }  
        else if (selectedValue == "Supplier 2") {
              //Supplier2
              supplierName = document.querySelector(".supplier2 > span > input");
              //Set Text
              textSupplierName = supplierName.value;

              toggleDivById("checkSupplier2", "show");
        }  
        else //Supplier 3    
        {
              //Supplier3
              supplierName = document.querySelector(".supplier3 > span > input");
              //Set Text
              textSupplierName = supplierName.value;

              toggleDivById("checkSupplier3", "show");

        } //end get Supplier chosen value

        console.log("Supplier Name: " + textSupplierName);

        //Set appropriate value in the Chosen Supplier Field
        let elChosenSupplier = document.querySelector("[title='Chosen Supplier']");
        elChosenSupplier.value = textSupplierName;

        
}/// SetSupplierChoiceOnClick
/***
 * Update Check Boxes based on Supplier Choice
 */
function updateCheckBoxes(choice) 
  {
   
    //reset all to hide
    initializeNewFormHideCheckBoxes();
    
    //Unhide the appropriate one
    if (choice == "Supplier 1") {
      toggleDivById("checkSupplier1", "show");
    } else if (choice == "Supplier 2") {
      toggleDivById("checkSupplier2", "show");
    } else if (choice == "Supplier 3")  { //Supplier 3
      toggleDivById("checkSupplier3", "show");
    }
    else{ 
      //do nothing! 
    }
}/** end updateCheckBoxes */

/**
 * FUNCTION: setDptCenterOnClick
 */
function toggleDivById(id,mode) {
  const div = document.getElementById(id,mode);  

  if(mode == "show"){
      div.style.display = "block";
  }
  else
  {
      div.style.display = "none";
  }
  
}

/**
 * FUNCTION: initializeNewForm Hide Check Boxes
 */
function initializeNewFormHideCheckBoxes()
{
    toggleDivById("checkSupplier1","hide");
    toggleDivById("checkSupplier2","hide");
    toggleDivById("checkSupplier3","hide");
}

/**
 * FUNCTION: editFormShowCurrentSelected
 */
function editFormShowCurrentSelected(){

  //Get current selected
    //  const selectedValue = document.querySelector("[title='Select Supplier']").value;
  //Set Current Sale
      setSupplierChoiceOnClick();

} // End Function editFormShowCurrentSelected

/**
 * defSelect
 * @param {*} elTitle
 * @param {*} firstValue
 */
function defSelect(elTitle, firstValue) {
  let elNode = document.querySelector("[title='" + elTitle + "']");
  //Only run this code once
  elNode.addEventListener(
    "click",
    function () {
      //Set the default value of the dropdown
      elNode.value = firstValue;
    },
    { once: true }
  );

  elNode.addEventListener("click", function () {
    $("select[Title='" + elTitle + "']")
      .find('option:contains("- select -")')
      .hide();
    elNode.style.setProperty("border-color", "green");
  });
}


// /**
//  * 	Function: isEmptyFunction(str)
//  * 	Pre:  string check for empty or blank
//  * 	Post: return true is not empty or false if empty
//  */
 function isEmptyFunction(str) {
   return str === null || str.match(/^ *$/) !== null;
 }

//  * FUNCTION: checkEmptyPeoplePicker
//  * @param {} elTitle
//  * @param {*} toolTipId
//  */
function checkEmptyPeoplePicker(elTitle, toolTipId) {
  //Get Value
  let elNode = document.querySelector("[title='" + elTitle + "']");

  elNode.addEventListener("focusout", function () {
    //getPeoplePickerDetails
    let peoplePickerVal = getPeoplePickerDetails(elTitle);

    console.log(peoplePickerVal);
    //Check if people picker is empty
    if (peoplePickerVal == null) {
      elNode.style.setProperty("border-color", "red");
      elNode.focus();

      //Show Tooltip
      $("#" + toolTipId).tooltip("enable");
      $("#" + toolTipId).tooltip("show");
    } else {
      elNode.style.setProperty("border-color", "green");
      //Hide Tooltip
      $("#" + toolTipId).tooltip("disable");
    }
  });
}


//  * GetPeoplePickerDetails
//  * @param {*} ppTitle
//  * @returns the account name resolved from people picker
//  */
function getPeoplePickerDetails(ppTitle) {
  var pEmail;
  var pAccountName;
  var pValue;

  var _PeoplePicker = $("div[title='" + ppTitle + "']");
  var _PeoplePickerTopId = _PeoplePicker.attr("id");
  var ppobject =
    SPClientPeoplePicker.SPClientPeoplePickerDict[_PeoplePickerTopId];

  let editorsInfo = ppobject.GetAllUserInfo();

  if (editorsInfo.length > 0) {
    pAccountName = editorsInfo[0].Key;
    pEmail = editorsInfo[0].Description;
    pValue = editorsInfo[0].DisplayText;
  }
  //	alert("Account Name: " + pAccountName + "Email: " + pEmail + "Value: " + pValue);
  return pAccountName;
}

// /**
//  * Disable Tool Tip
//  * @: give the tool tip Id
//  */
 function disableToolTip(toolTipId) {
   $("#" + toolTipId).tooltip("disable");
 }


// // * *** UNUSED FUNCTION **** 
// /**
//  * FUNCTION: removeClass
//  */
// function removeClass() {
//   var removeClass = document.getElementById("lockMe");
//   removeClass.classList.remove("disabled");
// }
// /**
//  * FUNCTION: setReadOnly
//  */
// function hideAllFieldsOnNewForm() {
//   $('td.ms-formlabel:contains("Finance Administrator")').parent().hide();
//   $('td.ms-formlabel:contains("Finance Administrator Status")').parent().hide();
//   $('td.ms-formlabel:contains("Finance Administrator Comments")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("Finance Director")').parent().hide();
//   $('td.ms-formlabel:contains("Direct Manager Comments")').parent().hide();
//   $('td.ms-formlabel:contains("Department Director-VP")').parent().hide();
//   $('td.ms-formlabel:contains("Department Director-VP Status")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("Department Director-VP Comments")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("Department Director")').parent().hide();
//   $('td.ms-formlabel:contains("Department Director Status")').parent().hide();
//   $('td.ms-formlabel:contains("Department Director Comments")').parent().hide();
//   $('td.ms-formlabel:contains("Direct Manager Status")').parent().hide();
//   $('td.ms-formlabel:contains("Workflow Status")').parent().hide();
//   $('td.ms-formlabel:contains("Related Documents")').parent().hide();
//   $('td.ms-formlabel:contains("View Item")').parent().hide();
//   $('td.ms-formlabel:contains("Global Finance Manager Status")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("CFO Status")').parent().hide();
//   $('td.ms-formlabel:contains("CEO Status")').parent().hide();
//   $('td.ms-formlabel:contains("Functional VP Status")').parent().hide();
//   $('td.ms-formlabel:contains("Resource Assessment Score")').parent().hide();
//   $('td.ms-formlabel:contains("Dpt Manager Comments")').parent().hide();
//   $('td.ms-formlabel:contains("Global Finance Manager Comments")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("Proposal Title")').parent().hide();
//   $('td.ms-formlabel:contains("Initiator")').parent().hide();
//   $('td.ms-formlabel:contains("CFO Comments")').parent().hide();
//   $('td.ms-formlabel:contains("Functional VP")').parent().hide();
//   $('td.ms-formlabel:contains("Global Finance Manager")').parent().hide();
//   $('td.ms-formlabel:contains("Functional VP")').parent().hide();
//   $('td.ms-formlabel:contains("CFO")').parent().hide();
//   $('td.ms-formlabel:contains("CEO")').parent().hide();
//   $('td.ms-formlabel:contains("Global Purchasing Manager Status")')
//     .parent()
//     .hide();
//   $('td.ms-formlabel:contains("Global Purchasing Manager")').parent().hide();
//   $('td.ms-formlabel:contains("NA Buyer")').parent().hide();
//   $('td.ms-formlabel:contains("NA Buyer Comments")').parent().hide();
//   $('td.ms-formlabel:contains("Global Purchasing Manager Comments")')
//     .parent()
//     .hide();

//   $('td.ms-formlabel:contains("CEO Comments")').parent().hide();
//   $('td.ms-formlabel:contains("NA Buyer Status")').parent().hide();

//   /// Hide all under on everything

//   $('td.ms-formlabel:contains("Global Purchasing Mgr")').parent().hide();

//   $('td.ms-formlabel:contains("Global Purch Mgr-Comments")').parent().hide();

//   $('td.ms-formlabel:contains("Global Purch Mgr-Status")').parent().hide();

//   $('td.ms-formlabel:contains("Exec VP Global Ops")').parent().hide();

//   $('td.ms-formlabel:contains("Executive VP Global Ops-Comments")')
//     .parent()
//     .hide();

//   $('td.ms-formlabel:contains("Global Purchasing-VP")').parent().hide();

//   $('td.ms-formlabel:contains("Global Purchasing-Comments")').parent().hide();

//   $('td.ms-formlabel:contains("Global Purchasing-VP Status")').parent().hide();
// }
// /**
//  * FUNCTION: addPartBtnClick()
//  */
// function addItemBtnClick() {
//   //Get Button by ID
//   const btnAddBtn = document.getElementById("btnAdd");
//   //Attach click event
//   btnAddBtn.addEventListener("click", addRecord);
// }

// /**
//  * FUNCTION: removePartBtnClick
//  */
// function removeItemBtnClick() {
//   //Get Button by ID
//   const btnRemoveBtn = document.getElementById("btnRemove");
//   //Attach Click event
//   btnRemoveBtn.addEventListener("click", removeRecord);
// }

// /**
//  * FUNCTION: Set Parts Quantity Inputs
//  */
// function assignClickEventsCalcTotal() {
//   const itemInputs = document.querySelectorAll(".partCalc");

//   itemInputs.forEach((itemElements) => {
//     itemElements.addEventListener("change", () => {
//       //Attach change event function to run on all partCalc elements
//       handleQTYUnitCostChange();
//     });
//   });
// }

// /**
//  * FUNCTION: calcRejectQuantities
//  */
// function handleQTYUnitCostChange() {
//   //Initialize Extended cost to zero
//   let extCost = 0;
//   let totalCost = 0;
//   let extCount = 0;

//   //Get the HTML elements we need to work with
//   const quantElement = document.querySelectorAll(".partCalc > span > input");
//   const extFields = document.querySelectorAll(".dummy");

//   //Set each Lines EXT Cost totals
//   for (var i = 0, len = quantElement.length; i < len; i++) {
//     //Get the QTY
//     let currentQuantity = quantElement[i].value;
//     let formatFloatQuantity;

//     //Increment i to the next item "UNIT COST"
//     i++;

//     //Get Current Unit Cost
//     let currentUnitCost = quantElement[i].value;
//     let formatFloatCurrentUnitCost;

//     //Remove Commas frp, bptj QTY and Unit Cost
//     currentQuantity = removeCommas(currentQuantity);
//     currentUnitCost = removeCommas(currentUnitCost);

//     //Change format to floats 2 decimal places
//     formatFloatQuantity = parseFloat(currentQuantity).toFixed(2);
//     formatFloatCurrentUnitCost = parseFloat(currentUnitCost).toFixed(2);

//     //Make sure both inputs are numbers if not (like empty) make zero

//     //Check for Not a number if so set to zero if they are not numbers.
//     if (isNaN(formatFloatQuantity)) {
//       formatFloatQuantity = 0;
//     }
//     if (isNaN(formatFloatCurrentUnitCost)) {
//       formatFloatCurrentUnitCost = 0;
//     }

//     //Multiply Quantity by Current Unit Cost
//     extCost = formatFloatQuantity * formatFloatCurrentUnitCost;
//     totalCost = extCost + totalCost;

//     //Set the EXT Cost to the result
//     extFields[extCount].value = extCost.toLocaleString();

//     //Increment the extCount index to the next (don't skip by 2)
//     extCount++;
//   } //End for Loop

//   //Set total field
//   let elTotalCost1 = document.getElementById("totalCost1");
//   let elTotalCost2 = document.getElementById("totalCost2");

//   elTotalCost1.innerHTML = totalCost.toLocaleString();
//   elTotalCost2.innerHTML = totalCost.toLocaleString();
// }

// /**
//  * FUNCTION: addRecord
//  */
// function addRecord() {
//   //Get Element of the current Part
//   const elCurrent = document.querySelector(".currentPart");
//   //Get ID of the current record
//   let currentId = elCurrent.id;

//   console.log(`Current record ID: ${currentId}`);

//   //Return ID of next record OR END if you are at the last record
//   let nextRecordId = getNextRecord(currentId);

//   //Log the nextRecordId
//   console.log(`next ID: ${nextRecordId}`);

//   //Get the Add/Remove Button Elements
//   let elBtnAdd = document.getElementById("btnAdd");
//   let elBtnRemove = document.getElementById("btnRemove");

//   if (nextRecordId == "End") {
//     //If nextRecordId = End disable add button
//     elBtnAdd.disabled = true;
//   } else {
//     //Get Next Record Id
//     let elNextRecord = document.getElementById(nextRecordId);

//     //Hidden Storage Sharepoint
//     let elCurrentPartEntry = document.querySelector(
//       '[title ="current_part_entry"]'
//     );
//     //If not then Remove the.currentPart class from current
//     elCurrent.classList.remove("currentPart");
//     //Add .currentPart class to next one
//     elNextRecord.classList.add("currentPart");
//     //Remove d-none from next
//     elNextRecord.classList.remove("d-none");
//     //Update the variable to store New current record
//     elCurrentPartEntry.value = nextRecordId;
//     //Top
//     if (nextRecordId == "part1") {
//       elBtnRemove.disabled = true;
//     }
//     //Bottom
//     else if (nextRecordId == "part8") {
//       elBtnAdd.disabled = true;
//       elBtnRemove.disabled = false;
//     }
//     //Anywhere Else
//     else {
//       elBtnAdd.disabled = false;
//       elBtnRemove.disabled = false;
//     }
//   }
// }

// /**
//  * FUNCTION: getNextRecord
//  */
// function getNextRecord(currentId) {
//   let nextId;

//   //Check each case
//   switch (currentId) {
//     case "part1":
//       nextId = "part2";
//       break;
//     case "part2":
//       nextId = "part3";
//       break;
//     case "part3":
//       nextId = "part4";
//       break;
//     case "part4":
//       nextId = "part5";
//       break;
//     case "part5":
//       nextId = "part6";
//       break;
//     case "part6":
//       nextId = "part7";
//       break;
//     case "part7":
//       nextId = "part8";
//       break;
//     case "part8":
//       nextId = "End";
//       break;
//   }

//   return nextId;
// }

// /**
//  * FUNCTION: removeRecord()
//  */
// function removeRecord() {
//   //Get Id of current Record
//   const elCurrent = document.querySelector(".currentPart");
//   //Assign Id of The current record
//   let currentId = elCurrent.id;
//   //	console.log(`remove button Current ID: ${currentId}`);
//   //Return ID of previous record OR Top if you are at the top record record1
//   let previousRecordId = getPreviousRecord(currentId);
//   //Log the nextRecordId
//   //	console.log(`remove Previous ID: ${previousRecordId}`);
//   //Get elements for add and remove buttons
//   let elBtnRemove = document.getElementById("btnRemove");
//   let elBtnAdd = document.getElementById("btnAdd");

//   let elNewCurrentPartRecord = document.querySelector(
//     '[title ="current_part_entry"]'
//   );
//   //Update the sharepoint field to hide the value
//   elNewCurrentPartRecord.value = previousRecordId;

//   if (previousRecordId == "Top") {
//     //The previous record is the top. Can't remove any more
//     elBtnAdd.disabled = false;
//     elBtnRemove.disabled = true;
//   } else {
//     //Get Previous record Element
//     let elPreviousRecord = document.getElementById(previousRecordId);
//     //ReAdjust the Current Part Marker class!
//     //If not then Remove then set .currentPart class from current
//     elCurrent.classList.remove("currentPart");
//     //Add .currentPart class to Previous
//     elPreviousRecord.classList.add("currentPart");
//     //Clear out the values in the record to remove
//     clearValuesForRemoveRecord(currentId);

//     //Add d-none to  current to hide/remove it
//     elCurrent.classList.add("d-none");

//     //Recalculate Total
//     //		calcRejectQuantities();

//     //If you just showed part 8 disable the Add button
//     let elBtnAdd = document.getElementById("btnAdd");
//     let elBtnRemove = document.getElementById("btnRemove");

//     //Top
//     if (previousRecordId == "part1") {
//       elBtnRemove.disabled = true;
//       elBtnAdd.disabled = false;
//     }
//     //Anywhere Else
//     else {
//       elBtnAdd.disabled = false;
//       elBtnRemove.disabled = false;
//     }
//   }

//   //Update the total again! Need to take into account removed
//   handleQTYUnitCostChange();
// }

// /**
//  * FUNCTION: getPrevousRecord
//  */
// function getPreviousRecord(currentId) {
//   let previousId;
//   //Check each case
//   switch (currentId) {
//     case "part1":
//       previousId = "Top";
//       break;
//     case "part2":
//       previousId = "part1";
//       break;
//     case "part3":
//       previousId = "part2";
//       break;
//     case "part4":
//       previousId = "part3";
//       break;
//     case "part5":
//       previousId = "part4";
//       break;
//     case "part6":
//       previousId = "part5";
//       break;
//     case "part7":
//       previousId = "part6";
//       break;
//     case "part8":
//       previousId = "part7";
//       break;
//     case "End":
//       previousId = "part8";
//   }
//   return previousId;
// }

// /**
//  * FUNCTION: removeCommas(stringToRemoveCommas)
//  */
// function removeCommas(str) {
//   while (str.search(",") >= 0) {
//     str = (str + "").replace(",", "");
//   }
//   return str;
// }

// /**
//  * FUNCTION: clear Remove Record Values
//  */
// function clearValuesForRemoveRecord(removeRecordId) {
//   //Clear Record Id
//   //	console.log(`Clear Record Values: ${removeRecordId}`);
//   //This should be the id of the record to remove
//   let idDigit = removeRecordId.substring(removeRecordId.indexOf("t") + 1);
//   //Need to clear out the values!
//   //	console.log(`Digit for the remove value: ${idDigit}`);

//   /* CREATE THE UNIQUE TITLES*/
//   //Quantity Number
//   let currQuant = "qty" + idDigit;
//   //Create toolTip Id
//   let toolTipId = "idQuant" + idDigit;
//   //UM
//   let currUm = "um" + idDigit;
//   //Part Number
//   let currPartNum = "part-number" + idDigit;
//   //Category
//   let currCatNum = "cat" + idDigit;
//   //Unit cost
//   let currUnitCost = "unit-cost" + idDigit;
//   //Clear out EXT Cost
//   let idExtCost = "ext-cost" + idDigit;
//   //DPT Number
//   let currDTPnum = "dept-cent" + idDigit;
//   //G/L Account Number
//   let currGLNum = "gl-number" + idDigit;
//   //Description
//   let currDescription = "description" + idDigit;

//   /*Get the Elements and Clear out Values*/

//   //Get Quantity Element
//   let elQuantityNumber = document.querySelector(
//     "[title =" + CSS.escape(currQuant) + "]"
//   );
//   //Get U/M Element
//   let elCurrUm = document.querySelector("[title =" + CSS.escape(currUm) + "]");
//   //Get Part Number
//   let elPartNum = document.querySelector(
//     "[title =" + CSS.escape(currPartNum) + "]"
//   );
//   //Get dropdown Category
//   let elCategoryDropDown = document.querySelector(
//     "[title =" + CSS.escape(currCatNum) + "]"
//   );
//   //Get Unit Cost
//   let elUnitCost = document.querySelector(
//     "[title =" + CSS.escape(currUnitCost) + "]"
//   );
//   //Get DPT Number
//   let elDPTnum = document.querySelector(
//     "[title =" + CSS.escape(currDTPnum) + "]"
//   );
//   //G/L account number
//   let elGlAccNum = document.querySelector(
//     "[title =" + CSS.escape(currGLNum) + "]"
//   );
//   //Description Field
//   let elDescriptionField = document.querySelector(
//     "[title =" + CSS.escape(currDescription) + "]"
//   );
//   //Get EXT cost by ID
//   let elExtCost = document.getElementById(idExtCost);

//   /* CLEAR THE VALUES */

//   //Clear Quanity Number
//   elQuantityNumber.value = "";
   //Remove any tooltip if it exists
//   disableToolTip(toolTipId);
//   //Hide the toolTop also
//   $("#" + toolTipId).tooltip("hide");
//   //Reset the color to original
//   elQuantityNumber.style.setProperty("border-color", "#ababab");

//   //Clear U/M
//   elCurrUm.value = "";
//   //Clear Part Number
//   elPartNum.value = "";
//   //Reset Category
//   elCategoryDropDown.value = "- select -";
//   //Clear Unit Cost
//   elUnitCost.value = "";
//   //Clear EXT cost
//   elExtCost.value = "";
//   //Clear DPT number
//   elDPTnum.value = "";
//   //Clear GL account number
//   elGlAccNum.value = "";
//   //Clear Description Field
//   elDescriptionField.value = "";
// }

// /**
//  * FUNCTION: showCurrentOrderEntry()
//  */
// function editFormShowCurrenEntry() {
//   //Get Part Number Element
//   let elCurrentPartEntry = document.querySelector(
//     "[title ='current_part_entry']"
//   );
//   //Get the value
//   let currentPartEntry = elCurrentPartEntry.value;
//   console.log(`Current Part Entry is: ${currentPartEntry}`);
//   //Get all part elements by Class
//   let elArrayAllParts = document.querySelectorAll(".partRow");
//   //Loop thru parts keep going until currentPart == id
//   //Array Length
//   let length = elArrayAllParts.length;
//   //Index
//   let i = 0;
//   //Set Loop Variable to first
//   let indexPartId = elArrayAllParts[i].id;
//   console.log(`First indexPartId: ${indexPartId}`);

//   if (currentPartEntry != "part1") {
//     //Remove Current Record from the first record
//     elArrayAllParts[i].classList.remove("currentPart");

//     //Current part is not part 1
//     i++;
//     //We need to go thru the parts
//     while (elArrayAllParts[i].id != currentPartEntry) {
//       //Display the record remove d-none
//       elArrayAllParts[i].classList.remove("d-none");

//       i++;
//     }
//     //i should be the current record
//     elArrayAllParts[i].classList.remove("d-none");
//     //Set as current record
//     elArrayAllParts[i].classList.add("currentPart");
//   } //Current Part Entry is == part1
//   else {
//     //Deactivate the remove Part button
//     let elBtnRemove = document.getElementById("btnRemove");
//     elBtnRemove.disabled = true;
//   }
// }

// /**
//  * FUNCTION: setDPTCenterOnClick()
//  */
// function setDptCenterOnClick() {
//   //Test
//   //alert("Dep Clicked");

//   //Get Vaue of the dropdown
//   let elementSelectDepartment = document.querySelector("[title='Department']");
//   //Set dropdown value department to a string variable
//   let selectDepartmentChoice = elementSelectDepartment.value;
//   //LookUp and return the code based on dropdown value
//   let dptDataObject = dptData.find(
//     (o) => o.department === selectDepartmentChoice
//   );

//   console.log(dptDataObject);
//   //Set all DPT centers with the new value
//   setAllElementsOfAClass(".dptCent > span > input", dptDataObject.dptCenter);
// }

// /**
//  * FUNCTION: setAllElementsOfAClass
//  * @param {*} classToSelect
//  * @param {*} stringValueToChange
//  */
// function setAllElementsOfAClass(classToSelect, stringValueToChange) {
//   //Get the elements for a given class
//   const elementsToUpdate = document.querySelectorAll(classToSelect);

//   //Add class to elementsToUpdate
//   elementsToUpdate.forEach((element) => {
//     //Change value for class group
//     element.value = stringValueToChange;
//   });
// }

// /**
//  * FUNCTION: hideFields
//  * @param {*} fields
//  */
// function hideFields(fields) {
//   for (let idx = 0; idx <= fields.length; idx++) {
//     $("td.ms-formlabel:contains(" + fields[idx] + ")")
//       .parent()
//       .hide();
//   }
// }





// /**
//  * Input Check Empty
//  * This Function Checks if the text field is empty
//  * @param {*} elTitle
//  * @param {*} toolTipId
//  */
// function inputCheckEmpty(elTitle, toolTipId) {
//   //Get Value
//   let elNode = document.querySelector("[title='" + elTitle + "']");

//   elNode.addEventListener("blur", function () {
//     //Get current Value
//     let curValue = elNode.value;
//     //Check if Current Value == NULL
//     if (isEmptyFunction(curValue)) {
//       //Make Border Red
//       elNode.style.setProperty("border-color", "red");

//       //Show Tooltip
//       $("#" + toolTipId).tooltip("enable");
//       $("#" + toolTipId).tooltip("show");

//       //Move Cursor to current field
//       elNode.focus();
//     } else {
//       //Make Border Green
//       elNode.style.setProperty("border-color", "green");
//       //Hide Tooltip
//       //$("#" + toolTipId).tooltip("disable");
//       disableToolTip(toolTipId);
//     }
//   });
// }



// /**
//  * FUNCTION: checkEmptyPeoplePicker
//  * @param {} elTitle
//  * @param {*} toolTipId
//  */
// function checkEmptyPeoplePicker(elTitle, toolTipId) {
//   //Get Value
//   let elNode = document.querySelector("[title='" + elTitle + "']");

//   elNode.addEventListener("focusout", function () {
//     //getPeoplePickerDetails
//     let peoplePickerVal = getPeoplePickerDetails(elTitle);

//     console.log(peoplePickerVal);
//     //Check if people picker is empty
//     if (peoplePickerVal == null) {
//       elNode.style.setProperty("border-color", "red");
//       elNode.focus();

//       //Show Tooltip
//       $("#" + toolTipId).tooltip("enable");
//       $("#" + toolTipId).tooltip("show");
//     } else {
//       elNode.style.setProperty("border-color", "green");
//       //Hide Tooltip
//       $("#" + toolTipId).tooltip("disable");
//     }
//   });
// }

// /**
//  * GetPeoplePickerDetails
//  * @param {*} ppTitle
//  * @returns the account name resolved from people picker
//  */
// function getPeoplePickerDetails(ppTitle) {
//   var pEmail;
//   var pAccountName;
//   var pValue;

//   var _PeoplePicker = $("div[title='" + ppTitle + "']");
//   var _PeoplePickerTopId = _PeoplePicker.attr("id");
//   var ppobject =
//     SPClientPeoplePicker.SPClientPeoplePickerDict[_PeoplePickerTopId];

//   let editorsInfo = ppobject.GetAllUserInfo();

//   if (editorsInfo.length > 0) {
//     pAccountName = editorsInfo[0].Key;
//     pEmail = editorsInfo[0].Description;
//     pValue = editorsInfo[0].DisplayText;
//   }
//   //	alert("Account Name: " + pAccountName + "Email: " + pEmail + "Value: " + pValue);
//   return pAccountName;
// }

// /**
//  * addPlaceHolder()
//  * @param {*} fieldTitle = Title of the field on the form
//  * @param {*} message    = Message to be displayed
//  */
// function addPlaceHolder(fieldTitle, message) {
//   var userInput = document.querySelector(`[title="${fieldTitle}"]`);
//   //var userInput = document.querySelector('[title="Vendor Description"]');
//   userInput.setAttribute("placeholder", message);
// }

// //Array of superUserArray
// const superUserArray = [
//   "Tom.DesRosiers@gstautoleather.com",

//   "Anthony.Simonetti@gstautoleather.com",

//   "Kevin.Savich@gstautoleather.com",

//   "GBrubaker@pangeamade.com",
// ];

// /**

// * Function: superUserCheck

// */
// async function superUserCheck() {
//   //Get current logged in user

//   let curUserEmail = await getUserDetails();

//   console.log("Super user check");

//   //If the logged in user a superUser

//   let superUserCheck = await checkSuperUser(curUserEmail);

//   //alert(superUserCheck);

//   return superUserCheck;
// }

// /**

// * Function: getLoggedInUserEmail

// */
// async function getUserDetails() {
//   let url = "http://rocsps/sites/GSTIntranet" + "/_api/web/CurrentUser";

//   let curUserEmail = await getRequest(url);

//   return curUserEmail.d.Email;
// }
// async function checkSuperUser(email) {
//   const nameCheck = superUserArray.includes(email);

//   return nameCheck;
// }

// /**
//  * FUNCTION: setApprovals
//  * @param {}
//  */
// async function enableDisableFields() {
//   try {
//     //Check if current user is a superuser
//     const superUserResult = await superUserCheck();
//     console.log("SuperUser? " + superUserResult);

//     //If they are Super Users then unlock the field.
//     if (superUserResult) {
//       removeClass();
//     }

//     console.log("Completed running show/hide.");
//   } catch (error) {
//     console.log("error in Enable Disable Fields");
//   }
// }

// /**
//  * Function: getRequest(getUrl)
//  * @param {*} getUrl
//  * @returns
//  */
// async function getRequest(getUrl) {
//   //Set Variable for the result of the data request
//   let result;

//   try {
//     result = await $.ajax({
//       url: getUrl,
//       async: true,
//       type: "GET",
//       headers: {
//         accept: "application/json;odata=verbose",
//       },
//     });
//   } catch (error) {
//     console.error(error);
//   }
//   //Return the result of the AJAX Call
//   return result;
// }


