import React from 'react'

const PassageStep = ({ content }) => {
  return (
    <div className="lesson-passage">
      <div
        className="passage-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  )
}

export default PassageStep
