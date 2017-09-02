import VChip from '~components/VChip'
import { test, snapshotTests } from '~util/testing'

test('VChip.js', ({ mount }) => {
  snapshotTests(VChip)

  it('should have a chip class', () => {
    const wrapper = mount(VChip)

    expect(wrapper.hasClass('chip')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
