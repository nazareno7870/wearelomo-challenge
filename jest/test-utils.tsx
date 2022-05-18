import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import {store} from '../src/app/store'

const render = (component: any) => rtlRender(
  <Provider store={store}>
      {component}
  </Provider>
);

export * from '@testing-library/react'
export { render }