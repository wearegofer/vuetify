import VAvatar from '~components/VAvatar'
import { test, snapshotTests } from '~util/testing'

test('VAvatar.vue', ({ mount, functionalContext }) => {
  snapshotTests(VAvatar)

  it('should have an avatar class', () => {
    const wrapper = mount(VAvatar, functionalContext())

    expect(wrapper.hasClass('avatar')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
