<script setup>
import { toRaw, ref, onMounted, onUpdated, watch, defineProps } from "vue";
//생성한 map정보를 담을 곳(반응형 아니어도 된다는데....우선 반응형으로 만들었음)
const map = ref(null);
const markers = ref([]);

const props = defineProps({
  spotPositions: Array,
  height: Number,
});

// watch로는 잘 안됨...
onUpdated(() => {
  console.log("spotPositions updated?");
  console.log(props.spotPositions);
  displayMarker(props.spotPositions);
});

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

//지도에 마커를 표기하는 함수.
function displayMarker(markerPositions) {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(position.latitude, position.longitude)
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
  <v-container
    id="map"
    class="pa-0"
    :style="{ height: height + 'px' }"
  ></v-container>
</template>

<style scoped>
#map {
  aspect-ratio: "16/9";
}
</style>
