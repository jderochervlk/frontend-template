import React from 'react'

import { taskCopy } from './lib/task-copy.js'

type HeaderTitleProps = Readonly<object>

const HeaderTitle = (): React.JSX.Element => (
  <div>
    <p className='eyebrow'>{taskCopy.starterApp}</p>
    <h1>{taskCopy.taskBoard}</h1>
  </div>
)

export { HeaderTitle, type HeaderTitleProps }
