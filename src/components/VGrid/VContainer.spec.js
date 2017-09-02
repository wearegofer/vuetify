import { test, snapshotTests } from '~util/testing'
import { VContainer } from '~components/VGrid'

const id = 'container'

test('VContainer', ({ mount, functionalContext }) => {
  snapshotTests(VContainer)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VContainer, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom id and match snapshot', () => {
    const wrapper = mount(VContainer, functionalContext({
      propsData: {
        id
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
