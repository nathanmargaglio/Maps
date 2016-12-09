// This example creates a simple polygon representing the Bermuda Triangle.
hexes = [];
var info = document.getElementById("info");

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 42.959, lng: -78.84},
      mapTypeId: 'terrain'
      //makeHex(42.896981, -78.888351, 0.001);
    });

    map.addListener('center_changed', function(){
        //info.innerHTML = "Select another tile."
        for (i = 0; i < hexes.length; ++i){
            hexes[i].setOptions({fillColor: hexes[i].defaultColor});
        };
    });

    x0 = 42.896981;
    y0 = -78.888351;
    r = 0.02;

    makeHex = function(x0, y0, r, id){
        // Define the LatLng coordinates for the polygon's path.
        var hexCoords = []

        for (i = 0; i <= 6; ++i){
            var y = y0 + r*Math.cos(i*(Math.PI/3));
            var x = x0 + r*Math.sin(i*(Math.PI/3));
            hexCoords.push({lat: x, lng: y});
        }

        var tile = new google.maps.Polygon({
          paths: hexCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });

        var rec = $.getJSON("http://localhost/get/"+id.toString(), function(json){
            tile.id = id;
            tile.health = json['health'];
            tile.name = json['name'];
            tile.team = json['team'];

            if (tile.team == 'red'){
                tile.defaultColor = '#FF0000';
                tile.setOptions({fillColor: '#FF0000'})
            }else{
                tile.defaultColor = '#9999FF';
                tile.setOptions({fillColor: '#9999FF'})
            }
        })
        tile.center = {lat: x0, lng: y0};
        tile.addListener('click', function(){
            map.setZoom(12);
            map.setCenter(this.center);
            //this.setMap(null); //removes the tile from the map
            var txt = "You've selected  " + this.name + ".\n";
            txt += "Health: " + this.health
            info.innerHTML = txt;
            this.setOptions({fillColor: '#B4F0AC'})
        });
        hexes.push(tile);
        tile.setMap(map);
    };

    var _id = 0;
    for (dy = 0; dy < 4; dy++){
        for (dx = 0; dx < 4; dx++){
            mod = 1;
            if (dy %2 == 1){
                mod = 0;
            };
            makeHex(x0 + Math.sin(Math.PI/3)*2*r*dx + mod*Math.sin(Math.PI/3)*r,
            y0 + Math.cos(Math.PI/3)*3*r*dy,
            r, _id);
            _id+=1;
        };
    };
}