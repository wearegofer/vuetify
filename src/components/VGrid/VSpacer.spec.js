import { test, snapshotTests } from '~util/testing'
import { VSpacer } from '~components/VGrid'

const id = 'spacer'

test('VSpacer', ({ mount, functionalContext }) => {
  snapshotTests(VSpacer)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VSpacer, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom id and match snapshot', () => {
    const wrapper = mount(VSpacer, functionalContext({
      propsData: {
        id
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
