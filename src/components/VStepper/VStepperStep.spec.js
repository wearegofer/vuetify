import { test, snapshotTests } from '~util/testing'
import VStepperStep from './VStepperStep'

test('VStepperStep', ({ mount }) => {
  snapshotTests(VStepperStep, {
    // willBeTipped: 'Injection "stepClick" not found'
  })
})
