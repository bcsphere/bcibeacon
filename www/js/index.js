/*
	Copyright 2013-2014, JUMA Technology

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
var ProximityUUID = "e2c56db5-dffb-48d2-b060-d0f5a71096e0";
//var ProximityUUID = "00000000-0000-0000-0000-000000000000";

var app = {
	webView : {},
	
    initialize: function() {
        this.bindEvents();
        app.webView.isOpened = false;
    },

    bindEvents: function() {
        document.addEventListener('bcready', this.onBCReady, false);
    },
    
    onBCReady: function() {
    	BC.IBeaconManager.StartIBeaconScan(ProximityUUID);
    	BC.iBeaconManager.addEventListener("newibeacon",app.onNewIBeacon);
    },

	onIBeaconProximityUpdate : function(theibeacon){
		//alert(theibeacon.proximityUUID);
		app.visitWebPage(theibeacon);
	},
	
	onNewIBeacon : function(s){
		var newibeacon = s.target;
		newibeacon.addEventListener("ibeaconproximityupdate",app.onIBeaconProximityUpdate);
		//if you want get the accurate distance you can listen the "ibeaconaccuracyupdate" event.
		//newibeacon.addEventListener("ibeaconaccuracyupdate",app.onIBeaconAccuracyUpdate);
		app.visitWebPage(newibeacon);
	},
	
	visitWebPage : function(ibeacon){
		if(ibeacon.proximityUUID.toLowerCase() == ProximityUUID){
			if(ibeacon.proximity == 1 && !app.webView.isOpened){
				app.webView = window.open('http://www.bcsphere.org/portal.php?mod=topic&topicid=2', '_blank', 'location=yes');
				app.webView.isOpened = true;
				app.webView.addEventListener("exit", function(){
					app.webView.isOpened = false;
				});
			}
		}
	},

};












