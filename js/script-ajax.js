function truncate(input) {
   if (input.length > 25) {
      return input.substring(0, 25) + '...';
   }
   return input;
};

var x = document.getElementById("pickup_lat");
var y = document.getElementById("pickup_lng");
var r_x = document.getElementById("pickup_rental_lat");
var r_y = document.getElementById("pickup_rental_lng");
var o_x = document.getElementById("pickup_outstation_lat");
var o_y = document.getElementById("pickup_outstation_lng");
var a_x = document.getElementById("pickup_airport_lat");
var a_y = document.getElementById("pickup_airport_lng");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

function showPosition(position) {
  x.value = position.coords.latitude;
  y.value = position.coords.longitude;
  r_x.value = position.coords.latitude;
  r_y.value = position.coords.longitude;
  o_x.value = position.coords.latitude;
  o_y.value = position.coords.longitude;
  a_x.value = position.coords.latitude;
  a_y.value = position.coords.longitude;
}


$( document ).ready(function(){
	getLocation();
	$("#Picksearchresult").hide();
	$("#Dropsearchresult").hide();
	$("#Picksearchresult_rental").hide();
	$("#Dropsearchresult_rental").hide();
	$("#Picksearchresult_outstation").hide();
	$("#Dropsearchresult_outstation").hide();
	$("#Picksearchresult_airport_c2a").hide();
	$('#Dropsearchresult_airport_c2a').hide();
	$("#Picksearchresult_airport_a2c").hide();
	$('#Dropsearchresult_airport_a2c').hide();
	$('form#a2c').hide();
	$('#pickup').focus(function(){
		$("#Dropsearchresult").hide();
	});
	$('#drop').focus(function(){
		$("#Picksearchresult").hide();
	});
	window.url = '';
	function more_results1(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'p';
								
								//placesAdditionService(selectedItem, data, loc_type);
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								$('#p_lat').val(lat);
								$('#p_lng').val(lng);
						}
						});
						}else{
							$('#p_lat').val(lat);
							$('#p_lng').val(lng);
						}
						$('#p_add').val(selected_address);
						$('#pickup').val(selected_address);
						$('#'+container).hide();
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
		function more_results2(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'd';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								
								var p_lat = $('#p_lat').val();
						var p_lng = $('#p_lng').val();
						var p_addrss = $('#p_add').val();
						var p_c = p_addrss.split(", ");
						var p_c_final = p_c[p_c.length - 3];
						if(typeof(p_c_final) != 'undefined'){
							var p_c_final = p_c[p_c.length - 2];
						}
						var d_c = selected_address.split(", ");
						var d_c_final = d_c[d_c.length - 3];
						if(typeof(d_c_final) != 'undefined'){
							var d_c_final = d_c[d_c.length - 2];
						}
						var items = [];
						var airport_items = [];
						window.url = '';
						$('#drop').val(selected_address);
						$("#Dropsearchresult").hide();
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
							});
						  let obj1 = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							
							$.getJSON( base_url + "airport_master.json", function( data ) {
								airport_items = data.AirportBoundariesMaster;
								let obj2 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
								});
								let obj3 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
								});
								//console.log(obj2[0]);
								if(typeof(obj2[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								if(typeof(obj3[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								//console.log(obj1[0]);
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name != obj1[0].display_name){
										window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									}
								}else if(p_c_final != d_c_final){
									window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
								}
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name == obj1[0].display_name){
										window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
									}
								}else if(p_c_final == d_c_final){
									window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
								}
								//window.location.href= window.url;
								$('#book_now_local').on('click',function(){
										var p_lat = $('#p_lat').val();
										var p_lng = $('#p_lng').val();
										var drop = $('#drop').val();
										var pick_add = $('#p_add').val();
										if(p_lat == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(p_lng == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(drop == ""){
											alert("Please Select Drop Location");
											return true;
										}
										if($("#ride_later_local").css('display') === "none"){
											window.url += "&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}else{
											var dat = new Date();
											var cur_year = dat.getFullYear();
											//var dt = $('#local_date').bootstrapMaterialDatePicker("getDate");
											var dt = $('.local_date_1').data("dt");
											var final_date = moment(dt).format('YYYY-MM-DD');
											var ts = $('#ride_later_local #local_time').val();
											var ts_final = ts.split(" ");
											var ts_final_2 = ts_final[0];
											//alert(ts_final_2);
											var merdn = $('#meridian').val();
											window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}
										
								});
								
							});
							
						});
								
						}
						});
						}else{
						var p_lat = $('#p_lat').val();
						var p_lng = $('#p_lng').val();
						var p_addrss = $('#p_add').val();
						var p_c = p_addrss.split(", ");
						var p_c_final = p_c[p_c.length - 3];
						if(typeof(p_c_final) != 'undefined'){
							var p_c_final = p_c[p_c.length - 2];
						}
						var d_c = selected_address.split(", ");
						var d_c_final = d_c[d_c.length - 3];
						if(typeof(d_c_final) != 'undefined'){
							var d_c_final = d_c[d_c.length - 2];
						}
						var items = [];
						var airport_items = [];
						window.url = '';
						$('#drop').val(selected_address);
						$("#Dropsearchresult").hide();
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
							});
						  let obj1 = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							
							$.getJSON( base_url + "airport_master.json", function( data ) {
								airport_items = data.AirportBoundariesMaster;
								let obj2 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
								});
								let obj3 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
								});
								//console.log(obj2[0]);
								if(typeof(obj2[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								if(typeof(obj3[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								//console.log(obj1[0]);
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name != obj1[0].display_name){
										window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									}
								}else if(p_c_final != d_c_final){
									window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
								}
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name == obj1[0].display_name){
										window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
									}
								}else if(p_c_final == d_c_final){
									window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
								}
								//window.location.href= window.url;
								$('#book_now_local').on('click',function(){
										var p_lat = $('#p_lat').val();
										var p_lng = $('#p_lng').val();
										var drop = $('#drop').val();
										var pick_add = $('#p_add').val();
										if(p_lat == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(p_lng == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(drop == ""){
											alert("Please Select Drop Location");
											return true;
										}
										if($("#ride_later_local").css('display') === "none"){
											window.url += "&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}else{
											var dat = new Date();
											var cur_year = dat.getFullYear();
											//var dt = $('#local_date').bootstrapMaterialDatePicker("getDate");
											var dt = $('#local_date').data("date");
											var final_date = moment(dt).format('YYYY-MM-DD');
											var ts = $('#ride_later_local #local_time').val();
											var ts_final = ts.split(" ");
											var ts_final_2 = ts_final[0];
											//alert(ts_final_2);
											var merdn = $('#meridian').val();
											window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}
										
								});
								
							});
							
						});
					}
						
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
		function more_results3(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'p';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								$('#p_rental_lat').val(lat);
						$('#p_rental_lng').val(lng);
						$('#p_rental_add').val(selected_address);
						$('#pickup_rental').val(selected_address);
						$("#Picksearchresult_rental").hide();
						
						
						window.url = BOOKING_URL+"/rental?s="+lat+","+lng+"&t=R";
						
						$('#rental_book').on('click',function(){
							//alert($("#ride_later_rent").css('display'));
							//if($("#ride_later_rent").css('display') === "none"){
								//alert(window.url);
								window.location.href= window.url+'&p_add='+selected_address;
							/*}else{
								var dat = new Date();
								var cur_year = dat.getFullYear();
								//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getSelectedDate").valueOf();
								var dt = $('#ride_later_rent .local_date').data("date");
								var final_date = moment(dt).format('YYYY-MM-DD');
								var ts = $('#ride_later_rent .local_time').val();
								var ts_final = ts.split(" ");
								var ts_final_2 = ts_final[0];
								var merdn = $('#meridian').val();
								//alert(dt);
								window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+selected_address;
								window.location.href= window.url;
							}*/
							//window.location.href= window.url;
						});
							}
						});
						}else{
						$('#p_rental_lat').val(lat);
						$('#p_rental_lng').val(lng);
						$('#p_rental_add').val(selected_address);
						$('#pickup_rental').val(selected_address);
						$("#Picksearchresult_rental").hide();
						
						
						window.url = BOOKING_URL+"/rental?s="+lat+","+lng+"&t=R";
						
						$('#rental_book').on('click',function(){
							//alert($("#ride_later_rent").css('display'));
							//if($("#ride_later_rent").css('display') === "none"){
								//alert(window.url);
								window.location.href= window.url+'&p_add='+selected_address;
							/*}else{
								var dat = new Date();
								var cur_year = dat.getFullYear();
								//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getSelectedDate").valueOf();
								var dt = $('#ride_later_rent .local_date').data("date");
								var final_date = moment(dt).format('YYYY-MM-DD');
								var ts = $('#ride_later_rent .local_time').val();
								var ts_final = ts.split(" ");
								var ts_final_2 = ts_final[0];
								var merdn = $('#meridian').val();
								//alert(dt);
								window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+selected_address;
								window.location.href= window.url;
							}*/
							//window.location.href= window.url;
						});
						}
						
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
	function more_results4(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'd';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								var p_lat = $('#p_rental_lat').val();
								var p_lng = $('#p_rental_lng').val();
								var pick_rental_add = $('#p_rental_add').val();
								var items = [];
								var airport_items = [];
								$('#drop_rental').val(selected_address);
								$("#Dropsearchresult_rental").hide();
								window.url = '';
								window.url = BOOKING_URL+"/rental?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=R";
								
								$('#rental_book').on('click',function(){
									//alert($("#ride_later_rent").css('display'));
									//if($("#ride_later_rent").css('display') === "none"){
										//alert(window.url);
										window.location.href= window.url+'&p_add='+pick_rental_add+'&d_add='+selected_address;
									/*}else{
										var dat = new Date();
										var cur_year = dat.getFullYear();
										//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getDate");
										var dt = $('#ride_later_rent .local_date').data("date");
										var final_date = moment(dt).format('YYYY-MM-DD');
										var ts = $('#ride_later_rent .local_time').val();
										var ts_final = ts.split(" ");
										var ts_final_2 = ts_final[0];
										var merdn = $('#meridian').val();
										//alert(dt);
										window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+pick_rental_add+'&d_add='+selected_address;
										window.location.href= window.url;
									}*/
									//window.location.href= window.url;
								});
							}
						});
						}else{
						var p_lat = $('#p_rental_lat').val();
						var p_lng = $('#p_rental_lng').val();
						var pick_rental_add = $('#p_rental_add').val();
						var items = [];
						var airport_items = [];
						$('#drop_rental').val(selected_address);
						$("#Dropsearchresult_rental").hide();
						window.url = '';
						window.url = BOOKING_URL+"/rental?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=R";
						
						$('#rental_book').on('click',function(){
							//alert($("#ride_later_rent").css('display'));
							//if($("#ride_later_rent").css('display') === "none"){
								//alert(window.url);
								window.location.href= window.url+'&p_add='+pick_rental_add+'&d_add='+selected_address;
							/*}else{
								var dat = new Date();
								var cur_year = dat.getFullYear();
								//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getDate");
								var dt = $('#ride_later_rent .local_date').data("date");
								var final_date = moment(dt).format('YYYY-MM-DD');
								var ts = $('#ride_later_rent .local_time').val();
								var ts_final = ts.split(" ");
								var ts_final_2 = ts_final[0];
								var merdn = $('#meridian').val();
								//alert(dt);
								window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+pick_rental_add+'&d_add='+selected_address;
								window.location.href= window.url;
							}*/
							//window.location.href= window.url;
						});
						}
						//window.location.href= window.url;
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
	function more_results5(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						//alert($(this).data('place'));
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'p';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								$('#p_outstation_lat').val(lat);
								$('#p_outstation_lng').val(lng);
								$('#p_outstation_add').val(selected_address);
								$('#pickup_outstation').val(selected_address);
								$("#Picksearchresult_outstation").hide();
							}
						});
						}else{
						$('#p_outstation_lat').val(lat);
						$('#p_outstation_lng').val(lng);
						$('#p_outstation_add').val(selected_address);
						$('#pickup_outstation').val(selected_address);
						$("#Picksearchresult_outstation").hide();
						}
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
		function more_results6(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'd';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								var p_lat = $('#p_outstation_lat').val();
								var p_lng = $('#p_outstation_lng').val();
								var p_outstation_add = $('#p_outstation_add').val();
								var p_addrss = $('#p_outstation_add').val();
								var p_c = p_addrss.split(", ");
								var p_c_final = p_c[p_c.length - 3];
								if(typeof(p_c_final) != 'undefined'){
									var p_c_final = p_c[p_c.length - 2];
								}
								var d_c = selected_address.split(", ");
								var d_c_final = d_c[d_c.length - 3];
								if(typeof(d_c_final) != 'undefined'){
									var d_c_final = d_c[d_c.length - 2];
								}
								var items = [];
								var airport_items = [];
								$('#drop_outstation').val(selected_address);
								$("#Dropsearchresult_outstation").hide();
								$.getJSON( base_url + "city_master.json", function( data ) {
								  items = data.city_master;
								  let obj = items.filter(function (currentElement) {
									  // the current value is an object, so you can check on its properties
									  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
									});
								  let obj1 = items.filter(function (currentElement) {
									  // the current value is an object, so you can check on its properties
									  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
									});
									
									$.getJSON( base_url + "airport_master.json", function( data ) {
										airport_items = data.AirportBoundariesMaster;
										let obj2 = airport_items.filter(function (currentElement) {
										// the current value is an object, so you can check on its properties
											return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
										});
										let obj3 = airport_items.filter(function (currentElement) {
										// the current value is an object, so you can check on its properties
											return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
										});
										//console.log(obj2[0]);
										if(typeof(obj2[0]) != 'undefined'){
											window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
											//window.location.href= window.url;
										}else
										if(typeof(obj3[0]) != 'undefined'){
											window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
											//window.location.href= window.url;
										}else
										if(typeof(obj1[0]) != 'undefined'){
											if(obj[0].display_name != obj1[0].display_name){
												window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
											}else if(obj[0].display_name == obj1[0].display_name){
												window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
											}
										}else if(p_c_final != d_c_final){
											window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
										}else
										if(obj[0].display_name == obj1[0].display_name){
											window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
											//window.location.href= window.url;
										}
										
										$('#book_now_outstation').on('click',function(){
											//if($("#ride_later_out").css('display') === "none"){
												window.location.href= window.url+"&p_add="+p_outstation_add+"&d_add="+selected_address;
											/*}else{
												var dt = $('#ride_later_out .local_date').val();
												var ts = $('#ride_later_out .local_time').val();
												var ts_final = ts.split(" ");
												var ts_final_2 = ts_final[0];
												var merdn = $('#meridian').val();
												
												window.url += '&dt='+dt+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+p_outstation_add+"&d_add="+selected_address;
												window.location.href= window.url;
											}*/
											//window.location.href= window.url;
										});
										
									});
									
								});
							}
						});
						}else{
						var p_lat = $('#p_outstation_lat').val();
						var p_lng = $('#p_outstation_lng').val();
						var p_outstation_add = $('#p_outstation_add').val();
						var p_addrss = $('#p_outstation_add').val();
						var p_c = p_addrss.split(", ");
						var p_c_final = p_c[p_c.length - 3];
						if(typeof(p_c_final) != 'undefined'){
							var p_c_final = p_c[p_c.length - 2];
						}
						var d_c = selected_address.split(", ");
						var d_c_final = d_c[d_c.length - 3];
						if(typeof(d_c_final) != 'undefined'){
							var d_c_final = d_c[d_c.length - 2];
						}
						var items = [];
						var airport_items = [];
						$('#drop_outstation').val(selected_address);
						$("#Dropsearchresult_outstation").hide();
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
							});
						  let obj1 = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							
							$.getJSON( base_url + "airport_master.json", function( data ) {
								airport_items = data.AirportBoundariesMaster;
								let obj2 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
								});
								let obj3 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
								});
								//console.log(obj2[0]);
								if(typeof(obj2[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}else
								if(typeof(obj3[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}else
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name != obj1[0].display_name){
										window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									}
								}else if(p_c_final != d_c_final){
									window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
								}else
								if(obj[0].display_name == obj1[0].display_name){
									window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
									//window.location.href= window.url;
								}
								
								$('#book_now_outstation').on('click',function(){
									//if($("#ride_later_out").css('display') === "none"){
										window.location.href= window.url+"&p_add="+p_outstation_add+"&d_add="+selected_address;
									/*}else{
										var dt = $('#ride_later_out .local_date').val();
										var ts = $('#ride_later_out .local_time').val();
										var ts_final = ts.split(" ");
										var ts_final_2 = ts_final[0];
										var merdn = $('#meridian').val();
										
										window.url += '&dt='+dt+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+p_outstation_add+"&d_add="+selected_address;
										window.location.href= window.url;
									}*/
									//window.location.href= window.url;
								});
								
							});
							
						});
						}
						
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
			function more_results8(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'd';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								
								$('#d_airport_lat').val(lat);
						$('#d_airport_lng').val(lng);
						$('#d_airport_add').val(selected_address);
						$('#drop_airport_a2c').val(selected_address);
						$("#Dropsearchresult_airport_a2c").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
						}});
						}else{
						$('#d_airport_lat').val(lat);
						$('#d_airport_lng').val(lng);
						$('#d_airport_add').val(selected_address);
						$('#drop_airport_a2c').val(selected_address);
						$("#Dropsearchresult_airport_a2c").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
						
						}
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
	function more_results7(more,container,search,add_type,pick_lat,pick_lng,trip_type){
		//var add_type = 'P';
		//var pick_lat = $('#pickup_lat').val();
		//var pick_lng = $('#pickup_lng').val();
		$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: trip_type, 
					page: more 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#'+container).html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#'+container).css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$('#'+container).empty();
					$('#'+container).css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if (resultHTML != undefined && resultHTML != '') {
						$('#'+container).html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					
					//$('.pac-item').trigger('click');
					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						if((lat == "" || lat == 0) && (lng == 0 || lng == "")){
						var placeId = 	$(this).data('placeid');
						var geocode_api_url = base_url + 'home/get_place_details/' + placeId;
						$.get(geocode_api_url, function(data){
							if($.trim(data) != ''){
								data = jQuery.parseJSON(data);
								var loc_type = 'p';
								
								lat = data.geometry.location.lat;
								lng = data.geometry.location.lng;
								$('#p_airport_lat').val(lat);
						$('#p_airport_lng').val(lng);
						$('#p_airport_add').val(selected_address);
						$('#pickup_airport_c2a').val(selected_address);
						$("#Picksearchresult_airport_c2a").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Dropsearchresult_airport_c2a').html(options);
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
							}
						});
						}else{
						$('#p_airport_lat').val(lat);
						$('#p_airport_lng').val(lng);
						$('#p_airport_add').val(selected_address);
						$('#pickup_airport_c2a').val(selected_address);
						$("#Picksearchresult_airport_c2a").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Dropsearchresult_airport_c2a').html(options);
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
						
						}
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
	}
	
	$('#pickup').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'P';
		var pick_lat = $('#pickup_lat').val();
		var pick_lng = $('#pickup_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'L';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'L', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Picksearchresult').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Picksearchresult').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Picksearchresult").empty();
					$('#Picksearchresult').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-3"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Picksearchresult").html(resultHTML).show();
					}
					
					
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results1(0, 'Picksearchresult',search,add_type,pick_lat,pick_lng,trip_type);
					});
					// binding click event to li
					$(".pac-item").on('click', function () {
						
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#p_lat').val(lat);
						$('#p_lng').val(lng);
						$('#p_add').val(selected_address);
						$('#pickup').val(selected_address);
						$("#Picksearchresult").hide();
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
		$('#drop').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'D';
		var drop_lat = $('#pickup_lat').val();
		var drop_lng = $('#pickup_lng').val();
		if(drop_lat == '') {
			drop_lat = latitude;
		}
		if(drop_lng == '') {
			drop_lng = longitude;
		}
		var trip_type = 'L';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: drop_lat, 
					lng: drop_lng, 
					triptype: 'L', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Dropsearchresult').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Dropsearchresult').css('height','65px');
				  
			   },
				success:function(data){
					$("#Dropsearchresult").empty();
					$('#Dropsearchresult').css('height','');
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						var n = prediction.f_a.split(", ");
						var citi = n[n.length - 3];
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-city="'+citi+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Dropsearchresult").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results2(0, 'Dropsearchresult',search,add_type,drop_lat,drop_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						var p_lat = $('#p_lat').val();
						var p_lng = $('#p_lng').val();
						var p_addrss = $('#p_add').val();
						var p_c = p_addrss.split(", ");
						var p_c_final = p_c[p_c.length - 3];
						if(typeof(p_c_final) != 'undefined'){
							var p_c_final = p_c[p_c.length - 2];
						}
						var d_c = selected_address.split(", ");
						var d_c_final = d_c[d_c.length - 3];
						if(typeof(d_c_final) != 'undefined'){
							var d_c_final = d_c[d_c.length - 2];
						}
						var items = [];
						var airport_items = [];
						window.url = '';
						$('#drop').val(selected_address);
						$("#Dropsearchresult").hide();
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
							});
						  let obj1 = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							
							$.getJSON( base_url + "airport_master.json", function( data ) {
								airport_items = data.AirportBoundariesMaster;
								let obj2 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
								});
								let obj3 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
								});
								//console.log(obj2[0]);
								if(typeof(obj2[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								if(typeof(obj3[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}
								//console.log(obj1[0]);
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name != obj1[0].display_name){
										window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									}
								}else if(p_c_final != d_c_final){
									window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
								}
								
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name == obj1[0].display_name){
										window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
									}
								}else if(p_c_final == d_c_final){
									window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
								}
								//window.location.href= window.url;
								$('#book_now_local').on('click',function(){
										var p_lat = $('#p_lat').val();
										var p_lng = $('#p_lng').val();
										var drop = $('#drop').val();
										var pick_add = $('#p_add').val();
										if(p_lat == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(p_lng == ""){
											alert("Please Select Pickup Location");
											return true;
										}
										if(drop == ""){
											alert("Please Select Drop Location");
											return true;
										}
										if($("#ride_later_local").css('display') === "none"){
											window.url += "&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}else{
											var dat = new Date();
											var cur_year = dat.getFullYear();
											//var dt = $('#local_date').bootstrapMaterialDatePicker("getDate");
											var dt = $('.local_date_1').data("dt");
											var final_date = moment(dt).format('YYYY-MM-DD');
											var ts = $('#ride_later_local #local_time').val();
											var ts_final = ts.split(" ");
											var ts_final_2 = ts_final[0];
											//alert(ts_final_2);
											var merdn = $('#meridian').val();
											window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+pick_add+'&d_add='+selected_address;
											window.location.href= window.url;
										}
										
								});
								
							});
							
						});
						
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	$('#pickup_rental').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'P';
		var pick_lat = $('#pickup_rental_lat').val();
		var pick_lng = $('#pickup_rental_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'R';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'R', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Picksearchresult_rental').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Picksearchresult_rental').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Picksearchresult_rental").empty();
					$('#Picksearchresult_rental').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Picksearchresult_rental").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results3(0, 'Picksearchresult_rental',search,add_type,pick_lat,pick_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#p_rental_lat').val(lat);
						$('#p_rental_lng').val(lng);
						$('#p_rental_add').val(selected_address);
						$('#pickup_rental').val(selected_address);
						$("#Picksearchresult_rental").hide();
						
						
						window.url = BOOKING_URL+"/rental?s="+lat+","+lng+"&t=R";
						
						$('#rental_book').on('click',function(){
							//alert($("#ride_later_rent").css('display'));
							//if($("#ride_later_rent").css('display') === "none"){
								//alert(window.url);
								window.location.href= window.url+'&p_add='+selected_address;
							/*}else{
								var dat = new Date();
								var cur_year = dat.getFullYear();
								//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getSelectedDate").valueOf();
								var dt = $('#ride_later_rent .local_date').data("date");
								var final_date = moment(dt).format('YYYY-MM-DD');
								var ts = $('#ride_later_rent .local_time').val();
								var ts_final = ts.split(" ");
								var ts_final_2 = ts_final[0];
								var merdn = $('#meridian').val();
								//alert(dt);
								window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+selected_address;
								window.location.href= window.url;
							}*/
							//window.location.href= window.url;
						});
						
						
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
		$('#drop_rental').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'D';
		var drop_lat = $('#pickup_rental_lat').val();
		var drop_lng = $('#pickup_rental_lng').val();
		if(drop_lat == '') {
			drop_lat = latitude;
		}
		if(drop_lng == '') {
			drop_lng = longitude;
		}
		var trip_type = 'R';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: drop_lat, 
					lng: drop_lng, 
					triptype: 'R', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Dropsearchresult_rental').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Dropsearchresult_rental').css('height','65px');
				  
			   },
				success:function(data){
					$("#Dropsearchresult_rental").empty();
					$('#Dropsearchresult_rental').css('height','');
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Dropsearchresult_rental").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results4(0, 'Dropsearchresult_rental',search,add_type,drop_lat,drop_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						var p_lat = $('#p_rental_lat').val();
						var p_lng = $('#p_rental_lng').val();
						var pick_rental_add = $('#p_rental_add').val();
						var items = [];
						var airport_items = [];
						$('#drop_rental').val(selected_address);
						$("#Dropsearchresult_rental").hide();
						window.url = '';
						window.url = BOOKING_URL+"/rental?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=R";
						
						$('#rental_book').on('click',function(){
							//alert($("#ride_later_rent").css('display'));
							//if($("#ride_later_rent").css('display') === "none"){
								//alert(window.url);
								window.location.href= window.url+'&p_add='+pick_rental_add+'&d_add='+selected_address;
							/*}else{
								var dat = new Date();
								var cur_year = dat.getFullYear();
								//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getDate");
								var dt = $('#ride_later_rent .local_date').data("date");
								var final_date = moment(dt).format('YYYY-MM-DD');
								var ts = $('#ride_later_rent .local_time').val();
								var ts_final = ts.split(" ");
								var ts_final_2 = ts_final[0];
								var merdn = $('#meridian').val();
								//alert(dt);
								window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+'&p_add='+pick_rental_add+'&d_add='+selected_address;
								window.location.href= window.url;
							}*/
							//window.location.href= window.url;
						});
						
						//window.location.href= window.url;
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	$('#rental_book').click(function(){
		var p_lat = $('#p_rental_lat').val();
		var p_lng = $('#p_rental_lng').val();
		var p_add = $('#p_rental_add').val();
		if(p_lat == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(p_lng == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		/*window.url = '';
		window.url = "https://dolfin.merucabs.com/rental?s="+p_lat+","+p_lng+"&t=R"+'&p_add='+p_add;
		if($("#ride_later_rent").css('display') === "none"){
			window.location.href= window.url;
		}else{
			var dt = $('#ride_later_rent .local_date').val();
			var ts = $('#ride_later_rent .local_time').val();
			var merdn = $('#meridian').val();
			//alert(dt);
			window.url += '&dt='+dt+'&ts='+ts+'&merdn='+merdn;
			window.location.href= window.url;
		}*/
		//window.location.href= window.url;
	});
	
	$('#pickup_outstation').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'P';
		var pick_lat = $('#pickup_outstation_lat').val();
		var pick_lng = $('#pickup_outstation_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'O';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'O', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Picksearchresult_outstation').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Picksearchresult_outstation').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Picksearchresult_outstation").empty();
					$('#Picksearchresult_outstation').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Picksearchresult_outstation").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results5(0, 'Picksearchresult_outstation',search,add_type,pick_lat,pick_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#p_outstation_lat').val(lat);
						$('#p_outstation_lng').val(lng);
						$('#p_outstation_add').val(selected_address);
						$('#pickup_outstation').val(selected_address);
						$("#Picksearchresult_outstation").hide();
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	$('#drop_outstation').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'D';
		var drop_lat = $('#pickup_outstation_lat').val();
		var drop_lng = $('#pickup_outstation_lng').val();
		if(drop_lat == '') {
			drop_lat = latitude;
		}
		if(drop_lng == '') {
			drop_lng = longitude;
		}
		var trip_type = 'O';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: drop_lat, 
					lng: drop_lng, 
					triptype: 'O', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Dropsearchresult_outstation').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Dropsearchresult_outstation').css('height','65px');
				  
			   },
				success:function(data){
					$("#Dropsearchresult_outstation").empty();
					$('#Dropsearchresult_outstation').css('height','');
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Dropsearchresult_outstation").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results6(0, 'Dropsearchresult_outstation',search,add_type,drop_lat,drop_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						var p_lat = $('#p_outstation_lat').val();
						var p_lng = $('#p_outstation_lng').val();
						var p_outstation_add = $('#p_outstation_add').val();
						var p_addrss = $('#p_outstation_add').val();
						var p_c = p_addrss.split(", ");
						var p_c_final = p_c[p_c.length - 3];
						if(typeof(p_c_final) != 'undefined'){
							var p_c_final = p_c[p_c.length - 2];
						}
						var d_c = selected_address.split(", ");
						var d_c_final = d_c[d_c.length - 3];
						if(typeof(d_c_final) != 'undefined'){
							var d_c_final = d_c[d_c.length - 2];
						}
						var items = [];
						var airport_items = [];
						$('#drop_outstation').val(selected_address);
						$("#Dropsearchresult_outstation").hide();
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= p_lat &&  currentElement.geo_x2 >= p_lat && currentElement.geo_y1 <= p_lng &&  currentElement.geo_y2 >= p_lng;
							});
						  let obj1 = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							
							$.getJSON( base_url + "airport_master.json", function( data ) {
								airport_items = data.AirportBoundariesMaster;
								let obj2 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= p_lat &&  currentElement.MaxLat >= p_lat && currentElement.MinLon <= p_lng &&  currentElement.MaxLon >= p_lng;
								});
								let obj3 = airport_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.MinLat <= lat &&  currentElement.MaxLat >= lat && currentElement.MinLon <= lng &&  currentElement.MaxLon >= lng;
								});
								//console.log(obj[0]);
								if(typeof(obj2[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}else
								if(typeof(obj3[0]) != 'undefined'){
									window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=A";
									//window.location.href= window.url;
								}else
								if(typeof(obj1[0]) != 'undefined'){
									if(obj[0].display_name != obj1[0].display_name){
										window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									}else if(obj[0].display_name == obj1[0].display_name){
										window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
									}
								}else if(p_c_final != d_c_final){
									window.url = BOOKING_URL+"/outstation?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
								}else {
									if(typeof(obj1[0]) === 'undefined'){
										window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=O";
									} else {
										if(obj[0].display_name == obj1[0].display_name){
											window.url = BOOKING_URL+"?s="+p_lat+","+p_lng+"&d="+lat+","+lng+"&t=L";
											//window.location.href= window.url;
										}
									}
								}
								
								$('#book_now_outstation').on('click',function(){
									//alert(window.url);
									//if($("#ride_later_out").css('display') === "none"){
										window.location.href= window.url+"&p_add="+p_outstation_add+"&d_add="+selected_address;
									/*}else{
										var dt = $('#ride_later_out .local_date').val();
										var ts = $('#ride_later_out .local_time').val();
										var ts_final = ts.split(" ");
										var ts_final_2 = ts_final[0];
										var merdn = $('#meridian').val();
										
										window.url += '&dt='+dt+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+p_outstation_add+"&d_add="+selected_address;
										window.location.href= window.url;
									}*/
									//window.location.href= window.url;
								});
								
							});
							
						});
						
						//window.url = window.url+lat+","+lng;
						//window.location.href= window.url;
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	$('#pickup_airport_c2a').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'P';
		var pick_lat = $('#pickup_airport_lat').val();
		var pick_lng = $('#pickup_airport_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'A';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'A', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Picksearchresult_airport_c2a').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Picksearchresult_outstation').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Picksearchresult_airport_c2a").empty();
					$('#Picksearchresult_airport_c2a').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Picksearchresult_airport_c2a").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results7(0, 'Picksearchresult_airport_c2a',search,add_type,pick_lat,pick_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#p_airport_lat').val(lat);
						$('#p_airport_lng').val(lng);
						$('#p_airport_add').val(selected_address);
						$('#pickup_airport_c2a').val(selected_address);
						$("#Picksearchresult_airport_c2a").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Dropsearchresult_airport_c2a').html(options);
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
						
						
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	/*$('#drop_airport_c2a').click(function(){
		var parent = document.querySelector('#Dropsearchresult_airport_c2a')
		if (parent.querySelector('.pac-item') !== null) {
			$('#Dropsearchresult_airport_c2a').show();
		}
		$(".pac-item").on('click', function () {
			var selected_address = $(this).data('place');
			var lat = $(this).data('lat');
			var lng = $(this).data('lng');
			$('#d_airport_lat').val(lat);
			$('#d_airport_lng').val(lng);
			$('#d_airport_add').val(selected_address);
			$('#drop_airport_c2a').val(selected_address);
			$("#Dropsearchresult_airport_c2a").hide();
			
		});
		
	});*/


	$('#drop_airport_c2a').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'D';
		var pick_lat = $('#pickup_airport_lat').val();
		var pick_lng = $('#pickup_airport_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'A';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'A', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Dropsearchresult_airport_c2a').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Dropsearchresult_airport_c2a').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Dropsearchresult_airport_c2a").empty();
					$('#Dropsearchresult_airport_c2a').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Dropsearchresult_airport_c2a").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results8(0, 'Dropsearchresult_airport_c2a',search,add_type,drop_lat,drop_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#d_airport_lat').val(lat);
						$('#d_airport_lng').val(lng);
						$('#d_airport_add').val(selected_address);
						$('#drop_airport_c2a').val(selected_address);
						$("#Dropsearchresult_airport_c2a").hide();
										
						
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	
	$('#drop_airport_a2c').keyup(delay(function(e){
		var search = $(this).val();
		var add_type = 'D';
		var pick_lat = $('#pickup_airport_lat').val();
		var pick_lng = $('#pickup_airport_lng').val();
		if(pick_lat == '') {
			pick_lat = latitude;
		}
		if(pick_lng == '') {
			pick_lng = longitude;
		}
		var trip_type = 'A';
		if(search != ""){
			$.ajax({
				url: base_url + "home/search_places",
				data: {
					keyword: search, 
					add_type: add_type, 
					lat: pick_lat, 
					lng: pick_lng, 
					triptype: 'A', 
					page: 1 
				},
				dataType: 'json',
				beforeSend: function() {
						$('#Dropsearchresult_airport_a2c').html('<div class="text-center" style="width: 267px;margin-top: 15px;"><div class="loading-dots"><div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'<div class="loading-dots--dot"></div>'+
						'</div></div>').show();
						$('#Dropsearchresult_airport_a2c').css('height','65px');
				  
			   },
				success:function(data){
					//console.log(data);
					$("#Dropsearchresult_airport_a2c").empty();
					$('#Dropsearchresult_airport_a2c').css('height','');
					
					var showmore =  data.more && true;
					var resultHTML = '';

					data.items.forEach(function (prediction) {
						resultHTML += '<div class="pac-item" data-lat="'+prediction.lat+'" data-lng="'+prediction.lng+'" data-place="' + prediction.f_a + '" data-placeid="' + prediction.p_id + '" data-pt="' + prediction.p_t + '" data-st="' + prediction.s_t + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + truncate(prediction.p_t +', '+prediction.s_t) +'</div>' +
						'</div></div>';
					});

					if(showmore){
						resultHTML += '<div class="more-results text-center pb-2"><a href="javascript:void(0);" class="load-more-results"><button class="rvmp-showmore-btn" type="button">Show more</button></a></div>'
					}

					if (resultHTML != undefined && resultHTML != '') {
						$("#Dropsearchresult_airport_a2c").html(resultHTML).show();
					}
					//$(".loading-image-pickup").hide();
					$(".more-results").on('click', function(){
						more_results8(0, 'Dropsearchresult_airport_a2c',search,add_type,drop_lat,drop_lng,trip_type);
					});

					// binding click event to li
					$(".pac-item").on('click', function () {
						var selected_address = $(this).data('place');
						var lat = $(this).data('lat');
						var lng = $(this).data('lng');
						$('#d_airport_lat').val(lat);
						$('#d_airport_lng').val(lng);
						$('#d_airport_add').val(selected_address);
						$('#drop_airport_a2c').val(selected_address);
						$("#Dropsearchresult_airport_a2c").hide();
						
						$.getJSON( base_url + "city_master.json", function( data ) {
						  items = data.city_master;
						  let obj = items.filter(function (currentElement) {
							  // the current value is an object, so you can check on its properties
							  return currentElement.geo_x1 <= lat &&  currentElement.geo_x2 >= lat && currentElement.geo_y1 <= lng &&  currentElement.geo_y2 >= lng;
							});
							console.log(obj);
							var city = obj[0].display_name;
							
							$.getJSON( base_url + "airport_terminal_master.json", function( data ) {
								airport_terminal_items = data.airport;
								let obj2 = airport_terminal_items.filter(function (currentElement) {
								// the current value is an object, so you can check on its properties
									return currentElement.City_Name == city;
								});
								if(typeof(obj2[0]) != 'undefined'){
									var options = '';
									obj2.forEach((value, index, self) => {
										options += '<div class="pac-item" data-lat="'+value.Lat+'" data-lng="'+value.Lon+'" data-place="' + value.Airport_Terminal_Name + '">' +
						'<div class="pac-icon pac-icon-marker"><i class="bx bxs-map"></i></div>' +
						'<div class="pac-item-text">'+
						'<div class="pac-item-query">' + value.Airport_Terminal_Name +'</div>' +
						'</div></div>';
									});
									$('#Picksearchresult_airport_a2c').html(options);
								}
							});
							
						});
						
						
						//window.url = "https://dolfin.merucabs.com?s="+lat+","+lng+"&d=";
						//removeLocationHash();
						//history.pushState(null, null, window.location.pathname);
					});


				}
			});
			
		}
	}, 500));
	
	$('#pickup_airport_a2c').click(function(){
		var parent = document.querySelector('#Picksearchresult_airport_a2c')
		if (parent.querySelector('.pac-item') !== null) {
			$('#Picksearchresult_airport_a2c').show();
		}
		
		$(".pac-item").on('click', function () {
			var selected_address = $(this).data('place');
			var lat = $(this).data('lat');
			var lng = $(this).data('lng');
			$('#p_airport_lat').val(lat);
			$('#p_airport_lng').val(lng);
			$('#p_airport_add').val(selected_address);
			$('#pickup_airport_a2c').val(selected_address);
			$("#Picksearchresult_airport_a2c").hide();
			
		});
		
	});
	
	$('#book_now_airport').click(function(){
		var p_lat = $('#p_airport_lat').val();
		var p_lng = $('#p_airport_lng').val();
		var d_lat = $('#d_airport_lat').val();
		var d_lng = $('#d_airport_lng').val();
		var d_airport_add = $('#d_airport_add').val();
		var p_airport_add = $('#p_airport_add').val();
		if(p_lat == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(p_lng == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(d_lat == ""){
			alert("Please Select Drop Location");
			return true;
		}
		if(d_lng == ""){
			alert("Please Select Drop Location");
			return true;
		}
		window.url = BOOKING_URL+"/airport?s="+p_lat+","+p_lng+"&d="+d_lat+","+d_lng+"&t=A";
		if($("#ride_later_air").css('display') === "none"){
			window.location.href= window.url+"&p_add="+p_airport_add+"&d_add="+d_airport_add;
		}else{
			var dat = new Date();
			var cur_year = dat.getFullYear();
			//var dt = $('#ride_later_rent .local_date').bootstrapMaterialDatePicker("getDate");
			var dt = $('.local_date_2').data("dt");
			var final_date = moment(dt).format('YYYY-MM-DD');
			//var dt = $('#ride_later_air .local_date').val();
			var ts = $('#ride_later_air .local_time').val();
			var ts_final = ts.split(" ");
			var ts_final_2 = ts_final[0];
			var merdn = $('#meridian').val();
			window.url += '&dt='+final_date+'&ts='+ts_final_2+'&merdn='+merdn+"&p_add="+p_airport_add+"&d_add="+d_airport_add;
			window.location.href= window.url;
		}
		//window.location.href= window.url;
	});
	
	$('#book_now_local').click(function(){
		var p_lat = $('#p_lat').val();
		var p_lng = $('#p_lng').val();
		var drop = $('#drop').val();
		if(p_lat == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(p_lng == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(drop == ""){
			alert("Please Select Drop Location");
			return true;
		}
	});
	
	$('.toggle-button-c2a').click(function(){
		var pick = $('#drop_airport_c2a').val();
		var drop = $('#pickup_airport_c2a').val();
		var p_lat = $('#d_airport_lat').val();
		var p_lng = $('#d_airport_lng').val();
		var d_lat = $('#p_airport_lat').val();
		var d_lng = $('#p_airport_lng').val();
		var p_add = $('#d_airport_add').val();
		var d_add = $('#p_airport_add').val();
		//alert(pick);
		$('#pickup_airport_a2c').val(pick);
		$('#drop_airport_a2c').val(drop);
		$('#d_airport_lat').val(d_lat);
		$('#d_airport_lng').val(d_lng);
		$('#p_airport_lat').val(p_lat);
		$('#p_airport_lng').val(p_lng);
		$('#p_airport_add').val(p_add);
		$('#d_airport_add').val(d_add);
		$("form#c2a").hide();
		$("form#a2c").show();
	});
	
	$('.toggle-button-a2c').click(function(){
		var pick = $('#drop_airport_a2c').val();
		var drop = $('#pickup_airport_a2c').val();
		var p_lat = $('#d_airport_lat').val();
		var p_lng = $('#d_airport_lng').val();
		var d_lat = $('#p_airport_lat').val();
		var d_lng = $('#p_airport_lng').val();
		var p_add = $('#d_airport_add').val();
		var d_add = $('#p_airport_add').val();
		$('#pickup_airport_c2a').val(pick);
		$('#drop_airport_c2a').val(drop);
		$('#d_airport_lat').val(d_lat);
		$('#d_airport_lng').val(d_lng);
		$('#p_airport_lat').val(p_lat);
		$('#p_airport_lng').val(p_lng);
		$('#p_airport_add').val(p_add);
		$('#d_airport_add').val(d_add);
		$("form#a2c").hide();
		$("form#c2a").show();
	});
	
	$('#book_now_outstation').click(function(){
		var p_lat = $('#p_outstation_lat').val();
		var p_lng = $('#p_outstation_lng').val();
		var drop = $('#drop_outstation').val();
		if(p_lat == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(p_lng == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(drop == ""){
			alert("Please Select Drop Location");
			return true;
		}
	});
	
	$('#rental_book').click(function(){
		var p_lat = $('#p_rental_lat').val();
		var p_lng = $('#p_rental_lng').val();
		if(p_lat == ""){
			alert("Please Select Pickup Location");
			return true;
		}
		if(p_lng == ""){
			alert("Please Select Pickup Location");
			return true;
		}
	});
	
	
});