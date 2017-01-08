'use strict';

angular.module('blogDetail').
  component('blogDetail', {
    templateUrl: '/templates/blog-detail.html',
    controller: function(Post, $http, $location, $routeParams, $scope){

      Post.query(function(data){
        angular.forEach(data, function(post){
          if (post.id==$routeParams.id){
            $scope.notFound = false
            $scope.post  = post
            resetReply()
          }
        })
      })
      $scope.deleteComment= function(comment){
        $scope.$apply(
        $scope.post.comments.splice(comment, 1)
      )
      }

      $scope.addReply = function() {
        console.log($scope.reply)
        $scope.post.comments.push($scope.reply)
        resetReply()
      }

      function resetReply(){
        $scope.reply ={
          "id": $scope.post.comments.length + 1,
          "text":"",
        }
      }


      if ($scope.notFound) {
        console.log("Not Found")
        // change path
        $location.path("/")
      }
    }
  });
