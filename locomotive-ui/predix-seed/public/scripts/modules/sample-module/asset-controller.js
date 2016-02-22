define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('AssetCtrl', ['$scope', '$log', '$http', '$location','$state','PredixAssetService', 'PredixViewService', function ($scope, $log, $http, $location, $state, PredixAssetService, PredixViewService) {

//        PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {
//
//            //pre-select the 1st asset
//            initialContext.data[0].selectedAsset = true;
//            $scope.initialContexts = initialContext;
//            $scope.initialContextName = initialContext.data[0].name;
//
//            //load view selector
//            $scope.openContext($scope.initialContexts.data[0]);
//        }, function (message) {
//            $log.error(message);
//        });

        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        $scope.allLocomotiveDetails = [];
        $scope.showChartDetails = false;
        
//        $scope.names = [
//                        {name:'Jani',country:'Norway'},
//                        {name:'Hege',country:'Sweden'},
//                        {name:'Kai',country:'Denmark'}
//                    ];
        
        //N.B: Commnet the url part when pushing to cloud
        
        var httpRequest = $http({
            method: 'GET',
            url:'/api/locomotive'
  /*          url:'https://predix-asset.run.aws-usw02-pr.ice.predix.io/locomotive',
            headers: {
                 'Content-Type':'application/json',
                 'Predix-Zone-Id': '643df68c-cb16-4f04-8abd-5e87a02ca185',
                 'Authorization':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJjMjNjYzI1ZC02ZjRjLTRlMjgtYTA2Zi03MzVkYmQxNTNjMGIiLCJzdWIiOiJjbGllbnQiLCJzY29wZSI6WyJhY3MucG9saWNpZXMud3JpdGUiLCJjbGllbnRzLnNlY3JldCIsInVhYS5yZXNvdXJjZSIsInRpbWVzZXJpZXMuem9uZXMuMzRkMmVjZTgtNWZhYS00MGFjLWFlODktM2E2MTRhYTAwYjZlLnF1ZXJ5IiwicHJlZGl4LWFzc2V0LnpvbmVzLjY0M2RmNjhjLWNiMTYtNGYwNC04YWJkLTVlODdhMDJjYTE4NS51c2VyIiwiYWNzLmF0dHJpYnV0ZXMud3JpdGUiLCJjbGllbnRzLmFkbWluIiwic2NpbS5yZWFkIiwiYWNzLnBvbGljaWVzLnJlYWQiLCJ0aW1lc2VyaWVzLnpvbmVzLjM0ZDJlY2U4LTVmYWEtNDBhYy1hZTg5LTNhNjE0YWEwMGI2ZS51c2VyIiwidGltZXNlcmllcy56b25lcy4zNGQyZWNlOC01ZmFhLTQwYWMtYWU4OS0zYTYxNGFhMDBiNmUuaW5nZXN0Iiwidmlld3Muem9uZXMuODZhOTRiMmItZGM1ZC00OWU1LWEwNTAtZGNhODVmNTA2MTYzLnVzZXIiLCJjbGllbnRzLndyaXRlIiwiaWRwcy5yZWFkIiwic2NpbS53cml0ZSJdLCJjbGllbnRfaWQiOiJjbGllbnQiLCJjaWQiOiJjbGllbnQiLCJhenAiOiJjbGllbnQiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjJiYzVhOTJlIiwiaWF0IjoxNDU2MTY0MTUzLCJleHAiOjE0NTYyMDczNTMsImlzcyI6Imh0dHBzOi8vMzI4ZWEwMDQtZjNkMi00NjRiLWJiZjgtOGFjYmQ1ZmE0NTc1LnByZWRpeC11YWEtdHJhaW5pbmcucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiMzI4ZWEwMDQtZjNkMi00NjRiLWJiZjgtOGFjYmQ1ZmE0NTc1IiwiYXVkIjpbImNsaWVudCIsImFjcy5wb2xpY2llcyIsImNsaWVudHMiLCJ1YWEiLCJ0aW1lc2VyaWVzLnpvbmVzLjM0ZDJlY2U4LTVmYWEtNDBhYy1hZTg5LTNhNjE0YWEwMGI2ZSIsInByZWRpeC1hc3NldC56b25lcy42NDNkZjY4Yy1jYjE2LTRmMDQtOGFiZC01ZTg3YTAyY2ExODUiLCJhY3MuYXR0cmlidXRlcyIsInNjaW0iLCJ2aWV3cy56b25lcy44NmE5NGIyYi1kYzVkLTQ5ZTUtYTA1MC1kY2E4NWY1MDYxNjMiLCJpZHBzIl19.M6kVkREYm6gZVfqykah4HCSd1PSp_Zt0OaG_0-JTAZ1v9JSWuJRXBDa8EUhIKzsEZHLfKQ89qyupY4wnOoNb5QrEVNcGh1oz6KTGRfMTalliBUOaMOOuYHwf6szkQbj0Yk8fIAQHqOfZEL1k-b46qDbpu0C7WIuU2BU_4PHJmoVrvCnk9ESezHcvLo0OoaW5V1CNZ2VaBJh7ls2mBQ9MZS3dERtOkMqSkgDNKGp-gNmTv9RMQBuFNgVESekfZ5vx8RKtiogNIr9a2E04B1W_XUYgKOFKaJD50wSdn85jJSXSDYmymssWEORLdk6AA_mW6NEenmBh6Y5PYugaPmSuCA'
                     }*/

        }).success(function(data) {
        	
        	console.log("data: " + data);
        	
        	$scope.allLocomotiveDetails = data;
        	
        	
        	for (var i=0; i < $scope.allLocomotiveDetails.length; i++ ) {
        		
        		console.log($scope.allLocomotiveDetails[i]["serial_no"]);
        		if ($scope.allLocomotiveDetails[i]["serial_no"] == 'LOCOMOTIVE_1'
        			||$scope.allLocomotiveDetails[i]["serial_no"] == 'LOCOMOTIVE_2')
        		{
        			
        			$scope.allLocomotiveDetails[i]["showChartDetails"] = false;
        		} else {
        			$scope.allLocomotiveDetails[i]["showChartDetails"] = true;
        		}
        		
        	}
        	
        	
        });
        
        $scope.showChart=function(id){
        	console.log("show chart details :: " + id);
        	$state.go('chartpage', {'id' : id});
        	
        	//$location.path('/chartpage');

        };

    }]);
});