import Vue, { ComponentOptions } from 'vue'

import { defaultOptions, InfoAddonOptions } from '../options'
import { RuntimeComponentOptions } from '../types/VueRuntime'

import getPropsInfoList from '../getPropsInfoList'
import parseStoryComponent from '../parseStoryComponent'

import InfoView from '../components/InfoView.vue'

export type StoryFactory = () => RuntimeComponentOptions
export type WithInfo = (story: StoryFactory) => () => ComponentOptions<Vue>

function withInfo(options: Partial<InfoAddonOptions>): WithInfo
function withInfo(summary: string): WithInfo

/**
 * Displays Component information
 */
function withInfo(options: Partial<InfoAddonOptions> | string): WithInfo {
  return storyFn => () => {
    const opts = {
      ...defaultOptions,
      ...(typeof options === 'string' ? { summary: options } : options)
    }

    const story = storyFn()

    const componentInfo = parseStoryComponent(story)

    const propsList = getPropsInfoList(componentInfo.component)

    return {
      render(h) {
        return h(InfoView, {
          props: {
            name: componentInfo.name,
            summary: opts.summary,
            template: story.template,
            propsList,
            showHeader: opts.header,
            showSource: opts.source,
            userStyle: opts.styles
          },
          scopedSlots: {
            default: () => [h(story)]
          }
        })
      }
    }
  }
}

export default withInfo
