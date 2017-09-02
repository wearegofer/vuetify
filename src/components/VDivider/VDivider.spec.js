import { test, snapshotTests } from '~util/testing'
import VDivider from '~components/VDivider'

test('VDivider.js', ({ mount, functionalContext }) => {
  snapshotTests(VDivider)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext({
      propsData: {
        inset: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
