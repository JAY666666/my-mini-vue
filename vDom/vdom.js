// 虚拟dom
class Element {
  constructor(type, props, children) {
    this.type = type; // 节点类型,如'span','div'
    this.props = props; // 节点属性, 如class='ul' style
    this.children = children; // 子节点
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

// 把虚拟dom渲染成真实dom
function render(vDom) {
  let el = document.createElement(vDom.type);

  // 遍历属性
  for (let key in vDom.props) {
    setAttr(el, key, vDom.props[key]);
  }

  vDom.children.forEach((child) => {
    child =
      child instanceof Element ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  });
  return el;
}

// 处理节点属性
function setAttr(node, key, value) {
  switch (key) {
    case "value":
      if (
        node.tagName.toLowerCase() === "input" ||
        node.tagName.toLowerCase() === "textArea"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

// 把节点插入到页面
function renderDom(target, el) {
  target.appendChild(el);
}