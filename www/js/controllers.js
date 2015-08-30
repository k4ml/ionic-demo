angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $state, $ionicHistory, ChatsService) {
	// ChatsService.all().then(function(chats){
 //        $scope.chats = chat;
 //    });
	console.log(ChatsService.all());
	$scope.chats = ChatsService.all();
	// $scope.remove = function(chat) {
	//     ChatsService.remove(chat);
	// }
	// $ionicHistory.nextViewOptions({
	//     disableBack: true
	// });

	// $state.go('detail');
})

.controller('DetailCtrl', function($scope, $stateParams, ChatsService) {
  // $scope.chat = ChatsService.get($stateParams.chatId);

  var chatId = $stateParams.id;
  $scope.chat = ChatsService.get(chatId);
})

