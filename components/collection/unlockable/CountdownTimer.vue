<template>
  <div ref="wrapper" class="p-4 keen-slider has-background-inverse">
    <div
      v-for="(_, index) in slidesArray"
      :key="index"
      class="keen-slider__slide flex no-wrap">
      <div class="no-wrap">
        <span class="mr-4 has-text-grey">Mint Phase Ends In</span
        ><span class="has-text-inverse"
          >{{ getPositiveNumber(hours) }} Hours :
          {{ getPositiveNumber(minutes) }} Minutes :
          {{ getPositiveNumber(seconds) }} Seconds</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/vue.es'
import { countDownTime, slidesCountOnTimeCountdown } from './const'
import { useCountDown } from './utils/useCountDown'
const animation = { duration: 30000, easing: (t) => t }
const getPositiveNumber = (number: number) => Math.max(0, number)

const slidesArray = Array(slidesCountOnTimeCountdown).fill(0)
const { hours, minutes, seconds } = useCountDown({ countDownTime })

const [wrapper] = useKeenSlider({
  loop: true,
  renderMode: 'performance',
  slides: {
    origin: 'center',
    perView: window.innerWidth / 500,
    spacing: 10,
  },
  drag: false,
  created(s) {
    s.moveToIdx(1, true, animation)
  },
  updated(s) {
    s.moveToIdx(s.track.details.abs + 1, true, animation)
  },
  animationEnded(s) {
    s.moveToIdx(s.track.details.abs + 1, true, animation)
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/abstracts/variables';
</style>
