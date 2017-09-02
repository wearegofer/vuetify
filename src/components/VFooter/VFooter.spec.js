import { test, snapshotTests } from '~util/testing'
import VFooter from '~components/VFooter'

test('VFooter.js', ({ mount, functionalContext }) => {
  snapshotTests(VFooter)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VFooter, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an absolute positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, functionalContext({
      propsData: {
        absolute: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fixed positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, functionalContext({
      propsData: {
        fixed: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fixed and absolute positioned and match snapshot', () => {
    const wrapper = mount(VFooter, functionalContext({
      propsData: {
        absolute: true,
        fixed: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
