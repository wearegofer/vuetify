import { test, snapshotTests } from '~util/testing'
import VSwitch from './VSwitch'

test('VSwitch', ({ mount }) => {
  snapshotTests(VSwitch)
})
