import { useEffect, useState } from "react"
import { changeIcon, processReview } from "~background"


function IndexPopup() {

  return (
    <div
      style={{
        padding: 16
      }}>
      <h1>Icon Review POC</h1>
      <button onClick={() => { processReview(Math.random() > 0.5 ? true : false)}}>click to change icon</button>
    </div>
  )
}

export default IndexPopup
