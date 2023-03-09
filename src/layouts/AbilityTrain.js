import { Link } from 'react-router-dom'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

function AbilityTrain() {
  return (
    <div className="ability-train">
      <Link to="/login">
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <a href="/startToChat">
        <FontAwesomeIcon icon={faComment} />
      </a>
    </div>
  )
}

export default AbilityTrain
