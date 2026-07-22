
import { Context } from './Context'


class YaglaUrlShortenerError extends Error {

  isYaglaUrlShortenerError = true

  sdk = 'YaglaUrlShortener'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YaglaUrlShortenerError
}

