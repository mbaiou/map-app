/**
 * Created by mohamedisse on 7/26/16.
 */
angular.module('starter')
.controller('UploadCtrl', [ '$scope', 'cameraService',
  function($scope, cameraService){
$scope.createProfile = function(){
  var image = cameraService.showSheet();
  console.log(image);
}

}]);
