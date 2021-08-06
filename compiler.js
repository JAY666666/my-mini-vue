class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.$el = vm.$el;
    this.compile(this.$el);
  }

  compile(el) {
    let nodes = el.childNodes;
    Array.from(nodes).forEach((node) => {
      this.isTextNode(node)
        ? this.compileTextNode(node)
        : this.compileElementNode(node);
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  // 判断是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }

  // 解析文本节点 => Element或者Attr中实际的文字
  compileTextNode(node) {
    console.log("文本节点", node.textContent);
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm.$data[key]);
      new Watcher(this.vm.$data, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }

  // 解析元素节点 => 一个元素节点，例如<p>和<div>
  compileElementNode(node) {
    console.log("元素节点", node);
    if (node.attributes.length) {
      Array.from(node.attributes).forEach((attr) => {
        let attrName = attr.name;
        if (this.isVueDirective(attrName)) {
          attrName = attrName.substring(2); //获取v-xxx 指令名
          let key = attr.value; //获取v-xxx = value vlue名
          node.value = this.vm.$data[key];
          if (attrName == "model") {
            // 双向绑定
            node.addEventListener("input", () => {
              this.vm.$data[key] = node.value;
              console.log("model值变化", this.vm.$data[key]);
            });
          }
          new Watcher(this.vm.$data, key, (newValue) => {
            node.value = newValue;
          });
        }
      });
    }
  }

  // 判断是否是vue指令
  isVueDirective(attr) {
    return attr.startsWith("v-");
  }
}
