(function () {
  'use strict';

  this.cronapi = this.cronapi || {};

  /**
  * @categoryName PIC
  */
  this.cronapi.pic = this.cronapi.pic || {};

  /**
   * @type function
   * @name Modal
   * @description Modal
   * @multilayer false
   * @param {ObjectType.OBJECT} idModal {{idModal}}
   * @param {ObjectType.OBJECT} buttonAction {{buttonAction}}
   * @param {ObjectType.STRING} nameModal {{nameModal}}
   * @param {ObjectType.STRING} typeModal {{typeModal}}
   * @param {ObjectType.STRING} statusModal {{statusModal}}
   * @param {ObjectType.STRING} sizeModal {{sizeModal}}
   * @param {ObjectType.OBJECT} listButton {{listButton}}
   */
  this.cronapi.pic.modalPic = function (/** @type {ObjectType.OBJECT} @blockType ids_from_screen*/ idModal, /** @type {ObjectType.OBJECT} @blockType ids_from_screen*/ buttonAction, /** @type {ObjectType.STRING} */  nameModal, /** @type {ObjectType.STRING} @description {{typeModal}} @blockType util_dropdown @keys alert|confirm|form @values {{alert}}|{{confirm}}|{{form}} */ typeModal,/** @type {ObjectType.STRING} @description {{statusModal}} @blockType util_dropdown @keys default|success|info|warning|error @values {{default}}|{{success}}|{{info}}|{{warning}}|{{error}} */ statusModal,/** @type {ObjectType.STRING} @description {{sizeModal}} @blockType util_dropdown @keys sm|md|lg @values {{sm}}|{{md}}|{{lg}} */ sizeModal, listButton) {

    if (!Array.isArray(listButton)) {
      listButton = [listButton];
    }

    let id = '#' + idModal;
    let idModalAction = 'modal_' + idModal;
    let contentModal = $(id);

    let contentButton = $('<div class="buttons"></div>');
    let templateDyn = $(`<div id="${idModalAction}"></div>`);

    let jsonPicModal = {
      title: nameModal
    };

    switch (typeModal) {
      case "alert":
        jsonPicModal.dialog = typeModal;
        if (statusModal !== "default") {
          jsonPicModal.type = statusModal;
        }
        break;

      case "confirm":
        jsonPicModal.size = sizeModal;

        if (statusModal === "warning") {
          jsonPicModal.type = "warning";
        }

        if (statusModal === "default") {
          listButton.forEach(item => {
            const button = $(`<button class="btn-${item.highlightButton}" ${item.type !== 'action' ? 'data-pic-modal-config="noclose"' : ''} data-dismiss="modal">${item.name}</button>`);
            contentButton.append(button);
            button.click(item.action);
          });

        } else {
          jsonPicModal.dialog = typeModal;
          jsonPicModal.labels = [];

          listButton.forEach(item => {
            jsonPicModal.labels.push(item.name);
          });
        }

        break;

      case "form":
        jsonPicModal.dialog = typeModal;
        break;
    }

    jsonPicModal = JSON.stringify(jsonPicModal);
    templateDyn.attr("data-pic-modal", jsonPicModal);
    templateDyn.append(contentModal);


    let idButton = "#" + buttonAction;
    idButton = idButton + " button"
    $(idButton).attr("data-toggle", "modal");
    $(idButton).attr("data-target", "#" + idModalAction);

    $("body").append(templateDyn);
  };

  /**
   * @type function
   * @name Botão PIC
   * @description Modal PIC
   * @multilayer false
   * @param {ObjectType.STRING} nameButton {{nameButton}}
   * @param {ObjectType.STRING} typeButton {{typeButton}}
   * @param {ObjectType.STRING} highlightButton {{highlightButton}}
   *  @param {ObjectType.STATEMENT} actionCallback {{actionCallback}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.pic.buttonModalPic = function (/** @type {ObjectType.STRING} */  nameButton, /** @type {ObjectType.STRING} @description {{typeButton}} @blockType util_dropdown @keys close|action @values {{close}}|{{action}} */ typeButton,/** @type {ObjectType.STRING} @description {{highlightButton}} @blockType util_dropdown @keys default|secondary @values {{yes}}|{{no}} */ highlightButton, /** @type {ObjectType.STATEMENT} @description {{actionCallback}}*/ actionCallback) {

    return {
      name: nameButton,
      type: typeButton,
      action: actionCallback,
      highlightButton: highlightButton
    }

  };

}).bind(window)();