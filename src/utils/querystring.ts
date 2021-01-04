export const parse = function (str: string): Record<string, any> {
  const data: Record<string, any> = {};
  str = str.trim();
  if (str[0] === '?') {
    str = str.slice(1)
  }
  str.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    if (key) {
      data[key] = value;
    }
  });
  return data;
};
