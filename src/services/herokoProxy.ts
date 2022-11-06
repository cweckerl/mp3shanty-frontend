import { Proxy } from "./proxy";

export class HerokoProxy implements Proxy {
  async zip(url: string): Promise<Blob> {
    const proxy = process.env.REACT_APP_PROXY

    return new Promise((resolve, reject) => {
      fetch(`https://${proxy}.herokuapp.com/${url}`,
        { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(r => resolve(r.blob()))
        .catch(err => reject(err))
    })
  }
}
