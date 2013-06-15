<script type="text/javascript">
      function initialize() {
        var myLatlng = new google.maps.LatLng(53.158918,-6.907482);
        var mapOptions = {
          center: new google.maps.LatLng(53.158918,-6.907482),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'CEIST Education Office'
        });
      }

  </script>