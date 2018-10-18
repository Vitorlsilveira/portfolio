
//obtem minha latitude e longitude

let myLatitude = false;
let myLongitude = false;

function getMyLatLong(){
    var today = new Date();
    var curHr = today.getHours();
    var weekend = ( today.getDay() == 6 || today.getDay() == 0) ? true : false;

    if ( curHr > 9 && curHr < 13 && ( today.getDay() == 2 || today.getDay() == 4)) {
        myLatitude = '-19.9392264';
        myLongitude = '-44.0014511';
    } else if ( curHr > 13 && curHr < 19 && !weekend) {
        myLatitude = '-19.9387974';
        myLongitude = '-43.9340942';
    } else {
        myLatitude = '-19.9184081';
        myLongitude = '-43.9428106';
    }
    
}

getMyLatLong();


//obtem latitude e longitude do usuario

let latitudeUser = false;
let longitudeUser = false;

function getLocationUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPositionUser);
    } else {
       console.log("Geolocation is not supported by this browser.");
    }
    
}

function setPositionUser(position) {
    latitudeUser = String(position.coords.latitude);
    longitudeUser = String(position.coords.longitude);
    initMap();
}

getLocationUser();


//obtem previsao do tempo para minha localização

let myTemp = false;

function getWeatherForecast(){
    var apiKey = '69abe1f505989ea1a7c885b7723e0b22';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', "https://api.openweathermap.org/data/2.5/weather?lat=" + myLatitude + "&lon=" + myLongitude + "&appid=" + apiKey, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var obj = JSON.parse(xmlhttp.responseText);
                myTemp = obj.main.temp -273.15;
                changeTemperatureStatus();
            }
            else{
                console.log('Falha ao obter dados da API de previsão do tempo');
            }
        }
    };
    xmlhttp.send(null);
}

getWeatherForecast();

//altera mensagem e temperatura da página de contato de acordo com o retorno da API de previsão do tempo

function changeTemperatureStatus(){

    var tempElement = document.getElementById('temperatura');
    var tempDescriptionElement = document.getElementById('temperatura-descricao');
    var tempDescription = '';

    if( myTemp < 17){
        tempDescription = ' Como está muito frio, aconselho que venha agasalhado'
    }
    else if ( myTemp < 24 ){
        tempDescription = ' Como está fresco, o tempo está ótimo para vir caminhando'
    }
    else if ( myTemp < 28){
        tempDescription = ' Como está quente, aconselho que venha com roupas frescas'
    }
    else{
        tempDescription = ' Como está muito quente, o tempo está ótimo para tomar uma água de coco geladinha'
    }

    tempElement.innerHTML = String(myTemp).substring(0,4).replace('.',',') + ' °C';
    tempDescriptionElement.innerHTML = tempDescription;
}

//inicializa o mapa com a latitude e longitude do usuario / latitude e longitude da minha localização
//também traça a rota entre o usuário e mim
let distanceKm = false;
let timeCar = false;

function initMap() {

    var markers = [
        {
            "title": 'Sua localização',
            "lat": latitudeUser,
            "lng": longitudeUser,
            "description": "Sua localização"
        },
        {
            "title": 'Minha localização',
            "lat": myLatitude,
            "lng": myLongitude,
            "description": 'Minha localização'
        }
    ];
    var mapOptions = {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();

    for (i = 0; i < markers.length; i++) {
        var data = markers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        lat_lng.push(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });
        latlngbounds.extend(marker.position);
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(data.description);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);

    var path = new google.maps.MVCArray();
    var service = new google.maps.DirectionsService();
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            path.push(src);
            poly.setPath(path);
            service.route({
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    distanceKm = result.routes[0].legs[0].distance.text;
                    timeCar = result.routes[0].legs[0].duration.text;
                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        path.push(result.routes[0].overview_path[i]);
                    }
                    changeDirectionsStatus();
                }
            });
        }
    }
}

//modifica texto de tempo gasto de carro e da distância entre o usuario e mim
function changeDirectionsStatus(){
    document.getElementById('tempo-carro').innerHTML = timeCar;
    document.getElementById('distancia').innerHTML = distanceKm;
}