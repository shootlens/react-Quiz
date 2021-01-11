import ReactDOM from 'react-dom'
import React from 'react'
import Quiz from './Quiz'


function App () {
    return(
        <div>
        {/* we can write here....everything will be displayed on the main page */}
           <Quiz></Quiz>
        </div>
    )
}

export default App


const rootElement = document.getElementById ('root')
ReactDOM.render(<App></App>, rootElement)
