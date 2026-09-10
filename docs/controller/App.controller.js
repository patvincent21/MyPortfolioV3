sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Button",
  "sap/m/Dialog",
  "sap/m/Panel",
  "sap/m/Text",
  "sap/m/VBox",
  "sap/ui/model/json/JSONModel"
], function (Controller, Button, Dialog, Panel, Text, VBox, JSONModel) {
  "use strict";

  return Controller.extend("myportfolio.controller.App", {
    onInit: function () {
      var oProjectsModel = new JSONModel();
      oProjectsModel.loadData("model/projects.json");

      this.getView().setModel(oProjectsModel, "projects");
    },

    onExit: function () {
      if (this._oProjectsDialog) {
        this._oProjectsDialog.destroy();
        this._oProjectsDialog = null;
      }
    },

    onOpenProjects: function () {
      if (!this._oProjectsDialog) {
        var oProjectsContent = new VBox({
          width: "100%",
          items: []
        });

        oProjectsContent.bindAggregation("items", {
          path: "projects>/projects",
          factory: function (sId, oContext) {
            return new Panel({
              expandable: false,
              headerText: oContext.getProperty("clientName"),
              content: [
                new VBox({
                  width: "100%",
                  items: [
                    new Text({ text: "Role: " + oContext.getProperty("role") }),
                    new Text({ text: "Description: " + oContext.getProperty("description") })
                  ]
                })
              ]
            });
          }
        });

        this._oProjectsDialog = new Dialog({
          title: "Projects at Strada",
          contentWidth: "28rem",
          contentHeight: "28rem",
          stretchOnPhone: true,
          content: [oProjectsContent],
          endButton: new Button({
            text: "Close",
            press: function () {
              this.getParent().close();
            }
          })
        });

        this.getView().addDependent(this._oProjectsDialog);
      }

      this._oProjectsDialog.open();
    }
  });
});
