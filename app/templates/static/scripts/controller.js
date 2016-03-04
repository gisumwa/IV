angular.module('pheditApp').controller('MyCtrl', ['$scope', 'Upload', 'MainService', function ($scope, Upload, MainService) {

    $scope.imageuploaded = true;

    $scope.$on('uploadComplete', function () {
        $scope.images = MainService.all_images.getImages();
    });


    $scope.$watchCollection('effectsModel', function () {
        $scope.applyeffects = [];
        angular.forEach($scope.effectsModel, function (value, key) {
            if (value) {
                $scope.applyeffects.push(key);
                $scope.$emit('addeffect');
            }
        });
    });


    $scope.$on('addeffect', function () {
        MainService.image_effects.send_effects($scope.applyeffects);
    });

    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/images/',
            data: {'image': file}
        }).then(function (resp) {
            var $button = $("button");
            $button.parent().addClass("clicked").delay(2600).queue(function(){
                $(this).addClass("success");
            });
            $scope.$emit('uploadComplete');
            $scope.imageuploaded = false;
            console.log('file uploaded successfully');
        }, function (resp) {
            console.log('file uploaded error: ' + resp.status);
        });
    };
}]);
