  document.addEventListener("deviceready", onDeviceReady, true);

    var pushNotification;
alert(12345);
     function onDeviceReady() {
			
		
         
         pushNotification = window.plugins.pushNotification;
         
         
         
         if ( device.platform == 'android' || device.platform == 'Android' )
                    {
                      
                        pushNotification.register(
                            successHandler,
                            errorHandler, {
                                "senderID":"409868959211",
                                "ecb":"onNotificationGCM"
                            });
                        
                    }
            else
                {
                    
                        
                        pushNotification.register(
                            tokenHandler,
                            errorHandler, {
                                "badge":"true",
                                "sound":"true",
                                "alert":"true",
                                "ecb":"onNotificationAPN"
                            });
                }
         
        
        } 


        function successHandler (result) 
            {
                
            alert('result = ' + result);
                
            }

        function errorHandler (error)
            {
            alert('error = ' + error);
             }


//Android push notification handler
    function onNotificationGCM(e) {
        $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
               // alert( e.regid);
                
                var reqData ={"AppType":"2","DeviceId":""+e.regid+"","IPAddress":"","UserId":"0"};
                
               
                ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,IsDeviceRegResponseSuccess,errorfunction);
               
                
            }
        break;

        case 'message':
                 alert("notrification");
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                
                alert("notrification");
                // if the notification contains a soundname, play it.
               // var my_media = new Media("/android_asset/www/"+e.soundname);
               // my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
              alert("notrification123456");
                
                if ( e.coldstart )
                {
                    $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                }
                else
                {
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            }

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
        break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        break;
      }
    }


    function IsDeviceRegResponseSuccess(result)
        {

          
            var resMessage = result.ApiResponse.Message;            
           alert(result.ApiResponse.Message);
            if(resMessage == "Success")
                {
                   
                       alert(result.ApiResponse.Message);

                }


        }

    function errorfunction()
        {

                alert(1233);

        }


// iOS
        function successHandler (result)
        {
            alert('result = ' + result);
        }
    function tokenHandler (result) 
        {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        alert('device token = ' + result);
            
//             var reqData ={"AppType":"1","DeviceId":""+result+"","IPAddress":"","UserId":"0"};
//                
//               
//                ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,IsDeviceRegResponseSuccess,errorfunction);
//            
        }
    function onNotificationAPN (event)
        {
            if ( event.alert )
                {
                navigator.notification.alert(event.alert);
                }

            if ( event.sound )
                {
                var snd = new Media(event.sound);
                snd.play();
                }

            if ( event.badge )
                {
                pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
                }
        }