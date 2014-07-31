  document.addEventListener("deviceready", onDeviceReady, true);

    var pushNotification;

     function onDeviceReady() {
			
			alert(123);
         pushNotification = window.plugins.pushNotification;
         
           alert(1222  pushNotification device.platform);
         if ( device.platform == 'android' || device.platform == 'Android' )
                    {
                        alert(12);
                        pushNotification.register(
                            successHandler,
                            errorHandler, {
                                "senderID":"409868959211",
                                "ecb":"onNotificationGCM"
                            });
                        
                    }
            else
                {
                    alert(121);
                        
                        pushNotification.register(
                            tokenHandler,
                            errorHandler, {
                                "badge":"true",
                                "sound":"true",
                                "alert":"true",
                                "ecb":"onNotificationAPN"
                            });
                }
         
         alert("in");	

        } 


        function successHandler (result) 
            {
                
            alert('result = ' + result);
                
            }

        function errorHandler (error)
            {
            alert('error = ' + error);
             }
