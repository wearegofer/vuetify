import { test, snapshotTests } from '~util/testing'
import VExpansionPanel from '~components/VExpansionPanel'

test('VExpansionPanel.js', ({ mount }) => {
  snapshotTests(VExpansionPanel)

  // Fix when next Vue release is out
  it('should render component and match snapshot', () => {
  //   const wrapper = mount(VExpansionPanel)

    // expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
  //   const wrapper = mount(VExpansionPanel, {
  //     propsData: {
  //       expand: true
  //     }
  //   })

  //   expect(wrapper.html()).toMatchSnapshot()
  })
})
