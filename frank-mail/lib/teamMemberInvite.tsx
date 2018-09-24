import React from 'react'
import createTemplate from './createTemplate'

export type TeamMemberInviteData = {
  inviter: {
    lastName?: string
    firstName: string
  }
  team: {
    name: string
  }
  invitee: {
    email: string
  }
  note?: string
  link: string
}

export default createTemplate<TeamMemberInviteData>(
  ({ data: { inviter, team, invitee, note, link } }) => {
    const inviterFullName = inviter.lastName ? `${inviter.firstName} ${inviter.lastName}` : inviter.firstName

    return {
      subject: `${inviterFullName} invited you to join ${team.name}`,
      body: (
        <div>
          <div>
            {inviterFullName}
            has invited you to join team {team.name} at Frank
          </div>
          {note && (
            <div>
              <b>A note for you:</b> {note}
            </div>
          )}
          <div>
            <a href={link} target="_blank">Join now</a>
          </div>
        </div>
      )
    }
  }
)
