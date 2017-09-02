import { test, snapshotTests } from '~util/testing'
import VStepper from '~components/VStepper'

test('VStepper', ({ mount }) => {
  snapshotTests(VStepper)
})
