export async function handleErrorAsync(callback: any, args: any[]) {
  try {
    return await callback(...args);
  } catch (e) {
    console.log('Error:', e);
    return undefined;
  }
};