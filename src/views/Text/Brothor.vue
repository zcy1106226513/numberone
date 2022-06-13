<template>
  <div>
    <h2>{{$attrs}}兄弟组件</h2>
    <button @click="handle">点击兄弟组件</button>
  </div>

</template>
<script>
import myEventBus from '@/views/Text/myEventBus.js'
export default {
  name: 'Brother',
  methods: {
    handle () {
      myEventBus.$emit('chan', 2)
    }
  }
}

</script>
