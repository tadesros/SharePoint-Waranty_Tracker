/* Format for JS-Link: ~site/SiteAssets/PdrModListView/createViewBtn.js */

function renderHeaderTemplateForDocuments(renderCtx, fRenderHeaderColumnNames) {
  var viewData = eval(renderCtx.ListSchema.ViewSelectorPivotMenuOptions);
  ClientPivotControl.prototype.SurfacedPivotCount = 5;
  return RenderHeaderTemplate(renderCtx, fRenderHeaderColumnNames);
}
SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
  Templates: {
    Header: renderHeaderTemplateForDocuments,
  },
});

(function () {
  document.write(
    '<link rel="stylesheet" type="text/css" href="http://rocsps/sites/GSTIntranet/SC/PRCHSNG/PurchaseRequest/SiteAssets/ListVIewCustomizeFiles/jsLinkStyle.css">'
  );

  var overrideCtx = {};
  overrideCtx.Templates = {};
  overrideCtx.OnPostRender = [];
  //Set what we are rendering and how
  overrideCtx.Templates.Fields = {
    Button: { View: renderButton },
    View: { View: renderVersionButton },

    // 'Print_x0020_View': {'View': renderPrintView}
  };
  //Call the function to adjust the rendering on each list item in the view
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();
//CREATE RENDER BUTTON
function renderButton(ctx) {
  var btnTxt = ctx.CurrentItem["View"];
  var id = ctx.CurrentItem.ID;

  return (
    "<input type='button' class='btnView' onclick='btnClickView(" +
    id +
    ")' value='View'" +
    btnTxt +
    "'></input>"
  );
}

(function () {
  function preTaskFormRenderer(renderCtx) {
    modifyColumns(renderCtx);
  }

  function modifyColumns(renderCtx) {
    var arrayLength = renderCtx.ListSchema.Field.length;
    for (var i = 0; i < arrayLength; i++) {
      if (renderCtx.ListSchema.Field[i].DisplayName == "ID") {
        var newTitle = "ID";
        var linkTitleField = renderCtx.ListSchema.Field[i];
        linkTitleField.DisplayName = newTitle;
      }
    }
  }

  function registerRenderer() {
    var ctxForm = {};
    ctxForm.Templates = {};
    ctxForm.OnPreRender = preTaskFormRenderer;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctxForm);
  }
  ExecuteOrDelayUntilScriptLoaded(registerRenderer, "clienttemplates.js");
})();

/*
    Function Color Priority based on value
  */

//***BUTTON CLICK EVENTS***
//CLICK EVENT FOR THE VIEW BUTTON
function btnClickView(id) {
  ShowDialogView(id);
}
//CLICK EVENT FOR THE VERSION BUTTON
function btnClickVersion(id) {
  ShowDialogVersion(id);
}
//CREATE VERSION BUTTON
function renderVersionButton(ctx) {
  var btnTxt = ctx.CurrentItem[""];
  var id = ctx.CurrentItem.ID;

  return (
    "<input type='button' class='btnView' onclick='btnClickVersion(" +
    id +
    ")' value='View'" +
    btnTxt +
    "'></input>"
  );
}
/*View the URL for this Button pass in the id of the item */
function ShowDialogVersion(id) {
  var options = {
    autoSize: true,
    allowMaximize: true,
    title: "View Purchasing Record",
    showClose: true,
    url:
      "http://rocsps/sites/GSTIntranet/SC/PRCHSNG/PurchaseRequest/Lists/Purchasing%20Request/DispForm.aspx?ID=" +
      id +
      "",
    // url:weburl+'/_layouts/15/Versions.aspx?list=' + currentListGUID + '&ID='+item1+'&Source='+weburl+'/Lists/'+title+'/AllItems.aspx',
  };
  SP.UI.ModalDialog.showModalDialog(options);
}
/*View the URL for this Button pass in the id of the item */
function ShowDialogView(id) {
  var options = {
    autoSize: true,
    allowMaximize: true,
    title: "PDP Item",
    showClose: true,
    url:
      "http://rocsps/sites/GSTIntranet/PRODDEV/PDP_Request/Lists/PDP%20Request/DispForm.aspx?ID=" +
      id +
      "",
    // url:weburl+'/_layouts/15/Versions.aspx?list=' + currentListGUID + '&ID='+item1+'&Source='+weburl+'/Lists/'+title+'/AllItems.aspx',
  };
  SP.UI.ModalDialog.showModalDialog(options);
}
