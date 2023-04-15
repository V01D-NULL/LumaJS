export const readonly = (target: any, name: any, descriptor: any) => {
  descriptor.writable = false;
  console.log("ABC", descriptor);

  return descriptor;
};
