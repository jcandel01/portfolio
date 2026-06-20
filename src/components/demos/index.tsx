import type { DemoKey } from '../../data/projects'
import { SphereDemo } from './SphereDemo'
import { Best365Demo } from './Best365Demo'
import { IdeaTrackerDemo } from './IdeaTrackerDemo'
import { StoryforgeDemo } from './StoryforgeDemo'
import { EcoVecinosDemo } from './EcoVecinosDemo'

export const demoComponents: Record<DemoKey, () => React.JSX.Element> = {
  sphere: SphereDemo,
  best365: Best365Demo,
  ideatracker: IdeaTrackerDemo,
  storyforge: StoryforgeDemo,
  ecovecinos: EcoVecinosDemo,
}
