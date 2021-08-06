class Observer {
  constructor(value) {
    this.value = value; //观测的数据
    this.walk(value);
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

//定义响应式方法 通过Object.defineProperty()
function defineReactive(data, key, val) {
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      dep.depend();
      return val;
    },
    set: function (newVal) {
      if (newVal == val) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
}
