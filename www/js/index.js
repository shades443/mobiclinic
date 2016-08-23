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
	"initialize": function() {
		// Bind device events
        this.bindEvents();
        
		$('div#appmenu').panel();
	},
	// Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        document.addEventListener("backbutton", app.backButtonDown, false);
    },
    backButtonDown: function() {
		var currentPage = window.location.hash;
		if (currentPage == "#login-page" || currentPage == '') {
			navigator.app.exitApp();
		}
		if (currentPage == "#register-page" || currentPage == '') {
			navigator.app.backHistory();
		}
		if (currentPage == "#home-page" || currentPage == '') {
			$('#appmenu').panel("toggle");
		}
    }
}
$(document).on('mobileinit', function() {
	// Setting #container div as a jqm pageContainer
	$.mobile.pageContainer = $('#container');

	// Setting default page transition to slide
	$.mobile.defaultPageTransition = 'slide';
});