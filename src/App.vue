

<template >
  <BACKHEADER v-if="showBackHeader"></BACKHEADER>
  <FRONTHEADER  v-if="showFrontHeader"></FRONTHEADER>
  <div class="bg-gray-200">
  <RouterView />
  </div>
  <FOOTER v-if="showFooter"></FOOTER>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BACKHEADER from '@/components/back/BackHeader.vue'
import FOOTER from '@/components/Footer.vue'
import FRONTHEADER from '@/components/front/FrontHeader.vue'
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute();
const router = useRouter();

const showHeader = computed(()=>route.meta.showHeader)
const showBackHeader = computed(()=>route.meta.showBackHeader)
const showFooter = computed(()=>route.meta.showFooter)
const showFrontHeader = computed(()=>route.meta.showHeader)
</script>
<style scoped>

</style>
