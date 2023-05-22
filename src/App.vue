<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section
              :class="['section', 'section-left', { 'section-error': isError }]"
            >
              <div class="info">
                <div class="city-inner">
                  <input
                    v-model="city"
                    @keyup.enter="getWeather"
                    type="text"
                    class="search"
                  />
                </div>
                <WeatherSummary v-if="!isError" :weatherInfo="weatherInfo" />
                <p v-else>City not found!</p>
              </div>
            </section>
            <section v-if="!isError" class="section section-right">
              <Highlights :weatherInfo="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coord="weatherInfo.coord" />
            <Humidity :humidity="weatherInfo?.main?.humidity" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Highlights from "./components/Highlights.vue";
import WeatherSummary from "./components/WeatherSummary.vue";
import Coords from "./components/Coords.vue";
import Humidity from "./components/Humidity.vue";

import { API_KEY, BASE_URL } from "./constants";

const city = ref("Dnipro");
const weatherInfo = ref(null);
const isError = computed(() => weatherInfo?.value?.cod !== 200);

function getWeather() {
  fetch(`${BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => (weatherInfo.value = data));
}

onMounted(getWeather);
</script>

<style lang="sass" scoped>
@import './assets/styles/main'
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px

.sections
  display: flex
  justify-content: space-between
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 30%
  min-width: 200px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0

.section-error
  min-width: 235px
  width: auto

.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 49%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%
</style>
