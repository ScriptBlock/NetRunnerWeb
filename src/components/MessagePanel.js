/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */


import { useState, useEffect, useRef } from 'react'

const MessagePanel = (props) => {

    useEffect(() => {

        console.log("updated because uimessage updated")
       console.log(props.uiMessages)

    }, [props.uiMessages])

    return (
        <div>
        {
            // props.uiMessages.map((message,k) => (
            //     <div key={k}>{message}</div>
            // ))
        }            
        </div>
    )
}

export default MessagePanel
