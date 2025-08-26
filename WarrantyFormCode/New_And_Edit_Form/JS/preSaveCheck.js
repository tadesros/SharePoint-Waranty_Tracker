//Create Object to Hold Values
let newIdObj = new Object();
//Initialize Boolean for the form to false (not valid)
let boolFormValid = false;
/**
 * PreSaveFunction
 */
function PreSaveAction() {

  //Initialize to False
  boolFormValid = false;
  // CHECK IF FORM DATA IS VALID
  if (isFormValid()) {
    boolFormValid = true;
  }
  // Not Valid
  else {
    //Form did not pass!
    //Reset boolFormValid to false so the record is not saved.
    boolFormValid = false;
  }

  return boolFormValid;
}

// *   FUNCTION DECLARATIONS  * //   

/**
 * isFormValid()
 * return : true if the form has valid data false if not
 */
function isFormValid() {

  //Initialize result array to hold all of the boolean results
  let resultArr = new Array();
  //Clear out any existing error messages
  $(".errorMessage").remove();
  //Check dropdown Select picked
  resultArr.push(checkAllDropdownDefaults());
  //Check if text fields are empty
  resultArr.push(checkAllTextsEmpty());
  //Check if People Picker fields are empty.
  resultArr.push(checkAllPeoplePickerEmpty());

  //Check if all values in the array are true
   let result = resultArr.every(Boolean);
  //Return the final result
  return result;
}//End isFormValid

//***********  Main used Functions  ******************//   

/**
 * checkSelectNotPicked
 */
function checkAllDropdownDefaults() {
  //Initialize dynamic array for booleans
  let arrResult = new Array();

  //Check fields
//  arrResult.push(checkSelect("OEM"));
 arrResult.push(checkSelect("Pangea Facility"));
 arrResult.push(checkSelect("OEM"));
  

  //Check if all values in the array are true
  let result = arrResult.every(Boolean);

  return result;
}
/**
 * checkIfTextEmpty
 * @returns
 */
function checkAllTextsEmpty() {
  //Initialize dynamic array for booleans
  let arrResult = new Array();
  //Check Values for each field
  arrResult.push(checkEmpty("Ship to Customer"));
  arrResult.push(checkEmpty("Program"));
  arrResult.push(checkEmpty("OEM Claim Number"));
  arrResult.push(checkEmpty("Defect"));
  arrResult.push(checkEmpty("Part Number"));
  arrResult.push(checkEmpty("Vehicle Model"));
  arrResult.push(checkEmpty("Repair Location"));
  arrResult.push(checkEmpty("Repair Date"));
  arrResult.push(checkEmpty("Build Date"));
  arrResult.push(checkEmpty("Max Response Time"));
//  arrResult.push(checkEmptyTextArea("Customer Narrative"));

console.log(checkEmptyTextArea("Customer Narrative"));

  let result = arrResult.every(Boolean);
  return result;
}
/**
 * Check people picker values in this section
 * @param {*} test
  * @returns
**/
function checkAllPeoplePickerEmpty() {
  //Initialize dynamic array for booleans
  let arrResult = new Array();
  //Check Values for each field
   arrResult.push(checkPeoplePickEmpty("Warranty Leader"));
  
  //Check if all values in the array are true
  let result = arrResult.every(Boolean);
  return result;
}
/**
 * Get Field ByDisplay Name
 * @param {
 * } fieldName
 * @returns the element selected
 */
function GetFieldByDisplayName(fieldName) {
  var field = $(
    'input[title="' +
      fieldName +
      '"], [title="' +
      fieldName +
      ' Required Field"]'
  );
  if (!field) {
    field = $(
      'textarea[title="' +
        fieldName +
        '"], [title="' +
        fieldName +
        ' Required Field"]'
    );
  }
  return field;
}
/**
 * WriteErrorMessage
 * @param {*} inputElement
 * @param {*} message
 */
function WriteErrorMessage(inputElement, message) {
  var errorMessageMarkup =
    '<span class="errorMessage ms-formvalidation ms-csrformvalidation" style="margin-top: 0px"><span role="alert">' +
    message +
    "</span>";
  $(inputElement).parent().parent().parent().append(errorMessageMarkup);

  //$(inputElement).append(errorMessageMarkup);
}
/**
 * checkSelect
 * @param {*} fieldName
 * @returns
 */
function checkSelect(fieldName) {
  //Result
  let result = false;
  //Check Drop down PDP Type to make sure default is not selected
  let selectField = $("select[title='" + fieldName + "']");
  let selectChoice = $(
    "select[title='" + fieldName + "'] option:selected"
  ).text();

  //Check Value of Selected Item!
  if (selectChoice == "- select -") {
    result = false;
    //Write a message indicating to the user that the field is empty
    WriteErrorMessage(selectField, "Please Select an Option");
  } else {
    //console.log("Not Select");
    result = true;
  }

  //Return Result
  return result;
}
/**
 * checkEmpty()
 * @param {*} fieldName
 * @returns
 */
function checkEmptyTextArea(fieldName) {
  //Result 
  result = false;
  

const titleValue = fieldName;
const textArea = document.querySelector(`textarea[title="${titleValue}"]`);

   console.log(textArea.value); // Outputs: Some notes here...
 
if (textArea.value === "") {
  console.log("Text area is empty");
   result = false;
   WriteErrorMessage(textArea, "You can't leave this field blank");
}
else
{
  console.log("Text area is not empty");
  result =  true;
}


return result;

}
/**
 * checkEmpty()
 * @param {*} fieldName
 * @returns
 */
function checkEmpty(fieldName) {
  //Result
  let result = false;
  
  let textField = GetFieldByDisplayName(fieldName);
  //Check if the input is empty
  if (textField && !textField.val().trim()) {
    result = false;
    //Write a message indicating to the user that the field is empty
    WriteErrorMessage(textField, "You can't leave this field blank");
  } else {
    result = true;
  }
  //Return Result
  return result;
}
/**
 * checkPeoplePickerEmpty()
 * @param {*} fieldName
 * @returns
 */
function checkPeoplePickEmpty(fieldName) {
  //Result
  let result = false;
  //Check Drop down PDP Type to make sure default is not selected
  let ppField = GetFieldByDisplayName(fieldName);
  let ppResult = GetPeoplePickerDetails(fieldName);

  if (ppResult == null) {
    result = false;
    //alert("People Picker Empty");
    WriteErrorMessage(ppField, "Please select a valid user");
  } else {
    result = true;
  }
  console.log("check people picker result " + result);
  //Return Result
  return result;
}
/**
 * GetPeoplePickerDetails
 * @param {*} ppTitle
 * @returns
 */
function GetPeoplePickerDetails(ppTitle) {
  var pEmail;
  var pAccountName;
  var pValue;

  var _PeoplePicker = $("div[title='" + ppTitle + "']");
  var _PeoplePickerTopId = _PeoplePicker.attr("id");
  var ppobject =
    SPClientPeoplePicker.SPClientPeoplePickerDict[_PeoplePickerTopId];

  editorsInfo = ppobject.GetAllUserInfo();

  if (editorsInfo.length > 0) {
    pAccountName = editorsInfo[0].Key;
    pEmail = editorsInfo[0].Description;
    pValue = editorsInfo[0].DisplayText;
  }
  //	alert("Account Name: " + pAccountName + "Email: " + pEmail + "Value: " + pValue);
  return pAccountName;
}
/**
 * getItemCount
 * @param {} newIdObj
 * @param {*} listUrl
 */
function configureNewRecId(url) {
  //Perform a request to get the data and set it to dataResult
  const dataResult = getRequest(url);
  //Get Value of New ID set to object
  newIdObj.newID = dataResult.d.results[0].Count + 1;
  //Format New Id
  newIdObj.newRecordNumber = formatRecordName();
  //Format recordNumber
}
/**
 * setIdVal
 * @param {} newIdObj
 * @param {*} listUrl
 */
function formatRecordName() {
  let strFrmID = "00000" + newIdObj.newNumID;
  let frmtID = strFrmID.substring(strFrmID.length - 6);
  //Add prefix
  frmtId = "FQR-" + frmtID;
  return frmtId;
}
/**
 *  SetValueByTitle
 * @param {*} idName
 * @param {*} setValue
 */
function setFieldValueByTitle(elTitle, setValue) {
  let el_Node = document.querySelector("[title='" + elTitle + "']");
  el_Node.value = setValue;
}
/**
 * getRequest
 * @param {*} requestUrl
 * @param {*} successFunction
 * @returns
 */
function getRequest(requestUrl, successFunction) {
  return $.ajax({
    url: requestUrl,
    type: "GET",
    dataType: "json",
    async: false,
    headers: {
      accept: "application/json; odata=verbose",
      "content-type": "application/json;odata=verbose",
    },
    success: successFunction,
    error: onError,
  }); //End Ajax
}
/**
 *
 * @param {*} error
 */
function onError(error) {
  alert("**AJAX REQUEST ERROR**" + JSON.stringify(error));
}
/**
 *
 * @param {*} data
 */
function onSuccess(data) {
  //Get Value of New ID
  var newID = data.d.results[0].Count + 1;
  //Set This value to the newIDObj property wo we can use it outside this function
  newIdObj.newNumID = newID;
}
/**
 *
 * @param {*} listName
 * @param {*} itemId
 * @param {*} fieldName
 * @param {*} updatedField
 */
function updateCountList(listName, itemId, fieldName, updatedField) {
  var clientContext = new SP.ClientContext();
  var oList = clientContext.get_web().get_lists().getByTitle(listName);

  this.oListItem = oList.getItemById(itemId);

  oListItem.set_item(fieldName, updatedField);
  oListItem.update();

  clientContext.executeQueryAsync(
    Function.createDelegate(this, this.onQuerySucceeded),
    Function.createDelegate(this, this.onQueryFailed)
  );
}
//FUNCTION: onQuerySucceeded - This function is called if the query is successful to update the count list
function onQuerySucceeded() {
  //  alert("Item updated!");
}
//FUNCTION: onQueryFailed- This function is called if the query fails
function onQueryFailed(sender, args) {
  alert();
  //  "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
}
/**
 *
 * @param {*} milliseconds
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
