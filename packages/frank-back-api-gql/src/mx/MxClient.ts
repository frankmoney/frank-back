import Atrium from 'mx-atrium'
import config from 'config'
import { Log } from 'log'
import { httpError } from '../errors'

export interface AtriumClientScope {
  logFor: (name: string) => Log
}

export default class AtriumClient {
  public static create(scope: AtriumClientScope): AtriumClient {
    const log = scope.logFor('AtriumClient')

    const client = new Atrium.Client(
      config.MX_API_KEY,
      config.MX_CLIENT_ID,
      Atrium.environments.development
    )

    return new AtriumClient(log, client)
  }

  public constructor(log: Log, client: Atrium.Client) {
    this.log = log
    this.client = client
  }

  public async createUser({
    user,
  }: {
    user: {
      identifier?: string
      is_disabled?: boolean
      metadata?: string
    }
  }) {
    return this.handleResponse(
      await this.client.createUser({
        body: {
          user,
        },
      }),
      `createUser(${user.identifier})`
    )
  }

  public async listInstitutions(args?: { name?: string }) {
    return this.handleResponse(
      await this.client.listInstitutions({
        params: {
          name: args && args.name,
        },
      }),
      `listInstitutions(${args && args.name})`
    )
  }

  public async readInstitution({
    institutionCode,
  }: {
    institutionCode: string
  }) {
    return this.handleResponse(
      await this.client.readInstitution({
        params: {
          institutionCode,
        },
      }),
      `readInstitution(${institutionCode})`
    )
  }

  public async listCredentials({
    institutionCode,
  }: {
    institutionCode: string
  }) {
    return this.handleResponse(
      await this.client.listCredentials({
        params: {
          institutionCode,
        },
      }),
      `listCredentials(${institutionCode})`
    )
  }

  public async createMember({
    userGuid,
    member,
  }: {
    userGuid: string
    member: {
      credentials: {
        guid: string
        value: string
      }[]
      identifier?: string
      institution_code: string
      metadata?: string
    }
  }) {
    return this.handleResponse(
      await this.client.createMember({
        params: {
          userGuid,
        },
        body: {
          member,
        },
      }),
      `createMember(${userGuid}, ${member.identifier})`
    )
  }

  public async readMember({
    userGuid,
    memberGuid,
  }: {
    userGuid: string
    memberGuid: string
  }) {
    return this.handleResponse(
      await this.client.readMember({
        params: {
          userGuid,
          memberGuid,
        },
      }),
      `readMember(${userGuid}, ${memberGuid})`
    )
  }

  public async updateMember({
    userGuid,
    memberGuid,
    member,
  }: {
    userGuid: string
    memberGuid: string
    member: {
      credentials?: {
        guid: string
        value: string
      }[]
      identifier?: string
      metadata?: string
    }
  }) {
    return this.handleResponse(
      await this.client.updateMember({
        params: {
          userGuid,
          memberGuid,
        },
        body: {
          member,
        },
      }),
      `updateMember(${userGuid}, ${memberGuid})`
    )
  }

  public async listMemberChallenges({
    userGuid,
    memberGuid,
  }: {
    userGuid: string
    memberGuid: string
  }) {
    return this.handleResponse(
      await this.client.listMemberChallenges({
        params: {
          userGuid,
          memberGuid,
        },
      }),
      `listMemberChallenges(${userGuid}, ${memberGuid})`
    )
  }

  public async resumeMemberAggregation({
    userGuid,
    memberGuid,
    member,
  }: {
    userGuid: string
    memberGuid: string
    member: {
      challenges: {
        guid: string
        value: string
      }[]
    }
  }) {
    return this.handleResponse(
      await this.client.resumeMemberAggregation({
        params: {
          userGuid,
          memberGuid,
        },
        body: {
          member,
        },
      }),
      `resumeMemberAggregation(${userGuid}, ${memberGuid})`
    )
  }

  public async listMemberAccounts({
    userGuid,
    memberGuid,
  }: {
    userGuid: string
    memberGuid: string
  }) {
    return this.handleResponse(
      await this.client.listMemberAccounts({
        params: {
          userGuid,
          memberGuid,
        },
      }),
      `listMemberAccounts(${userGuid}, ${memberGuid})`
    )
  }

  private readonly log: Log
  private readonly client: Atrium.Client

  private handleResponse<T>(response: Atrium.Response<T>, message: string): T {
    this.log.trace(`${message}\r\n%O`, response)

    // mx-atrium returns Body.json() on success
    // here's stupid way to detect that
    const a = <any>response
    if (
      typeof a.arrayBuffer === 'function' &&
      typeof a.blob === 'function' &&
      typeof a.formData === 'function' &&
      typeof a.json === 'function' &&
      typeof a.text === 'function'
    ) {
      throw httpError(<Response>response)
    }

    return <T>response
  }
}
