fakeData()
function Model(options) {
    this.data = options.data
    this.resource = options.resource
}
Model.prototype.fetch = function (id) {
    return axios.get(`/${this.resource}s/${id}`).then((response) => {
        this.data = response.data
        return response
    })
}
Model.prototype.update = function (id, data) {
    return axios.put(`/${this.resource}s/${id}`, data).then((response) => {
        this.data = response.data
        return response
    })
}
let model = new Model(
    {
        data: {
            name: '',
            number: 0,
            id: ''
        },
        resource: 'book'
    }
)


/*function View({el,template}){
    this.el = el
    this.template = template
  }
  View.prototype.render = function(data){
      let html = this.template
      for(let key in data){
        html = html.replace(`__${key}__`,data[key])
      }
      $(this.el).html(html)
  }*/


let view = new Vue({
    el: '#app',
    data: {
        book: {
            name: '未命名',
            number: 0,
            id: ''
        },
        n: 1
    },
    template: `
      <div>
          <pre>
              书名：《{{book.name}}》
              数量：<span id="number">{{book.number}}</span>
          </pre>
          <div>
             <input v-model="n">
              n的值是 {{n}}
          </div>
          <div>
              <button v-on:click="addOne">加n</button>
              <button v-on:click="minusOne">减n</button>
              <button v-on:click="reset">清零</button>
          </div>
      </div>
  `,
    created() {
        model.fetch(1).then(() => {
            this.book = model.data
        })
    },
    methods: {
        addOne() {
            model.update(1, { number: this.book.number + (this.n - 0) }).then(() => {
                this.book = model.data
            })
        },
        minusOne() {
            model.update(1, { number: this.book.number - (this.n - 0) }).then(() => {
                this.book = model.data
            })
        },
        reset() {
            model.update(1, { number: 0 }).then(() => {
                this.book = model.data
            })
        }
    }
})




function fakeData() {
    let book = {
        name: 'JavaScript 高级程序设计',
        number: 3,
        id: 1
    }
    axios.interceptors.response.use(function (response) {
        let { config: { method, url, data } } = response
        if (url === '/books/1' && method === 'get') {
            response.data = book
        } else if (url === '/books/1' && method === 'put') {
            data = JSON.parse(data)
            Object.assign(book, data)
            response.data = book
        }
        return response
    })
}











// let book = {
//     name: 'JavaScript 高级程序设计',
//     number: 3,
//     id: 1
//   }
// //在真正返回response之前使用
//   axios.interceptors.response.use(function (response){
//       let {config:{method,url,data}} = response
//       if(url === '/book/1' && method === 'get'){
//           response.data = book
//       }else if(url === '/book/1' && method === 'put'){
//         Object.assign(book,data)
//         response.data = book
//       }
//       return response
//   })

//   axios.get('/book/1')
//       .then((response)=>{
//           let originalHtml = $('#app').html()
//           let newHtml = originalHtml.replace('__name__',response.data.name)
//           .replace('__number__',response.data.number)
//           $('#app').html(newHtml)
//       })

//   $('#app').on('click','#addOne',function(){
//     var oldNumber = $('#number').text()
//     var newNumber = oldNumber -0 +1
//     axios.put('/book/1',{
//       number:newNumber
//     }).then(() => {
//         $('#number').text(newNumber)
//     })
//   })
//   $('#app').on('click','#minusOne',function(){
//     var oldNumber = $('#number').text()
//     var newNumber = oldNumber -0 -1
//     axios.put('/book/1',{
//       number:newNumber
//     }).then(() => {
//         $('#number').text(newNumber)
//     })
//   })
//   $('#app').on('click','#reset',function(){
//     $('#number').text(0)
//     axios.put('/book/1',{
//       number:newNumber
//     }).then(() => {
//         $('#number').text(newNumber)
//     })
//   })