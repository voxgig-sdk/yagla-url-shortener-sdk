
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YaglaUrlShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YaglaUrlShortenerSDK.test()
    equal(testsdk instanceof YaglaUrlShortenerSDK, true,
      'YaglaUrlShortenerSDK.test() must return a client synchronously')
  })

})
