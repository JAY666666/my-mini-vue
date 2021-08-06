class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    new Observer(this.$data);
    new Compiler(this);
  }
}
