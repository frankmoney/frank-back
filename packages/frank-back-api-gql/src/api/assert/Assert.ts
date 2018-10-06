import Scoped from 'api/Scoped'
import User from 'api/User'

export default class Assert {
  public get user() {
    return this._user
  }

  public static create(scope: Scoped<'user'>) {
    return new Assert(scope.user)
  }

  public constructor(user: null | User) {
    this._user = user
  }

  private readonly _user: null | User
}
