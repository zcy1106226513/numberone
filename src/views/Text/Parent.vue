<template>
  <div>
    <h2>1</h2>
    <h2>{{newArr}}</h2>
    <Children ref="Cref" myname="zhangsan" @jiajia="ahandle" :height="'178cm'"></Children>
    <button @click="bhandle">获取</button>
    <input v-model="str">
  </div>

</template>

<script>
import myEventBus from '@/views/Text/myEventBus.js'
import Children from '@/views/Text/Children'
export default {
  name: 'Parent',
  components: {
    Children
  },
  data () {
    return {
      str: 'abcde'
    }
  },
  computed: {
    newArr: function () {
      return this.str.split('').reverse().join('')
    }
  },
  watch: {
    str: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },

  created () {
    myEventBus.$on('chan', function (arg) {
      console.log(arg)
    })
  },
  methods: {
    ahandle (arg) {
      console.log('触发', arg)
    },
    bhandle () {
      console.log(this.$refs.Cref.age)
    }

  }
}

// function fetchData (callback) {
//   setTimeout(() => {
//     callback(null)
//   }, 5000)
// }
// fetchData()

// function PromiseFetch (resolve) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('返回的数据')
//     }, 3000)
//   })
// }
// PromiseFetch().then((res) => {
//   console.log('res')
// })
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1111)
//   }, 1000)
// })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2000)
//   }, 2000)
// })
// Promise.allSettled([p1, p2]).then((res) => {
//   console.log(res)
// })
// document.querySelector('.class').onclick = function () {
//   const xhr = new XMLHttpRequest()
//   xhr.open('get', 'http://www.local:8080', true)
//   xhr.onload = function () {
//     console.log(xhr.resbonseText)
//   }
//   xhr.send()
// }
// const obj = {

// }
// console.log(obj)
// const fn = function () {

// }
// console.dir(
function Person (age) {
  this.age = age
}
Person.prototype.name = '张三'
Person.prototype.getAge = function () {
  console.log('111')
}
const Person1 = new Person(18)
console.dir(Person1)
console.log(Person1.name)
Person1.getAge()
// Person1.abc()
const address = [
  {
    id: 1,
    name: '北京市',
    children: [
      {
        id: 11,
        name: '海淀区',
        children: [
          {
            id: 111,
            name: '中关村'
          }
        ]
      },
      {
        id: 12,
        name: '朝阳区'
      }
    ]
  },
  {
    id: 2,
    name: '河北省'
  }
]
function getNameById (address, id) {
  let res = ''
  for (let i = 0; i < address.length; i++) {
    if (address[i].id === id) {
      res = address[i].name
    } else {
      if (address[i].children) {
        getNameById(address[i].children, id)
      }
    }
  }
  console.log(res)
  return res
}
getNameById(address, 111)

</script>
<style>
</style>
