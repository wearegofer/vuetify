import { test, snapshotTests } from '~util/testing'
import vsteppercontent from './vsteppercontent'

test('vsteppercontent', ({ mount }) => {
  snapshotTests(vsteppercontent)
})
