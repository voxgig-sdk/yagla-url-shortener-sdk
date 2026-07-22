
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YaglaUrlShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await YaglaUrlShortenerSDK.test()
    equal(null !== testsdk, true)
  })

})
