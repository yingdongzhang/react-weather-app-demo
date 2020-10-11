import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <h1>Weather Card</h1>
        </div>
        <div className="row">
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label>Enter your city</label>
                <Input placeholder='Melbourne, AU' />
              </Form.Field>
              <Button primary>Search</Button>
            </Form.Group>
          </Form>
        </div>
        <div className="row">

        </div>
      </div>
    )
  }
}

export default App
