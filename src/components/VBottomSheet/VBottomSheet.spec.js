import VBottomSheet from '~components/VBottomSheet'
import { test, snapshotTests } from '~util/testing'

test('VBottomSheet', ({ mount }) => {
  snapshotTests(VBottomSheet, {
    willBeTipped: 'Application is missing <v-app> component.'
  })
})
