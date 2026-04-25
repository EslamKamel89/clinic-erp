export async function sleep(seconds: number) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });
}
