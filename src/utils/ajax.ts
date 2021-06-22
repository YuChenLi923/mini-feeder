import eAjax, { AjaxOptions, HttpMethod } from 'extend-ajax';
const baseConfig: AjaxOptions= {
  isAsync: true,
  header: {
    "Content-Type": 'json',
    "Accept": "json"
  },
  timeout: 10000,
  withCredentials: true,
  convert (result: string): JSON | string {
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  },
  autoAbort: true,
  host: process.env.REACT_APP_AJAX || ''
};
eAjax.config(baseConfig);
function ajax (url: string, method: HttpMethod, config: AjaxOptions = {}): any {
  const Ajax = eAjax(url, method, config);
  return {
    async send (data: string | Record<string, unknown> | null | undefined): Promise<any> {
      const res = await Ajax.send(data);
      return res.data;
    }
  };
}

export default ajax;
