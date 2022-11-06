import { Proxy } from "./proxy";

export class MockProxy implements Proxy {
  async zip(url: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      resolve(new Blob())
    })
  }
}
