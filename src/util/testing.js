import Vue from 'vue'
import load from '~util/load'
import { mount, shallow } from 'avoriaz'
import toHaveBeenWarnedInit from '~util/to-have-been-warned'

export function test(name, cb) {
  toHaveBeenWarnedInit()

  Vue.prototype.$vuetify = {
    load: (fn) => fn(),
    breakpoint: {}
  }

/*
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)
*/

  rafPolyfill(window)

  describe(name, () => cb({
    functionalContext,
    mount,
    shallow
  }))
}

export function functionalContext(context = {}, children = []) {
  if (!Array.isArray(children)) children = [children]
  return {
    context: Object.assign({
      data: {},
      props: {}
    }, context),
    children
  }
}

//requestAnimationFrame polyfill | Milos Djakonovic ( @Miloshio ) | MIT | https://github.com/milosdjakonovic/requestAnimationFrame-polyfill
export function rafPolyfill(w) {
  /**
   *
   * How many times should polyfill call
   * update callback? By canon, it should
   * be 60 times per second, so that ideal
   * framerate 60fps could be reached.
   *
   * However, even native implementations
   * of requestAnimationFrame often cannot
   * do 60fps, but, unlike any polyfill,
   * they can synchronise achievable fps
   * rate with screen refresh rate.
   *
   * So, leave this value 1000/60 unless
   * you target specific browser on spec
   * ific device that is going to work
   * better with custom value. I think
   * that this is the longest comment I've
   * written on single variable so far.
  **/
  var FRAME_RATE_INTERVAL = 1000/60,

  /**
   * All queued callbacks in given cycle.
  **/
  allCallbacks = [],

  executeAllScheduled = false,

  shouldCheckCancelRaf = false,

  /**
   * Callbacks queued for cancellation.
  **/
  callbacksForCancellation = [],

  /**
   * Should callback be cancelled?
   * @param cb - callback
  **/
  isToBeCancelled = function(cb){
    for(var i=0;i<callbacksForCancellation.length;i++){
      if(callbacksForCancellation[i] === cb ){
        callbacksForCancellation.splice(i,1);
        return true;
      }
    }
  },



  /**
   *
   * Executes all (surprise) callbacks in
   * and removes them from callback queue.
   *
  **/
  executeAll = function(){
    executeAllScheduled = false;
    var _allCallbacks = allCallbacks;
    allCallbacks = [];
    for(var i=0;i<_allCallbacks.length;i++){
      if(shouldCheckCancelRaf===true){
        if (isToBeCancelled(_allCallbacks[i])){
          shouldCheckCancelRaf = false;
          return;
        }
      }
      _allCallbacks[i].apply(w, [ new Date().getTime() ] );
    }
  },

  /**
   *
   * requestAnimationFrame polyfill
   * @param callback - callback to be queued & executed | executed
   * @return callback
   *
  **/
  raf = function(callback){
    allCallbacks.push(callback);
    if(executeAllScheduled===false){
      w.setTimeout(executeAll, FRAME_RATE_INTERVAL);
      executeAllScheduled = true;
    }
    return callback;
  },

  /**
   *
   * Cancels raf.
  **/
  cancelRaf = function(callback){
    callbacksForCancellation.push(callback);
    shouldCheckCancelRaf = true;
  },


  //https://gist.github.com/paulirish/1579671
  vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !w.requestAnimationFrame; ++x) {
        w.requestAnimationFrame = w[vendors[x]+'RequestAnimationFrame'];
        w.cancelAnimationFrame = w[vendors[x]+'CancelAnimationFrame']
        || w[vendors[x]+'CancelRequestAnimationFrame'];
    }

  if (!w.requestAnimationFrame) w.requestAnimationFrame = raf;
  if (!w.cancelAnimationFrame)  w.cancelAnimationFrame  = cancelRaf;

}

function UnsupportedPropType (message) {
  this.message = message
  this.name = 'UnsupportedPropType'
}

function PropHasNoType (message) {
  this.message = message
  this.name = 'PropHasNoType'
}

function PropIsNull (message) {
  this.message = message
  this.name = 'PropIsNull'
}

export function snapshotTests (component, options = {}) {
  const testDescription = 'Render component and match snapshot(s)'
  const mountAndSnapshot = (component, context) => {
    return () => {
      const wrapper = mount(component, context)
      expect(wrapper.html()).toMatchSnapshot()
      options.willBeTipped && expect(options.willBeTipped).toHaveBeenTipped()
    }
  }

  function is (type, obj) {
    const clas = Object.prototype.toString.call(obj).slice(8, -1)
    return obj !== undefined && obj !== null && clas === type
  }

  if (component.functional) {
    it(testDescription, mountAndSnapshot(component, functionalContext()))
  } else {
    describe(testDescription, () => {
      const testMountAndSnapshot = (component, propName, value) => {
        const context = {
          propsData: {
            [propName]: value
          }
        }

        it(`${propName} - ${value}`, mountAndSnapshot(component, context))
      }

      const testProperty = (component, propName, propInstance) => {
        if (is('Boolean', propInstance)) {
          [false, true].forEach((value) => testMountAndSnapshot(component, propName, value))
        } else if (is('String', propInstance)) {
          switch (propName) {
            case 'icon':
              testMountAndSnapshot(component, propName, 'list')
              break
            case 'size':
            case 'width':
            case 'height':
            case 'maxWidth':
            case 'minWidth':
            case 'maxHeight':
            case 'minHeight':
              testMountAndSnapshot(component, propName, '100px')
              break
            case 'zIndex':
              testMountAndSnapshot(component, propName, '100')
              break
            case 'origin':
              testMountAndSnapshot(component, propName, 'top right')
              break
            case 'transition':
              testMountAndSnapshot(component, propName, 'dialog-transition')
              break
            default:
              testMountAndSnapshot(component, propName, 'hello world')
          }
        } else if (is('Number', propInstance)) {
          switch (propName) {
            case 'size':
            case 'width':
            case 'height':
            case 'zIndex':
            default:
              testMountAndSnapshot(component, propName, 100)
          }
        } else {
          throw new UnsupportedPropType(`${propName} type is not supported: ${Object.prototype.toString.call(propInstance)}`)
        }
      }

      it(`only defaults`, mountAndSnapshot(component, {}))

      Object.keys(component.props).forEach((propName) => {
        // console.log(`${component.name}.${propName}`, component.props[propName])
        if (component.props[propName] === null) {
          throw new PropIsNull(`'${component.name}.${propName}' prop should not be set to 'null'.`)
        } else
        if (component.props[propName].type && is('Array', component.props[propName].type)) {
          component.props[propName].type.forEach((propType) => {
            const propInstance = propType()
            testProperty(component, propName, propInstance)
          })
        } else
        if (is('Array', component.props[propName])) {
          component.props[propName].forEach((propType) => {
            const propInstance = propType()
            testProperty(component, propName, propInstance)
          })
        } else {
          if (!component.props[propName].type && !is('Function', component.props[propName])) {
            throw new PropHasNoType(`'${component.name}.${propName}' prop has no type defined. This can lead to unexpected behavior.`)
          }

          const propInstance = component.props[propName].type
            ? component.props[propName].type()
            : component.props[propName]()

          testProperty(component, propName, propInstance)
        }
      })
    })
  }
}
