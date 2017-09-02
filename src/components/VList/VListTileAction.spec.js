import { VListTileAction } from '~components/VList'
import { test, snapshotTests } from '~util/testing'

test('VListTileAction.js', ({ mount, functionalContext }) => {
  snapshotTests(VListTileAction)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VListTileAction, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })
})
