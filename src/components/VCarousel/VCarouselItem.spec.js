import { test, snapshotTests } from '~util/testing'
import { VCarouselItem } from '~components/VCarousel'

const imageSrc = 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'

test('VCarouselItem.js', ({ mount }) => {
  snapshotTests(VCarouselItem)

  it('should render component and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc,
        transition: 'slide-y-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom reverse transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc,
        'reverse-ransition': 'slide-y-reverse-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
