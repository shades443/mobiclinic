/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
	options: {},
	appOverlay: {
		attach: function() {
			if ($('#overlay').length == 0) {
				app.parentDiv.append("<div id=\"overlay\"></div>");
			}
		},
		detach: function() {
			console.log($('#overlay').length);
			if ($('#overlay').length > 0) {
				$('#overlay').remove();
			}
		}
	},
	parentDiv: null,
    initialize: function() {
    	/* Set parent DIV element */
    	app.parentDiv = $("#mobiclinic-main");
    	app.initParentDiv();
    	
    	/* Initialize app options from json file */
    	$.ajax("options.json", { 
    		"dataType": "json",
    		"async": false,
    		"success": function(data) {
    		app.options= data;
    	}
    	}); 
    	if (app.options.general.firstrun) {
    		app.showFirstRun();
    	}
    	
        this.bindEvents();
    },
    bindEvents: function() {
    	$("#open-menu").click(app.appMenu.openMenu); //app.openMenu
        // document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    /* 
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },*/
    showFirstRun: function() {
    	/* Check if the first-run container exists */
    	if ($("#first-run").empty) {
    		/* Create the first-run container */
    		app.parentDiv.append("<div id=\"first-run\"></div>");
    	}
    },
    hideSidebars: function() {
    	$(".sidebars").hide();
    },
    initParentDiv: function() {
    	/* Hide Sidebars */
    	app.hideSidebars();
    	app.parentDiv.parent().height($(window).height());
    	
    	/* Set menu options here */
    	if (app.parentDiv.width() > 360) {
    		$("#app-menu").width("360");
    	} else {
    		$("#app-menu").width(app.parentDiv.width() - 56);
    	}
    	app.parentDiv.height($(window).height());
    },
    appMenu: {
    	openMenu: function() {
	    	if (!this.menuActive) {
	    		app.appOverlay.attach()
	    		$("#app-menu").show('slide', {easing: "swing", direction: "left"}, 300);
	    		$("#app-content").animate({width: "-=" + $('#app-menu').width(), queue: 'true'}, 300);
	    		this.menuActive = true;
	    	} else {
	    		$("#app-menu").hide('slide', {direction: "left"}, 300);
	    		$("#app-content").animate({width: "+=" + $('#app-menu').width(), queue: 'true'}, 300);
	    		app.appOverlay.detach();
	    		this.menuActive = false;
	    	}
    	/*$("#app-menu").toggle('slide',{queue: false, complete: function() {
    		if($("#app-menu").css("display") == "none") {
    			$("#app-content").animate({width: "+=" + $('#app-menu').width()}, 300);
    		} else {
    			$("#app-content").animate({width: "-=" + $('#app-menu').width()}, 300);
    		}
    	}}, 350);*/
    	},
    	menuActive: false
    }
};

