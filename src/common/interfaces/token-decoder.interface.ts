export interface ITokenDecoder<T> {
  decode(token: string, config: any): Promise<T>;
}
