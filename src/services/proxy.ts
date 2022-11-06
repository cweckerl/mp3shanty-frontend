export interface Proxy {
  zip(url: string): Promise<Blob>
}
