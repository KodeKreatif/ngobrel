var app = angular.module("ngobrelApp", [])
.controller("callCtrl", ["$scope", function($scope) {
  var webrtc;

  $scope.room = location.search && location.search.split('?')[1].replace("/", "");
  $scope.url = location.href;
  $scope.muted = false;
  $scope.paused = false;

  $scope.numRemotes = function() {
    return angular.element("#remotes").find("video").length;
  }

  $scope.unmute = function() {
    if ($scope.muted) {
      $scope.muted = false;
      webrtc.unmute();
    }
  }

  $scope.mute = function() {
    if (!$scope.muted) {
      $scope.muted = true;
      webrtc.mute();
    }
  }

  $scope.resume = function() {
    if ($scope.paused) {
      $scope.paused = false;
      webrtc.resume();
    }
  }

  $scope.pause = function() {
    if (!$scope.paused) {
      $scope.paused = true;
      webrtc.pause();
    }
  }

  $scope.start = function() {
    var room = chance.word({length:10});
    webrtc.createRoom(room, function (err, name) {
      var newUrl = location.pathname + '?' + name;
      if (!err) {
        $scope.room = room;
        $scope.url = newUrl;
        history.replaceState({}, null, newUrl);
      }
    });
  }

  webrtc = new SimpleWebRTC({
    localVideoEl: 'local',
    remoteVideosEl: 'remotes',
    autoRequestMedia: true,
    log: true
  });
  webrtc.on("readyToCall", function() {
    if ($scope.room) {
      webrtc.joinRoom($scope.room);
    }
  });


}])

