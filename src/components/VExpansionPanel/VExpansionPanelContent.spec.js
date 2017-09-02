import { test, snapshotTests } from '~util/testing'
import VExpansionPanelContent from '~components/VExpansionPanelContent'

test('VExpansionPanelContent.js', ({ mount }) => {
  snapshotTests(VExpansionPanelContent)

  // Fix when next Vue release is out
  it('should render component and match snapshot', () => {
  //   const wrapper = mount(VExpansionPanelContent)

  //   expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
  //   const wrapper = mount(VExpansionPanelContent, {
  //     propsData: {
  //       ripple: true
  //     }
  //   })

  //   expect(wrapper.html()).toMatchSnapshot()
  })
})
