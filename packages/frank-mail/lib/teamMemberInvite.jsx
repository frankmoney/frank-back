"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const createTemplate_1 = __importDefault(require("./createTemplate"));
exports.default = createTemplate_1.default(({ data: { inviter, team, invitee, note, link } }) => {
    const inviterFullName = inviter.lastName ? `${inviter.firstName} ${inviter.lastName}` : inviter.firstName;
    return {
        subject: `${inviterFullName} invited you to join ${team.name}`,
        body: (<div>
          <div>
            {inviterFullName}{' '}
            has invited you to join team {team.name} at Frank
          </div>
          {note && (<div>
              <b>A note for you:</b> {note}
            </div>)}
          <div>
            <a href={link} target="_blank">Join now</a>
          </div>
        </div>)
    };
});
