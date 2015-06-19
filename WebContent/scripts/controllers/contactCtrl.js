angular
		.module('enduser')
		.controller(
				'contactCtrl',
				function($scope, $http, ngDialog, $location) {
					$scope.result = 'hidden';
					$scope.resultMessage;
					$scope.formData;
					$scope.submitButtonDisabled = false;
					$scope.submitted = false;
					$scope.send = function(contactform) {
						$scope.submitted = true;
						$scope.submitButtonDisabled = true;

						if (contactform.$valid) {

							var dialog = ngDialog
									.open({
										template : '<p>Your message has been successfully sent to our team. Our team will contact you soon!</p>',
										plain : true,
										closeByDocument : true,
										closeByEscape : true
									});
							setTimeout(function() {
								dialog.close();

							}, 3000);
							
						} else {
							$scope.submitButtonDisabled = false;
							$scope.resultMessage = 'Failed<img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":("class="wp-smiley">Please fill out all the fields.';
							$scope.result = 'bg-danger';
						}
					};
				});