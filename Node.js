class Node {
  constructor(function, dependencies = []) {
    this.value = null; 
    this.function = function;
    this.dependencies = dependencies;
  }

  evaluate() {
    value = function(dependencies[0].value, dependencies[1].value); // how does this work for ! lmao 
    return value
  }
}
