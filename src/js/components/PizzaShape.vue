<template>
  <svg viewBox="0 0 45 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :style="{color:color}"
      class="absolute left-0 top-0 h-full w-full">
    <g filter="url(#filter0_i)">
      <path d="M33 118.525C34.5759 118.525 36.1363 118.221 37.5922 117.629C39.0481 117.038 40.371 116.172 41.4853 115.08C42.5996 113.987 43.4835 112.691 44.0866 111.264C44.6896 109.837 45 108.307 45 106.762C45 105.218 44.6896 103.688 44.0866 102.261C43.4835 100.834 42.5996 99.5374 41.4853 98.4451C40.371 97.3529 39.0481 96.4865 37.5922 95.8954C36.1363 95.3042 34.5759 95 33 95L33 106.762L33 118.525Z"
          fill="currentColor" />
      <rect width="33" height="208" fill="currentColor" />
    </g>
    <defs>
      <filter id="filter0_i" x="0" y="0" width="45" height="212" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'PizzaShape',
  props: [
    'color',
  ],
};
</script>
