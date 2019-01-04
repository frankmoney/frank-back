/* tslint:disable:max-classes-per-file */

declare module 'mx-atrium' {
  type Response$<T> = Response | T

  namespace Exports {
    enum environments {
      development,
      production,
    }

    type Response<T> = Response$<T>

    export type Member = {
      aggregated_at: string
      connection_status: string
      guid: string
      identifier: string
      institution_code: string
      is_being_aggregated: boolean
      metadata: string
      name: string
      status: string
      successfully_aggregated_at: string
      user_guid: string
    }

    export type Institution = {
      code: string
      medium_logo_url: string
      name: string
      small_logo_url: string
      url: string
      supports_account_identification: boolean
      supports_account_verification: boolean
    }

    class Client {
      public constructor(
        apiKey: string,
        clientId: string,
        environment: environments
      )

      public createUser(args: {
        body: {
          user: {
            identifier?: string
            is_disabled?: boolean
            metadata?: string
          }
        }
      }): Promise<
        Response<{
          user: {
            guid: string
            identifier: string
            is_disabled: boolean
            metadata: string
          }
        }>
      >

      public listInstitutions(args: {
        params?: {
          name?: string
        }
      }): Promise<Response<{ institutions: Institution[] }>>

      public readInstitution(args: {
        params: {
          institutionCode: string
        }
      }): Promise<Response<{ institution: Institution }>>

      public listCredentials(args: {
        params: {
          institutionCode: string
        }
      }): Promise<
        Response<{
          credentials: {
            field_name: string
            guid: string
            label: string
            type: string
            options?: {
              label: string
              value: string
            }[]
          }[]
        }>
      >

      public createMember(args: {
        params: {
          userGuid: string
        }
        body: {
          member: {
            credentials: {
              guid: string
              value: string
            }[]
            identifier?: string
            institution_code: string
            metadata?: string
          }
        }
      }): Promise<Response<{ member: Member }>>

      public readMember(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
      }): Promise<Response<{ member: Member }>>

      public updateMember(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
        body: {
          member: {
            credentials?: {
              guid: string
              value: string
            }[]
            identifier?: string
            metadata?: string
          }
        }
      }): Promise<Response<{ member: Member }>>

      public listMemberChallenges(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
      }): Promise<
        Response<{
          challenges: {
            field_name: string
            guid: string
            label: string
            type: string
            image_data?: string
            options?: {
              label: string
              value?: string
              image_data?: string
            }[]
          }[]
        }>
      >

      public resumeMemberAggregation(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
        body: {
          member: {
            challenges?: {
              guid: string
              value: string
            }[]
          }
        }
      }): Promise<Response<{ member: Member }>>

      public listMemberAccounts(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
      }): Promise<
        Response<{
          accounts: {
            apr: number
            apy: number
            available_balance: number
            available_credit: number
            balance: number
            created_at: string
            credit_limit: number
            currency_code: string
            day_payment_is_due: number
            guid: string
            institution_code: string
            interest_rate: number
            is_closed: boolean
            last_payment: number
            last_payment_at: string
            matures_on: string
            member_guid: string
            minimum_balance: number
            minimum_payment: number
            name: string
            original_balance: number
            payment_due_at: string
            payoff_balance: number
            started_on: string
            subtype: string
            total_account_value: number
            type: string
            updated_at: string
            user_guid: string
          }[]
        }>
      >

      public listMemberAccountNumbers(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
      }): Promise<Response<any>>

      public listMemberCredentials(args: {
        params: {
          userGuid: string
          memberGuid: string
        }
      }): Promise<
        Response<{
          credentials: any[]
        }>
      >
    }
  }

  export default Exports
}
