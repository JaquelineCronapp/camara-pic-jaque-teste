app.controller('AfterLoginController', function ($scope) {
    //
});

app.controller('AfterHomeController', function ($scope) {
    //
});

app.controller('AfterPageController', function ($scope) {
    //
});

app.directive('autocompletePic', function ($compile) {
    'use strict';
    return {
        restrict: 'C',
        link: async function (scope, element, attrs) {
            let list = attrs.picSource;
            let name = attrs.name;
            try {
                list = await scope.$eval(attrs.picSource);
            } catch (e) {
                console.debug('Propriedade não é uma função de Bloco');
            }
            let model = {
                source: list,
                type: 'selection'
            };
            let templateDyn = `<label for="${name}">Auto Complete</label>\
                    <input id="lista${name}" data-pic-autocomplete='${JSON.stringify(model)}' type="text" class="form-control" name="${name}">`;
            element.html(templateDyn);
        }
    }
});

app.directive('alertPic', function ($compile) {
    'use strict';
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var templateDyn = '';
            var picAlert = element[0].children[0];
            picAlert = picAlert.attributes["pic-alert"].value;
            var content = element[0].innerText;
            var type = "";

            switch (picAlert) {
                case "alert-danger":
                    type = "error";
                    break;

                case "alert-success":
                    type = "success";
                    break;

                case "alert-warning":
                    type = "warning";
                    break;

                case "alert-info":
                    type = "info";
                    break;
            }

            templateDyn = `<div data-pic-alert='{\"type\": \"${type}\"}'>${content}</div>`;
            element.html(templateDyn);
        }
    }
});

app.config(
    function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }
);

app.directive('tabsPic', function ($compile) {
    'use strict';
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var templateDyn = '';

            var content = element[0].children;
            var tabList = content[0].children;
            var tabPanel = content[1].children;
            var contentTabList = '';
            var contentTabPanel = '';

            for (let index = 0; index < tabList.length; index++) {
                var dataTarget = tabList[index].children[0].attributes["data-target"].value;
                var content = tabList[index].children[0].innerHTML;
                contentTabList = contentTabList + `<li><a href="${dataTarget}">${content}</a></li>`;
            }

            for (let index2 = 0; index2 < tabPanel.length; index2++) {
                var id = tabPanel[index2].id;
                var content = tabPanel[index2].innerHTML;
                contentTabPanel = contentTabPanel + `<div id="${id}">${content}</div>`;
            }

            templateDyn = `<div data-pic-tabs><ul class="tab-list">${contentTabList}</ul><div class="tab-content">${contentTabPanel}</div></div>`
            element.html(templateDyn);
        }
    }
});