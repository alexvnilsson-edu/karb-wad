export function executorFunc() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

  };
}

export function executorClass
  <T extends { new(...args: any[]): {}}>
  (constructor: T) {
  return class extends constructor {

  };
}
