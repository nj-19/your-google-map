 var app = angular.module('exampleDialog', ['ngDialog']);
        // Example of how to set default values for all dialogs
        app.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);

        app.controller('MainCtrl', function ($scope, $rootScope, ngDialog, $timeout,$http) {
            $rootScope.theme = 'ngdialog-theme-default';
            $scope.getLocation = function (value){
                            $http({
                                method : "GET",
                                url : 'http://maps.googleapis.com/maps/api/geocode/json',
                                params : {latlng: value[0]+','+value[1]}
                            }).then(function(response) {
                                    $scope.content = response.data.results;
                                    ngDialog.open({
                                        template: 'locationDetails',
                                        className: 'ngdialog-theme-default',
                                        scope: $scope
                                    });
                                    
                                    if($scope.content.length === 0){
                                    $scope.result = "Please Enter correct Coordinates";}
                                    else{
                                    $scope.result = " ";}
                                    }, function(response) {
                                    $scope.content = "Something went wrong";
                            });
            };
            $scope.openConfirm = function () {
                ngDialog.open({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                });
            };
        });