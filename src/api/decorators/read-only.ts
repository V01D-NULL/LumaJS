export const readonly = (target: any, name: any, descriptor: any) => {
  descriptor.writable = false;
  return descriptor;
};
