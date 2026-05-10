<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const offers = [
  "Kauf 2, erhalte den 3. gratis – auf viele Produkte.",
  "Nur heute: Exklusive Angebote mit Premium-Rabatten.",
  "Luxus-Deals entdecken – ausgewählte Bestseller reduziert.",
  "Jetzt sparen und stilvoll shoppen im Atlas Store.",
];

const currentIndex = ref(0);
let intervalId: number | undefined;

const currentOffer = computed(() => offers[currentIndex.value]);

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % offers.length;
  }, 3500);
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="werbebar">
    <div class="werbebar__glow"></div>

    <div class="werbebar__inner">
      <span class="werbebar__star">✦</span>

      <span class="werbebar__badge">Sonderangebot</span>

      <Transition name="offer-slide" mode="out-in">
        <span :key="currentOffer" class="werbebar__text">
          {{ currentOffer }}
        </span>
      </Transition>

      <span class="werbebar__star">✦</span>
    </div>
  </div>
</template>

<style scoped>
.werbebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 201;
  overflow: hidden;

  background:
      linear-gradient(90deg, #03111f 0%, #082949 50%, #03111f 100%);
  border-bottom: 1px solid rgba(230, 184, 74, 0.7);
  box-shadow:
      0 0 18px rgba(230, 184, 74, 0.16),
      0 2px 16px rgba(0, 0, 0, 0.35);
}

.werbebar__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
      110deg,
      transparent 0%,
      rgba(255, 235, 170, 0.04) 35%,
      rgba(255, 215, 90, 0.22) 50%,
      rgba(255, 235, 170, 0.04) 65%,
      transparent 100%
  );
  transform: translateX(-120%);
  animation: shineSweep 4.8s ease-in-out infinite;
}

.werbebar__inner {
  position: relative;
  min-height: 38px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
}

.werbebar__badge {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: 999px;
  background: linear-gradient(180deg, #f6d778 0%, #dba93a 100%);
  color: #081522;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow:
      0 0 10px rgba(230, 184, 74, 0.32),
      inset 0 1px 1px rgba(255, 255, 255, 0.35);
  animation: badgePulse 2s ease-in-out infinite;
}

.werbebar__text {
  min-width: 320px;
  color: #f6d778;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-shadow: 0 0 10px rgba(230, 184, 74, 0.2);
}

.werbebar__star {
  flex-shrink: 0;
  color: #f6d778;
  font-size: 14px;
  filter: drop-shadow(0 0 6px rgba(230, 184, 74, 0.45));
  animation: starTwinkle 1.8s ease-in-out infinite;
}

.offer-slide-enter-active,
.offer-slide-leave-active {
  transition:
      opacity 0.45s ease,
      transform 0.45s ease;
}

.offer-slide-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.offer-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

@keyframes shineSweep {
  0% {
    transform: translateX(-120%);
  }
  55% {
    transform: translateX(120%);
  }
  100% {
    transform: translateX(120%);
  }
}

@keyframes badgePulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
        0 0 10px rgba(230, 184, 74, 0.32),
        inset 0 1px 1px rgba(255, 255, 255, 0.35);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
        0 0 16px rgba(230, 184, 74, 0.48),
        inset 0 1px 1px rgba(255, 255, 255, 0.45);
  }
}

@keyframes starTwinkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.18) rotate(12deg);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .werbebar__inner {
    gap: 10px;
    padding: 8px 12px;
  }

  .werbebar__badge {
    font-size: 9px;
    padding: 4px 10px;
  }

  .werbebar__text {
    min-width: 0;
    font-size: 12px;
  }
}
</style>