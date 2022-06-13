<template>
  <div>
    <h2>{{myname}}</h2>
    <h3>{{$attrs}}</h3>

    <button @click="handle"></button>
    <Brothor v-bind="$attrs"></Brothor>
  </div>

</template>
<script>
import Brothor from '@/views/Text/Brothor'
export default {
  name: 'Children',
  components: {
    Brothor
  },

  props: ['myname'],
  data () {
    return {
      age: 23,
      str: 'abcde'

    }
  },
  created () {
    console.log(this.$listeners)
  },
  methods: {
    handle () {
      this.$emit('jiajia', '1')
    }
  }

}

</script>
<style>
</style>
