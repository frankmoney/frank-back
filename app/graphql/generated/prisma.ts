import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    teams: <T = Team[]>(args: { where?: TeamWhereInput, orderBy?: TeamOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMembers: <T = TeamMember[]>(args: { where?: TeamMemberWhereInput, orderBy?: TeamMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accounts: <T = Account[]>(args: { where?: AccountWhereInput, orderBy?: AccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMemberAccounts: <T = TeamMemberAccount[]>(args: { where?: TeamMemberAccountWhereInput, orderBy?: TeamMemberAccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    payments: <T = Payment[]>(args: { where?: PaymentWhereInput, orderBy?: PaymentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peers: <T = Peer[]>(args: { where?: PeerWhereInput, orderBy?: PeerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    comments: <T = Comment[]>(args: { where?: CommentWhereInput, orderBy?: CommentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    categories: <T = Category[]>(args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    team: <T = Team | null>(args: { where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMember: <T = TeamMember | null>(args: { where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    account: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMemberAccount: <T = TeamMemberAccount | null>(args: { where: TeamMemberAccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    payment: <T = Payment | null>(args: { where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peer: <T = Peer | null>(args: { where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    comment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    category: <T = Category | null>(args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamsConnection: <T = TeamConnection>(args: { where?: TeamWhereInput, orderBy?: TeamOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMembersConnection: <T = TeamMemberConnection>(args: { where?: TeamMemberWhereInput, orderBy?: TeamMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accountsConnection: <T = AccountConnection>(args: { where?: AccountWhereInput, orderBy?: AccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMemberAccountsConnection: <T = TeamMemberAccountConnection>(args: { where?: TeamMemberAccountWhereInput, orderBy?: TeamMemberAccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    paymentsConnection: <T = PaymentConnection>(args: { where?: PaymentWhereInput, orderBy?: PaymentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peersConnection: <T = PeerConnection>(args: { where?: PeerWhereInput, orderBy?: PeerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    commentsConnection: <T = CommentConnection>(args: { where?: CommentWhereInput, orderBy?: CommentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    categoriesConnection: <T = CategoryConnection>(args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createTeam: <T = Team>(args: { data: TeamCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTeamMember: <T = TeamMember>(args: { data: TeamMemberCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createAccount: <T = Account>(args: { data: AccountCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTeamMemberAccount: <T = TeamMemberAccount>(args: { data: TeamMemberAccountCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPayment: <T = Payment>(args: { data: PaymentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPeer: <T = Peer>(args: { data: PeerCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createComment: <T = Comment>(args: { data: CommentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createCategory: <T = Category>(args: { data: CategoryCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeam: <T = Team | null>(args: { data: TeamUpdateInput, where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeamMember: <T = TeamMember | null>(args: { data: TeamMemberUpdateInput, where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateAccount: <T = Account | null>(args: { data: AccountUpdateInput, where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeamMemberAccount: <T = TeamMemberAccount | null>(args: { data: TeamMemberAccountUpdateInput, where: TeamMemberAccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePayment: <T = Payment | null>(args: { data: PaymentUpdateInput, where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePeer: <T = Peer | null>(args: { data: PeerUpdateInput, where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateComment: <T = Comment | null>(args: { data: CommentUpdateInput, where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateCategory: <T = Category | null>(args: { data: CategoryUpdateInput, where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeam: <T = Team | null>(args: { where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeamMember: <T = TeamMember | null>(args: { where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteAccount: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeamMemberAccount: <T = TeamMemberAccount | null>(args: { where: TeamMemberAccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePayment: <T = Payment | null>(args: { where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePeer: <T = Peer | null>(args: { where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteComment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteCategory: <T = Category | null>(args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeam: <T = Team>(args: { where: TeamWhereUniqueInput, create: TeamCreateInput, update: TeamUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeamMember: <T = TeamMember>(args: { where: TeamMemberWhereUniqueInput, create: TeamMemberCreateInput, update: TeamMemberUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertAccount: <T = Account>(args: { where: AccountWhereUniqueInput, create: AccountCreateInput, update: AccountUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeamMemberAccount: <T = TeamMemberAccount>(args: { where: TeamMemberAccountWhereUniqueInput, create: TeamMemberAccountCreateInput, update: TeamMemberAccountUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPayment: <T = Payment>(args: { where: PaymentWhereUniqueInput, create: PaymentCreateInput, update: PaymentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPeer: <T = Peer>(args: { where: PeerWhereUniqueInput, create: PeerCreateInput, update: PeerUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertComment: <T = Comment>(args: { where: CommentWhereUniqueInput, create: CommentCreateInput, update: CommentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertCategory: <T = Category>(args: { where: CategoryWhereUniqueInput, create: CategoryCreateInput, update: CategoryUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeams: <T = BatchPayload>(args: { data: TeamUpdateInput, where?: TeamWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeamMembers: <T = BatchPayload>(args: { data: TeamMemberUpdateInput, where?: TeamMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyAccounts: <T = BatchPayload>(args: { data: AccountUpdateInput, where?: AccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeamMemberAccounts: <T = BatchPayload>(args: { data: TeamMemberAccountUpdateInput, where?: TeamMemberAccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPayments: <T = BatchPayload>(args: { data: PaymentUpdateInput, where?: PaymentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPeers: <T = BatchPayload>(args: { data: PeerUpdateInput, where?: PeerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyComments: <T = BatchPayload>(args: { data: CommentUpdateInput, where?: CommentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyCategories: <T = BatchPayload>(args: { data: CategoryUpdateInput, where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeams: <T = BatchPayload>(args: { where?: TeamWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeamMembers: <T = BatchPayload>(args: { where?: TeamMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyAccounts: <T = BatchPayload>(args: { where?: AccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeamMemberAccounts: <T = BatchPayload>(args: { where?: TeamMemberAccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPayments: <T = BatchPayload>(args: { where?: PaymentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPeers: <T = BatchPayload>(args: { where?: PeerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyComments: <T = BatchPayload>(args: { where?: CommentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyCategories: <T = BatchPayload>(args: { where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    team: <T = TeamSubscriptionPayload | null>(args: { where?: TeamSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    teamMember: <T = TeamMemberSubscriptionPayload | null>(args: { where?: TeamMemberSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    account: <T = AccountSubscriptionPayload | null>(args: { where?: AccountSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    teamMemberAccount: <T = TeamMemberAccountSubscriptionPayload | null>(args: { where?: TeamMemberAccountSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    payment: <T = PaymentSubscriptionPayload | null>(args: { where?: PaymentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    peer: <T = PeerSubscriptionPayload | null>(args: { where?: PeerSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    comment: <T = CommentSubscriptionPayload | null>(args: { where?: CommentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    category: <T = CategorySubscriptionPayload | null>(args: { where?: CategorySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Team: (where?: TeamWhereInput) => Promise<boolean>
  TeamMember: (where?: TeamMemberWhereInput) => Promise<boolean>
  Account: (where?: AccountWhereInput) => Promise<boolean>
  TeamMemberAccount: (where?: TeamMemberAccountWhereInput) => Promise<boolean>
  Payment: (where?: PaymentWhereInput) => Promise<boolean>
  Peer: (where?: PeerWhereInput) => Promise<boolean>
  Comment: (where?: CommentWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  Category: (where?: CategoryWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type Account implements Node {
  id: ID!
  name: String!
  balance: Float!
  revenue: Float!
  spendings: Float!
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  team(where: TeamWhereInput): Team!
  members(where: TeamMemberAccountWhereInput, orderBy: TeamMemberAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMemberAccount!]
  peers(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Peer!]
  rawData: Json
}

"""A connection to a list of items."""
type AccountConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AccountEdge]!
  aggregate: AggregateAccount!
}

input AccountCreateInput {
  name: String!
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  members: TeamMemberAccountCreateManyWithoutAccountInput
  peers: PeerCreateManyWithoutAccountInput
}

input AccountCreateManyWithoutTeamInput {
  create: [AccountCreateWithoutTeamInput!]
  connect: [AccountWhereUniqueInput!]
}

input AccountCreateOneWithoutMembersInput {
  create: AccountCreateWithoutMembersInput
  connect: AccountWhereUniqueInput
}

input AccountCreateOneWithoutPaymentsInput {
  create: AccountCreateWithoutPaymentsInput
  connect: AccountWhereUniqueInput
}

input AccountCreateOneWithoutPeersInput {
  create: AccountCreateWithoutPeersInput
  connect: AccountWhereUniqueInput
}

input AccountCreateWithoutMembersInput {
  name: String!
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  peers: PeerCreateManyWithoutAccountInput
}

input AccountCreateWithoutPaymentsInput {
  name: String!
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  team: TeamCreateOneWithoutAccountsInput!
  members: TeamMemberAccountCreateManyWithoutAccountInput
  peers: PeerCreateManyWithoutAccountInput
}

input AccountCreateWithoutPeersInput {
  name: String!
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  members: TeamMemberAccountCreateManyWithoutAccountInput
}

input AccountCreateWithoutTeamInput {
  name: String!
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentCreateManyWithoutAccountInput
  members: TeamMemberAccountCreateManyWithoutAccountInput
  peers: PeerCreateManyWithoutAccountInput
}

"""An edge in a connection."""
type AccountEdge {
  """The item at the end of the edge."""
  node: Account!

  """A cursor for use in pagination."""
  cursor: String!
}

enum AccountOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  balance_ASC
  balance_DESC
  revenue_ASC
  revenue_DESC
  spendings_ASC
  spendings_DESC
  rawData_ASC
  rawData_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type AccountPreviousValues {
  id: ID!
  name: String!
  balance: Float!
  revenue: Float!
  spendings: Float!
  rawData: Json
}

type AccountSubscriptionPayload {
  mutation: MutationType!
  node: Account
  updatedFields: [String!]
  previousValues: AccountPreviousValues
}

input AccountSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [AccountSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [AccountSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AccountSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AccountWhereInput
}

input AccountUpdateInput {
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  members: TeamMemberAccountUpdateManyWithoutAccountInput
  peers: PeerUpdateManyWithoutAccountInput
}

input AccountUpdateManyWithoutTeamInput {
  create: [AccountCreateWithoutTeamInput!]
  connect: [AccountWhereUniqueInput!]
  disconnect: [AccountWhereUniqueInput!]
  delete: [AccountWhereUniqueInput!]
  update: [AccountUpdateWithWhereUniqueWithoutTeamInput!]
  upsert: [AccountUpsertWithWhereUniqueWithoutTeamInput!]
}

input AccountUpdateOneWithoutMembersInput {
  create: AccountCreateWithoutMembersInput
  connect: AccountWhereUniqueInput
  delete: Boolean
  update: AccountUpdateWithoutMembersDataInput
  upsert: AccountUpsertWithoutMembersInput
}

input AccountUpdateOneWithoutPaymentsInput {
  create: AccountCreateWithoutPaymentsInput
  connect: AccountWhereUniqueInput
  delete: Boolean
  update: AccountUpdateWithoutPaymentsDataInput
  upsert: AccountUpsertWithoutPaymentsInput
}

input AccountUpdateOneWithoutPeersInput {
  create: AccountCreateWithoutPeersInput
  connect: AccountWhereUniqueInput
  delete: Boolean
  update: AccountUpdateWithoutPeersDataInput
  upsert: AccountUpsertWithoutPeersInput
}

input AccountUpdateWithoutMembersDataInput {
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  peers: PeerUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutPaymentsDataInput {
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  team: TeamUpdateOneWithoutAccountsInput
  members: TeamMemberAccountUpdateManyWithoutAccountInput
  peers: PeerUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutPeersDataInput {
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  members: TeamMemberAccountUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutTeamDataInput {
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentUpdateManyWithoutAccountInput
  members: TeamMemberAccountUpdateManyWithoutAccountInput
  peers: PeerUpdateManyWithoutAccountInput
}

input AccountUpdateWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput!
  data: AccountUpdateWithoutTeamDataInput!
}

input AccountUpsertWithoutMembersInput {
  update: AccountUpdateWithoutMembersDataInput!
  create: AccountCreateWithoutMembersInput!
}

input AccountUpsertWithoutPaymentsInput {
  update: AccountUpdateWithoutPaymentsDataInput!
  create: AccountCreateWithoutPaymentsInput!
}

input AccountUpsertWithoutPeersInput {
  update: AccountUpdateWithoutPeersDataInput!
  create: AccountCreateWithoutPeersInput!
}

input AccountUpsertWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput!
  update: AccountUpdateWithoutTeamDataInput!
  create: AccountCreateWithoutTeamInput!
}

input AccountWhereInput {
  """Logical AND on all given filters."""
  AND: [AccountWhereInput!]

  """Logical OR on all given filters."""
  OR: [AccountWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AccountWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  balance: Float

  """All values that are not equal to given value."""
  balance_not: Float

  """All values that are contained in given list."""
  balance_in: [Float!]

  """All values that are not contained in given list."""
  balance_not_in: [Float!]

  """All values less than the given value."""
  balance_lt: Float

  """All values less than or equal the given value."""
  balance_lte: Float

  """All values greater than the given value."""
  balance_gt: Float

  """All values greater than or equal the given value."""
  balance_gte: Float
  revenue: Float

  """All values that are not equal to given value."""
  revenue_not: Float

  """All values that are contained in given list."""
  revenue_in: [Float!]

  """All values that are not contained in given list."""
  revenue_not_in: [Float!]

  """All values less than the given value."""
  revenue_lt: Float

  """All values less than or equal the given value."""
  revenue_lte: Float

  """All values greater than the given value."""
  revenue_gt: Float

  """All values greater than or equal the given value."""
  revenue_gte: Float
  spendings: Float

  """All values that are not equal to given value."""
  spendings_not: Float

  """All values that are contained in given list."""
  spendings_in: [Float!]

  """All values that are not contained in given list."""
  spendings_not_in: [Float!]

  """All values less than the given value."""
  spendings_lt: Float

  """All values less than or equal the given value."""
  spendings_lte: Float

  """All values greater than the given value."""
  spendings_gt: Float

  """All values greater than or equal the given value."""
  spendings_gte: Float
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  team: TeamWhereInput
  members_every: TeamMemberAccountWhereInput
  members_some: TeamMemberAccountWhereInput
  members_none: TeamMemberAccountWhereInput
  peers_every: PeerWhereInput
  peers_some: PeerWhereInput
  peers_none: PeerWhereInput
}

input AccountWhereUniqueInput {
  id: ID
}

type AggregateAccount {
  count: Int!
}

type AggregateCategory {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type AggregatePayment {
  count: Int!
}

type AggregatePeer {
  count: Int!
}

type AggregateTeam {
  count: Int!
}

type AggregateTeamMember {
  count: Int!
}

type AggregateTeamMemberAccount {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Category implements Node {
  id: ID!
  name: String!
  color: String!
}

"""A connection to a list of items."""
type CategoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CategoryEdge]!
  aggregate: AggregateCategory!
}

input CategoryCreateInput {
  name: String!
  color: String!
}

input CategoryCreateManyInput {
  create: [CategoryCreateInput!]
  connect: [CategoryWhereUniqueInput!]
}

input CategoryCreateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
}

"""An edge in a connection."""
type CategoryEdge {
  """The item at the end of the edge."""
  node: Category!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  color_ASC
  color_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CategoryPreviousValues {
  id: ID!
  name: String!
  color: String!
}

type CategorySubscriptionPayload {
  mutation: MutationType!
  node: Category
  updatedFields: [String!]
  previousValues: CategoryPreviousValues
}

input CategorySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CategorySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CategorySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CategorySubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CategoryWhereInput
}

input CategoryUpdateDataInput {
  name: String
  color: String
}

input CategoryUpdateInput {
  name: String
  color: String
}

input CategoryUpdateManyInput {
  create: [CategoryCreateInput!]
  connect: [CategoryWhereUniqueInput!]
  disconnect: [CategoryWhereUniqueInput!]
  delete: [CategoryWhereUniqueInput!]
  update: [CategoryUpdateWithWhereUniqueNestedInput!]
  upsert: [CategoryUpsertWithWhereUniqueNestedInput!]
}

input CategoryUpdateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CategoryUpdateDataInput
  upsert: CategoryUpsertNestedInput
}

input CategoryUpdateWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput!
  data: CategoryUpdateDataInput!
}

input CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryUpsertWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput!
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryWhereInput {
  """Logical AND on all given filters."""
  AND: [CategoryWhereInput!]

  """Logical OR on all given filters."""
  OR: [CategoryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CategoryWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  color: String

  """All values that are not equal to given value."""
  color_not: String

  """All values that are contained in given list."""
  color_in: [String!]

  """All values that are not contained in given list."""
  color_not_in: [String!]

  """All values less than the given value."""
  color_lt: String

  """All values less than or equal the given value."""
  color_lte: String

  """All values greater than the given value."""
  color_gt: String

  """All values greater than or equal the given value."""
  color_gte: String

  """All values containing the given string."""
  color_contains: String

  """All values not containing the given string."""
  color_not_contains: String

  """All values starting with the given string."""
  color_starts_with: String

  """All values not starting with the given string."""
  color_not_starts_with: String

  """All values ending with the given string."""
  color_ends_with: String

  """All values not ending with the given string."""
  color_not_ends_with: String
}

input CategoryWhereUniqueInput {
  id: ID
}

type Comment implements Node {
  id: ID!
  payment(where: PaymentWhereInput): Payment!
  user(where: UserWhereInput): User
  body: Json!
}

"""A connection to a list of items."""
type CommentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  body: Json!
  payment: PaymentCreateOneWithoutCommentsInput!
  user: UserCreateOneInput
}

input CommentCreateManyWithoutPaymentInput {
  create: [CommentCreateWithoutPaymentInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutPaymentInput {
  body: Json!
  user: UserCreateOneInput
}

"""An edge in a connection."""
type CommentEdge {
  """The item at the end of the edge."""
  node: Comment!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  body_ASC
  body_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CommentPreviousValues {
  id: ID!
  body: Json!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
}

input CommentUpdateInput {
  body: Json
  payment: PaymentUpdateOneWithoutCommentsInput
  user: UserUpdateOneInput
}

input CommentUpdateManyWithoutPaymentInput {
  create: [CommentCreateWithoutPaymentInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  delete: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPaymentInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPaymentInput!]
}

input CommentUpdateWithoutPaymentDataInput {
  body: Json
  user: UserUpdateOneInput
}

input CommentUpdateWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPaymentDataInput!
}

input CommentUpsertWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPaymentDataInput!
  create: CommentCreateWithoutPaymentInput!
}

input CommentWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  payment: PaymentWhereInput
  user: UserWhereInput
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createTeam(data: TeamCreateInput!): Team!
  createTeamMember(data: TeamMemberCreateInput!): TeamMember!
  createAccount(data: AccountCreateInput!): Account!
  createTeamMemberAccount(data: TeamMemberAccountCreateInput!): TeamMemberAccount!
  createPayment(data: PaymentCreateInput!): Payment!
  createPeer(data: PeerCreateInput!): Peer!
  createComment(data: CommentCreateInput!): Comment!
  createUser(data: UserCreateInput!): User!
  createCategory(data: CategoryCreateInput!): Category!
  updateTeam(data: TeamUpdateInput!, where: TeamWhereUniqueInput!): Team
  updateTeamMember(data: TeamMemberUpdateInput!, where: TeamMemberWhereUniqueInput!): TeamMember
  updateAccount(data: AccountUpdateInput!, where: AccountWhereUniqueInput!): Account
  updateTeamMemberAccount(data: TeamMemberAccountUpdateInput!, where: TeamMemberAccountWhereUniqueInput!): TeamMemberAccount
  updatePayment(data: PaymentUpdateInput!, where: PaymentWhereUniqueInput!): Payment
  updatePeer(data: PeerUpdateInput!, where: PeerWhereUniqueInput!): Peer
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  deleteTeam(where: TeamWhereUniqueInput!): Team
  deleteTeamMember(where: TeamMemberWhereUniqueInput!): TeamMember
  deleteAccount(where: AccountWhereUniqueInput!): Account
  deleteTeamMemberAccount(where: TeamMemberAccountWhereUniqueInput!): TeamMemberAccount
  deletePayment(where: PaymentWhereUniqueInput!): Payment
  deletePeer(where: PeerWhereUniqueInput!): Peer
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteUser(where: UserWhereUniqueInput!): User
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  upsertTeam(where: TeamWhereUniqueInput!, create: TeamCreateInput!, update: TeamUpdateInput!): Team!
  upsertTeamMember(where: TeamMemberWhereUniqueInput!, create: TeamMemberCreateInput!, update: TeamMemberUpdateInput!): TeamMember!
  upsertAccount(where: AccountWhereUniqueInput!, create: AccountCreateInput!, update: AccountUpdateInput!): Account!
  upsertTeamMemberAccount(where: TeamMemberAccountWhereUniqueInput!, create: TeamMemberAccountCreateInput!, update: TeamMemberAccountUpdateInput!): TeamMemberAccount!
  upsertPayment(where: PaymentWhereUniqueInput!, create: PaymentCreateInput!, update: PaymentUpdateInput!): Payment!
  upsertPeer(where: PeerWhereUniqueInput!, create: PeerCreateInput!, update: PeerUpdateInput!): Peer!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  updateManyTeams(data: TeamUpdateInput!, where: TeamWhereInput): BatchPayload!
  updateManyTeamMembers(data: TeamMemberUpdateInput!, where: TeamMemberWhereInput): BatchPayload!
  updateManyAccounts(data: AccountUpdateInput!, where: AccountWhereInput): BatchPayload!
  updateManyTeamMemberAccounts(data: TeamMemberAccountUpdateInput!, where: TeamMemberAccountWhereInput): BatchPayload!
  updateManyPayments(data: PaymentUpdateInput!, where: PaymentWhereInput): BatchPayload!
  updateManyPeers(data: PeerUpdateInput!, where: PeerWhereInput): BatchPayload!
  updateManyComments(data: CommentUpdateInput!, where: CommentWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyCategories(data: CategoryUpdateInput!, where: CategoryWhereInput): BatchPayload!
  deleteManyTeams(where: TeamWhereInput): BatchPayload!
  deleteManyTeamMembers(where: TeamMemberWhereInput): BatchPayload!
  deleteManyAccounts(where: AccountWhereInput): BatchPayload!
  deleteManyTeamMemberAccounts(where: TeamMemberAccountWhereInput): BatchPayload!
  deleteManyPayments(where: PaymentWhereInput): BatchPayload!
  deleteManyPeers(where: PeerWhereInput): BatchPayload!
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Payment implements Node {
  id: ID!
  account(where: AccountWhereInput): Account!
  postedDate: DateTime!
  amount: Float!
  peerName: String
  peer(where: PeerWhereInput): Peer
  description: String
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  category(where: CategoryWhereInput): Category
  categoryName: String
  categoryColor: String
  rawData: Json!
}

"""A connection to a list of items."""
type PaymentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PaymentEdge]!
  aggregate: AggregatePayment!
}

input PaymentCreateInput {
  postedDate: DateTime!
  amount: Float!
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  peer: PeerCreateOneWithoutPaymentsInput
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
}

input PaymentCreateManyWithoutAccountInput {
  create: [PaymentCreateWithoutAccountInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateManyWithoutPeerInput {
  create: [PaymentCreateWithoutPeerInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateOneWithoutCommentsInput {
  create: PaymentCreateWithoutCommentsInput
  connect: PaymentWhereUniqueInput
}

input PaymentCreateWithoutAccountInput {
  postedDate: DateTime!
  amount: Float!
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json!
  peer: PeerCreateOneWithoutPaymentsInput
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
}

input PaymentCreateWithoutCommentsInput {
  postedDate: DateTime!
  amount: Float!
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  peer: PeerCreateOneWithoutPaymentsInput
  category: CategoryCreateOneInput
}

input PaymentCreateWithoutPeerInput {
  postedDate: DateTime!
  amount: Float!
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
}

"""An edge in a connection."""
type PaymentEdge {
  """The item at the end of the edge."""
  node: Payment!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PaymentOrderByInput {
  id_ASC
  id_DESC
  postedDate_ASC
  postedDate_DESC
  amount_ASC
  amount_DESC
  peerName_ASC
  peerName_DESC
  description_ASC
  description_DESC
  categoryName_ASC
  categoryName_DESC
  categoryColor_ASC
  categoryColor_DESC
  rawData_ASC
  rawData_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PaymentPreviousValues {
  id: ID!
  postedDate: DateTime!
  amount: Float!
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json!
}

type PaymentSubscriptionPayload {
  mutation: MutationType!
  node: Payment
  updatedFields: [String!]
  previousValues: PaymentPreviousValues
}

input PaymentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PaymentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PaymentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PaymentSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PaymentWhereInput
}

input PaymentUpdateInput {
  postedDate: DateTime
  amount: Float
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  peer: PeerUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
}

input PaymentUpdateManyWithoutAccountInput {
  create: [PaymentCreateWithoutAccountInput!]
  connect: [PaymentWhereUniqueInput!]
  disconnect: [PaymentWhereUniqueInput!]
  delete: [PaymentWhereUniqueInput!]
  update: [PaymentUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [PaymentUpsertWithWhereUniqueWithoutAccountInput!]
}

input PaymentUpdateManyWithoutPeerInput {
  create: [PaymentCreateWithoutPeerInput!]
  connect: [PaymentWhereUniqueInput!]
  disconnect: [PaymentWhereUniqueInput!]
  delete: [PaymentWhereUniqueInput!]
  update: [PaymentUpdateWithWhereUniqueWithoutPeerInput!]
  upsert: [PaymentUpsertWithWhereUniqueWithoutPeerInput!]
}

input PaymentUpdateOneWithoutCommentsInput {
  create: PaymentCreateWithoutCommentsInput
  connect: PaymentWhereUniqueInput
  delete: Boolean
  update: PaymentUpdateWithoutCommentsDataInput
  upsert: PaymentUpsertWithoutCommentsInput
}

input PaymentUpdateWithoutAccountDataInput {
  postedDate: DateTime
  amount: Float
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json
  peer: PeerUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
}

input PaymentUpdateWithoutCommentsDataInput {
  postedDate: DateTime
  amount: Float
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  peer: PeerUpdateOneWithoutPaymentsInput
  category: CategoryUpdateOneInput
}

input PaymentUpdateWithoutPeerDataInput {
  postedDate: DateTime
  amount: Float
  peerName: String
  description: String
  categoryName: String
  categoryColor: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
}

input PaymentUpdateWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput!
  data: PaymentUpdateWithoutAccountDataInput!
}

input PaymentUpdateWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput!
  data: PaymentUpdateWithoutPeerDataInput!
}

input PaymentUpsertWithoutCommentsInput {
  update: PaymentUpdateWithoutCommentsDataInput!
  create: PaymentCreateWithoutCommentsInput!
}

input PaymentUpsertWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput!
  update: PaymentUpdateWithoutAccountDataInput!
  create: PaymentCreateWithoutAccountInput!
}

input PaymentUpsertWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput!
  update: PaymentUpdateWithoutPeerDataInput!
  create: PaymentCreateWithoutPeerInput!
}

input PaymentWhereInput {
  """Logical AND on all given filters."""
  AND: [PaymentWhereInput!]

  """Logical OR on all given filters."""
  OR: [PaymentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PaymentWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  postedDate: DateTime

  """All values that are not equal to given value."""
  postedDate_not: DateTime

  """All values that are contained in given list."""
  postedDate_in: [DateTime!]

  """All values that are not contained in given list."""
  postedDate_not_in: [DateTime!]

  """All values less than the given value."""
  postedDate_lt: DateTime

  """All values less than or equal the given value."""
  postedDate_lte: DateTime

  """All values greater than the given value."""
  postedDate_gt: DateTime

  """All values greater than or equal the given value."""
  postedDate_gte: DateTime
  amount: Float

  """All values that are not equal to given value."""
  amount_not: Float

  """All values that are contained in given list."""
  amount_in: [Float!]

  """All values that are not contained in given list."""
  amount_not_in: [Float!]

  """All values less than the given value."""
  amount_lt: Float

  """All values less than or equal the given value."""
  amount_lte: Float

  """All values greater than the given value."""
  amount_gt: Float

  """All values greater than or equal the given value."""
  amount_gte: Float
  peerName: String

  """All values that are not equal to given value."""
  peerName_not: String

  """All values that are contained in given list."""
  peerName_in: [String!]

  """All values that are not contained in given list."""
  peerName_not_in: [String!]

  """All values less than the given value."""
  peerName_lt: String

  """All values less than or equal the given value."""
  peerName_lte: String

  """All values greater than the given value."""
  peerName_gt: String

  """All values greater than or equal the given value."""
  peerName_gte: String

  """All values containing the given string."""
  peerName_contains: String

  """All values not containing the given string."""
  peerName_not_contains: String

  """All values starting with the given string."""
  peerName_starts_with: String

  """All values not starting with the given string."""
  peerName_not_starts_with: String

  """All values ending with the given string."""
  peerName_ends_with: String

  """All values not ending with the given string."""
  peerName_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  categoryName: String

  """All values that are not equal to given value."""
  categoryName_not: String

  """All values that are contained in given list."""
  categoryName_in: [String!]

  """All values that are not contained in given list."""
  categoryName_not_in: [String!]

  """All values less than the given value."""
  categoryName_lt: String

  """All values less than or equal the given value."""
  categoryName_lte: String

  """All values greater than the given value."""
  categoryName_gt: String

  """All values greater than or equal the given value."""
  categoryName_gte: String

  """All values containing the given string."""
  categoryName_contains: String

  """All values not containing the given string."""
  categoryName_not_contains: String

  """All values starting with the given string."""
  categoryName_starts_with: String

  """All values not starting with the given string."""
  categoryName_not_starts_with: String

  """All values ending with the given string."""
  categoryName_ends_with: String

  """All values not ending with the given string."""
  categoryName_not_ends_with: String
  categoryColor: String

  """All values that are not equal to given value."""
  categoryColor_not: String

  """All values that are contained in given list."""
  categoryColor_in: [String!]

  """All values that are not contained in given list."""
  categoryColor_not_in: [String!]

  """All values less than the given value."""
  categoryColor_lt: String

  """All values less than or equal the given value."""
  categoryColor_lte: String

  """All values greater than the given value."""
  categoryColor_gt: String

  """All values greater than or equal the given value."""
  categoryColor_gte: String

  """All values containing the given string."""
  categoryColor_contains: String

  """All values not containing the given string."""
  categoryColor_not_contains: String

  """All values starting with the given string."""
  categoryColor_starts_with: String

  """All values not starting with the given string."""
  categoryColor_not_starts_with: String

  """All values ending with the given string."""
  categoryColor_ends_with: String

  """All values not ending with the given string."""
  categoryColor_not_ends_with: String
  account: AccountWhereInput
  peer: PeerWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  category: CategoryWhereInput
}

input PaymentWhereUniqueInput {
  id: ID
}

type Peer implements Node {
  id: ID!
  account(where: AccountWhereInput): Account!
  name: String!
  total: Float!
  revenue: Float!
  spendings: Float!
  lastPaymentDate: DateTime
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  category(where: CategoryWhereInput): Category
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category!]
}

"""A connection to a list of items."""
type PeerConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PeerEdge]!
  aggregate: AggregatePeer!
}

input PeerCreateInput {
  name: String!
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  account: AccountCreateOneWithoutPeersInput!
  payments: PaymentCreateManyWithoutPeerInput
  category: CategoryCreateOneInput
  categories: CategoryCreateManyInput
}

input PeerCreateManyWithoutAccountInput {
  create: [PeerCreateWithoutAccountInput!]
  connect: [PeerWhereUniqueInput!]
}

input PeerCreateOneWithoutPaymentsInput {
  create: PeerCreateWithoutPaymentsInput
  connect: PeerWhereUniqueInput
}

input PeerCreateWithoutAccountInput {
  name: String!
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  payments: PaymentCreateManyWithoutPeerInput
  category: CategoryCreateOneInput
  categories: CategoryCreateManyInput
}

input PeerCreateWithoutPaymentsInput {
  name: String!
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  account: AccountCreateOneWithoutPeersInput!
  category: CategoryCreateOneInput
  categories: CategoryCreateManyInput
}

"""An edge in a connection."""
type PeerEdge {
  """The item at the end of the edge."""
  node: Peer!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PeerOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  total_ASC
  total_DESC
  revenue_ASC
  revenue_DESC
  spendings_ASC
  spendings_DESC
  lastPaymentDate_ASC
  lastPaymentDate_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PeerPreviousValues {
  id: ID!
  name: String!
  total: Float!
  revenue: Float!
  spendings: Float!
  lastPaymentDate: DateTime
}

type PeerSubscriptionPayload {
  mutation: MutationType!
  node: Peer
  updatedFields: [String!]
  previousValues: PeerPreviousValues
}

input PeerSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PeerSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeerSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeerSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PeerWhereInput
}

input PeerUpdateInput {
  name: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  account: AccountUpdateOneWithoutPeersInput
  payments: PaymentUpdateManyWithoutPeerInput
  category: CategoryUpdateOneInput
  categories: CategoryUpdateManyInput
}

input PeerUpdateManyWithoutAccountInput {
  create: [PeerCreateWithoutAccountInput!]
  connect: [PeerWhereUniqueInput!]
  disconnect: [PeerWhereUniqueInput!]
  delete: [PeerWhereUniqueInput!]
  update: [PeerUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [PeerUpsertWithWhereUniqueWithoutAccountInput!]
}

input PeerUpdateOneWithoutPaymentsInput {
  create: PeerCreateWithoutPaymentsInput
  connect: PeerWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PeerUpdateWithoutPaymentsDataInput
  upsert: PeerUpsertWithoutPaymentsInput
}

input PeerUpdateWithoutAccountDataInput {
  name: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  payments: PaymentUpdateManyWithoutPeerInput
  category: CategoryUpdateOneInput
  categories: CategoryUpdateManyInput
}

input PeerUpdateWithoutPaymentsDataInput {
  name: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  account: AccountUpdateOneWithoutPeersInput
  category: CategoryUpdateOneInput
  categories: CategoryUpdateManyInput
}

input PeerUpdateWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput!
  data: PeerUpdateWithoutAccountDataInput!
}

input PeerUpsertWithoutPaymentsInput {
  update: PeerUpdateWithoutPaymentsDataInput!
  create: PeerCreateWithoutPaymentsInput!
}

input PeerUpsertWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput!
  update: PeerUpdateWithoutAccountDataInput!
  create: PeerCreateWithoutAccountInput!
}

input PeerWhereInput {
  """Logical AND on all given filters."""
  AND: [PeerWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeerWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeerWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  total: Float

  """All values that are not equal to given value."""
  total_not: Float

  """All values that are contained in given list."""
  total_in: [Float!]

  """All values that are not contained in given list."""
  total_not_in: [Float!]

  """All values less than the given value."""
  total_lt: Float

  """All values less than or equal the given value."""
  total_lte: Float

  """All values greater than the given value."""
  total_gt: Float

  """All values greater than or equal the given value."""
  total_gte: Float
  revenue: Float

  """All values that are not equal to given value."""
  revenue_not: Float

  """All values that are contained in given list."""
  revenue_in: [Float!]

  """All values that are not contained in given list."""
  revenue_not_in: [Float!]

  """All values less than the given value."""
  revenue_lt: Float

  """All values less than or equal the given value."""
  revenue_lte: Float

  """All values greater than the given value."""
  revenue_gt: Float

  """All values greater than or equal the given value."""
  revenue_gte: Float
  spendings: Float

  """All values that are not equal to given value."""
  spendings_not: Float

  """All values that are contained in given list."""
  spendings_in: [Float!]

  """All values that are not contained in given list."""
  spendings_not_in: [Float!]

  """All values less than the given value."""
  spendings_lt: Float

  """All values less than or equal the given value."""
  spendings_lte: Float

  """All values greater than the given value."""
  spendings_gt: Float

  """All values greater than or equal the given value."""
  spendings_gte: Float
  lastPaymentDate: DateTime

  """All values that are not equal to given value."""
  lastPaymentDate_not: DateTime

  """All values that are contained in given list."""
  lastPaymentDate_in: [DateTime!]

  """All values that are not contained in given list."""
  lastPaymentDate_not_in: [DateTime!]

  """All values less than the given value."""
  lastPaymentDate_lt: DateTime

  """All values less than or equal the given value."""
  lastPaymentDate_lte: DateTime

  """All values greater than the given value."""
  lastPaymentDate_gt: DateTime

  """All values greater than or equal the given value."""
  lastPaymentDate_gte: DateTime
  account: AccountWhereInput
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  category: CategoryWhereInput
  categories_every: CategoryWhereInput
  categories_some: CategoryWhereInput
  categories_none: CategoryWhereInput
}

input PeerWhereUniqueInput {
  id: ID
}

type Query {
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team]!
  teamMembers(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember]!
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account]!
  teamMemberAccounts(where: TeamMemberAccountWhereInput, orderBy: TeamMemberAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMemberAccount]!
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment]!
  peers(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Peer]!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  team(where: TeamWhereUniqueInput!): Team
  teamMember(where: TeamMemberWhereUniqueInput!): TeamMember
  account(where: AccountWhereUniqueInput!): Account
  teamMemberAccount(where: TeamMemberAccountWhereUniqueInput!): TeamMemberAccount
  payment(where: PaymentWhereUniqueInput!): Payment
  peer(where: PeerWhereUniqueInput!): Peer
  comment(where: CommentWhereUniqueInput!): Comment
  user(where: UserWhereUniqueInput!): User
  category(where: CategoryWhereUniqueInput!): Category
  teamsConnection(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamConnection!
  teamMembersConnection(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamMemberConnection!
  accountsConnection(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountConnection!
  teamMemberAccountsConnection(where: TeamMemberAccountWhereInput, orderBy: TeamMemberAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamMemberAccountConnection!
  paymentsConnection(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PaymentConnection!
  peersConnection(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeerConnection!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  team(where: TeamSubscriptionWhereInput): TeamSubscriptionPayload
  teamMember(where: TeamMemberSubscriptionWhereInput): TeamMemberSubscriptionPayload
  account(where: AccountSubscriptionWhereInput): AccountSubscriptionPayload
  teamMemberAccount(where: TeamMemberAccountSubscriptionWhereInput): TeamMemberAccountSubscriptionPayload
  payment(where: PaymentSubscriptionWhereInput): PaymentSubscriptionPayload
  peer(where: PeerSubscriptionWhereInput): PeerSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
}

type Team implements Node {
  id: ID!
  name: String!
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account!]
  members(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember!]
}

"""A connection to a list of items."""
type TeamConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TeamEdge]!
  aggregate: AggregateTeam!
}

input TeamCreateInput {
  name: String!
  accounts: AccountCreateManyWithoutTeamInput
  members: TeamMemberCreateManyWithoutTeamInput
}

input TeamCreateOneWithoutAccountsInput {
  create: TeamCreateWithoutAccountsInput
  connect: TeamWhereUniqueInput
}

input TeamCreateOneWithoutMembersInput {
  create: TeamCreateWithoutMembersInput
  connect: TeamWhereUniqueInput
}

input TeamCreateWithoutAccountsInput {
  name: String!
  members: TeamMemberCreateManyWithoutTeamInput
}

input TeamCreateWithoutMembersInput {
  name: String!
  accounts: AccountCreateManyWithoutTeamInput
}

"""An edge in a connection."""
type TeamEdge {
  """The item at the end of the edge."""
  node: Team!

  """A cursor for use in pagination."""
  cursor: String!
}

type TeamMember implements Node {
  id: ID!
  team(where: TeamWhereInput): Team!
  user(where: UserWhereInput): User!
  role: TeamMemberRole!
  canInvite: Boolean!
  accounts(where: TeamMemberAccountWhereInput, orderBy: TeamMemberAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMemberAccount!]
}

type TeamMemberAccount implements Node {
  id: ID!
  teamMember(where: TeamMemberWhereInput): TeamMember!
  account(where: AccountWhereInput): Account!
}

"""A connection to a list of items."""
type TeamMemberAccountConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TeamMemberAccountEdge]!
  aggregate: AggregateTeamMemberAccount!
}

input TeamMemberAccountCreateInput {
  teamMember: TeamMemberCreateOneWithoutAccountsInput!
  account: AccountCreateOneWithoutMembersInput!
}

input TeamMemberAccountCreateManyWithoutAccountInput {
  create: [TeamMemberAccountCreateWithoutAccountInput!]
  connect: [TeamMemberAccountWhereUniqueInput!]
}

input TeamMemberAccountCreateManyWithoutTeamMemberInput {
  create: [TeamMemberAccountCreateWithoutTeamMemberInput!]
  connect: [TeamMemberAccountWhereUniqueInput!]
}

input TeamMemberAccountCreateWithoutAccountInput {
  teamMember: TeamMemberCreateOneWithoutAccountsInput!
}

input TeamMemberAccountCreateWithoutTeamMemberInput {
  account: AccountCreateOneWithoutMembersInput!
}

"""An edge in a connection."""
type TeamMemberAccountEdge {
  """The item at the end of the edge."""
  node: TeamMemberAccount!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TeamMemberAccountOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamMemberAccountPreviousValues {
  id: ID!
}

type TeamMemberAccountSubscriptionPayload {
  mutation: MutationType!
  node: TeamMemberAccount
  updatedFields: [String!]
  previousValues: TeamMemberAccountPreviousValues
}

input TeamMemberAccountSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamMemberAccountSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamMemberAccountSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamMemberAccountSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TeamMemberAccountWhereInput
}

input TeamMemberAccountUpdateInput {
  teamMember: TeamMemberUpdateOneWithoutAccountsInput
  account: AccountUpdateOneWithoutMembersInput
}

input TeamMemberAccountUpdateManyWithoutAccountInput {
  create: [TeamMemberAccountCreateWithoutAccountInput!]
  connect: [TeamMemberAccountWhereUniqueInput!]
  disconnect: [TeamMemberAccountWhereUniqueInput!]
  delete: [TeamMemberAccountWhereUniqueInput!]
  update: [TeamMemberAccountUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [TeamMemberAccountUpsertWithWhereUniqueWithoutAccountInput!]
}

input TeamMemberAccountUpdateManyWithoutTeamMemberInput {
  create: [TeamMemberAccountCreateWithoutTeamMemberInput!]
  connect: [TeamMemberAccountWhereUniqueInput!]
  disconnect: [TeamMemberAccountWhereUniqueInput!]
  delete: [TeamMemberAccountWhereUniqueInput!]
  update: [TeamMemberAccountUpdateWithWhereUniqueWithoutTeamMemberInput!]
  upsert: [TeamMemberAccountUpsertWithWhereUniqueWithoutTeamMemberInput!]
}

input TeamMemberAccountUpdateWithoutAccountDataInput {
  teamMember: TeamMemberUpdateOneWithoutAccountsInput
}

input TeamMemberAccountUpdateWithoutTeamMemberDataInput {
  account: AccountUpdateOneWithoutMembersInput
}

input TeamMemberAccountUpdateWithWhereUniqueWithoutAccountInput {
  where: TeamMemberAccountWhereUniqueInput!
  data: TeamMemberAccountUpdateWithoutAccountDataInput!
}

input TeamMemberAccountUpdateWithWhereUniqueWithoutTeamMemberInput {
  where: TeamMemberAccountWhereUniqueInput!
  data: TeamMemberAccountUpdateWithoutTeamMemberDataInput!
}

input TeamMemberAccountUpsertWithWhereUniqueWithoutAccountInput {
  where: TeamMemberAccountWhereUniqueInput!
  update: TeamMemberAccountUpdateWithoutAccountDataInput!
  create: TeamMemberAccountCreateWithoutAccountInput!
}

input TeamMemberAccountUpsertWithWhereUniqueWithoutTeamMemberInput {
  where: TeamMemberAccountWhereUniqueInput!
  update: TeamMemberAccountUpdateWithoutTeamMemberDataInput!
  create: TeamMemberAccountCreateWithoutTeamMemberInput!
}

input TeamMemberAccountWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamMemberAccountWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamMemberAccountWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamMemberAccountWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  teamMember: TeamMemberWhereInput
  account: AccountWhereInput
}

input TeamMemberAccountWhereUniqueInput {
  id: ID
}

"""A connection to a list of items."""
type TeamMemberConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TeamMemberEdge]!
  aggregate: AggregateTeamMember!
}

input TeamMemberCreateInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamCreateOneWithoutMembersInput!
  user: UserCreateOneWithoutTeamsInput!
  accounts: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

input TeamMemberCreateManyWithoutTeamInput {
  create: [TeamMemberCreateWithoutTeamInput!]
  connect: [TeamMemberWhereUniqueInput!]
}

input TeamMemberCreateManyWithoutUserInput {
  create: [TeamMemberCreateWithoutUserInput!]
  connect: [TeamMemberWhereUniqueInput!]
}

input TeamMemberCreateOneWithoutAccountsInput {
  create: TeamMemberCreateWithoutAccountsInput
  connect: TeamMemberWhereUniqueInput
}

input TeamMemberCreateWithoutAccountsInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamCreateOneWithoutMembersInput!
  user: UserCreateOneWithoutTeamsInput!
}

input TeamMemberCreateWithoutTeamInput {
  role: TeamMemberRole
  canInvite: Boolean
  user: UserCreateOneWithoutTeamsInput!
  accounts: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

input TeamMemberCreateWithoutUserInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamCreateOneWithoutMembersInput!
  accounts: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

"""An edge in a connection."""
type TeamMemberEdge {
  """The item at the end of the edge."""
  node: TeamMember!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TeamMemberOrderByInput {
  id_ASC
  id_DESC
  role_ASC
  role_DESC
  canInvite_ASC
  canInvite_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamMemberPreviousValues {
  id: ID!
  role: TeamMemberRole!
  canInvite: Boolean!
}

enum TeamMemberRole {
  ADMIN
  MANAGER
  MEMBER
}

type TeamMemberSubscriptionPayload {
  mutation: MutationType!
  node: TeamMember
  updatedFields: [String!]
  previousValues: TeamMemberPreviousValues
}

input TeamMemberSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamMemberSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamMemberSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamMemberSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TeamMemberWhereInput
}

input TeamMemberUpdateInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamUpdateOneWithoutMembersInput
  user: UserUpdateOneWithoutTeamsInput
  accounts: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

input TeamMemberUpdateManyWithoutTeamInput {
  create: [TeamMemberCreateWithoutTeamInput!]
  connect: [TeamMemberWhereUniqueInput!]
  disconnect: [TeamMemberWhereUniqueInput!]
  delete: [TeamMemberWhereUniqueInput!]
  update: [TeamMemberUpdateWithWhereUniqueWithoutTeamInput!]
  upsert: [TeamMemberUpsertWithWhereUniqueWithoutTeamInput!]
}

input TeamMemberUpdateManyWithoutUserInput {
  create: [TeamMemberCreateWithoutUserInput!]
  connect: [TeamMemberWhereUniqueInput!]
  disconnect: [TeamMemberWhereUniqueInput!]
  delete: [TeamMemberWhereUniqueInput!]
  update: [TeamMemberUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TeamMemberUpsertWithWhereUniqueWithoutUserInput!]
}

input TeamMemberUpdateOneWithoutAccountsInput {
  create: TeamMemberCreateWithoutAccountsInput
  connect: TeamMemberWhereUniqueInput
  delete: Boolean
  update: TeamMemberUpdateWithoutAccountsDataInput
  upsert: TeamMemberUpsertWithoutAccountsInput
}

input TeamMemberUpdateWithoutAccountsDataInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamUpdateOneWithoutMembersInput
  user: UserUpdateOneWithoutTeamsInput
}

input TeamMemberUpdateWithoutTeamDataInput {
  role: TeamMemberRole
  canInvite: Boolean
  user: UserUpdateOneWithoutTeamsInput
  accounts: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

input TeamMemberUpdateWithoutUserDataInput {
  role: TeamMemberRole
  canInvite: Boolean
  team: TeamUpdateOneWithoutMembersInput
  accounts: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

input TeamMemberUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput!
  data: TeamMemberUpdateWithoutTeamDataInput!
}

input TeamMemberUpdateWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput!
  data: TeamMemberUpdateWithoutUserDataInput!
}

input TeamMemberUpsertWithoutAccountsInput {
  update: TeamMemberUpdateWithoutAccountsDataInput!
  create: TeamMemberCreateWithoutAccountsInput!
}

input TeamMemberUpsertWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput!
  update: TeamMemberUpdateWithoutTeamDataInput!
  create: TeamMemberCreateWithoutTeamInput!
}

input TeamMemberUpsertWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput!
  update: TeamMemberUpdateWithoutUserDataInput!
  create: TeamMemberCreateWithoutUserInput!
}

input TeamMemberWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamMemberWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamMemberWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamMemberWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  role: TeamMemberRole

  """All values that are not equal to given value."""
  role_not: TeamMemberRole

  """All values that are contained in given list."""
  role_in: [TeamMemberRole!]

  """All values that are not contained in given list."""
  role_not_in: [TeamMemberRole!]
  canInvite: Boolean

  """All values that are not equal to given value."""
  canInvite_not: Boolean
  team: TeamWhereInput
  user: UserWhereInput
  accounts_every: TeamMemberAccountWhereInput
  accounts_some: TeamMemberAccountWhereInput
  accounts_none: TeamMemberAccountWhereInput
}

input TeamMemberWhereUniqueInput {
  id: ID
}

enum TeamOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamPreviousValues {
  id: ID!
  name: String!
}

type TeamSubscriptionPayload {
  mutation: MutationType!
  node: Team
  updatedFields: [String!]
  previousValues: TeamPreviousValues
}

input TeamSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TeamWhereInput
}

input TeamUpdateInput {
  name: String
  accounts: AccountUpdateManyWithoutTeamInput
  members: TeamMemberUpdateManyWithoutTeamInput
}

input TeamUpdateOneWithoutAccountsInput {
  create: TeamCreateWithoutAccountsInput
  connect: TeamWhereUniqueInput
  delete: Boolean
  update: TeamUpdateWithoutAccountsDataInput
  upsert: TeamUpsertWithoutAccountsInput
}

input TeamUpdateOneWithoutMembersInput {
  create: TeamCreateWithoutMembersInput
  connect: TeamWhereUniqueInput
  delete: Boolean
  update: TeamUpdateWithoutMembersDataInput
  upsert: TeamUpsertWithoutMembersInput
}

input TeamUpdateWithoutAccountsDataInput {
  name: String
  members: TeamMemberUpdateManyWithoutTeamInput
}

input TeamUpdateWithoutMembersDataInput {
  name: String
  accounts: AccountUpdateManyWithoutTeamInput
}

input TeamUpsertWithoutAccountsInput {
  update: TeamUpdateWithoutAccountsDataInput!
  create: TeamCreateWithoutAccountsInput!
}

input TeamUpsertWithoutMembersInput {
  update: TeamUpdateWithoutMembersDataInput!
  create: TeamCreateWithoutMembersInput!
}

input TeamWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  accounts_every: AccountWhereInput
  accounts_some: AccountWhereInput
  accounts_none: AccountWhereInput
  members_every: TeamMemberWhereInput
  members_some: TeamMemberWhereInput
  members_none: TeamMemberWhereInput
}

input TeamWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String!
  firstName: String!
  lastName: String
  passwordHash: String!
  teams(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  firstName: String!
  lastName: String
  passwordHash: String!
  teams: TeamMemberCreateManyWithoutUserInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTeamsInput {
  create: UserCreateWithoutTeamsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTeamsInput {
  email: String!
  firstName: String!
  lastName: String
  passwordHash: String!
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  passwordHash_ASC
  passwordHash_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  firstName: String!
  lastName: String
  passwordHash: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  email: String
  firstName: String
  lastName: String
  passwordHash: String
  teams: TeamMemberUpdateManyWithoutUserInput
}

input UserUpdateInput {
  email: String
  firstName: String
  lastName: String
  passwordHash: String
  teams: TeamMemberUpdateManyWithoutUserInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneWithoutTeamsInput {
  create: UserCreateWithoutTeamsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutTeamsDataInput
  upsert: UserUpsertWithoutTeamsInput
}

input UserUpdateWithoutTeamsDataInput {
  email: String
  firstName: String
  lastName: String
  passwordHash: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutTeamsInput {
  update: UserUpdateWithoutTeamsDataInput!
  create: UserCreateWithoutTeamsInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  firstName: String

  """All values that are not equal to given value."""
  firstName_not: String

  """All values that are contained in given list."""
  firstName_in: [String!]

  """All values that are not contained in given list."""
  firstName_not_in: [String!]

  """All values less than the given value."""
  firstName_lt: String

  """All values less than or equal the given value."""
  firstName_lte: String

  """All values greater than the given value."""
  firstName_gt: String

  """All values greater than or equal the given value."""
  firstName_gte: String

  """All values containing the given string."""
  firstName_contains: String

  """All values not containing the given string."""
  firstName_not_contains: String

  """All values starting with the given string."""
  firstName_starts_with: String

  """All values not starting with the given string."""
  firstName_not_starts_with: String

  """All values ending with the given string."""
  firstName_ends_with: String

  """All values not ending with the given string."""
  firstName_not_ends_with: String
  lastName: String

  """All values that are not equal to given value."""
  lastName_not: String

  """All values that are contained in given list."""
  lastName_in: [String!]

  """All values that are not contained in given list."""
  lastName_not_in: [String!]

  """All values less than the given value."""
  lastName_lt: String

  """All values less than or equal the given value."""
  lastName_lte: String

  """All values greater than the given value."""
  lastName_gt: String

  """All values greater than or equal the given value."""
  lastName_gte: String

  """All values containing the given string."""
  lastName_contains: String

  """All values not containing the given string."""
  lastName_not_contains: String

  """All values starting with the given string."""
  lastName_starts_with: String

  """All values not starting with the given string."""
  lastName_not_starts_with: String

  """All values ending with the given string."""
  lastName_ends_with: String

  """All values not ending with the given string."""
  lastName_not_ends_with: String
  passwordHash: String

  """All values that are not equal to given value."""
  passwordHash_not: String

  """All values that are contained in given list."""
  passwordHash_in: [String!]

  """All values that are not contained in given list."""
  passwordHash_not_in: [String!]

  """All values less than the given value."""
  passwordHash_lt: String

  """All values less than or equal the given value."""
  passwordHash_lte: String

  """All values greater than the given value."""
  passwordHash_gt: String

  """All values greater than or equal the given value."""
  passwordHash_gte: String

  """All values containing the given string."""
  passwordHash_contains: String

  """All values not containing the given string."""
  passwordHash_not_contains: String

  """All values starting with the given string."""
  passwordHash_starts_with: String

  """All values not starting with the given string."""
  passwordHash_not_starts_with: String

  """All values ending with the given string."""
  passwordHash_ends_with: String

  """All values not ending with the given string."""
  passwordHash_not_ends_with: String
  teams_every: TeamMemberWhereInput
  teams_some: TeamMemberWhereInput
  teams_none: TeamMemberWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type CommentOrderByInput =   'id_ASC' |
  'id_DESC' |
  'body_ASC' |
  'body_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TeamMemberRole =   'ADMIN' |
  'MANAGER' |
  'MEMBER'

export type TeamOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type AccountOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'revenue_ASC' |
  'revenue_DESC' |
  'spendings_ASC' |
  'spendings_DESC' |
  'rawData_ASC' |
  'rawData_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PaymentOrderByInput =   'id_ASC' |
  'id_DESC' |
  'postedDate_ASC' |
  'postedDate_DESC' |
  'amount_ASC' |
  'amount_DESC' |
  'peerName_ASC' |
  'peerName_DESC' |
  'description_ASC' |
  'description_DESC' |
  'categoryName_ASC' |
  'categoryName_DESC' |
  'categoryColor_ASC' |
  'categoryColor_DESC' |
  'rawData_ASC' |
  'rawData_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CategoryOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'color_ASC' |
  'color_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type TeamMemberOrderByInput =   'id_ASC' |
  'id_DESC' |
  'role_ASC' |
  'role_DESC' |
  'canInvite_ASC' |
  'canInvite_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TeamMemberAccountOrderByInput =   'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PeerOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'total_ASC' |
  'total_DESC' |
  'revenue_ASC' |
  'revenue_DESC' |
  'spendings_ASC' |
  'spendings_DESC' |
  'lastPaymentDate_ASC' |
  'lastPaymentDate_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'passwordHash_ASC' |
  'passwordHash_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface PaymentCreateInput {
  postedDate: DateTime
  amount: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  peer?: PeerCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
}

export interface TeamWhereInput {
  AND?: TeamWhereInput[] | TeamWhereInput
  OR?: TeamWhereInput[] | TeamWhereInput
  NOT?: TeamWhereInput[] | TeamWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  accounts_every?: AccountWhereInput
  accounts_some?: AccountWhereInput
  accounts_none?: AccountWhereInput
  members_every?: TeamMemberWhereInput
  members_some?: TeamMemberWhereInput
  members_none?: TeamMemberWhereInput
}

export interface AccountCreateWithoutMembersInput {
  name: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  peers?: PeerCreateManyWithoutAccountInput
}

export interface UserUpdateDataInput {
  email?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
  teams?: TeamMemberUpdateManyWithoutUserInput
}

export interface PeerCreateManyWithoutAccountInput {
  create?: PeerCreateWithoutAccountInput[] | PeerCreateWithoutAccountInput
  connect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
}

export interface AccountUpdateManyWithoutTeamInput {
  create?: AccountCreateWithoutTeamInput[] | AccountCreateWithoutTeamInput
  connect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  disconnect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  delete?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  update?: AccountUpdateWithWhereUniqueWithoutTeamInput[] | AccountUpdateWithWhereUniqueWithoutTeamInput
  upsert?: AccountUpsertWithWhereUniqueWithoutTeamInput[] | AccountUpsertWithWhereUniqueWithoutTeamInput
}

export interface PeerCreateWithoutAccountInput {
  name: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  payments?: PaymentCreateManyWithoutPeerInput
  category?: CategoryCreateOneInput
  categories?: CategoryCreateManyInput
}

export interface CategorySubscriptionWhereInput {
  AND?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  OR?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  NOT?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CategoryWhereInput
}

export interface PaymentCreateManyWithoutPeerInput {
  create?: PaymentCreateWithoutPeerInput[] | PaymentCreateWithoutPeerInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
}

export interface CommentSubscriptionWhereInput {
  AND?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  OR?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  NOT?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CommentWhereInput
}

export interface PaymentCreateWithoutPeerInput {
  postedDate: DateTime
  amount: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
}

export interface PeerSubscriptionWhereInput {
  AND?: PeerSubscriptionWhereInput[] | PeerSubscriptionWhereInput
  OR?: PeerSubscriptionWhereInput[] | PeerSubscriptionWhereInput
  NOT?: PeerSubscriptionWhereInput[] | PeerSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PeerWhereInput
}

export interface AccountCreateOneWithoutPaymentsInput {
  create?: AccountCreateWithoutPaymentsInput
  connect?: AccountWhereUniqueInput
}

export interface TeamMemberAccountSubscriptionWhereInput {
  AND?: TeamMemberAccountSubscriptionWhereInput[] | TeamMemberAccountSubscriptionWhereInput
  OR?: TeamMemberAccountSubscriptionWhereInput[] | TeamMemberAccountSubscriptionWhereInput
  NOT?: TeamMemberAccountSubscriptionWhereInput[] | TeamMemberAccountSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TeamMemberAccountWhereInput
}

export interface AccountCreateWithoutPaymentsInput {
  name: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  team: TeamCreateOneWithoutAccountsInput
  members?: TeamMemberAccountCreateManyWithoutAccountInput
  peers?: PeerCreateManyWithoutAccountInput
}

export interface PeerWhereInput {
  AND?: PeerWhereInput[] | PeerWhereInput
  OR?: PeerWhereInput[] | PeerWhereInput
  NOT?: PeerWhereInput[] | PeerWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  total?: Float
  total_not?: Float
  total_in?: Float[] | Float
  total_not_in?: Float[] | Float
  total_lt?: Float
  total_lte?: Float
  total_gt?: Float
  total_gte?: Float
  revenue?: Float
  revenue_not?: Float
  revenue_in?: Float[] | Float
  revenue_not_in?: Float[] | Float
  revenue_lt?: Float
  revenue_lte?: Float
  revenue_gt?: Float
  revenue_gte?: Float
  spendings?: Float
  spendings_not?: Float
  spendings_in?: Float[] | Float
  spendings_not_in?: Float[] | Float
  spendings_lt?: Float
  spendings_lte?: Float
  spendings_gt?: Float
  spendings_gte?: Float
  lastPaymentDate?: DateTime
  lastPaymentDate_not?: DateTime
  lastPaymentDate_in?: DateTime[] | DateTime
  lastPaymentDate_not_in?: DateTime[] | DateTime
  lastPaymentDate_lt?: DateTime
  lastPaymentDate_lte?: DateTime
  lastPaymentDate_gt?: DateTime
  lastPaymentDate_gte?: DateTime
  account?: AccountWhereInput
  payments_every?: PaymentWhereInput
  payments_some?: PaymentWhereInput
  payments_none?: PaymentWhereInput
  category?: CategoryWhereInput
  categories_every?: CategoryWhereInput
  categories_some?: CategoryWhereInput
  categories_none?: CategoryWhereInput
}

export interface TeamMemberAccountCreateManyWithoutAccountInput {
  create?: TeamMemberAccountCreateWithoutAccountInput[] | TeamMemberAccountCreateWithoutAccountInput
  connect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
}

export interface TeamMemberSubscriptionWhereInput {
  AND?: TeamMemberSubscriptionWhereInput[] | TeamMemberSubscriptionWhereInput
  OR?: TeamMemberSubscriptionWhereInput[] | TeamMemberSubscriptionWhereInput
  NOT?: TeamMemberSubscriptionWhereInput[] | TeamMemberSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TeamMemberWhereInput
}

export interface TeamMemberAccountCreateWithoutAccountInput {
  teamMember: TeamMemberCreateOneWithoutAccountsInput
}

export interface CategoryUpdateInput {
  name?: String
  color?: String
}

export interface TeamMemberCreateOneWithoutAccountsInput {
  create?: TeamMemberCreateWithoutAccountsInput
  connect?: TeamMemberWhereUniqueInput
}

export interface UserUpdateInput {
  email?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
  teams?: TeamMemberUpdateManyWithoutUserInput
}

export interface TeamMemberCreateWithoutAccountsInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team: TeamCreateOneWithoutMembersInput
  user: UserCreateOneWithoutTeamsInput
}

export interface PaymentUpdateWithoutCommentsDataInput {
  postedDate?: DateTime
  amount?: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  peer?: PeerUpdateOneWithoutPaymentsInput
  category?: CategoryUpdateOneInput
}

export interface TeamCreateOneWithoutMembersInput {
  create?: TeamCreateWithoutMembersInput
  connect?: TeamWhereUniqueInput
}

export interface TeamWhereUniqueInput {
  id?: ID_Input
}

export interface TeamCreateWithoutMembersInput {
  name: String
  accounts?: AccountCreateManyWithoutTeamInput
}

export interface AccountWhereUniqueInput {
  id?: ID_Input
}

export interface CommentCreateManyWithoutPaymentInput {
  create?: CommentCreateWithoutPaymentInput[] | CommentCreateWithoutPaymentInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
}

export interface PaymentWhereUniqueInput {
  id?: ID_Input
}

export interface CommentCreateWithoutPaymentInput {
  body: Json
  user?: UserCreateOneInput
}

export interface CommentWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface CategoryWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateInput {
  email: String
  firstName: String
  lastName?: String
  passwordHash: String
  teams?: TeamMemberCreateManyWithoutUserInput
}

export interface CommentUpdateInput {
  body?: Json
  payment?: PaymentUpdateOneWithoutCommentsInput
  user?: UserUpdateOneInput
}

export interface TeamMemberCreateManyWithoutUserInput {
  create?: TeamMemberCreateWithoutUserInput[] | TeamMemberCreateWithoutUserInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
}

export interface PaymentUpdateInput {
  postedDate?: DateTime
  amount?: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  peer?: PeerUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
}

export interface TeamMemberCreateWithoutUserInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team: TeamCreateOneWithoutMembersInput
  accounts?: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

export interface AccountUpdateInput {
  name?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  members?: TeamMemberAccountUpdateManyWithoutAccountInput
  peers?: PeerUpdateManyWithoutAccountInput
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
}

export interface AccountUpsertWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput
  update: AccountUpdateWithoutTeamDataInput
  create: AccountCreateWithoutTeamInput
}

export interface CategoryCreateInput {
  name: String
  color: String
}

export interface PeerUpsertWithoutPaymentsInput {
  update: PeerUpdateWithoutPaymentsDataInput
  create: PeerCreateWithoutPaymentsInput
}

export interface CategoryCreateManyInput {
  create?: CategoryCreateInput[] | CategoryCreateInput
  connect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
}

export interface TeamUpsertWithoutAccountsInput {
  update: TeamUpdateWithoutAccountsDataInput
  create: TeamCreateWithoutAccountsInput
}

export interface TeamMemberCreateInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team: TeamCreateOneWithoutMembersInput
  user: UserCreateOneWithoutTeamsInput
  accounts?: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

export interface TeamMemberAccountUpsertWithWhereUniqueWithoutTeamMemberInput {
  where: TeamMemberAccountWhereUniqueInput
  update: TeamMemberAccountUpdateWithoutTeamMemberDataInput
  create: TeamMemberAccountCreateWithoutTeamMemberInput
}

export interface AccountCreateInput {
  name: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  members?: TeamMemberAccountCreateManyWithoutAccountInput
  peers?: PeerCreateManyWithoutAccountInput
}

export interface PeerUpsertWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput
  update: PeerUpdateWithoutAccountDataInput
  create: PeerCreateWithoutAccountInput
}

export interface TeamMemberAccountCreateInput {
  teamMember: TeamMemberCreateOneWithoutAccountsInput
  account: AccountCreateOneWithoutMembersInput
}

export interface CategoryUpdateWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput
  data: CategoryUpdateDataInput
}

export interface TeamMemberUpdateManyWithoutUserInput {
  create?: TeamMemberCreateWithoutUserInput[] | TeamMemberCreateWithoutUserInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  disconnect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  delete?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput[] | TeamMemberUpdateWithWhereUniqueWithoutUserInput
  upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput[] | TeamMemberUpsertWithWhereUniqueWithoutUserInput
}

export interface PaymentUpsertWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutPeerDataInput
  create: PaymentCreateWithoutPeerInput
}

export interface PeerCreateInput {
  name: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  account: AccountCreateOneWithoutPeersInput
  payments?: PaymentCreateManyWithoutPeerInput
  category?: CategoryCreateOneInput
  categories?: CategoryCreateManyInput
}

export interface CategoryUpdateDataInput {
  name?: String
  color?: String
}

export interface CommentCreateInput {
  body: Json
  payment: PaymentCreateOneWithoutCommentsInput
  user?: UserCreateOneInput
}

export interface CommentUpsertWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPaymentDataInput
  create: CommentCreateWithoutPaymentInput
}

export interface PaymentCreateOneWithoutCommentsInput {
  create?: PaymentCreateWithoutCommentsInput
  connect?: PaymentWhereUniqueInput
}

export interface TeamMemberUpsertWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput
  update: TeamMemberUpdateWithoutUserDataInput
  create: TeamMemberCreateWithoutUserInput
}

export interface PaymentCreateWithoutCommentsInput {
  postedDate: DateTime
  amount: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  peer?: PeerCreateOneWithoutPaymentsInput
  category?: CategoryCreateOneInput
}

export interface TeamMemberUpdateWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput
  data: TeamMemberUpdateWithoutUserDataInput
}

export interface TeamUpdateInput {
  name?: String
  accounts?: AccountUpdateManyWithoutTeamInput
  members?: TeamMemberUpdateManyWithoutTeamInput
}

export interface AccountCreateManyWithoutTeamInput {
  create?: AccountCreateWithoutTeamInput[] | AccountCreateWithoutTeamInput
  connect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
}

export interface TeamMemberAccountWhereInput {
  AND?: TeamMemberAccountWhereInput[] | TeamMemberAccountWhereInput
  OR?: TeamMemberAccountWhereInput[] | TeamMemberAccountWhereInput
  NOT?: TeamMemberAccountWhereInput[] | TeamMemberAccountWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  teamMember?: TeamMemberWhereInput
  account?: AccountWhereInput
}

export interface PaymentCreateManyWithoutAccountInput {
  create?: PaymentCreateWithoutAccountInput[] | PaymentCreateWithoutAccountInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
}

export interface AccountUpdateWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput
  data: AccountUpdateWithoutTeamDataInput
}

export interface PeerCreateOneWithoutPaymentsInput {
  create?: PeerCreateWithoutPaymentsInput
  connect?: PeerWhereUniqueInput
}

export interface AccountUpdateWithoutTeamDataInput {
  name?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentUpdateManyWithoutAccountInput
  members?: TeamMemberAccountUpdateManyWithoutAccountInput
  peers?: PeerUpdateManyWithoutAccountInput
}

export interface AccountCreateOneWithoutPeersInput {
  create?: AccountCreateWithoutPeersInput
  connect?: AccountWhereUniqueInput
}

export interface PaymentUpdateManyWithoutAccountInput {
  create?: PaymentCreateWithoutAccountInput[] | PaymentCreateWithoutAccountInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  disconnect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  delete?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  update?: PaymentUpdateWithWhereUniqueWithoutAccountInput[] | PaymentUpdateWithWhereUniqueWithoutAccountInput
  upsert?: PaymentUpsertWithWhereUniqueWithoutAccountInput[] | PaymentUpsertWithWhereUniqueWithoutAccountInput
}

export interface TeamCreateOneWithoutAccountsInput {
  create?: TeamCreateWithoutAccountsInput
  connect?: TeamWhereUniqueInput
}

export interface PaymentUpdateWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutAccountDataInput
}

export interface TeamMemberCreateManyWithoutTeamInput {
  create?: TeamMemberCreateWithoutTeamInput[] | TeamMemberCreateWithoutTeamInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
}

export interface PaymentUpdateWithoutAccountDataInput {
  postedDate?: DateTime
  amount?: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData?: Json
  peer?: PeerUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
}

export interface UserCreateOneWithoutTeamsInput {
  create?: UserCreateWithoutTeamsInput
  connect?: UserWhereUniqueInput
}

export interface PeerUpdateOneWithoutPaymentsInput {
  create?: PeerCreateWithoutPaymentsInput
  connect?: PeerWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: PeerUpdateWithoutPaymentsDataInput
  upsert?: PeerUpsertWithoutPaymentsInput
}

export interface TeamMemberAccountCreateManyWithoutTeamMemberInput {
  create?: TeamMemberAccountCreateWithoutTeamMemberInput[] | TeamMemberAccountCreateWithoutTeamMemberInput
  connect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
}

export interface PeerUpdateWithoutPaymentsDataInput {
  name?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  account?: AccountUpdateOneWithoutPeersInput
  category?: CategoryUpdateOneInput
  categories?: CategoryUpdateManyInput
}

export interface AccountCreateOneWithoutMembersInput {
  create?: AccountCreateWithoutMembersInput
  connect?: AccountWhereUniqueInput
}

export interface AccountUpdateOneWithoutPeersInput {
  create?: AccountCreateWithoutPeersInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutPeersDataInput
  upsert?: AccountUpsertWithoutPeersInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface AccountUpdateWithoutPeersDataInput {
  name?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  members?: TeamMemberAccountUpdateManyWithoutAccountInput
}

export interface CommentWhereInput {
  AND?: CommentWhereInput[] | CommentWhereInput
  OR?: CommentWhereInput[] | CommentWhereInput
  NOT?: CommentWhereInput[] | CommentWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  payment?: PaymentWhereInput
  user?: UserWhereInput
}

export interface TeamUpdateOneWithoutAccountsInput {
  create?: TeamCreateWithoutAccountsInput
  connect?: TeamWhereUniqueInput
  delete?: Boolean
  update?: TeamUpdateWithoutAccountsDataInput
  upsert?: TeamUpsertWithoutAccountsInput
}

export interface CategoryWhereInput {
  AND?: CategoryWhereInput[] | CategoryWhereInput
  OR?: CategoryWhereInput[] | CategoryWhereInput
  NOT?: CategoryWhereInput[] | CategoryWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  color?: String
  color_not?: String
  color_in?: String[] | String
  color_not_in?: String[] | String
  color_lt?: String
  color_lte?: String
  color_gt?: String
  color_gte?: String
  color_contains?: String
  color_not_contains?: String
  color_starts_with?: String
  color_not_starts_with?: String
  color_ends_with?: String
  color_not_ends_with?: String
}

export interface TeamUpdateWithoutAccountsDataInput {
  name?: String
  members?: TeamMemberUpdateManyWithoutTeamInput
}

export interface TeamSubscriptionWhereInput {
  AND?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput
  OR?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput
  NOT?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TeamWhereInput
}

export interface TeamMemberUpdateManyWithoutTeamInput {
  create?: TeamMemberCreateWithoutTeamInput[] | TeamMemberCreateWithoutTeamInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  disconnect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  delete?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput[] | TeamMemberUpdateWithWhereUniqueWithoutTeamInput
  upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput[] | TeamMemberUpsertWithWhereUniqueWithoutTeamInput
}

export interface PaymentUpsertWithoutCommentsInput {
  update: PaymentUpdateWithoutCommentsDataInput
  create: PaymentCreateWithoutCommentsInput
}

export interface TeamMemberUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput
  data: TeamMemberUpdateWithoutTeamDataInput
}

export interface TeamMemberWhereUniqueInput {
  id?: ID_Input
}

export interface TeamMemberUpdateWithoutTeamDataInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  user?: UserUpdateOneWithoutTeamsInput
  accounts?: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

export interface PeerWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateOneWithoutTeamsInput {
  create?: UserCreateWithoutTeamsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutTeamsDataInput
  upsert?: UserUpsertWithoutTeamsInput
}

export interface PaymentUpdateOneWithoutCommentsInput {
  create?: PaymentCreateWithoutCommentsInput
  connect?: PaymentWhereUniqueInput
  delete?: Boolean
  update?: PaymentUpdateWithoutCommentsDataInput
  upsert?: PaymentUpsertWithoutCommentsInput
}

export interface UserUpdateWithoutTeamsDataInput {
  email?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
}

export interface TeamMemberAccountUpdateInput {
  teamMember?: TeamMemberUpdateOneWithoutAccountsInput
  account?: AccountUpdateOneWithoutMembersInput
}

export interface UserUpsertWithoutTeamsInput {
  update: UserUpdateWithoutTeamsDataInput
  create: UserCreateWithoutTeamsInput
}

export interface PaymentUpsertWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutAccountDataInput
  create: PaymentCreateWithoutAccountInput
}

export interface TeamMemberAccountUpdateManyWithoutTeamMemberInput {
  create?: TeamMemberAccountCreateWithoutTeamMemberInput[] | TeamMemberAccountCreateWithoutTeamMemberInput
  connect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  disconnect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  delete?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  update?: TeamMemberAccountUpdateWithWhereUniqueWithoutTeamMemberInput[] | TeamMemberAccountUpdateWithWhereUniqueWithoutTeamMemberInput
  upsert?: TeamMemberAccountUpsertWithWhereUniqueWithoutTeamMemberInput[] | TeamMemberAccountUpsertWithWhereUniqueWithoutTeamMemberInput
}

export interface TeamMemberUpsertWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput
  update: TeamMemberUpdateWithoutTeamDataInput
  create: TeamMemberCreateWithoutTeamInput
}

export interface TeamMemberAccountUpdateWithWhereUniqueWithoutTeamMemberInput {
  where: TeamMemberAccountWhereUniqueInput
  data: TeamMemberAccountUpdateWithoutTeamMemberDataInput
}

export interface CategoryUpsertWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput
  update: CategoryUpdateDataInput
  create: CategoryCreateInput
}

export interface TeamMemberAccountUpdateWithoutTeamMemberDataInput {
  account?: AccountUpdateOneWithoutMembersInput
}

export interface CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput
  create: CategoryCreateInput
}

export interface AccountUpdateOneWithoutMembersInput {
  create?: AccountCreateWithoutMembersInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutMembersDataInput
  upsert?: AccountUpsertWithoutMembersInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface AccountUpdateWithoutMembersDataInput {
  name?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  peers?: PeerUpdateManyWithoutAccountInput
}

export interface TeamCreateInput {
  name: String
  accounts?: AccountCreateManyWithoutTeamInput
  members?: TeamMemberCreateManyWithoutTeamInput
}

export interface PeerUpdateManyWithoutAccountInput {
  create?: PeerCreateWithoutAccountInput[] | PeerCreateWithoutAccountInput
  connect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  disconnect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  delete?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  update?: PeerUpdateWithWhereUniqueWithoutAccountInput[] | PeerUpdateWithWhereUniqueWithoutAccountInput
  upsert?: PeerUpsertWithWhereUniqueWithoutAccountInput[] | PeerUpsertWithWhereUniqueWithoutAccountInput
}

export interface PaymentCreateWithoutAccountInput {
  postedDate: DateTime
  amount: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData: Json
  peer?: PeerCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
}

export interface PeerUpdateWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput
  data: PeerUpdateWithoutAccountDataInput
}

export interface AccountCreateWithoutPeersInput {
  name: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  members?: TeamMemberAccountCreateManyWithoutAccountInput
}

export interface PeerUpdateWithoutAccountDataInput {
  name?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  payments?: PaymentUpdateManyWithoutPeerInput
  category?: CategoryUpdateOneInput
  categories?: CategoryUpdateManyInput
}

export interface TeamMemberCreateWithoutTeamInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  user: UserCreateOneWithoutTeamsInput
  accounts?: TeamMemberAccountCreateManyWithoutTeamMemberInput
}

export interface PaymentUpdateManyWithoutPeerInput {
  create?: PaymentCreateWithoutPeerInput[] | PaymentCreateWithoutPeerInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  disconnect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  delete?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  update?: PaymentUpdateWithWhereUniqueWithoutPeerInput[] | PaymentUpdateWithWhereUniqueWithoutPeerInput
  upsert?: PaymentUpsertWithWhereUniqueWithoutPeerInput[] | PaymentUpsertWithWhereUniqueWithoutPeerInput
}

export interface TeamMemberAccountCreateWithoutTeamMemberInput {
  account: AccountCreateOneWithoutMembersInput
}

export interface PaymentUpdateWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutPeerDataInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  firstName?: String
  firstName_not?: String
  firstName_in?: String[] | String
  firstName_not_in?: String[] | String
  firstName_lt?: String
  firstName_lte?: String
  firstName_gt?: String
  firstName_gte?: String
  firstName_contains?: String
  firstName_not_contains?: String
  firstName_starts_with?: String
  firstName_not_starts_with?: String
  firstName_ends_with?: String
  firstName_not_ends_with?: String
  lastName?: String
  lastName_not?: String
  lastName_in?: String[] | String
  lastName_not_in?: String[] | String
  lastName_lt?: String
  lastName_lte?: String
  lastName_gt?: String
  lastName_gte?: String
  lastName_contains?: String
  lastName_not_contains?: String
  lastName_starts_with?: String
  lastName_not_starts_with?: String
  lastName_ends_with?: String
  lastName_not_ends_with?: String
  passwordHash?: String
  passwordHash_not?: String
  passwordHash_in?: String[] | String
  passwordHash_not_in?: String[] | String
  passwordHash_lt?: String
  passwordHash_lte?: String
  passwordHash_gt?: String
  passwordHash_gte?: String
  passwordHash_contains?: String
  passwordHash_not_contains?: String
  passwordHash_starts_with?: String
  passwordHash_not_starts_with?: String
  passwordHash_ends_with?: String
  passwordHash_not_ends_with?: String
  teams_every?: TeamMemberWhereInput
  teams_some?: TeamMemberWhereInput
  teams_none?: TeamMemberWhereInput
}

export interface PaymentUpdateWithoutPeerDataInput {
  postedDate?: DateTime
  amount?: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
}

export interface AccountSubscriptionWhereInput {
  AND?: AccountSubscriptionWhereInput[] | AccountSubscriptionWhereInput
  OR?: AccountSubscriptionWhereInput[] | AccountSubscriptionWhereInput
  NOT?: AccountSubscriptionWhereInput[] | AccountSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AccountWhereInput
}

export interface AccountUpdateOneWithoutPaymentsInput {
  create?: AccountCreateWithoutPaymentsInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutPaymentsDataInput
  upsert?: AccountUpsertWithoutPaymentsInput
}

export interface AccountWhereInput {
  AND?: AccountWhereInput[] | AccountWhereInput
  OR?: AccountWhereInput[] | AccountWhereInput
  NOT?: AccountWhereInput[] | AccountWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  balance?: Float
  balance_not?: Float
  balance_in?: Float[] | Float
  balance_not_in?: Float[] | Float
  balance_lt?: Float
  balance_lte?: Float
  balance_gt?: Float
  balance_gte?: Float
  revenue?: Float
  revenue_not?: Float
  revenue_in?: Float[] | Float
  revenue_not_in?: Float[] | Float
  revenue_lt?: Float
  revenue_lte?: Float
  revenue_gt?: Float
  revenue_gte?: Float
  spendings?: Float
  spendings_not?: Float
  spendings_in?: Float[] | Float
  spendings_not_in?: Float[] | Float
  spendings_lt?: Float
  spendings_lte?: Float
  spendings_gt?: Float
  spendings_gte?: Float
  payments_every?: PaymentWhereInput
  payments_some?: PaymentWhereInput
  payments_none?: PaymentWhereInput
  team?: TeamWhereInput
  members_every?: TeamMemberAccountWhereInput
  members_some?: TeamMemberAccountWhereInput
  members_none?: TeamMemberAccountWhereInput
  peers_every?: PeerWhereInput
  peers_some?: PeerWhereInput
  peers_none?: PeerWhereInput
}

export interface AccountUpdateWithoutPaymentsDataInput {
  name?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  team?: TeamUpdateOneWithoutAccountsInput
  members?: TeamMemberAccountUpdateManyWithoutAccountInput
  peers?: PeerUpdateManyWithoutAccountInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface TeamMemberAccountUpdateManyWithoutAccountInput {
  create?: TeamMemberAccountCreateWithoutAccountInput[] | TeamMemberAccountCreateWithoutAccountInput
  connect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  disconnect?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  delete?: TeamMemberAccountWhereUniqueInput[] | TeamMemberAccountWhereUniqueInput
  update?: TeamMemberAccountUpdateWithWhereUniqueWithoutAccountInput[] | TeamMemberAccountUpdateWithWhereUniqueWithoutAccountInput
  upsert?: TeamMemberAccountUpsertWithWhereUniqueWithoutAccountInput[] | TeamMemberAccountUpsertWithWhereUniqueWithoutAccountInput
}

export interface TeamMemberUpdateInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team?: TeamUpdateOneWithoutMembersInput
  user?: UserUpdateOneWithoutTeamsInput
  accounts?: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

export interface TeamMemberAccountUpdateWithWhereUniqueWithoutAccountInput {
  where: TeamMemberAccountWhereUniqueInput
  data: TeamMemberAccountUpdateWithoutAccountDataInput
}

export interface AccountUpsertWithoutMembersInput {
  update: AccountUpdateWithoutMembersDataInput
  create: AccountCreateWithoutMembersInput
}

export interface TeamMemberAccountUpdateWithoutAccountDataInput {
  teamMember?: TeamMemberUpdateOneWithoutAccountsInput
}

export interface CategoryUpdateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: CategoryUpdateDataInput
  upsert?: CategoryUpsertNestedInput
}

export interface TeamMemberUpdateOneWithoutAccountsInput {
  create?: TeamMemberCreateWithoutAccountsInput
  connect?: TeamMemberWhereUniqueInput
  delete?: Boolean
  update?: TeamMemberUpdateWithoutAccountsDataInput
  upsert?: TeamMemberUpsertWithoutAccountsInput
}

export interface AccountCreateWithoutTeamInput {
  name: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentCreateManyWithoutAccountInput
  members?: TeamMemberAccountCreateManyWithoutAccountInput
  peers?: PeerCreateManyWithoutAccountInput
}

export interface TeamMemberUpdateWithoutAccountsDataInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team?: TeamUpdateOneWithoutMembersInput
  user?: UserUpdateOneWithoutTeamsInput
}

export interface TeamCreateWithoutAccountsInput {
  name: String
  members?: TeamMemberCreateManyWithoutTeamInput
}

export interface TeamUpdateOneWithoutMembersInput {
  create?: TeamCreateWithoutMembersInput
  connect?: TeamWhereUniqueInput
  delete?: Boolean
  update?: TeamUpdateWithoutMembersDataInput
  upsert?: TeamUpsertWithoutMembersInput
}

export interface TeamMemberWhereInput {
  AND?: TeamMemberWhereInput[] | TeamMemberWhereInput
  OR?: TeamMemberWhereInput[] | TeamMemberWhereInput
  NOT?: TeamMemberWhereInput[] | TeamMemberWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  role?: TeamMemberRole
  role_not?: TeamMemberRole
  role_in?: TeamMemberRole[] | TeamMemberRole
  role_not_in?: TeamMemberRole[] | TeamMemberRole
  canInvite?: Boolean
  canInvite_not?: Boolean
  team?: TeamWhereInput
  user?: UserWhereInput
  accounts_every?: TeamMemberAccountWhereInput
  accounts_some?: TeamMemberAccountWhereInput
  accounts_none?: TeamMemberAccountWhereInput
}

export interface TeamUpdateWithoutMembersDataInput {
  name?: String
  accounts?: AccountUpdateManyWithoutTeamInput
}

export interface PaymentWhereInput {
  AND?: PaymentWhereInput[] | PaymentWhereInput
  OR?: PaymentWhereInput[] | PaymentWhereInput
  NOT?: PaymentWhereInput[] | PaymentWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  postedDate?: DateTime
  postedDate_not?: DateTime
  postedDate_in?: DateTime[] | DateTime
  postedDate_not_in?: DateTime[] | DateTime
  postedDate_lt?: DateTime
  postedDate_lte?: DateTime
  postedDate_gt?: DateTime
  postedDate_gte?: DateTime
  amount?: Float
  amount_not?: Float
  amount_in?: Float[] | Float
  amount_not_in?: Float[] | Float
  amount_lt?: Float
  amount_lte?: Float
  amount_gt?: Float
  amount_gte?: Float
  peerName?: String
  peerName_not?: String
  peerName_in?: String[] | String
  peerName_not_in?: String[] | String
  peerName_lt?: String
  peerName_lte?: String
  peerName_gt?: String
  peerName_gte?: String
  peerName_contains?: String
  peerName_not_contains?: String
  peerName_starts_with?: String
  peerName_not_starts_with?: String
  peerName_ends_with?: String
  peerName_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  categoryName?: String
  categoryName_not?: String
  categoryName_in?: String[] | String
  categoryName_not_in?: String[] | String
  categoryName_lt?: String
  categoryName_lte?: String
  categoryName_gt?: String
  categoryName_gte?: String
  categoryName_contains?: String
  categoryName_not_contains?: String
  categoryName_starts_with?: String
  categoryName_not_starts_with?: String
  categoryName_ends_with?: String
  categoryName_not_ends_with?: String
  categoryColor?: String
  categoryColor_not?: String
  categoryColor_in?: String[] | String
  categoryColor_not_in?: String[] | String
  categoryColor_lt?: String
  categoryColor_lte?: String
  categoryColor_gt?: String
  categoryColor_gte?: String
  categoryColor_contains?: String
  categoryColor_not_contains?: String
  categoryColor_starts_with?: String
  categoryColor_not_starts_with?: String
  categoryColor_ends_with?: String
  categoryColor_not_ends_with?: String
  account?: AccountWhereInput
  peer?: PeerWhereInput
  comments_every?: CommentWhereInput
  comments_some?: CommentWhereInput
  comments_none?: CommentWhereInput
  category?: CategoryWhereInput
}

export interface TeamUpsertWithoutMembersInput {
  update: TeamUpdateWithoutMembersDataInput
  create: TeamCreateWithoutMembersInput
}

export interface PeerUpdateInput {
  name?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  account?: AccountUpdateOneWithoutPeersInput
  payments?: PaymentUpdateManyWithoutPeerInput
  category?: CategoryUpdateOneInput
  categories?: CategoryUpdateManyInput
}

export interface TeamMemberUpsertWithoutAccountsInput {
  update: TeamMemberUpdateWithoutAccountsDataInput
  create: TeamMemberCreateWithoutAccountsInput
}

export interface CategoryUpdateManyInput {
  create?: CategoryCreateInput[] | CategoryCreateInput
  connect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  disconnect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  delete?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  update?: CategoryUpdateWithWhereUniqueNestedInput[] | CategoryUpdateWithWhereUniqueNestedInput
  upsert?: CategoryUpsertWithWhereUniqueNestedInput[] | CategoryUpsertWithWhereUniqueNestedInput
}

export interface TeamMemberAccountUpsertWithWhereUniqueWithoutAccountInput {
  where: TeamMemberAccountWhereUniqueInput
  update: TeamMemberAccountUpdateWithoutAccountDataInput
  create: TeamMemberAccountCreateWithoutAccountInput
}

export interface PeerCreateWithoutPaymentsInput {
  name: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  account: AccountCreateOneWithoutPeersInput
  category?: CategoryCreateOneInput
  categories?: CategoryCreateManyInput
}

export interface AccountUpsertWithoutPaymentsInput {
  update: AccountUpdateWithoutPaymentsDataInput
  create: AccountCreateWithoutPaymentsInput
}

export interface PaymentSubscriptionWhereInput {
  AND?: PaymentSubscriptionWhereInput[] | PaymentSubscriptionWhereInput
  OR?: PaymentSubscriptionWhereInput[] | PaymentSubscriptionWhereInput
  NOT?: PaymentSubscriptionWhereInput[] | PaymentSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PaymentWhereInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface CommentUpdateWithoutPaymentDataInput {
  body?: Json
  user?: UserUpdateOneInput
}

export interface CommentUpdateWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPaymentDataInput
}

export interface CommentUpdateManyWithoutPaymentInput {
  create?: CommentCreateWithoutPaymentInput[] | CommentCreateWithoutPaymentInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  update?: CommentUpdateWithWhereUniqueWithoutPaymentInput[] | CommentUpdateWithWhereUniqueWithoutPaymentInput
  upsert?: CommentUpsertWithWhereUniqueWithoutPaymentInput[] | CommentUpsertWithWhereUniqueWithoutPaymentInput
}

export interface TeamMemberAccountWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateWithoutTeamsInput {
  email: String
  firstName: String
  lastName?: String
  passwordHash: String
}

export interface TeamMemberUpdateWithoutUserDataInput {
  role?: TeamMemberRole
  canInvite?: Boolean
  team?: TeamUpdateOneWithoutMembersInput
  accounts?: TeamMemberAccountUpdateManyWithoutTeamMemberInput
}

export interface AccountUpsertWithoutPeersInput {
  update: AccountUpdateWithoutPeersDataInput
  create: AccountCreateWithoutPeersInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface CategoryPreviousValues {
  id: ID_Output
  name: String
  color: String
}

/*
 * A connection to a list of items.

 */
export interface TeamConnection {
  pageInfo: PageInfo
  edges: TeamEdge[]
  aggregate: AggregateTeam
}

export interface CommentSubscriptionPayload {
  mutation: MutationType
  node?: Comment
  updatedFields?: String[]
  previousValues?: CommentPreviousValues
}

export interface CategorySubscriptionPayload {
  mutation: MutationType
  node?: Category
  updatedFields?: String[]
  previousValues?: CategoryPreviousValues
}

export interface TeamMemberAccount extends Node {
  id: ID_Output
  teamMember: TeamMember
  account: Account
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  firstName: String
  lastName?: String
  passwordHash: String
}

/*
 * A connection to a list of items.

 */
export interface CategoryConnection {
  pageInfo: PageInfo
  edges: CategoryEdge[]
  aggregate: AggregateCategory
}

export interface AggregateCategory {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface TeamMember extends Node {
  id: ID_Output
  team: Team
  user: User
  role: TeamMemberRole
  canInvite: Boolean
  accounts?: TeamMemberAccount[]
}

export interface AggregateComment {
  count: Int
}

export interface BatchPayload {
  count: Long
}

/*
 * A connection to a list of items.

 */
export interface CommentConnection {
  pageInfo: PageInfo
  edges: CommentEdge[]
  aggregate: AggregateComment
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface PeerEdge {
  node: Peer
  cursor: String
}

export interface Team extends Node {
  id: ID_Output
  name: String
  accounts?: Account[]
  members?: TeamMember[]
}

export interface AggregatePayment {
  count: Int
}

export interface CommentPreviousValues {
  id: ID_Output
  body: Json
}

/*
 * A connection to a list of items.

 */
export interface PaymentConnection {
  pageInfo: PageInfo
  edges: PaymentEdge[]
  aggregate: AggregatePayment
}

export interface TeamSubscriptionPayload {
  mutation: MutationType
  node?: Team
  updatedFields?: String[]
  previousValues?: TeamPreviousValues
}

/*
 * An edge in a connection.

 */
export interface TeamMemberAccountEdge {
  node: TeamMemberAccount
  cursor: String
}

export interface TeamPreviousValues {
  id: ID_Output
  name: String
}

export interface AggregateAccount {
  count: Int
}

export interface User extends Node {
  id: ID_Output
  email: String
  firstName: String
  lastName?: String
  passwordHash: String
  teams?: TeamMember[]
}

/*
 * A connection to a list of items.

 */
export interface AccountConnection {
  pageInfo: PageInfo
  edges: AccountEdge[]
  aggregate: AggregateAccount
}

export interface TeamMemberSubscriptionPayload {
  mutation: MutationType
  node?: TeamMember
  updatedFields?: String[]
  previousValues?: TeamMemberPreviousValues
}

/*
 * An edge in a connection.

 */
export interface TeamMemberEdge {
  node: TeamMember
  cursor: String
}

export interface TeamMemberPreviousValues {
  id: ID_Output
  role: TeamMemberRole
  canInvite: Boolean
}

export interface AggregateTeam {
  count: Int
}

export interface Comment extends Node {
  id: ID_Output
  payment: Payment
  user?: User
  body: Json
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface AccountSubscriptionPayload {
  mutation: MutationType
  node?: Account
  updatedFields?: String[]
  previousValues?: AccountPreviousValues
}

export interface AggregateUser {
  count: Int
}

export interface AccountPreviousValues {
  id: ID_Output
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData?: Json
}

/*
 * An edge in a connection.

 */
export interface CommentEdge {
  node: Comment
  cursor: String
}

export interface Category extends Node {
  id: ID_Output
  name: String
  color: String
}

/*
 * A connection to a list of items.

 */
export interface PeerConnection {
  pageInfo: PageInfo
  edges: PeerEdge[]
  aggregate: AggregatePeer
}

export interface TeamMemberAccountSubscriptionPayload {
  mutation: MutationType
  node?: TeamMemberAccount
  updatedFields?: String[]
  previousValues?: TeamMemberAccountPreviousValues
}

export interface AggregateTeamMemberAccount {
  count: Int
}

export interface TeamMemberAccountPreviousValues {
  id: ID_Output
}

/*
 * An edge in a connection.

 */
export interface AccountEdge {
  node: Account
  cursor: String
}

export interface Peer extends Node {
  id: ID_Output
  account: Account
  name: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate?: DateTime
  payments?: Payment[]
  category?: Category
  categories?: Category[]
}

/*
 * A connection to a list of items.

 */
export interface TeamMemberConnection {
  pageInfo: PageInfo
  edges: TeamMemberEdge[]
  aggregate: AggregateTeamMember
}

export interface PaymentSubscriptionPayload {
  mutation: MutationType
  node?: Payment
  updatedFields?: String[]
  previousValues?: PaymentPreviousValues
}

/*
 * An edge in a connection.

 */
export interface CategoryEdge {
  node: Category
  cursor: String
}

export interface PaymentPreviousValues {
  id: ID_Output
  postedDate: DateTime
  amount: Float
  peerName?: String
  description?: String
  categoryName?: String
  categoryColor?: String
  rawData: Json
}

export interface AggregatePeer {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface TeamMemberAccountConnection {
  pageInfo: PageInfo
  edges: TeamMemberAccountEdge[]
  aggregate: AggregateTeamMemberAccount
}

export interface Account extends Node {
  id: ID_Output
  name: String
  balance: Float
  revenue: Float
  spendings: Float
  payments?: Payment[]
  team: Team
  members?: TeamMemberAccount[]
  peers?: Peer[]
  rawData?: Json
}

export interface PeerPreviousValues {
  id: ID_Output
  name: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate?: DateTime
}

export interface PeerSubscriptionPayload {
  mutation: MutationType
  node?: Peer
  updatedFields?: String[]
  previousValues?: PeerPreviousValues
}

export interface Payment extends Node {
  id: ID_Output
  account: Account
  postedDate: DateTime
  amount: Float
  peerName?: String
  peer?: Peer
  description?: String
  comments?: Comment[]
  category?: Category
  categoryName?: String
  categoryColor?: String
  rawData: Json
}

export interface AggregateTeamMember {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface PaymentEdge {
  node: Payment
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface TeamEdge {
  node: Team
  cursor: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
Raw JSON value
*/
export type Json = any

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = Date | string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string