class Dep {
    constructor() {
      this.subs = [];
    }
  
    // 添加依赖
    addSub(sub) {
      this.subs.push(sub);
    }
  
    // 如果存在依赖将其添加
    depend() {
      if (window.target) {
        this.addSub(window.target);
      }
    }
  
    // 依赖变化循环依赖数组并为其更新
    notify() {
      const subs = this.subs.slice();
      for (let i = 0; i < subs.length; i++) {
        subs[i].update();
      }
    }
  }