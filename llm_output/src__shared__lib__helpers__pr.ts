export function pr<T>(val: T, title: string = ""): T {
  if (title) {
    console.log(` ------------ ${title} ------------ `);
  } else {
    console.log(" ---------------------------------- ");
  }
  console.log(val);
  return val;
}
