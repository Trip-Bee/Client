<script setup>
import { toRaw, ref, onMounted } from "vue";
//생성한 map정보를 담을 곳(반응형 아니어도 된다는데....우선 반응형으로 만들었음)
const map = ref(null);
//임시 마커 정보1
const markerPositions1 = ref([
  [33.452278, 126.567803],
  [33.452671, 126.574792],
  [33.451744, 126.572441],
]);
// //임시 마커 정보2
// const markerPositions2 = ref([
//   [37.499590490909185, 127.0263723554437],
//   [37.499427948430814, 127.02794423197847],
//   [37.498553760499505, 127.02882598822454],
//   [37.497625593121384, 127.02935713582038],
//   [37.49629291770947, 127.02587362608637],
//   [37.49754540521486, 127.02546694890695],
//   [37.49646391248451, 127.02675574250912],
// ]);
//생성한 마커를 담을 변수
const markers = ref([]);

// 1. spotItems 를 props로 받아오기
// 2. spotItems에서 latitude, longitude를 가져와서 하나의 배열에 넣기 
// 3. 위도, 경도가 들어있는 배열을 displayMarker에 매개변수로 넣기
const props = defineProps({
  positions: {
    type: Array
  }
})

console.log(props.positions);

// const getLatitudeAndLongitude = () => {
//   // const pos = ref
//   props.spotItems.latitude;
//   props.spotItems.longitude;
// }

// console.log(props.spotItems);

//마커위에 info창 띄울 때 필요
// const infowindow = ref(null);

//카카오map을 생성해서 화면에 반영하기 위한 initMap 메소드
//mounted에서 해당 메소드를 이용해서 지도를 생성할 예정
function initMap() {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };

  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map.value = new kakao.maps.Map(container, options);
}

function changeSize(size) {
  const container = document.getElementById("map");
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  toRaw(map.value).relayout();
}
//지도에 마커를 표기하는 함수.
function displayMarker(markerPositions) {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(...position)
  );

  if (positions.length > 0) {
    markers.value = positions.map(
      (position) =>
        new kakao.maps.Marker({
          map: toRaw(map.value),
          position,
        })
    );

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new kakao.maps.LatLngBounds()
    );

    toRaw(map.value).setBounds(bounds);
  }
}


// //인포윈도우 생성 후 화면에 보여주기 위한 함수
// function displayInfoWindow() {
//   if (infowindow.value && infowindow.value.getMap()) {
//     //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
//     toRaw(map.value).setCenter(infowindow.value.getPosition());
//     return;
//   }

//   var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//     iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
//     iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

//   infowindow.value = new kakao.maps.InfoWindow({
//     map: toRaw(map.value), // 인포윈도우가 표시될 지도
//     position: iwPosition,
//     content: iwContent,
//     removable: iwRemoveable,
//   });

//   toRaw(map.value).setCenter(iwPosition);
// }

onMounted(() => {
  //여기서 kakao 맵을 화면에 반영합니다.
  //카카오 라이브러리 정보 및 map을 확인
  if (window.kakao && window.kakao.maps) {
    initMap(); //지도 초기화 - 상단에 function 선언해 있습니다.
  } else {
    //카카오map 라이브러리 정보 셋팅
    // script태그를 생성해서 apikey를 셋팅해야합니다.
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    //아래 appkey 부분에 본인의 apikey를 셋팅해주세요.
    //(카카오 developers에 현재 vue 도메인 정보가 등록되어 있어야합니다.)
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }`;
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div id="map" class="pa-0"></div>
  <div class="button-group">
    <!-- <v-btn @click="changeSize(0)">Hide</v-btn> -->
    <!-- <v-btn @click="changeSize(400)">show</v-btn> -->
    <v-btn @click="displayMarker(markerPositions1)">marker set 1</v-btn>
    <!-- <v-btn @click="displayMarker(markerPositions2)">marker set 2</v-btn> -->
    <!-- <v-btn @click="displayMarker([])">marker set 3 (empty)</v-btn> -->
    <!-- <v-btn @click="displayInfoWindow">infowindow</v-btn> -->
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
