"use strict";

//Fields to Hide
let hideFieldsArray = ["current_part_entry", "View"];
let showBtnPartFlag = 2;
let showBtnApprovalFlag = 2;

//DOM has now loaded.
document.onreadystatechange = function () {
  //Check the value on the DOM state - if it's 'interactive' then the DOM has loaded
  if (document.readyState === "interactive") {
    //Script Loaded
    console.log("Script Loaded");
    //Initial Hide Section
    initialHideValues();
    //Insert the Headers
    addShowHeaders();
    //Initialize the collapsible regions
    setUpCollapsibleSection();
    //Initialze State Collapse Parts and Approver Sections
    collapseAllCollapsibleSections();
    // **ADD CLICK EVENTS**
    $("#partExpandBtn").on("click", function () {
      togglePartsDetailSection();
    });
    // **ADD CLICK EVENTS**
    $("#apprvDetailsBtn").on("click", function () {
      toggleApprovalDetailFieldsAndButton();
    });
  } //End Interactive
}; //onReadyStateChange

//---JAVASCRIPT FUNCTIONS ****Toggle****
function collapseAllCollapsibleSections() {
  togglePartsDetailSection();
  toggleApprovalSection();
}
function toggleApprovalDetailFieldsAndButton() {
  showBtnApprovalFlag = toggleApprovalBtn(showBtnApprovalFlag);
  toggleApprovalDetailFields();
}
//Functions: Approval Section
function toggleApprovalSection() {
  showBtnApprovalFlag = toggleApprovalBtn(showBtnApprovalFlag);
  toggleApprovalDetailFields();
}
//FUNCTION: initialize hide the section to toggle
function toggleApprovalDetailFields() {
  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Direct Manager";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Direct Manager Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Direct Manager Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director-VP";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director-VP Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director-VP Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Department Director Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Administrator";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Administrator Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Administrator Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Finance Manager";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Finance Manager Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Finance Manager Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Director";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Director Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Finance Director Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "CFO";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "CFO Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "CFO Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Exec VP Global Ops";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Exec VP Global Ops-Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Executive VP Global Ops-Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purchasing-VP";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purchasing-Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purchasing-VP Status";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purchasing Mgr";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purch Mgr-Comments";
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "Global Purch Mgr-Status";
    })
    .closest("tr")
    .toggle("slow");
}
//Function: Toggle Approval Button
function toggleApprovalBtn(flag) {
  //If boolImgExp = 0 switch to 1 and change to "-"
  if (flag == 1) {
    //Switch to minus
    $("#apprvDetailsBtn").attr("src", "/_layouts/images/minus.gif");
    flag = 2;
  } else {
    //switch to plus
    $("#apprvDetailsBtn").attr("src", "/_layouts/images/plus.gif");
    flag = 1;
  }
  return flag;
}
//FUNCTION: Part Section
function togglePartsDetailSection() {
  showBtnPartFlag = togglePartBtn(showBtnPartFlag);
  togglePartSection();
}
//Function: ToggleBtn
function togglePartBtn(flag) {
  //If boolImgExp = 0 switch to 1 and change to "-"
  if (flag == 1) {
    //Switch to minus
    $("#partExpandBtn").attr("src", "/_layouts/images/minus.gif");
    flag = 2;
  } else {
    //switch to plus
    $("#partExpandBtn").attr("src", "/_layouts/images/plus.gif");
    flag = 1;
  }
  return flag;
}
//FUNCTION: initialize hide the section to toggle
function togglePartSection() {
  // print each number between 0 and 9
  for (let i = 1; i <= 8; i++) {
    togglePartGroupItem(i);
  }
  //Toggle Narrow lines
  //	$(".narrowBnd").toggle("slow");
}
//FUNCTION: toggleGroup Parts
function togglePartGroupItem(ItemNumber) {
  /*********************************************/
  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "qty" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "um" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "part-number" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "cat" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "gl-number" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "unit-cost" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "ext-cost" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "dept-cent" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");

  $("td.ms-formlabel")
    .filter(function () {
      return $(this).text() === "description" + ItemNumber;
    })
    .closest("tr")
    .toggle("slow");
}
//FUNCTION: showHeaders
function addShowHeaders() {
  AddSectionBeforeFieldEquals(
    "Approval Workflow Details",
    "Customer Name",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald"
  );
  AddSectionBeforeFieldEquals(
    "Visit Size / Up Evaluation",
    "Visit Type",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald"
  );
  AddSectionBeforeFieldEquals(
    "Notes / Description",
    "Visit Notes",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald"
  );
  AddHdBefWithBtn(
    "Line Accumulation (CFO)",
    "Part_Number_1",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald",
    "ApprvBtn"
  );

  // Add small line divider to each
  for (let i = 1; i <= 8; i++) {
    AddSectionBeforeFieldEqualsNarrow(
      "",
      "qty" + i,
      "#6D7B8D",
      "WHITE",
      "1",
      "Oswald"
    );
  }
  //Add small line before Request Total
  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Request Total",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );
  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Direct Manager",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );
  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Global Finance Manager",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Department Director",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "CFO",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Finance Administrator",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Exec VP Global Ops",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Global Purchasing-VP",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Global Purchasing Mgr",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Finance Director",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "Department Director-VP",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );

  AddSectionBeforeFieldEqualsNarrow(
    "",
    "NA Buyer",
    "#6D7B8D",
    "WHITE",
    "1",
    "Oswald"
  );
}
//Function: Set up Collapsible Section
function setUpCollapsibleSection() {
  AddCollapseBtn(
    "Click to Expand Item Details",
    "qty1",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald",
    "partExpandBtn"
  );

  AddCollapseBtn(
    "Click to Expand Approval Details",
    "Direct Manager",
    "#6D7B8D",
    "WHITE",
    "16",
    "Oswald",
    "apprvDetailsBtn"
  );
}
//Hide Initial Values to be Hidden
function initialHideValues() {
  $('td.ms-formlabel:contains("current_part_entry")').parent().hide();
  $('td.ms-formlabel:contains("Workflow Status")').parent().hide();
}
//Function: AddCollapseBtn
function AddCollapseBtn(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam,
  btnTag
) {
  /*
		  var $fieldTR = $(
			"td.ms-formlabel:contains('" + fieldName + "')"
		  ).closest("tr");
		  */
  var $fieldTR = $(".ms-standardheader")
    .filter(function () {
      return $(this).text() === fieldName;
    })
    .closest("tr");

  $fieldTR.before(
    "<tr style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 10px;margin-bottom: 10px;font-family: " +
      fontFam +
      "'padding-left:0.5em; text-decoration:none' ><img id='" +
      btnTag +
      "' title='Click to Expand' src='/_layouts/images/plus.gif' align ='center' width='15' height='15' class='expandBtn'>&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
//FUNCTION: ADD HEADER WITH BUTTON
function AddHdBefWithBtn(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam,
  btnTag
) {
  /*
            var $fieldTR = $(
              "td.ms-formlabel:contains('" + fieldName + "')"
            ).closest("tr");
            */
  var $fieldTR = $(".ms-standardheader")
    .filter(function () {
      return $(this).text() === fieldName;
    })
    .closest("tr");

  $fieldTR.before(
    "<tr style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 10px;margin-bottom: 10px;font-family: " +
      fontFam +
      "'padding-left:0.5em; text-decoration:none' ><img id='" +
      btnTag +
      "' title='Click to Expand' src='/_layouts/images/plus.gif' align ='center' width='15' height='15' class='expandBtn'>&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
//FUNCTION: ADD HEADER WITH BUTTON
function AddHdBefWithBtn(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam,
  btnTag
) {
  /*
                  var $fieldTR = $(
                    "td.ms-formlabel:contains('" + fieldName + "')"
                  ).closest("tr");
                  */
  var $fieldTR = $(".ms-standardheader")
    .filter(function () {
      return $(this).text() === fieldName;
    })
    .closest("tr");

  $fieldTR.before(
    "<tr style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 10px;margin-bottom: 10px;font-family: " +
      fontFam +
      "'padding-left:0.5em; text-decoration:none' ><img id='" +
      btnTag +
      "' title='Click to Expand' src='/_layouts/images/plus.gif' align ='center' width='15' height='15' class='expandBtn'>&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
/**FUNCTIONS: NOT TOGGLE ***/
//FUNCTION: Add Section Before Field
function AddSectionBeforeField(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam
) {
  var $fieldTR = $(".ms-standardheader:contains('" + fieldName + "')").closest(
    "tr"
  );

  $fieldTR.before(
    "<tr style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 4px;margin-bottom: 4px;font-family: " +
      fontFam +
      "';'>&nbsp&nbsp&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
//FUNCTION: Add Section Before Field Equals check exact value
function AddSectionBeforeFieldEquals(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam
) {
  var $fieldTR = $(".ms-standardheader")
    .filter(function () {
      return $(this).text() === fieldName;
    })
    .closest("tr");

  $fieldTR.before(
    "<tr style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 4px;margin-bottom: 4px;font-family: " +
      fontFam +
      "';'>&nbsp&nbsp&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
//FUNCTION: Add Section Before Field Equals check exact value
function AddSectionBeforeFieldEqualsNarrow(
  sectionText,
  fieldName,
  backColor,
  fontColor,
  fontSize,
  fontFam
) {
  var $fieldTR = $(".ms-standardheader")
    .filter(function () {
      return $(this).text() === fieldName;
    })
    .closest("tr");

  $fieldTR.before(
    "<tr class='narrowBnd' style='background-color:" +
      backColor +
      "'><td colspan='2' class='ms-formbody' style='padding:0; color: " +
      fontColor +
      ";'><div style='font-size:" +
      fontSize +
      "px;margin-top: 1px;margin-bottom: 1px;font-family: " +
      fontFam +
      "';'>&nbsp&nbsp&nbsp&nbsp" +
      sectionText +
      "</div></td></tr>"
  );
}
