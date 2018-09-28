import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    teams: <T = Team[]>(args: { where?: TeamWhereInput, orderBy?: TeamOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMembers: <T = TeamMember[]>(args: { where?: TeamMemberWhereInput, orderBy?: TeamMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accounts: <T = Account[]>(args: { where?: AccountWhereInput, orderBy?: AccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    payments: <T = Payment[]>(args: { where?: PaymentWhereInput, orderBy?: PaymentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peers: <T = Peer[]>(args: { where?: PeerWhereInput, orderBy?: PeerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    comments: <T = Comment[]>(args: { where?: CommentWhereInput, orderBy?: CommentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peerCategories: <T = PeerCategory[]>(args: { where?: PeerCategoryWhereInput, orderBy?: PeerCategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stories: <T = Story[]>(args: { where?: StoryWhereInput, orderBy?: StoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    storyDatas: <T = StoryData[]>(args: { where?: StoryDataWhereInput, orderBy?: StoryDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    onboardings: <T = Onboarding[]>(args: { where?: OnboardingWhereInput, orderBy?: OnboardingOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxUsers: <T = MxUser[]>(args: { where?: MxUserWhereInput, orderBy?: MxUserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxMembers: <T = MxMember[]>(args: { where?: MxMemberWhereInput, orderBy?: MxMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamInvites: <T = TeamInvite[]>(args: { where?: TeamInviteWhereInput, orderBy?: TeamInviteOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    categories: <T = Category[]>(args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    team: <T = Team | null>(args: { where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMember: <T = TeamMember | null>(args: { where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    account: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    payment: <T = Payment | null>(args: { where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peer: <T = Peer | null>(args: { where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    comment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peerCategory: <T = PeerCategory | null>(args: { where: PeerCategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    story: <T = Story | null>(args: { where: StoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    storyData: <T = StoryData | null>(args: { where: StoryDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    onboarding: <T = Onboarding | null>(args: { where: OnboardingWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxUser: <T = MxUser | null>(args: { where: MxUserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxMember: <T = MxMember | null>(args: { where: MxMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamInvite: <T = TeamInvite | null>(args: { where: TeamInviteWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    category: <T = Category | null>(args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamsConnection: <T = TeamConnection>(args: { where?: TeamWhereInput, orderBy?: TeamOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamMembersConnection: <T = TeamMemberConnection>(args: { where?: TeamMemberWhereInput, orderBy?: TeamMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accountsConnection: <T = AccountConnection>(args: { where?: AccountWhereInput, orderBy?: AccountOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    paymentsConnection: <T = PaymentConnection>(args: { where?: PaymentWhereInput, orderBy?: PaymentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peersConnection: <T = PeerConnection>(args: { where?: PeerWhereInput, orderBy?: PeerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    commentsConnection: <T = CommentConnection>(args: { where?: CommentWhereInput, orderBy?: CommentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    peerCategoriesConnection: <T = PeerCategoryConnection>(args: { where?: PeerCategoryWhereInput, orderBy?: PeerCategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    storiesConnection: <T = StoryConnection>(args: { where?: StoryWhereInput, orderBy?: StoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    storyDatasConnection: <T = StoryDataConnection>(args: { where?: StoryDataWhereInput, orderBy?: StoryDataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    onboardingsConnection: <T = OnboardingConnection>(args: { where?: OnboardingWhereInput, orderBy?: OnboardingOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxUsersConnection: <T = MxUserConnection>(args: { where?: MxUserWhereInput, orderBy?: MxUserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    mxMembersConnection: <T = MxMemberConnection>(args: { where?: MxMemberWhereInput, orderBy?: MxMemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    teamInvitesConnection: <T = TeamInviteConnection>(args: { where?: TeamInviteWhereInput, orderBy?: TeamInviteOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    categoriesConnection: <T = CategoryConnection>(args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createTeam: <T = Team>(args: { data: TeamCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTeamMember: <T = TeamMember>(args: { data: TeamMemberCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createAccount: <T = Account>(args: { data: AccountCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPayment: <T = Payment>(args: { data: PaymentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPeer: <T = Peer>(args: { data: PeerCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createComment: <T = Comment>(args: { data: CommentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPeerCategory: <T = PeerCategory>(args: { data: PeerCategoryCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createStory: <T = Story>(args: { data: StoryCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createStoryData: <T = StoryData>(args: { data: StoryDataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createOnboarding: <T = Onboarding>(args: { data: OnboardingCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createMxUser: <T = MxUser>(args: { data: MxUserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createMxMember: <T = MxMember>(args: { data: MxMemberCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTeamInvite: <T = TeamInvite>(args: { data: TeamInviteCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createCategory: <T = Category>(args: { data: CategoryCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeam: <T = Team | null>(args: { data: TeamUpdateInput, where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeamMember: <T = TeamMember | null>(args: { data: TeamMemberUpdateInput, where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateAccount: <T = Account | null>(args: { data: AccountUpdateInput, where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePayment: <T = Payment | null>(args: { data: PaymentUpdateInput, where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePeer: <T = Peer | null>(args: { data: PeerUpdateInput, where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateComment: <T = Comment | null>(args: { data: CommentUpdateInput, where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePeerCategory: <T = PeerCategory | null>(args: { data: PeerCategoryUpdateInput, where: PeerCategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateStory: <T = Story | null>(args: { data: StoryUpdateInput, where: StoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateStoryData: <T = StoryData | null>(args: { data: StoryDataUpdateInput, where: StoryDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateOnboarding: <T = Onboarding | null>(args: { data: OnboardingUpdateInput, where: OnboardingWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateMxUser: <T = MxUser | null>(args: { data: MxUserUpdateInput, where: MxUserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateMxMember: <T = MxMember | null>(args: { data: MxMemberUpdateInput, where: MxMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTeamInvite: <T = TeamInvite | null>(args: { data: TeamInviteUpdateInput, where: TeamInviteWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateCategory: <T = Category | null>(args: { data: CategoryUpdateInput, where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeam: <T = Team | null>(args: { where: TeamWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeamMember: <T = TeamMember | null>(args: { where: TeamMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteAccount: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePayment: <T = Payment | null>(args: { where: PaymentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePeer: <T = Peer | null>(args: { where: PeerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteComment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePeerCategory: <T = PeerCategory | null>(args: { where: PeerCategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteStory: <T = Story | null>(args: { where: StoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteStoryData: <T = StoryData | null>(args: { where: StoryDataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteOnboarding: <T = Onboarding | null>(args: { where: OnboardingWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteMxUser: <T = MxUser | null>(args: { where: MxUserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteMxMember: <T = MxMember | null>(args: { where: MxMemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTeamInvite: <T = TeamInvite | null>(args: { where: TeamInviteWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteCategory: <T = Category | null>(args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeam: <T = Team>(args: { where: TeamWhereUniqueInput, create: TeamCreateInput, update: TeamUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeamMember: <T = TeamMember>(args: { where: TeamMemberWhereUniqueInput, create: TeamMemberCreateInput, update: TeamMemberUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertAccount: <T = Account>(args: { where: AccountWhereUniqueInput, create: AccountCreateInput, update: AccountUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPayment: <T = Payment>(args: { where: PaymentWhereUniqueInput, create: PaymentCreateInput, update: PaymentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPeer: <T = Peer>(args: { where: PeerWhereUniqueInput, create: PeerCreateInput, update: PeerUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertComment: <T = Comment>(args: { where: CommentWhereUniqueInput, create: CommentCreateInput, update: CommentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPeerCategory: <T = PeerCategory>(args: { where: PeerCategoryWhereUniqueInput, create: PeerCategoryCreateInput, update: PeerCategoryUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertStory: <T = Story>(args: { where: StoryWhereUniqueInput, create: StoryCreateInput, update: StoryUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertStoryData: <T = StoryData>(args: { where: StoryDataWhereUniqueInput, create: StoryDataCreateInput, update: StoryDataUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertOnboarding: <T = Onboarding>(args: { where: OnboardingWhereUniqueInput, create: OnboardingCreateInput, update: OnboardingUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertMxUser: <T = MxUser>(args: { where: MxUserWhereUniqueInput, create: MxUserCreateInput, update: MxUserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertMxMember: <T = MxMember>(args: { where: MxMemberWhereUniqueInput, create: MxMemberCreateInput, update: MxMemberUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTeamInvite: <T = TeamInvite>(args: { where: TeamInviteWhereUniqueInput, create: TeamInviteCreateInput, update: TeamInviteUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertCategory: <T = Category>(args: { where: CategoryWhereUniqueInput, create: CategoryCreateInput, update: CategoryUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeams: <T = BatchPayload>(args: { data: TeamUpdateInput, where?: TeamWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeamMembers: <T = BatchPayload>(args: { data: TeamMemberUpdateInput, where?: TeamMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyAccounts: <T = BatchPayload>(args: { data: AccountUpdateInput, where?: AccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPayments: <T = BatchPayload>(args: { data: PaymentUpdateInput, where?: PaymentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPeers: <T = BatchPayload>(args: { data: PeerUpdateInput, where?: PeerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyComments: <T = BatchPayload>(args: { data: CommentUpdateInput, where?: CommentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPeerCategories: <T = BatchPayload>(args: { data: PeerCategoryUpdateInput, where?: PeerCategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyStories: <T = BatchPayload>(args: { data: StoryUpdateInput, where?: StoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyStoryDatas: <T = BatchPayload>(args: { data: StoryDataUpdateInput, where?: StoryDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyOnboardings: <T = BatchPayload>(args: { data: OnboardingUpdateInput, where?: OnboardingWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyMxUsers: <T = BatchPayload>(args: { data: MxUserUpdateInput, where?: MxUserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyMxMembers: <T = BatchPayload>(args: { data: MxMemberUpdateInput, where?: MxMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTeamInvites: <T = BatchPayload>(args: { data: TeamInviteUpdateInput, where?: TeamInviteWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyCategories: <T = BatchPayload>(args: { data: CategoryUpdateInput, where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeams: <T = BatchPayload>(args: { where?: TeamWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeamMembers: <T = BatchPayload>(args: { where?: TeamMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyAccounts: <T = BatchPayload>(args: { where?: AccountWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPayments: <T = BatchPayload>(args: { where?: PaymentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPeers: <T = BatchPayload>(args: { where?: PeerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyComments: <T = BatchPayload>(args: { where?: CommentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPeerCategories: <T = BatchPayload>(args: { where?: PeerCategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyStories: <T = BatchPayload>(args: { where?: StoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyStoryDatas: <T = BatchPayload>(args: { where?: StoryDataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyOnboardings: <T = BatchPayload>(args: { where?: OnboardingWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyMxUsers: <T = BatchPayload>(args: { where?: MxUserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyMxMembers: <T = BatchPayload>(args: { where?: MxMemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTeamInvites: <T = BatchPayload>(args: { where?: TeamInviteWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyCategories: <T = BatchPayload>(args: { where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    team: <T = TeamSubscriptionPayload | null>(args: { where?: TeamSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    teamMember: <T = TeamMemberSubscriptionPayload | null>(args: { where?: TeamMemberSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    account: <T = AccountSubscriptionPayload | null>(args: { where?: AccountSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    payment: <T = PaymentSubscriptionPayload | null>(args: { where?: PaymentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    peer: <T = PeerSubscriptionPayload | null>(args: { where?: PeerSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    comment: <T = CommentSubscriptionPayload | null>(args: { where?: CommentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    peerCategory: <T = PeerCategorySubscriptionPayload | null>(args: { where?: PeerCategorySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    story: <T = StorySubscriptionPayload | null>(args: { where?: StorySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    storyData: <T = StoryDataSubscriptionPayload | null>(args: { where?: StoryDataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    onboarding: <T = OnboardingSubscriptionPayload | null>(args: { where?: OnboardingSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    mxUser: <T = MxUserSubscriptionPayload | null>(args: { where?: MxUserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    mxMember: <T = MxMemberSubscriptionPayload | null>(args: { where?: MxMemberSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    teamInvite: <T = TeamInviteSubscriptionPayload | null>(args: { where?: TeamInviteSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    category: <T = CategorySubscriptionPayload | null>(args: { where?: CategorySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Team: (where?: TeamWhereInput) => Promise<boolean>
  TeamMember: (where?: TeamMemberWhereInput) => Promise<boolean>
  Account: (where?: AccountWhereInput) => Promise<boolean>
  Payment: (where?: PaymentWhereInput) => Promise<boolean>
  Peer: (where?: PeerWhereInput) => Promise<boolean>
  Comment: (where?: CommentWhereInput) => Promise<boolean>
  PeerCategory: (where?: PeerCategoryWhereInput) => Promise<boolean>
  Story: (where?: StoryWhereInput) => Promise<boolean>
  StoryData: (where?: StoryDataWhereInput) => Promise<boolean>
  Onboarding: (where?: OnboardingWhereInput) => Promise<boolean>
  MxUser: (where?: MxUserWhereInput) => Promise<boolean>
  MxMember: (where?: MxMemberWhereInput) => Promise<boolean>
  TeamInvite: (where?: TeamInviteWhereInput) => Promise<boolean>
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
  nameNormalized: String
  balance: Float!
  revenue: Float!
  spendings: Float!
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category!]
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  team(where: TeamWhereInput): Team!
  peers(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Peer!]
  stories(where: StoryWhereInput, orderBy: StoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Story!]
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
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryCreateManyWithoutAccountInput
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  peers: PeerCreateManyWithoutAccountInput
  stories: StoryCreateManyWithoutAccountInput
}

input AccountCreateManyWithoutTeamInput {
  create: [AccountCreateWithoutTeamInput!]
  connect: [AccountWhereUniqueInput!]
}

input AccountCreateOneWithoutCategoriesInput {
  create: AccountCreateWithoutCategoriesInput
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

input AccountCreateOneWithoutStoriesInput {
  create: AccountCreateWithoutStoriesInput
  connect: AccountWhereUniqueInput
}

input AccountCreateWithoutCategoriesInput {
  name: String!
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  peers: PeerCreateManyWithoutAccountInput
  stories: StoryCreateManyWithoutAccountInput
}

input AccountCreateWithoutPaymentsInput {
  name: String!
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  peers: PeerCreateManyWithoutAccountInput
  stories: StoryCreateManyWithoutAccountInput
}

input AccountCreateWithoutPeersInput {
  name: String!
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryCreateManyWithoutAccountInput
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  stories: StoryCreateManyWithoutAccountInput
}

input AccountCreateWithoutStoriesInput {
  name: String!
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryCreateManyWithoutAccountInput
  payments: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput!
  peers: PeerCreateManyWithoutAccountInput
}

input AccountCreateWithoutTeamInput {
  name: String!
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryCreateManyWithoutAccountInput
  payments: PaymentCreateManyWithoutAccountInput
  peers: PeerCreateManyWithoutAccountInput
  stories: StoryCreateManyWithoutAccountInput
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
  nameNormalized_ASC
  nameNormalized_DESC
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
  nameNormalized: String
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
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryUpdateManyWithoutAccountInput
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  peers: PeerUpdateManyWithoutAccountInput
  stories: StoryUpdateManyWithoutAccountInput
}

input AccountUpdateManyWithoutTeamInput {
  create: [AccountCreateWithoutTeamInput!]
  connect: [AccountWhereUniqueInput!]
  disconnect: [AccountWhereUniqueInput!]
  delete: [AccountWhereUniqueInput!]
  update: [AccountUpdateWithWhereUniqueWithoutTeamInput!]
  upsert: [AccountUpsertWithWhereUniqueWithoutTeamInput!]
}

input AccountUpdateOneWithoutCategoriesInput {
  create: AccountCreateWithoutCategoriesInput
  connect: AccountWhereUniqueInput
  delete: Boolean
  update: AccountUpdateWithoutCategoriesDataInput
  upsert: AccountUpsertWithoutCategoriesInput
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

input AccountUpdateOneWithoutStoriesInput {
  create: AccountCreateWithoutStoriesInput
  connect: AccountWhereUniqueInput
  delete: Boolean
  update: AccountUpdateWithoutStoriesDataInput
  upsert: AccountUpsertWithoutStoriesInput
}

input AccountUpdateWithoutCategoriesDataInput {
  name: String
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  peers: PeerUpdateManyWithoutAccountInput
  stories: StoryUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutPaymentsDataInput {
  name: String
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  peers: PeerUpdateManyWithoutAccountInput
  stories: StoryUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutPeersDataInput {
  name: String
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryUpdateManyWithoutAccountInput
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  stories: StoryUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutStoriesDataInput {
  name: String
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryUpdateManyWithoutAccountInput
  payments: PaymentUpdateManyWithoutAccountInput
  team: TeamUpdateOneWithoutAccountsInput
  peers: PeerUpdateManyWithoutAccountInput
}

input AccountUpdateWithoutTeamDataInput {
  name: String
  nameNormalized: String
  balance: Float
  revenue: Float
  spendings: Float
  rawData: Json
  categories: CategoryUpdateManyWithoutAccountInput
  payments: PaymentUpdateManyWithoutAccountInput
  peers: PeerUpdateManyWithoutAccountInput
  stories: StoryUpdateManyWithoutAccountInput
}

input AccountUpdateWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput!
  data: AccountUpdateWithoutTeamDataInput!
}

input AccountUpsertWithoutCategoriesInput {
  update: AccountUpdateWithoutCategoriesDataInput!
  create: AccountCreateWithoutCategoriesInput!
}

input AccountUpsertWithoutPaymentsInput {
  update: AccountUpdateWithoutPaymentsDataInput!
  create: AccountCreateWithoutPaymentsInput!
}

input AccountUpsertWithoutPeersInput {
  update: AccountUpdateWithoutPeersDataInput!
  create: AccountCreateWithoutPeersInput!
}

input AccountUpsertWithoutStoriesInput {
  update: AccountUpdateWithoutStoriesDataInput!
  create: AccountCreateWithoutStoriesInput!
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
  nameNormalized: String

  """All values that are not equal to given value."""
  nameNormalized_not: String

  """All values that are contained in given list."""
  nameNormalized_in: [String!]

  """All values that are not contained in given list."""
  nameNormalized_not_in: [String!]

  """All values less than the given value."""
  nameNormalized_lt: String

  """All values less than or equal the given value."""
  nameNormalized_lte: String

  """All values greater than the given value."""
  nameNormalized_gt: String

  """All values greater than or equal the given value."""
  nameNormalized_gte: String

  """All values containing the given string."""
  nameNormalized_contains: String

  """All values not containing the given string."""
  nameNormalized_not_contains: String

  """All values starting with the given string."""
  nameNormalized_starts_with: String

  """All values not starting with the given string."""
  nameNormalized_not_starts_with: String

  """All values ending with the given string."""
  nameNormalized_ends_with: String

  """All values not ending with the given string."""
  nameNormalized_not_ends_with: String
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
  categories_every: CategoryWhereInput
  categories_some: CategoryWhereInput
  categories_none: CategoryWhereInput
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  team: TeamWhereInput
  peers_every: PeerWhereInput
  peers_some: PeerWhereInput
  peers_none: PeerWhereInput
  stories_every: StoryWhereInput
  stories_some: StoryWhereInput
  stories_none: StoryWhereInput
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

type AggregateMxMember {
  count: Int!
}

type AggregateMxUser {
  count: Int!
}

type AggregateOnboarding {
  count: Int!
}

type AggregatePayment {
  count: Int!
}

type AggregatePeer {
  count: Int!
}

type AggregatePeerCategory {
  count: Int!
}

type AggregateStory {
  count: Int!
}

type AggregateStoryData {
  count: Int!
}

type AggregateTeam {
  count: Int!
}

type AggregateTeamInvite {
  count: Int!
}

type AggregateTeamMember {
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
  account(where: AccountWhereInput): Account!
  name: String!
  nameNormalized: String
  color: String!
  peers(where: PeerCategoryWhereInput, orderBy: PeerCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PeerCategory!]
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
  nameNormalized: String
  color: String!
  account: AccountCreateOneWithoutCategoriesInput!
  peers: PeerCategoryCreateManyWithoutCategoryInput
}

input CategoryCreateManyWithoutAccountInput {
  create: [CategoryCreateWithoutAccountInput!]
  connect: [CategoryWhereUniqueInput!]
}

input CategoryCreateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
}

input CategoryCreateOneWithoutPeersInput {
  create: CategoryCreateWithoutPeersInput
  connect: CategoryWhereUniqueInput
}

input CategoryCreateWithoutAccountInput {
  name: String!
  nameNormalized: String
  color: String!
  peers: PeerCategoryCreateManyWithoutCategoryInput
}

input CategoryCreateWithoutPeersInput {
  name: String!
  nameNormalized: String
  color: String!
  account: AccountCreateOneWithoutCategoriesInput!
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
  nameNormalized_ASC
  nameNormalized_DESC
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
  nameNormalized: String
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
  nameNormalized: String
  color: String
  account: AccountUpdateOneWithoutCategoriesInput
  peers: PeerCategoryUpdateManyWithoutCategoryInput
}

input CategoryUpdateInput {
  name: String
  nameNormalized: String
  color: String
  account: AccountUpdateOneWithoutCategoriesInput
  peers: PeerCategoryUpdateManyWithoutCategoryInput
}

input CategoryUpdateManyWithoutAccountInput {
  create: [CategoryCreateWithoutAccountInput!]
  connect: [CategoryWhereUniqueInput!]
  disconnect: [CategoryWhereUniqueInput!]
  delete: [CategoryWhereUniqueInput!]
  update: [CategoryUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [CategoryUpsertWithWhereUniqueWithoutAccountInput!]
}

input CategoryUpdateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CategoryUpdateDataInput
  upsert: CategoryUpsertNestedInput
}

input CategoryUpdateOneWithoutPeersInput {
  create: CategoryCreateWithoutPeersInput
  connect: CategoryWhereUniqueInput
  delete: Boolean
  update: CategoryUpdateWithoutPeersDataInput
  upsert: CategoryUpsertWithoutPeersInput
}

input CategoryUpdateWithoutAccountDataInput {
  name: String
  nameNormalized: String
  color: String
  peers: PeerCategoryUpdateManyWithoutCategoryInput
}

input CategoryUpdateWithoutPeersDataInput {
  name: String
  nameNormalized: String
  color: String
  account: AccountUpdateOneWithoutCategoriesInput
}

input CategoryUpdateWithWhereUniqueWithoutAccountInput {
  where: CategoryWhereUniqueInput!
  data: CategoryUpdateWithoutAccountDataInput!
}

input CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryUpsertWithoutPeersInput {
  update: CategoryUpdateWithoutPeersDataInput!
  create: CategoryCreateWithoutPeersInput!
}

input CategoryUpsertWithWhereUniqueWithoutAccountInput {
  where: CategoryWhereUniqueInput!
  update: CategoryUpdateWithoutAccountDataInput!
  create: CategoryCreateWithoutAccountInput!
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
  nameNormalized: String

  """All values that are not equal to given value."""
  nameNormalized_not: String

  """All values that are contained in given list."""
  nameNormalized_in: [String!]

  """All values that are not contained in given list."""
  nameNormalized_not_in: [String!]

  """All values less than the given value."""
  nameNormalized_lt: String

  """All values less than or equal the given value."""
  nameNormalized_lte: String

  """All values greater than the given value."""
  nameNormalized_gt: String

  """All values greater than or equal the given value."""
  nameNormalized_gte: String

  """All values containing the given string."""
  nameNormalized_contains: String

  """All values not containing the given string."""
  nameNormalized_not_contains: String

  """All values starting with the given string."""
  nameNormalized_starts_with: String

  """All values not starting with the given string."""
  nameNormalized_not_starts_with: String

  """All values ending with the given string."""
  nameNormalized_ends_with: String

  """All values not ending with the given string."""
  nameNormalized_not_ends_with: String
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
  account: AccountWhereInput
  peers_every: PeerCategoryWhereInput
  peers_some: PeerCategoryWhereInput
  peers_none: PeerCategoryWhereInput
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
  createPayment(data: PaymentCreateInput!): Payment!
  createPeer(data: PeerCreateInput!): Peer!
  createComment(data: CommentCreateInput!): Comment!
  createPeerCategory(data: PeerCategoryCreateInput!): PeerCategory!
  createStory(data: StoryCreateInput!): Story!
  createStoryData(data: StoryDataCreateInput!): StoryData!
  createOnboarding(data: OnboardingCreateInput!): Onboarding!
  createMxUser(data: MxUserCreateInput!): MxUser!
  createMxMember(data: MxMemberCreateInput!): MxMember!
  createTeamInvite(data: TeamInviteCreateInput!): TeamInvite!
  createUser(data: UserCreateInput!): User!
  createCategory(data: CategoryCreateInput!): Category!
  updateTeam(data: TeamUpdateInput!, where: TeamWhereUniqueInput!): Team
  updateTeamMember(data: TeamMemberUpdateInput!, where: TeamMemberWhereUniqueInput!): TeamMember
  updateAccount(data: AccountUpdateInput!, where: AccountWhereUniqueInput!): Account
  updatePayment(data: PaymentUpdateInput!, where: PaymentWhereUniqueInput!): Payment
  updatePeer(data: PeerUpdateInput!, where: PeerWhereUniqueInput!): Peer
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updatePeerCategory(data: PeerCategoryUpdateInput!, where: PeerCategoryWhereUniqueInput!): PeerCategory
  updateStory(data: StoryUpdateInput!, where: StoryWhereUniqueInput!): Story
  updateStoryData(data: StoryDataUpdateInput!, where: StoryDataWhereUniqueInput!): StoryData
  updateOnboarding(data: OnboardingUpdateInput!, where: OnboardingWhereUniqueInput!): Onboarding
  updateMxUser(data: MxUserUpdateInput!, where: MxUserWhereUniqueInput!): MxUser
  updateMxMember(data: MxMemberUpdateInput!, where: MxMemberWhereUniqueInput!): MxMember
  updateTeamInvite(data: TeamInviteUpdateInput!, where: TeamInviteWhereUniqueInput!): TeamInvite
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  deleteTeam(where: TeamWhereUniqueInput!): Team
  deleteTeamMember(where: TeamMemberWhereUniqueInput!): TeamMember
  deleteAccount(where: AccountWhereUniqueInput!): Account
  deletePayment(where: PaymentWhereUniqueInput!): Payment
  deletePeer(where: PeerWhereUniqueInput!): Peer
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deletePeerCategory(where: PeerCategoryWhereUniqueInput!): PeerCategory
  deleteStory(where: StoryWhereUniqueInput!): Story
  deleteStoryData(where: StoryDataWhereUniqueInput!): StoryData
  deleteOnboarding(where: OnboardingWhereUniqueInput!): Onboarding
  deleteMxUser(where: MxUserWhereUniqueInput!): MxUser
  deleteMxMember(where: MxMemberWhereUniqueInput!): MxMember
  deleteTeamInvite(where: TeamInviteWhereUniqueInput!): TeamInvite
  deleteUser(where: UserWhereUniqueInput!): User
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  upsertTeam(where: TeamWhereUniqueInput!, create: TeamCreateInput!, update: TeamUpdateInput!): Team!
  upsertTeamMember(where: TeamMemberWhereUniqueInput!, create: TeamMemberCreateInput!, update: TeamMemberUpdateInput!): TeamMember!
  upsertAccount(where: AccountWhereUniqueInput!, create: AccountCreateInput!, update: AccountUpdateInput!): Account!
  upsertPayment(where: PaymentWhereUniqueInput!, create: PaymentCreateInput!, update: PaymentUpdateInput!): Payment!
  upsertPeer(where: PeerWhereUniqueInput!, create: PeerCreateInput!, update: PeerUpdateInput!): Peer!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  upsertPeerCategory(where: PeerCategoryWhereUniqueInput!, create: PeerCategoryCreateInput!, update: PeerCategoryUpdateInput!): PeerCategory!
  upsertStory(where: StoryWhereUniqueInput!, create: StoryCreateInput!, update: StoryUpdateInput!): Story!
  upsertStoryData(where: StoryDataWhereUniqueInput!, create: StoryDataCreateInput!, update: StoryDataUpdateInput!): StoryData!
  upsertOnboarding(where: OnboardingWhereUniqueInput!, create: OnboardingCreateInput!, update: OnboardingUpdateInput!): Onboarding!
  upsertMxUser(where: MxUserWhereUniqueInput!, create: MxUserCreateInput!, update: MxUserUpdateInput!): MxUser!
  upsertMxMember(where: MxMemberWhereUniqueInput!, create: MxMemberCreateInput!, update: MxMemberUpdateInput!): MxMember!
  upsertTeamInvite(where: TeamInviteWhereUniqueInput!, create: TeamInviteCreateInput!, update: TeamInviteUpdateInput!): TeamInvite!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  updateManyTeams(data: TeamUpdateInput!, where: TeamWhereInput): BatchPayload!
  updateManyTeamMembers(data: TeamMemberUpdateInput!, where: TeamMemberWhereInput): BatchPayload!
  updateManyAccounts(data: AccountUpdateInput!, where: AccountWhereInput): BatchPayload!
  updateManyPayments(data: PaymentUpdateInput!, where: PaymentWhereInput): BatchPayload!
  updateManyPeers(data: PeerUpdateInput!, where: PeerWhereInput): BatchPayload!
  updateManyComments(data: CommentUpdateInput!, where: CommentWhereInput): BatchPayload!
  updateManyPeerCategories(data: PeerCategoryUpdateInput!, where: PeerCategoryWhereInput): BatchPayload!
  updateManyStories(data: StoryUpdateInput!, where: StoryWhereInput): BatchPayload!
  updateManyStoryDatas(data: StoryDataUpdateInput!, where: StoryDataWhereInput): BatchPayload!
  updateManyOnboardings(data: OnboardingUpdateInput!, where: OnboardingWhereInput): BatchPayload!
  updateManyMxUsers(data: MxUserUpdateInput!, where: MxUserWhereInput): BatchPayload!
  updateManyMxMembers(data: MxMemberUpdateInput!, where: MxMemberWhereInput): BatchPayload!
  updateManyTeamInvites(data: TeamInviteUpdateInput!, where: TeamInviteWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyCategories(data: CategoryUpdateInput!, where: CategoryWhereInput): BatchPayload!
  deleteManyTeams(where: TeamWhereInput): BatchPayload!
  deleteManyTeamMembers(where: TeamMemberWhereInput): BatchPayload!
  deleteManyAccounts(where: AccountWhereInput): BatchPayload!
  deleteManyPayments(where: PaymentWhereInput): BatchPayload!
  deleteManyPeers(where: PeerWhereInput): BatchPayload!
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  deleteManyPeerCategories(where: PeerCategoryWhereInput): BatchPayload!
  deleteManyStories(where: StoryWhereInput): BatchPayload!
  deleteManyStoryDatas(where: StoryDataWhereInput): BatchPayload!
  deleteManyOnboardings(where: OnboardingWhereInput): BatchPayload!
  deleteManyMxUsers(where: MxUserWhereInput): BatchPayload!
  deleteManyMxMembers(where: MxMemberWhereInput): BatchPayload!
  deleteManyTeamInvites(where: TeamInviteWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

type MxMember implements Node {
  id: ID!
  mxGuid: String!
  institutionCode: String!
  user(where: MxUserWhereInput): MxUser!
  onboarding(where: OnboardingWhereInput): Onboarding
}

"""A connection to a list of items."""
type MxMemberConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MxMemberEdge]!
  aggregate: AggregateMxMember!
}

input MxMemberCreateInput {
  mxGuid: String!
  institutionCode: String!
  user: MxUserCreateOneWithoutMembersInput!
  onboarding: OnboardingCreateOneWithoutMemberInput
}

input MxMemberCreateManyWithoutUserInput {
  create: [MxMemberCreateWithoutUserInput!]
  connect: [MxMemberWhereUniqueInput!]
}

input MxMemberCreateOneWithoutOnboardingInput {
  create: MxMemberCreateWithoutOnboardingInput
  connect: MxMemberWhereUniqueInput
}

input MxMemberCreateWithoutOnboardingInput {
  mxGuid: String!
  institutionCode: String!
  user: MxUserCreateOneWithoutMembersInput!
}

input MxMemberCreateWithoutUserInput {
  mxGuid: String!
  institutionCode: String!
  onboarding: OnboardingCreateOneWithoutMemberInput
}

"""An edge in a connection."""
type MxMemberEdge {
  """The item at the end of the edge."""
  node: MxMember!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MxMemberOrderByInput {
  id_ASC
  id_DESC
  mxGuid_ASC
  mxGuid_DESC
  institutionCode_ASC
  institutionCode_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type MxMemberPreviousValues {
  id: ID!
  mxGuid: String!
  institutionCode: String!
}

type MxMemberSubscriptionPayload {
  mutation: MutationType!
  node: MxMember
  updatedFields: [String!]
  previousValues: MxMemberPreviousValues
}

input MxMemberSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [MxMemberSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MxMemberSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MxMemberSubscriptionWhereInput!]

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
  node: MxMemberWhereInput
}

input MxMemberUpdateInput {
  mxGuid: String
  institutionCode: String
  user: MxUserUpdateOneWithoutMembersInput
  onboarding: OnboardingUpdateOneWithoutMemberInput
}

input MxMemberUpdateManyWithoutUserInput {
  create: [MxMemberCreateWithoutUserInput!]
  connect: [MxMemberWhereUniqueInput!]
  disconnect: [MxMemberWhereUniqueInput!]
  delete: [MxMemberWhereUniqueInput!]
  update: [MxMemberUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [MxMemberUpsertWithWhereUniqueWithoutUserInput!]
}

input MxMemberUpdateOneWithoutOnboardingInput {
  create: MxMemberCreateWithoutOnboardingInput
  connect: MxMemberWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: MxMemberUpdateWithoutOnboardingDataInput
  upsert: MxMemberUpsertWithoutOnboardingInput
}

input MxMemberUpdateWithoutOnboardingDataInput {
  mxGuid: String
  institutionCode: String
  user: MxUserUpdateOneWithoutMembersInput
}

input MxMemberUpdateWithoutUserDataInput {
  mxGuid: String
  institutionCode: String
  onboarding: OnboardingUpdateOneWithoutMemberInput
}

input MxMemberUpdateWithWhereUniqueWithoutUserInput {
  where: MxMemberWhereUniqueInput!
  data: MxMemberUpdateWithoutUserDataInput!
}

input MxMemberUpsertWithoutOnboardingInput {
  update: MxMemberUpdateWithoutOnboardingDataInput!
  create: MxMemberCreateWithoutOnboardingInput!
}

input MxMemberUpsertWithWhereUniqueWithoutUserInput {
  where: MxMemberWhereUniqueInput!
  update: MxMemberUpdateWithoutUserDataInput!
  create: MxMemberCreateWithoutUserInput!
}

input MxMemberWhereInput {
  """Logical AND on all given filters."""
  AND: [MxMemberWhereInput!]

  """Logical OR on all given filters."""
  OR: [MxMemberWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MxMemberWhereInput!]
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
  mxGuid: String

  """All values that are not equal to given value."""
  mxGuid_not: String

  """All values that are contained in given list."""
  mxGuid_in: [String!]

  """All values that are not contained in given list."""
  mxGuid_not_in: [String!]

  """All values less than the given value."""
  mxGuid_lt: String

  """All values less than or equal the given value."""
  mxGuid_lte: String

  """All values greater than the given value."""
  mxGuid_gt: String

  """All values greater than or equal the given value."""
  mxGuid_gte: String

  """All values containing the given string."""
  mxGuid_contains: String

  """All values not containing the given string."""
  mxGuid_not_contains: String

  """All values starting with the given string."""
  mxGuid_starts_with: String

  """All values not starting with the given string."""
  mxGuid_not_starts_with: String

  """All values ending with the given string."""
  mxGuid_ends_with: String

  """All values not ending with the given string."""
  mxGuid_not_ends_with: String
  institutionCode: String

  """All values that are not equal to given value."""
  institutionCode_not: String

  """All values that are contained in given list."""
  institutionCode_in: [String!]

  """All values that are not contained in given list."""
  institutionCode_not_in: [String!]

  """All values less than the given value."""
  institutionCode_lt: String

  """All values less than or equal the given value."""
  institutionCode_lte: String

  """All values greater than the given value."""
  institutionCode_gt: String

  """All values greater than or equal the given value."""
  institutionCode_gte: String

  """All values containing the given string."""
  institutionCode_contains: String

  """All values not containing the given string."""
  institutionCode_not_contains: String

  """All values starting with the given string."""
  institutionCode_starts_with: String

  """All values not starting with the given string."""
  institutionCode_not_starts_with: String

  """All values ending with the given string."""
  institutionCode_ends_with: String

  """All values not ending with the given string."""
  institutionCode_not_ends_with: String
  user: MxUserWhereInput
  onboarding: OnboardingWhereInput
}

input MxMemberWhereUniqueInput {
  id: ID
}

type MxUser implements Node {
  id: ID!
  mxGuid: String!
  members(where: MxMemberWhereInput, orderBy: MxMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MxMember!]
}

"""A connection to a list of items."""
type MxUserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MxUserEdge]!
  aggregate: AggregateMxUser!
}

input MxUserCreateInput {
  mxGuid: String!
  members: MxMemberCreateManyWithoutUserInput
}

input MxUserCreateOneWithoutMembersInput {
  create: MxUserCreateWithoutMembersInput
  connect: MxUserWhereUniqueInput
}

input MxUserCreateWithoutMembersInput {
  mxGuid: String!
}

"""An edge in a connection."""
type MxUserEdge {
  """The item at the end of the edge."""
  node: MxUser!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MxUserOrderByInput {
  id_ASC
  id_DESC
  mxGuid_ASC
  mxGuid_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type MxUserPreviousValues {
  id: ID!
  mxGuid: String!
}

type MxUserSubscriptionPayload {
  mutation: MutationType!
  node: MxUser
  updatedFields: [String!]
  previousValues: MxUserPreviousValues
}

input MxUserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [MxUserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MxUserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MxUserSubscriptionWhereInput!]

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
  node: MxUserWhereInput
}

input MxUserUpdateInput {
  mxGuid: String
  members: MxMemberUpdateManyWithoutUserInput
}

input MxUserUpdateOneWithoutMembersInput {
  create: MxUserCreateWithoutMembersInput
  connect: MxUserWhereUniqueInput
  delete: Boolean
  update: MxUserUpdateWithoutMembersDataInput
  upsert: MxUserUpsertWithoutMembersInput
}

input MxUserUpdateWithoutMembersDataInput {
  mxGuid: String
}

input MxUserUpsertWithoutMembersInput {
  update: MxUserUpdateWithoutMembersDataInput!
  create: MxUserCreateWithoutMembersInput!
}

input MxUserWhereInput {
  """Logical AND on all given filters."""
  AND: [MxUserWhereInput!]

  """Logical OR on all given filters."""
  OR: [MxUserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MxUserWhereInput!]
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
  mxGuid: String

  """All values that are not equal to given value."""
  mxGuid_not: String

  """All values that are contained in given list."""
  mxGuid_in: [String!]

  """All values that are not contained in given list."""
  mxGuid_not_in: [String!]

  """All values less than the given value."""
  mxGuid_lt: String

  """All values less than or equal the given value."""
  mxGuid_lte: String

  """All values greater than the given value."""
  mxGuid_gt: String

  """All values greater than or equal the given value."""
  mxGuid_gte: String

  """All values containing the given string."""
  mxGuid_contains: String

  """All values not containing the given string."""
  mxGuid_not_contains: String

  """All values starting with the given string."""
  mxGuid_starts_with: String

  """All values not starting with the given string."""
  mxGuid_not_starts_with: String

  """All values ending with the given string."""
  mxGuid_ends_with: String

  """All values not ending with the given string."""
  mxGuid_not_ends_with: String
  members_every: MxMemberWhereInput
  members_some: MxMemberWhereInput
  members_none: MxMemberWhereInput
}

input MxUserWhereUniqueInput {
  id: ID
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

type Onboarding implements Node {
  id: ID!
  user(where: UserWhereInput): User!
  step: String!
  institution: Json!
  credentials: Json!
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
  member(where: MxMemberWhereInput): MxMember
}

"""A connection to a list of items."""
type OnboardingConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OnboardingEdge]!
  aggregate: AggregateOnboarding!
}

input OnboardingCreateInput {
  step: String!
  institution: Json!
  credentials: Json!
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
  user: UserCreateOneInput!
  member: MxMemberCreateOneWithoutOnboardingInput
}

input OnboardingCreateOneWithoutMemberInput {
  create: OnboardingCreateWithoutMemberInput
  connect: OnboardingWhereUniqueInput
}

input OnboardingCreateWithoutMemberInput {
  step: String!
  institution: Json!
  credentials: Json!
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
  user: UserCreateOneInput!
}

"""An edge in a connection."""
type OnboardingEdge {
  """The item at the end of the edge."""
  node: Onboarding!

  """A cursor for use in pagination."""
  cursor: String!
}

enum OnboardingOrderByInput {
  id_ASC
  id_DESC
  step_ASC
  step_DESC
  institution_ASC
  institution_DESC
  credentials_ASC
  credentials_DESC
  accounts_ASC
  accounts_DESC
  account_ASC
  account_DESC
  categories_ASC
  categories_DESC
  mfa_ASC
  mfa_DESC
  team_ASC
  team_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OnboardingPreviousValues {
  id: ID!
  step: String!
  institution: Json!
  credentials: Json!
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
}

type OnboardingSubscriptionPayload {
  mutation: MutationType!
  node: Onboarding
  updatedFields: [String!]
  previousValues: OnboardingPreviousValues
}

input OnboardingSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [OnboardingSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [OnboardingSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [OnboardingSubscriptionWhereInput!]

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
  node: OnboardingWhereInput
}

input OnboardingUpdateInput {
  step: String
  institution: Json
  credentials: Json
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
  user: UserUpdateOneInput
  member: MxMemberUpdateOneWithoutOnboardingInput
}

input OnboardingUpdateOneWithoutMemberInput {
  create: OnboardingCreateWithoutMemberInput
  connect: OnboardingWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: OnboardingUpdateWithoutMemberDataInput
  upsert: OnboardingUpsertWithoutMemberInput
}

input OnboardingUpdateWithoutMemberDataInput {
  step: String
  institution: Json
  credentials: Json
  accounts: Json
  account: Json
  categories: Json
  mfa: Json
  team: Json
  user: UserUpdateOneInput
}

input OnboardingUpsertWithoutMemberInput {
  update: OnboardingUpdateWithoutMemberDataInput!
  create: OnboardingCreateWithoutMemberInput!
}

input OnboardingWhereInput {
  """Logical AND on all given filters."""
  AND: [OnboardingWhereInput!]

  """Logical OR on all given filters."""
  OR: [OnboardingWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [OnboardingWhereInput!]
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
  step: String

  """All values that are not equal to given value."""
  step_not: String

  """All values that are contained in given list."""
  step_in: [String!]

  """All values that are not contained in given list."""
  step_not_in: [String!]

  """All values less than the given value."""
  step_lt: String

  """All values less than or equal the given value."""
  step_lte: String

  """All values greater than the given value."""
  step_gt: String

  """All values greater than or equal the given value."""
  step_gte: String

  """All values containing the given string."""
  step_contains: String

  """All values not containing the given string."""
  step_not_contains: String

  """All values starting with the given string."""
  step_starts_with: String

  """All values not starting with the given string."""
  step_not_starts_with: String

  """All values ending with the given string."""
  step_ends_with: String

  """All values not ending with the given string."""
  step_not_ends_with: String
  user: UserWhereInput
  member: MxMemberWhereInput
}

input OnboardingWhereUniqueInput {
  id: ID
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
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  peer(where: PeerWhereInput): Peer
  description: String
  descriptionNormalized: String
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  category(where: CategoryWhereInput): Category
  rawData: Json!
  storyData(where: StoryDataWhereInput): StoryData
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
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  peer: PeerCreateOneWithoutPaymentsInput
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
  storyData: StoryDataCreateOneWithoutPaymentsInput
}

input PaymentCreateManyWithoutAccountInput {
  create: [PaymentCreateWithoutAccountInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateManyWithoutPeerInput {
  create: [PaymentCreateWithoutPeerInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateManyWithoutStoryDataInput {
  create: [PaymentCreateWithoutStoryDataInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateOneWithoutCommentsInput {
  create: PaymentCreateWithoutCommentsInput
  connect: PaymentWhereUniqueInput
}

input PaymentCreateWithoutAccountInput {
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json!
  peer: PeerCreateOneWithoutPaymentsInput
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
  storyData: StoryDataCreateOneWithoutPaymentsInput
}

input PaymentCreateWithoutCommentsInput {
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  peer: PeerCreateOneWithoutPaymentsInput
  category: CategoryCreateOneInput
  storyData: StoryDataCreateOneWithoutPaymentsInput
}

input PaymentCreateWithoutPeerInput {
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  comments: CommentCreateManyWithoutPaymentInput
  category: CategoryCreateOneInput
  storyData: StoryDataCreateOneWithoutPaymentsInput
}

input PaymentCreateWithoutStoryDataInput {
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json!
  account: AccountCreateOneWithoutPaymentsInput!
  peer: PeerCreateOneWithoutPaymentsInput
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
  postedOn_ASC
  postedOn_DESC
  amount_ASC
  amount_DESC
  amountAbs_ASC
  amountAbs_DESC
  peerName_ASC
  peerName_DESC
  peerNameNormalized_ASC
  peerNameNormalized_DESC
  description_ASC
  description_DESC
  descriptionNormalized_ASC
  descriptionNormalized_DESC
  rawData_ASC
  rawData_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PaymentPreviousValues {
  id: ID!
  postedOn: DateTime!
  amount: Float!
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
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
  postedOn: DateTime
  amount: Float
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  peer: PeerUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
  storyData: StoryDataUpdateOneWithoutPaymentsInput
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

input PaymentUpdateManyWithoutStoryDataInput {
  create: [PaymentCreateWithoutStoryDataInput!]
  connect: [PaymentWhereUniqueInput!]
  disconnect: [PaymentWhereUniqueInput!]
  delete: [PaymentWhereUniqueInput!]
  update: [PaymentUpdateWithWhereUniqueWithoutStoryDataInput!]
  upsert: [PaymentUpsertWithWhereUniqueWithoutStoryDataInput!]
}

input PaymentUpdateOneWithoutCommentsInput {
  create: PaymentCreateWithoutCommentsInput
  connect: PaymentWhereUniqueInput
  delete: Boolean
  update: PaymentUpdateWithoutCommentsDataInput
  upsert: PaymentUpsertWithoutCommentsInput
}

input PaymentUpdateWithoutAccountDataInput {
  postedOn: DateTime
  amount: Float
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json
  peer: PeerUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
  storyData: StoryDataUpdateOneWithoutPaymentsInput
}

input PaymentUpdateWithoutCommentsDataInput {
  postedOn: DateTime
  amount: Float
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  peer: PeerUpdateOneWithoutPaymentsInput
  category: CategoryUpdateOneInput
  storyData: StoryDataUpdateOneWithoutPaymentsInput
}

input PaymentUpdateWithoutPeerDataInput {
  postedOn: DateTime
  amount: Float
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  comments: CommentUpdateManyWithoutPaymentInput
  category: CategoryUpdateOneInput
  storyData: StoryDataUpdateOneWithoutPaymentsInput
}

input PaymentUpdateWithoutStoryDataDataInput {
  postedOn: DateTime
  amount: Float
  amountAbs: Float
  peerName: String
  peerNameNormalized: String
  description: String
  descriptionNormalized: String
  rawData: Json
  account: AccountUpdateOneWithoutPaymentsInput
  peer: PeerUpdateOneWithoutPaymentsInput
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

input PaymentUpdateWithWhereUniqueWithoutStoryDataInput {
  where: PaymentWhereUniqueInput!
  data: PaymentUpdateWithoutStoryDataDataInput!
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

input PaymentUpsertWithWhereUniqueWithoutStoryDataInput {
  where: PaymentWhereUniqueInput!
  update: PaymentUpdateWithoutStoryDataDataInput!
  create: PaymentCreateWithoutStoryDataInput!
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
  postedOn: DateTime

  """All values that are not equal to given value."""
  postedOn_not: DateTime

  """All values that are contained in given list."""
  postedOn_in: [DateTime!]

  """All values that are not contained in given list."""
  postedOn_not_in: [DateTime!]

  """All values less than the given value."""
  postedOn_lt: DateTime

  """All values less than or equal the given value."""
  postedOn_lte: DateTime

  """All values greater than the given value."""
  postedOn_gt: DateTime

  """All values greater than or equal the given value."""
  postedOn_gte: DateTime
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
  amountAbs: Float

  """All values that are not equal to given value."""
  amountAbs_not: Float

  """All values that are contained in given list."""
  amountAbs_in: [Float!]

  """All values that are not contained in given list."""
  amountAbs_not_in: [Float!]

  """All values less than the given value."""
  amountAbs_lt: Float

  """All values less than or equal the given value."""
  amountAbs_lte: Float

  """All values greater than the given value."""
  amountAbs_gt: Float

  """All values greater than or equal the given value."""
  amountAbs_gte: Float
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
  peerNameNormalized: String

  """All values that are not equal to given value."""
  peerNameNormalized_not: String

  """All values that are contained in given list."""
  peerNameNormalized_in: [String!]

  """All values that are not contained in given list."""
  peerNameNormalized_not_in: [String!]

  """All values less than the given value."""
  peerNameNormalized_lt: String

  """All values less than or equal the given value."""
  peerNameNormalized_lte: String

  """All values greater than the given value."""
  peerNameNormalized_gt: String

  """All values greater than or equal the given value."""
  peerNameNormalized_gte: String

  """All values containing the given string."""
  peerNameNormalized_contains: String

  """All values not containing the given string."""
  peerNameNormalized_not_contains: String

  """All values starting with the given string."""
  peerNameNormalized_starts_with: String

  """All values not starting with the given string."""
  peerNameNormalized_not_starts_with: String

  """All values ending with the given string."""
  peerNameNormalized_ends_with: String

  """All values not ending with the given string."""
  peerNameNormalized_not_ends_with: String
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
  descriptionNormalized: String

  """All values that are not equal to given value."""
  descriptionNormalized_not: String

  """All values that are contained in given list."""
  descriptionNormalized_in: [String!]

  """All values that are not contained in given list."""
  descriptionNormalized_not_in: [String!]

  """All values less than the given value."""
  descriptionNormalized_lt: String

  """All values less than or equal the given value."""
  descriptionNormalized_lte: String

  """All values greater than the given value."""
  descriptionNormalized_gt: String

  """All values greater than or equal the given value."""
  descriptionNormalized_gte: String

  """All values containing the given string."""
  descriptionNormalized_contains: String

  """All values not containing the given string."""
  descriptionNormalized_not_contains: String

  """All values starting with the given string."""
  descriptionNormalized_starts_with: String

  """All values not starting with the given string."""
  descriptionNormalized_not_starts_with: String

  """All values ending with the given string."""
  descriptionNormalized_ends_with: String

  """All values not ending with the given string."""
  descriptionNormalized_not_ends_with: String
  account: AccountWhereInput
  peer: PeerWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  category: CategoryWhereInput
  storyData: StoryDataWhereInput
}

input PaymentWhereUniqueInput {
  id: ID
}

type Peer implements Node {
  id: ID!
  account(where: AccountWhereInput): Account!
  name: String!
  nameNormalized: String
  total: Float!
  revenue: Float!
  spendings: Float!
  lastPaymentDate: DateTime
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  paymentCount: Int
  category(where: CategoryWhereInput): Category
  categories(where: PeerCategoryWhereInput, orderBy: PeerCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PeerCategory!]
}

type PeerCategory implements Node {
  id: ID!
  peer(where: PeerWhereInput): Peer!
  category(where: CategoryWhereInput): Category!
  count: Int!
  total: Float!
  revenue: Float!
  spendings: Float!
}

"""A connection to a list of items."""
type PeerCategoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PeerCategoryEdge]!
  aggregate: AggregatePeerCategory!
}

input PeerCategoryCreateInput {
  count: Int!
  total: Float!
  revenue: Float!
  spendings: Float!
  peer: PeerCreateOneWithoutCategoriesInput!
  category: CategoryCreateOneWithoutPeersInput!
}

input PeerCategoryCreateManyWithoutCategoryInput {
  create: [PeerCategoryCreateWithoutCategoryInput!]
  connect: [PeerCategoryWhereUniqueInput!]
}

input PeerCategoryCreateManyWithoutPeerInput {
  create: [PeerCategoryCreateWithoutPeerInput!]
  connect: [PeerCategoryWhereUniqueInput!]
}

input PeerCategoryCreateWithoutCategoryInput {
  count: Int!
  total: Float!
  revenue: Float!
  spendings: Float!
  peer: PeerCreateOneWithoutCategoriesInput!
}

input PeerCategoryCreateWithoutPeerInput {
  count: Int!
  total: Float!
  revenue: Float!
  spendings: Float!
  category: CategoryCreateOneWithoutPeersInput!
}

"""An edge in a connection."""
type PeerCategoryEdge {
  """The item at the end of the edge."""
  node: PeerCategory!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PeerCategoryOrderByInput {
  id_ASC
  id_DESC
  count_ASC
  count_DESC
  total_ASC
  total_DESC
  revenue_ASC
  revenue_DESC
  spendings_ASC
  spendings_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PeerCategoryPreviousValues {
  id: ID!
  count: Int!
  total: Float!
  revenue: Float!
  spendings: Float!
}

type PeerCategorySubscriptionPayload {
  mutation: MutationType!
  node: PeerCategory
  updatedFields: [String!]
  previousValues: PeerCategoryPreviousValues
}

input PeerCategorySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PeerCategorySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeerCategorySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeerCategorySubscriptionWhereInput!]

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
  node: PeerCategoryWhereInput
}

input PeerCategoryUpdateInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  peer: PeerUpdateOneWithoutCategoriesInput
  category: CategoryUpdateOneWithoutPeersInput
}

input PeerCategoryUpdateManyWithoutCategoryInput {
  create: [PeerCategoryCreateWithoutCategoryInput!]
  connect: [PeerCategoryWhereUniqueInput!]
  disconnect: [PeerCategoryWhereUniqueInput!]
  delete: [PeerCategoryWhereUniqueInput!]
  update: [PeerCategoryUpdateWithWhereUniqueWithoutCategoryInput!]
  upsert: [PeerCategoryUpsertWithWhereUniqueWithoutCategoryInput!]
}

input PeerCategoryUpdateManyWithoutPeerInput {
  create: [PeerCategoryCreateWithoutPeerInput!]
  connect: [PeerCategoryWhereUniqueInput!]
  disconnect: [PeerCategoryWhereUniqueInput!]
  delete: [PeerCategoryWhereUniqueInput!]
  update: [PeerCategoryUpdateWithWhereUniqueWithoutPeerInput!]
  upsert: [PeerCategoryUpsertWithWhereUniqueWithoutPeerInput!]
}

input PeerCategoryUpdateWithoutCategoryDataInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  peer: PeerUpdateOneWithoutCategoriesInput
}

input PeerCategoryUpdateWithoutPeerDataInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  category: CategoryUpdateOneWithoutPeersInput
}

input PeerCategoryUpdateWithWhereUniqueWithoutCategoryInput {
  where: PeerCategoryWhereUniqueInput!
  data: PeerCategoryUpdateWithoutCategoryDataInput!
}

input PeerCategoryUpdateWithWhereUniqueWithoutPeerInput {
  where: PeerCategoryWhereUniqueInput!
  data: PeerCategoryUpdateWithoutPeerDataInput!
}

input PeerCategoryUpsertWithWhereUniqueWithoutCategoryInput {
  where: PeerCategoryWhereUniqueInput!
  update: PeerCategoryUpdateWithoutCategoryDataInput!
  create: PeerCategoryCreateWithoutCategoryInput!
}

input PeerCategoryUpsertWithWhereUniqueWithoutPeerInput {
  where: PeerCategoryWhereUniqueInput!
  update: PeerCategoryUpdateWithoutPeerDataInput!
  create: PeerCategoryCreateWithoutPeerInput!
}

input PeerCategoryWhereInput {
  """Logical AND on all given filters."""
  AND: [PeerCategoryWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeerCategoryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeerCategoryWhereInput!]
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
  count: Int

  """All values that are not equal to given value."""
  count_not: Int

  """All values that are contained in given list."""
  count_in: [Int!]

  """All values that are not contained in given list."""
  count_not_in: [Int!]

  """All values less than the given value."""
  count_lt: Int

  """All values less than or equal the given value."""
  count_lte: Int

  """All values greater than the given value."""
  count_gt: Int

  """All values greater than or equal the given value."""
  count_gte: Int
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
  peer: PeerWhereInput
  category: CategoryWhereInput
}

input PeerCategoryWhereUniqueInput {
  id: ID
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
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountCreateOneWithoutPeersInput!
  payments: PaymentCreateManyWithoutPeerInput
  category: CategoryCreateOneInput
  categories: PeerCategoryCreateManyWithoutPeerInput
}

input PeerCreateManyWithoutAccountInput {
  create: [PeerCreateWithoutAccountInput!]
  connect: [PeerWhereUniqueInput!]
}

input PeerCreateOneWithoutCategoriesInput {
  create: PeerCreateWithoutCategoriesInput
  connect: PeerWhereUniqueInput
}

input PeerCreateOneWithoutPaymentsInput {
  create: PeerCreateWithoutPaymentsInput
  connect: PeerWhereUniqueInput
}

input PeerCreateWithoutAccountInput {
  name: String!
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  payments: PaymentCreateManyWithoutPeerInput
  category: CategoryCreateOneInput
  categories: PeerCategoryCreateManyWithoutPeerInput
}

input PeerCreateWithoutCategoriesInput {
  name: String!
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountCreateOneWithoutPeersInput!
  payments: PaymentCreateManyWithoutPeerInput
  category: CategoryCreateOneInput
}

input PeerCreateWithoutPaymentsInput {
  name: String!
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountCreateOneWithoutPeersInput!
  category: CategoryCreateOneInput
  categories: PeerCategoryCreateManyWithoutPeerInput
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
  nameNormalized_ASC
  nameNormalized_DESC
  total_ASC
  total_DESC
  revenue_ASC
  revenue_DESC
  spendings_ASC
  spendings_DESC
  lastPaymentDate_ASC
  lastPaymentDate_DESC
  paymentCount_ASC
  paymentCount_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PeerPreviousValues {
  id: ID!
  name: String!
  nameNormalized: String
  total: Float!
  revenue: Float!
  spendings: Float!
  lastPaymentDate: DateTime
  paymentCount: Int
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
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountUpdateOneWithoutPeersInput
  payments: PaymentUpdateManyWithoutPeerInput
  category: CategoryUpdateOneInput
  categories: PeerCategoryUpdateManyWithoutPeerInput
}

input PeerUpdateManyWithoutAccountInput {
  create: [PeerCreateWithoutAccountInput!]
  connect: [PeerWhereUniqueInput!]
  disconnect: [PeerWhereUniqueInput!]
  delete: [PeerWhereUniqueInput!]
  update: [PeerUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [PeerUpsertWithWhereUniqueWithoutAccountInput!]
}

input PeerUpdateOneWithoutCategoriesInput {
  create: PeerCreateWithoutCategoriesInput
  connect: PeerWhereUniqueInput
  delete: Boolean
  update: PeerUpdateWithoutCategoriesDataInput
  upsert: PeerUpsertWithoutCategoriesInput
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
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  payments: PaymentUpdateManyWithoutPeerInput
  category: CategoryUpdateOneInput
  categories: PeerCategoryUpdateManyWithoutPeerInput
}

input PeerUpdateWithoutCategoriesDataInput {
  name: String
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountUpdateOneWithoutPeersInput
  payments: PaymentUpdateManyWithoutPeerInput
  category: CategoryUpdateOneInput
}

input PeerUpdateWithoutPaymentsDataInput {
  name: String
  nameNormalized: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate: DateTime
  paymentCount: Int
  account: AccountUpdateOneWithoutPeersInput
  category: CategoryUpdateOneInput
  categories: PeerCategoryUpdateManyWithoutPeerInput
}

input PeerUpdateWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput!
  data: PeerUpdateWithoutAccountDataInput!
}

input PeerUpsertWithoutCategoriesInput {
  update: PeerUpdateWithoutCategoriesDataInput!
  create: PeerCreateWithoutCategoriesInput!
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
  nameNormalized: String

  """All values that are not equal to given value."""
  nameNormalized_not: String

  """All values that are contained in given list."""
  nameNormalized_in: [String!]

  """All values that are not contained in given list."""
  nameNormalized_not_in: [String!]

  """All values less than the given value."""
  nameNormalized_lt: String

  """All values less than or equal the given value."""
  nameNormalized_lte: String

  """All values greater than the given value."""
  nameNormalized_gt: String

  """All values greater than or equal the given value."""
  nameNormalized_gte: String

  """All values containing the given string."""
  nameNormalized_contains: String

  """All values not containing the given string."""
  nameNormalized_not_contains: String

  """All values starting with the given string."""
  nameNormalized_starts_with: String

  """All values not starting with the given string."""
  nameNormalized_not_starts_with: String

  """All values ending with the given string."""
  nameNormalized_ends_with: String

  """All values not ending with the given string."""
  nameNormalized_not_ends_with: String
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
  paymentCount: Int

  """All values that are not equal to given value."""
  paymentCount_not: Int

  """All values that are contained in given list."""
  paymentCount_in: [Int!]

  """All values that are not contained in given list."""
  paymentCount_not_in: [Int!]

  """All values less than the given value."""
  paymentCount_lt: Int

  """All values less than or equal the given value."""
  paymentCount_lte: Int

  """All values greater than the given value."""
  paymentCount_gt: Int

  """All values greater than or equal the given value."""
  paymentCount_gte: Int
  account: AccountWhereInput
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  category: CategoryWhereInput
  categories_every: PeerCategoryWhereInput
  categories_some: PeerCategoryWhereInput
  categories_none: PeerCategoryWhereInput
}

input PeerWhereUniqueInput {
  id: ID
}

type Query {
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team]!
  teamMembers(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember]!
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account]!
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment]!
  peers(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Peer]!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  peerCategories(where: PeerCategoryWhereInput, orderBy: PeerCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PeerCategory]!
  stories(where: StoryWhereInput, orderBy: StoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Story]!
  storyDatas(where: StoryDataWhereInput, orderBy: StoryDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StoryData]!
  onboardings(where: OnboardingWhereInput, orderBy: OnboardingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Onboarding]!
  mxUsers(where: MxUserWhereInput, orderBy: MxUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MxUser]!
  mxMembers(where: MxMemberWhereInput, orderBy: MxMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MxMember]!
  teamInvites(where: TeamInviteWhereInput, orderBy: TeamInviteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamInvite]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  team(where: TeamWhereUniqueInput!): Team
  teamMember(where: TeamMemberWhereUniqueInput!): TeamMember
  account(where: AccountWhereUniqueInput!): Account
  payment(where: PaymentWhereUniqueInput!): Payment
  peer(where: PeerWhereUniqueInput!): Peer
  comment(where: CommentWhereUniqueInput!): Comment
  peerCategory(where: PeerCategoryWhereUniqueInput!): PeerCategory
  story(where: StoryWhereUniqueInput!): Story
  storyData(where: StoryDataWhereUniqueInput!): StoryData
  onboarding(where: OnboardingWhereUniqueInput!): Onboarding
  mxUser(where: MxUserWhereUniqueInput!): MxUser
  mxMember(where: MxMemberWhereUniqueInput!): MxMember
  teamInvite(where: TeamInviteWhereUniqueInput!): TeamInvite
  user(where: UserWhereUniqueInput!): User
  category(where: CategoryWhereUniqueInput!): Category
  teamsConnection(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamConnection!
  teamMembersConnection(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamMemberConnection!
  accountsConnection(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountConnection!
  paymentsConnection(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PaymentConnection!
  peersConnection(where: PeerWhereInput, orderBy: PeerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeerConnection!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  peerCategoriesConnection(where: PeerCategoryWhereInput, orderBy: PeerCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeerCategoryConnection!
  storiesConnection(where: StoryWhereInput, orderBy: StoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StoryConnection!
  storyDatasConnection(where: StoryDataWhereInput, orderBy: StoryDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StoryDataConnection!
  onboardingsConnection(where: OnboardingWhereInput, orderBy: OnboardingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OnboardingConnection!
  mxUsersConnection(where: MxUserWhereInput, orderBy: MxUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MxUserConnection!
  mxMembersConnection(where: MxMemberWhereInput, orderBy: MxMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MxMemberConnection!
  teamInvitesConnection(where: TeamInviteWhereInput, orderBy: TeamInviteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamInviteConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Story implements Node {
  id: ID!
  account(where: AccountWhereInput): Account!
  draftData(where: StoryDataWhereInput): StoryData!
  publicData(where: StoryDataWhereInput): StoryData
  isPublished: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type StoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StoryEdge]!
  aggregate: AggregateStory!
}

input StoryCreateInput {
  isPublished: Boolean
  account: AccountCreateOneWithoutStoriesInput!
  draftData: StoryDataCreateOneWithoutDraftStoryInput!
  publicData: StoryDataCreateOneWithoutPublicStoryInput
}

input StoryCreateManyWithoutAccountInput {
  create: [StoryCreateWithoutAccountInput!]
  connect: [StoryWhereUniqueInput!]
}

input StoryCreateOneWithoutDraftDataInput {
  create: StoryCreateWithoutDraftDataInput
  connect: StoryWhereUniqueInput
}

input StoryCreateOneWithoutPublicDataInput {
  create: StoryCreateWithoutPublicDataInput
  connect: StoryWhereUniqueInput
}

input StoryCreateWithoutAccountInput {
  isPublished: Boolean
  draftData: StoryDataCreateOneWithoutDraftStoryInput!
  publicData: StoryDataCreateOneWithoutPublicStoryInput
}

input StoryCreateWithoutDraftDataInput {
  isPublished: Boolean
  account: AccountCreateOneWithoutStoriesInput!
  publicData: StoryDataCreateOneWithoutPublicStoryInput
}

input StoryCreateWithoutPublicDataInput {
  isPublished: Boolean
  account: AccountCreateOneWithoutStoriesInput!
  draftData: StoryDataCreateOneWithoutDraftStoryInput!
}

type StoryData implements Node {
  id: ID!
  title: String!
  body: Json!
  coverImage: Json
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  draftStory(where: StoryWhereInput): Story
  publicStory(where: StoryWhereInput): Story
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type StoryDataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StoryDataEdge]!
  aggregate: AggregateStoryData!
}

input StoryDataCreateInput {
  title: String!
  body: Json!
  coverImage: Json
  payments: PaymentCreateManyWithoutStoryDataInput
  draftStory: StoryCreateOneWithoutDraftDataInput
  publicStory: StoryCreateOneWithoutPublicDataInput
}

input StoryDataCreateOneWithoutDraftStoryInput {
  create: StoryDataCreateWithoutDraftStoryInput
  connect: StoryDataWhereUniqueInput
}

input StoryDataCreateOneWithoutPaymentsInput {
  create: StoryDataCreateWithoutPaymentsInput
  connect: StoryDataWhereUniqueInput
}

input StoryDataCreateOneWithoutPublicStoryInput {
  create: StoryDataCreateWithoutPublicStoryInput
  connect: StoryDataWhereUniqueInput
}

input StoryDataCreateWithoutDraftStoryInput {
  title: String!
  body: Json!
  coverImage: Json
  payments: PaymentCreateManyWithoutStoryDataInput
  publicStory: StoryCreateOneWithoutPublicDataInput
}

input StoryDataCreateWithoutPaymentsInput {
  title: String!
  body: Json!
  coverImage: Json
  draftStory: StoryCreateOneWithoutDraftDataInput
  publicStory: StoryCreateOneWithoutPublicDataInput
}

input StoryDataCreateWithoutPublicStoryInput {
  title: String!
  body: Json!
  coverImage: Json
  payments: PaymentCreateManyWithoutStoryDataInput
  draftStory: StoryCreateOneWithoutDraftDataInput
}

"""An edge in a connection."""
type StoryDataEdge {
  """The item at the end of the edge."""
  node: StoryData!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StoryDataOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  body_ASC
  body_DESC
  coverImage_ASC
  coverImage_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StoryDataPreviousValues {
  id: ID!
  title: String!
  body: Json!
  coverImage: Json
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StoryDataSubscriptionPayload {
  mutation: MutationType!
  node: StoryData
  updatedFields: [String!]
  previousValues: StoryDataPreviousValues
}

input StoryDataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StoryDataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StoryDataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StoryDataSubscriptionWhereInput!]

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
  node: StoryDataWhereInput
}

input StoryDataUpdateInput {
  title: String
  body: Json
  coverImage: Json
  payments: PaymentUpdateManyWithoutStoryDataInput
  draftStory: StoryUpdateOneWithoutDraftDataInput
  publicStory: StoryUpdateOneWithoutPublicDataInput
}

input StoryDataUpdateOneWithoutDraftStoryInput {
  create: StoryDataCreateWithoutDraftStoryInput
  connect: StoryDataWhereUniqueInput
  delete: Boolean
  update: StoryDataUpdateWithoutDraftStoryDataInput
  upsert: StoryDataUpsertWithoutDraftStoryInput
}

input StoryDataUpdateOneWithoutPaymentsInput {
  create: StoryDataCreateWithoutPaymentsInput
  connect: StoryDataWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StoryDataUpdateWithoutPaymentsDataInput
  upsert: StoryDataUpsertWithoutPaymentsInput
}

input StoryDataUpdateOneWithoutPublicStoryInput {
  create: StoryDataCreateWithoutPublicStoryInput
  connect: StoryDataWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StoryDataUpdateWithoutPublicStoryDataInput
  upsert: StoryDataUpsertWithoutPublicStoryInput
}

input StoryDataUpdateWithoutDraftStoryDataInput {
  title: String
  body: Json
  coverImage: Json
  payments: PaymentUpdateManyWithoutStoryDataInput
  publicStory: StoryUpdateOneWithoutPublicDataInput
}

input StoryDataUpdateWithoutPaymentsDataInput {
  title: String
  body: Json
  coverImage: Json
  draftStory: StoryUpdateOneWithoutDraftDataInput
  publicStory: StoryUpdateOneWithoutPublicDataInput
}

input StoryDataUpdateWithoutPublicStoryDataInput {
  title: String
  body: Json
  coverImage: Json
  payments: PaymentUpdateManyWithoutStoryDataInput
  draftStory: StoryUpdateOneWithoutDraftDataInput
}

input StoryDataUpsertWithoutDraftStoryInput {
  update: StoryDataUpdateWithoutDraftStoryDataInput!
  create: StoryDataCreateWithoutDraftStoryInput!
}

input StoryDataUpsertWithoutPaymentsInput {
  update: StoryDataUpdateWithoutPaymentsDataInput!
  create: StoryDataCreateWithoutPaymentsInput!
}

input StoryDataUpsertWithoutPublicStoryInput {
  update: StoryDataUpdateWithoutPublicStoryDataInput!
  create: StoryDataCreateWithoutPublicStoryInput!
}

input StoryDataWhereInput {
  """Logical AND on all given filters."""
  AND: [StoryDataWhereInput!]

  """Logical OR on all given filters."""
  OR: [StoryDataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StoryDataWhereInput!]
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
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  draftStory: StoryWhereInput
  publicStory: StoryWhereInput
}

input StoryDataWhereUniqueInput {
  id: ID
}

"""An edge in a connection."""
type StoryEdge {
  """The item at the end of the edge."""
  node: Story!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StoryOrderByInput {
  id_ASC
  id_DESC
  isPublished_ASC
  isPublished_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StoryPreviousValues {
  id: ID!
  isPublished: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StorySubscriptionPayload {
  mutation: MutationType!
  node: Story
  updatedFields: [String!]
  previousValues: StoryPreviousValues
}

input StorySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StorySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StorySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StorySubscriptionWhereInput!]

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
  node: StoryWhereInput
}

input StoryUpdateInput {
  isPublished: Boolean
  account: AccountUpdateOneWithoutStoriesInput
  draftData: StoryDataUpdateOneWithoutDraftStoryInput
  publicData: StoryDataUpdateOneWithoutPublicStoryInput
}

input StoryUpdateManyWithoutAccountInput {
  create: [StoryCreateWithoutAccountInput!]
  connect: [StoryWhereUniqueInput!]
  disconnect: [StoryWhereUniqueInput!]
  delete: [StoryWhereUniqueInput!]
  update: [StoryUpdateWithWhereUniqueWithoutAccountInput!]
  upsert: [StoryUpsertWithWhereUniqueWithoutAccountInput!]
}

input StoryUpdateOneWithoutDraftDataInput {
  create: StoryCreateWithoutDraftDataInput
  connect: StoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StoryUpdateWithoutDraftDataDataInput
  upsert: StoryUpsertWithoutDraftDataInput
}

input StoryUpdateOneWithoutPublicDataInput {
  create: StoryCreateWithoutPublicDataInput
  connect: StoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StoryUpdateWithoutPublicDataDataInput
  upsert: StoryUpsertWithoutPublicDataInput
}

input StoryUpdateWithoutAccountDataInput {
  isPublished: Boolean
  draftData: StoryDataUpdateOneWithoutDraftStoryInput
  publicData: StoryDataUpdateOneWithoutPublicStoryInput
}

input StoryUpdateWithoutDraftDataDataInput {
  isPublished: Boolean
  account: AccountUpdateOneWithoutStoriesInput
  publicData: StoryDataUpdateOneWithoutPublicStoryInput
}

input StoryUpdateWithoutPublicDataDataInput {
  isPublished: Boolean
  account: AccountUpdateOneWithoutStoriesInput
  draftData: StoryDataUpdateOneWithoutDraftStoryInput
}

input StoryUpdateWithWhereUniqueWithoutAccountInput {
  where: StoryWhereUniqueInput!
  data: StoryUpdateWithoutAccountDataInput!
}

input StoryUpsertWithoutDraftDataInput {
  update: StoryUpdateWithoutDraftDataDataInput!
  create: StoryCreateWithoutDraftDataInput!
}

input StoryUpsertWithoutPublicDataInput {
  update: StoryUpdateWithoutPublicDataDataInput!
  create: StoryCreateWithoutPublicDataInput!
}

input StoryUpsertWithWhereUniqueWithoutAccountInput {
  where: StoryWhereUniqueInput!
  update: StoryUpdateWithoutAccountDataInput!
  create: StoryCreateWithoutAccountInput!
}

input StoryWhereInput {
  """Logical AND on all given filters."""
  AND: [StoryWhereInput!]

  """Logical OR on all given filters."""
  OR: [StoryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StoryWhereInput!]
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
  isPublished: Boolean

  """All values that are not equal to given value."""
  isPublished_not: Boolean
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  account: AccountWhereInput
  draftData: StoryDataWhereInput
  publicData: StoryDataWhereInput
}

input StoryWhereUniqueInput {
  id: ID
}

type Subscription {
  team(where: TeamSubscriptionWhereInput): TeamSubscriptionPayload
  teamMember(where: TeamMemberSubscriptionWhereInput): TeamMemberSubscriptionPayload
  account(where: AccountSubscriptionWhereInput): AccountSubscriptionPayload
  payment(where: PaymentSubscriptionWhereInput): PaymentSubscriptionPayload
  peer(where: PeerSubscriptionWhereInput): PeerSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  peerCategory(where: PeerCategorySubscriptionWhereInput): PeerCategorySubscriptionPayload
  story(where: StorySubscriptionWhereInput): StorySubscriptionPayload
  storyData(where: StoryDataSubscriptionWhereInput): StoryDataSubscriptionPayload
  onboarding(where: OnboardingSubscriptionWhereInput): OnboardingSubscriptionPayload
  mxUser(where: MxUserSubscriptionWhereInput): MxUserSubscriptionPayload
  mxMember(where: MxMemberSubscriptionWhereInput): MxMemberSubscriptionPayload
  teamInvite(where: TeamInviteSubscriptionWhereInput): TeamInviteSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
}

type Team implements Node {
  id: ID!
  name: String!
  nameNormalized: String
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account!]
  members(where: TeamMemberWhereInput, orderBy: TeamMemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember!]
  invites(where: TeamInviteWhereInput, orderBy: TeamInviteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TeamInvite!]
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
  nameNormalized: String
  accounts: AccountCreateManyWithoutTeamInput
  members: TeamMemberCreateManyWithoutTeamInput
  invites: TeamInviteCreateManyWithoutTeamInput
}

input TeamCreateOneWithoutAccountsInput {
  create: TeamCreateWithoutAccountsInput
  connect: TeamWhereUniqueInput
}

input TeamCreateOneWithoutInvitesInput {
  create: TeamCreateWithoutInvitesInput
  connect: TeamWhereUniqueInput
}

input TeamCreateOneWithoutMembersInput {
  create: TeamCreateWithoutMembersInput
  connect: TeamWhereUniqueInput
}

input TeamCreateWithoutAccountsInput {
  name: String!
  nameNormalized: String
  members: TeamMemberCreateManyWithoutTeamInput
  invites: TeamInviteCreateManyWithoutTeamInput
}

input TeamCreateWithoutInvitesInput {
  name: String!
  nameNormalized: String
  accounts: AccountCreateManyWithoutTeamInput
  members: TeamMemberCreateManyWithoutTeamInput
}

input TeamCreateWithoutMembersInput {
  name: String!
  nameNormalized: String
  accounts: AccountCreateManyWithoutTeamInput
  invites: TeamInviteCreateManyWithoutTeamInput
}

"""An edge in a connection."""
type TeamEdge {
  """The item at the end of the edge."""
  node: Team!

  """A cursor for use in pagination."""
  cursor: String!
}

type TeamInvite implements Node {
  id: ID!
  email: String!
  role: TeamMemberRole!
  note: String
  team(where: TeamWhereInput): Team!
  inviter(where: UserWhereInput): User!
}

"""A connection to a list of items."""
type TeamInviteConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TeamInviteEdge]!
  aggregate: AggregateTeamInvite!
}

input TeamInviteCreateInput {
  email: String!
  role: TeamMemberRole!
  note: String
  team: TeamCreateOneWithoutInvitesInput!
  inviter: UserCreateOneInput!
}

input TeamInviteCreateManyWithoutTeamInput {
  create: [TeamInviteCreateWithoutTeamInput!]
  connect: [TeamInviteWhereUniqueInput!]
}

input TeamInviteCreateWithoutTeamInput {
  email: String!
  role: TeamMemberRole!
  note: String
  inviter: UserCreateOneInput!
}

"""An edge in a connection."""
type TeamInviteEdge {
  """The item at the end of the edge."""
  node: TeamInvite!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TeamInviteOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  role_ASC
  role_DESC
  note_ASC
  note_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamInvitePreviousValues {
  id: ID!
  email: String!
  role: TeamMemberRole!
  note: String
}

type TeamInviteSubscriptionPayload {
  mutation: MutationType!
  node: TeamInvite
  updatedFields: [String!]
  previousValues: TeamInvitePreviousValues
}

input TeamInviteSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamInviteSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamInviteSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamInviteSubscriptionWhereInput!]

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
  node: TeamInviteWhereInput
}

input TeamInviteUpdateInput {
  email: String
  role: TeamMemberRole
  note: String
  team: TeamUpdateOneWithoutInvitesInput
  inviter: UserUpdateOneInput
}

input TeamInviteUpdateManyWithoutTeamInput {
  create: [TeamInviteCreateWithoutTeamInput!]
  connect: [TeamInviteWhereUniqueInput!]
  disconnect: [TeamInviteWhereUniqueInput!]
  delete: [TeamInviteWhereUniqueInput!]
  update: [TeamInviteUpdateWithWhereUniqueWithoutTeamInput!]
  upsert: [TeamInviteUpsertWithWhereUniqueWithoutTeamInput!]
}

input TeamInviteUpdateWithoutTeamDataInput {
  email: String
  role: TeamMemberRole
  note: String
  inviter: UserUpdateOneInput
}

input TeamInviteUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamInviteWhereUniqueInput!
  data: TeamInviteUpdateWithoutTeamDataInput!
}

input TeamInviteUpsertWithWhereUniqueWithoutTeamInput {
  where: TeamInviteWhereUniqueInput!
  update: TeamInviteUpdateWithoutTeamDataInput!
  create: TeamInviteCreateWithoutTeamInput!
}

input TeamInviteWhereInput {
  """Logical AND on all given filters."""
  AND: [TeamInviteWhereInput!]

  """Logical OR on all given filters."""
  OR: [TeamInviteWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TeamInviteWhereInput!]
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
  role: TeamMemberRole

  """All values that are not equal to given value."""
  role_not: TeamMemberRole

  """All values that are contained in given list."""
  role_in: [TeamMemberRole!]

  """All values that are not contained in given list."""
  role_not_in: [TeamMemberRole!]
  note: String

  """All values that are not equal to given value."""
  note_not: String

  """All values that are contained in given list."""
  note_in: [String!]

  """All values that are not contained in given list."""
  note_not_in: [String!]

  """All values less than the given value."""
  note_lt: String

  """All values less than or equal the given value."""
  note_lte: String

  """All values greater than the given value."""
  note_gt: String

  """All values greater than or equal the given value."""
  note_gte: String

  """All values containing the given string."""
  note_contains: String

  """All values not containing the given string."""
  note_not_contains: String

  """All values starting with the given string."""
  note_starts_with: String

  """All values not starting with the given string."""
  note_not_starts_with: String

  """All values ending with the given string."""
  note_ends_with: String

  """All values not ending with the given string."""
  note_not_ends_with: String
  team: TeamWhereInput
  inviter: UserWhereInput
}

input TeamInviteWhereUniqueInput {
  id: ID
}

type TeamMember implements Node {
  id: ID!
  team(where: TeamWhereInput): Team!
  user(where: UserWhereInput): User!
  role: TeamMemberRole!
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
  team: TeamCreateOneWithoutMembersInput!
  user: UserCreateOneWithoutTeamsInput!
}

input TeamMemberCreateManyWithoutTeamInput {
  create: [TeamMemberCreateWithoutTeamInput!]
  connect: [TeamMemberWhereUniqueInput!]
}

input TeamMemberCreateManyWithoutUserInput {
  create: [TeamMemberCreateWithoutUserInput!]
  connect: [TeamMemberWhereUniqueInput!]
}

input TeamMemberCreateWithoutTeamInput {
  role: TeamMemberRole
  user: UserCreateOneWithoutTeamsInput!
}

input TeamMemberCreateWithoutUserInput {
  role: TeamMemberRole
  team: TeamCreateOneWithoutMembersInput!
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamMemberPreviousValues {
  id: ID!
  role: TeamMemberRole!
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
  team: TeamUpdateOneWithoutMembersInput
  user: UserUpdateOneWithoutTeamsInput
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

input TeamMemberUpdateWithoutTeamDataInput {
  role: TeamMemberRole
  user: UserUpdateOneWithoutTeamsInput
}

input TeamMemberUpdateWithoutUserDataInput {
  role: TeamMemberRole
  team: TeamUpdateOneWithoutMembersInput
}

input TeamMemberUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput!
  data: TeamMemberUpdateWithoutTeamDataInput!
}

input TeamMemberUpdateWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput!
  data: TeamMemberUpdateWithoutUserDataInput!
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
  team: TeamWhereInput
  user: UserWhereInput
}

input TeamMemberWhereUniqueInput {
  id: ID
}

enum TeamOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  nameNormalized_ASC
  nameNormalized_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TeamPreviousValues {
  id: ID!
  name: String!
  nameNormalized: String
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
  nameNormalized: String
  accounts: AccountUpdateManyWithoutTeamInput
  members: TeamMemberUpdateManyWithoutTeamInput
  invites: TeamInviteUpdateManyWithoutTeamInput
}

input TeamUpdateOneWithoutAccountsInput {
  create: TeamCreateWithoutAccountsInput
  connect: TeamWhereUniqueInput
  delete: Boolean
  update: TeamUpdateWithoutAccountsDataInput
  upsert: TeamUpsertWithoutAccountsInput
}

input TeamUpdateOneWithoutInvitesInput {
  create: TeamCreateWithoutInvitesInput
  connect: TeamWhereUniqueInput
  delete: Boolean
  update: TeamUpdateWithoutInvitesDataInput
  upsert: TeamUpsertWithoutInvitesInput
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
  nameNormalized: String
  members: TeamMemberUpdateManyWithoutTeamInput
  invites: TeamInviteUpdateManyWithoutTeamInput
}

input TeamUpdateWithoutInvitesDataInput {
  name: String
  nameNormalized: String
  accounts: AccountUpdateManyWithoutTeamInput
  members: TeamMemberUpdateManyWithoutTeamInput
}

input TeamUpdateWithoutMembersDataInput {
  name: String
  nameNormalized: String
  accounts: AccountUpdateManyWithoutTeamInput
  invites: TeamInviteUpdateManyWithoutTeamInput
}

input TeamUpsertWithoutAccountsInput {
  update: TeamUpdateWithoutAccountsDataInput!
  create: TeamCreateWithoutAccountsInput!
}

input TeamUpsertWithoutInvitesInput {
  update: TeamUpdateWithoutInvitesDataInput!
  create: TeamCreateWithoutInvitesInput!
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
  nameNormalized: String

  """All values that are not equal to given value."""
  nameNormalized_not: String

  """All values that are contained in given list."""
  nameNormalized_in: [String!]

  """All values that are not contained in given list."""
  nameNormalized_not_in: [String!]

  """All values less than the given value."""
  nameNormalized_lt: String

  """All values less than or equal the given value."""
  nameNormalized_lte: String

  """All values greater than the given value."""
  nameNormalized_gt: String

  """All values greater than or equal the given value."""
  nameNormalized_gte: String

  """All values containing the given string."""
  nameNormalized_contains: String

  """All values not containing the given string."""
  nameNormalized_not_contains: String

  """All values starting with the given string."""
  nameNormalized_starts_with: String

  """All values not starting with the given string."""
  nameNormalized_not_starts_with: String

  """All values ending with the given string."""
  nameNormalized_ends_with: String

  """All values not ending with the given string."""
  nameNormalized_not_ends_with: String
  accounts_every: AccountWhereInput
  accounts_some: AccountWhereInput
  accounts_none: AccountWhereInput
  members_every: TeamMemberWhereInput
  members_some: TeamMemberWhereInput
  members_none: TeamMemberWhereInput
  invites_every: TeamInviteWhereInput
  invites_some: TeamInviteWhereInput
  invites_none: TeamInviteWhereInput
}

input TeamWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String!
  emailNormalized: String
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
  emailNormalized: String
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
  emailNormalized: String
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
  emailNormalized_ASC
  emailNormalized_DESC
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
  emailNormalized: String
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
  emailNormalized: String
  firstName: String
  lastName: String
  passwordHash: String
  teams: TeamMemberUpdateManyWithoutUserInput
}

input UserUpdateInput {
  email: String
  emailNormalized: String
  firstName: String
  lastName: String
  passwordHash: String
  teams: TeamMemberUpdateManyWithoutUserInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
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
  emailNormalized: String
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
  emailNormalized: String

  """All values that are not equal to given value."""
  emailNormalized_not: String

  """All values that are contained in given list."""
  emailNormalized_in: [String!]

  """All values that are not contained in given list."""
  emailNormalized_not_in: [String!]

  """All values less than the given value."""
  emailNormalized_lt: String

  """All values less than or equal the given value."""
  emailNormalized_lte: String

  """All values greater than the given value."""
  emailNormalized_gt: String

  """All values greater than or equal the given value."""
  emailNormalized_gte: String

  """All values containing the given string."""
  emailNormalized_contains: String

  """All values not containing the given string."""
  emailNormalized_not_contains: String

  """All values starting with the given string."""
  emailNormalized_starts_with: String

  """All values not starting with the given string."""
  emailNormalized_not_starts_with: String

  """All values ending with the given string."""
  emailNormalized_ends_with: String

  """All values not ending with the given string."""
  emailNormalized_not_ends_with: String
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

export type PeerOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'nameNormalized_ASC' |
  'nameNormalized_DESC' |
  'total_ASC' |
  'total_DESC' |
  'revenue_ASC' |
  'revenue_DESC' |
  'spendings_ASC' |
  'spendings_DESC' |
  'lastPaymentDate_ASC' |
  'lastPaymentDate_DESC' |
  'paymentCount_ASC' |
  'paymentCount_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TeamOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'nameNormalized_ASC' |
  'nameNormalized_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TeamMemberOrderByInput =   'id_ASC' |
  'id_DESC' |
  'role_ASC' |
  'role_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'emailNormalized_ASC' |
  'emailNormalized_DESC' |
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

export type CommentOrderByInput =   'id_ASC' |
  'id_DESC' |
  'body_ASC' |
  'body_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MxMemberOrderByInput =   'id_ASC' |
  'id_DESC' |
  'mxGuid_ASC' |
  'mxGuid_DESC' |
  'institutionCode_ASC' |
  'institutionCode_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PaymentOrderByInput =   'id_ASC' |
  'id_DESC' |
  'postedOn_ASC' |
  'postedOn_DESC' |
  'amount_ASC' |
  'amount_DESC' |
  'amountAbs_ASC' |
  'amountAbs_DESC' |
  'peerName_ASC' |
  'peerName_DESC' |
  'peerNameNormalized_ASC' |
  'peerNameNormalized_DESC' |
  'description_ASC' |
  'description_DESC' |
  'descriptionNormalized_ASC' |
  'descriptionNormalized_DESC' |
  'rawData_ASC' |
  'rawData_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type StoryDataOrderByInput =   'id_ASC' |
  'id_DESC' |
  'title_ASC' |
  'title_DESC' |
  'body_ASC' |
  'body_DESC' |
  'coverImage_ASC' |
  'coverImage_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type AccountOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'nameNormalized_ASC' |
  'nameNormalized_DESC' |
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

export type CategoryOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'nameNormalized_ASC' |
  'nameNormalized_DESC' |
  'color_ASC' |
  'color_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PeerCategoryOrderByInput =   'id_ASC' |
  'id_DESC' |
  'count_ASC' |
  'count_DESC' |
  'total_ASC' |
  'total_DESC' |
  'revenue_ASC' |
  'revenue_DESC' |
  'spendings_ASC' |
  'spendings_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TeamMemberRole =   'ADMIN' |
  'MANAGER' |
  'MEMBER'

export type TeamInviteOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'role_ASC' |
  'role_DESC' |
  'note_ASC' |
  'note_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OnboardingOrderByInput =   'id_ASC' |
  'id_DESC' |
  'step_ASC' |
  'step_DESC' |
  'institution_ASC' |
  'institution_DESC' |
  'credentials_ASC' |
  'credentials_DESC' |
  'accounts_ASC' |
  'accounts_DESC' |
  'account_ASC' |
  'account_DESC' |
  'categories_ASC' |
  'categories_DESC' |
  'mfa_ASC' |
  'mfa_DESC' |
  'team_ASC' |
  'team_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MxUserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'mxGuid_ASC' |
  'mxGuid_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type StoryOrderByInput =   'id_ASC' |
  'id_DESC' |
  'isPublished_ASC' |
  'isPublished_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export interface MxMemberCreateManyWithoutUserInput {
  create?: MxMemberCreateWithoutUserInput[] | MxMemberCreateWithoutUserInput
  connect?: MxMemberWhereUniqueInput[] | MxMemberWhereUniqueInput
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
  nameNormalized?: String
  nameNormalized_not?: String
  nameNormalized_in?: String[] | String
  nameNormalized_not_in?: String[] | String
  nameNormalized_lt?: String
  nameNormalized_lte?: String
  nameNormalized_gt?: String
  nameNormalized_gte?: String
  nameNormalized_contains?: String
  nameNormalized_not_contains?: String
  nameNormalized_starts_with?: String
  nameNormalized_not_starts_with?: String
  nameNormalized_ends_with?: String
  nameNormalized_not_ends_with?: String
  accounts_every?: AccountWhereInput
  accounts_some?: AccountWhereInput
  accounts_none?: AccountWhereInput
  members_every?: TeamMemberWhereInput
  members_some?: TeamMemberWhereInput
  members_none?: TeamMemberWhereInput
  invites_every?: TeamInviteWhereInput
  invites_some?: TeamInviteWhereInput
  invites_none?: TeamInviteWhereInput
}

export interface AccountUpdateWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput
  data: AccountUpdateWithoutTeamDataInput
}

export interface TeamInviteWhereInput {
  AND?: TeamInviteWhereInput[] | TeamInviteWhereInput
  OR?: TeamInviteWhereInput[] | TeamInviteWhereInput
  NOT?: TeamInviteWhereInput[] | TeamInviteWhereInput
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
  role?: TeamMemberRole
  role_not?: TeamMemberRole
  role_in?: TeamMemberRole[] | TeamMemberRole
  role_not_in?: TeamMemberRole[] | TeamMemberRole
  note?: String
  note_not?: String
  note_in?: String[] | String
  note_not_in?: String[] | String
  note_lt?: String
  note_lte?: String
  note_gt?: String
  note_gte?: String
  note_contains?: String
  note_not_contains?: String
  note_starts_with?: String
  note_not_starts_with?: String
  note_ends_with?: String
  note_not_ends_with?: String
  team?: TeamWhereInput
  inviter?: UserWhereInput
}

export interface AccountCreateWithoutPaymentsInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  peers?: PeerCreateManyWithoutAccountInput
  stories?: StoryCreateManyWithoutAccountInput
}

export interface StoryDataUpdateWithoutPaymentsDataInput {
  title?: String
  body?: Json
  coverImage?: Json
  draftStory?: StoryUpdateOneWithoutDraftDataInput
  publicStory?: StoryUpdateOneWithoutPublicDataInput
}

export interface StoryCreateManyWithoutAccountInput {
  create?: StoryCreateWithoutAccountInput[] | StoryCreateWithoutAccountInput
  connect?: StoryWhereUniqueInput[] | StoryWhereUniqueInput
}

export interface AccountUpdateWithoutTeamDataInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryUpdateManyWithoutAccountInput
  payments?: PaymentUpdateManyWithoutAccountInput
  peers?: PeerUpdateManyWithoutAccountInput
  stories?: StoryUpdateManyWithoutAccountInput
}

export interface StoryCreateWithoutAccountInput {
  isPublished?: Boolean
  draftData: StoryDataCreateOneWithoutDraftStoryInput
  publicData?: StoryDataCreateOneWithoutPublicStoryInput
}

export interface StoryWhereInput {
  AND?: StoryWhereInput[] | StoryWhereInput
  OR?: StoryWhereInput[] | StoryWhereInput
  NOT?: StoryWhereInput[] | StoryWhereInput
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
  isPublished?: Boolean
  isPublished_not?: Boolean
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  account?: AccountWhereInput
  draftData?: StoryDataWhereInput
  publicData?: StoryDataWhereInput
}

export interface StoryDataCreateOneWithoutDraftStoryInput {
  create?: StoryDataCreateWithoutDraftStoryInput
  connect?: StoryDataWhereUniqueInput
}

export interface StoryDataWhereInput {
  AND?: StoryDataWhereInput[] | StoryDataWhereInput
  OR?: StoryDataWhereInput[] | StoryDataWhereInput
  NOT?: StoryDataWhereInput[] | StoryDataWhereInput
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
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  payments_every?: PaymentWhereInput
  payments_some?: PaymentWhereInput
  payments_none?: PaymentWhereInput
  draftStory?: StoryWhereInput
  publicStory?: StoryWhereInput
}

export interface StoryDataCreateWithoutDraftStoryInput {
  title: String
  body: Json
  coverImage?: Json
  payments?: PaymentCreateManyWithoutStoryDataInput
  publicStory?: StoryCreateOneWithoutPublicDataInput
}

export interface MxMemberSubscriptionWhereInput {
  AND?: MxMemberSubscriptionWhereInput[] | MxMemberSubscriptionWhereInput
  OR?: MxMemberSubscriptionWhereInput[] | MxMemberSubscriptionWhereInput
  NOT?: MxMemberSubscriptionWhereInput[] | MxMemberSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MxMemberWhereInput
}

export interface PaymentCreateManyWithoutStoryDataInput {
  create?: PaymentCreateWithoutStoryDataInput[] | PaymentCreateWithoutStoryDataInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
}

export interface MxUserSubscriptionWhereInput {
  AND?: MxUserSubscriptionWhereInput[] | MxUserSubscriptionWhereInput
  OR?: MxUserSubscriptionWhereInput[] | MxUserSubscriptionWhereInput
  NOT?: MxUserSubscriptionWhereInput[] | MxUserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MxUserWhereInput
}

export interface PaymentCreateWithoutStoryDataInput {
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  peer?: PeerCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
}

export interface OnboardingSubscriptionWhereInput {
  AND?: OnboardingSubscriptionWhereInput[] | OnboardingSubscriptionWhereInput
  OR?: OnboardingSubscriptionWhereInput[] | OnboardingSubscriptionWhereInput
  NOT?: OnboardingSubscriptionWhereInput[] | OnboardingSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OnboardingWhereInput
}

export interface CommentCreateManyWithoutPaymentInput {
  create?: CommentCreateWithoutPaymentInput[] | CommentCreateWithoutPaymentInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
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

export interface CommentCreateWithoutPaymentInput {
  body: Json
  user?: UserCreateOneInput
}

export interface PeerCategorySubscriptionWhereInput {
  AND?: PeerCategorySubscriptionWhereInput[] | PeerCategorySubscriptionWhereInput
  OR?: PeerCategorySubscriptionWhereInput[] | PeerCategorySubscriptionWhereInput
  NOT?: PeerCategorySubscriptionWhereInput[] | PeerCategorySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PeerCategoryWhereInput
}

export interface StoryCreateOneWithoutPublicDataInput {
  create?: StoryCreateWithoutPublicDataInput
  connect?: StoryWhereUniqueInput
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

export interface StoryCreateWithoutPublicDataInput {
  isPublished?: Boolean
  account: AccountCreateOneWithoutStoriesInput
  draftData: StoryDataCreateOneWithoutDraftStoryInput
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

export interface AccountCreateOneWithoutStoriesInput {
  create?: AccountCreateWithoutStoriesInput
  connect?: AccountWhereUniqueInput
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

export interface AccountCreateWithoutStoriesInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryCreateManyWithoutAccountInput
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  peers?: PeerCreateManyWithoutAccountInput
}

export interface OnboardingWhereInput {
  AND?: OnboardingWhereInput[] | OnboardingWhereInput
  OR?: OnboardingWhereInput[] | OnboardingWhereInput
  NOT?: OnboardingWhereInput[] | OnboardingWhereInput
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
  step?: String
  step_not?: String
  step_in?: String[] | String
  step_not_in?: String[] | String
  step_lt?: String
  step_lte?: String
  step_gt?: String
  step_gte?: String
  step_contains?: String
  step_not_contains?: String
  step_starts_with?: String
  step_not_starts_with?: String
  step_ends_with?: String
  step_not_ends_with?: String
  user?: UserWhereInput
  member?: MxMemberWhereInput
}

export interface StoryDataCreateOneWithoutPublicStoryInput {
  create?: StoryDataCreateWithoutPublicStoryInput
  connect?: StoryDataWhereUniqueInput
}

export interface MxUserWhereInput {
  AND?: MxUserWhereInput[] | MxUserWhereInput
  OR?: MxUserWhereInput[] | MxUserWhereInput
  NOT?: MxUserWhereInput[] | MxUserWhereInput
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
  mxGuid?: String
  mxGuid_not?: String
  mxGuid_in?: String[] | String
  mxGuid_not_in?: String[] | String
  mxGuid_lt?: String
  mxGuid_lte?: String
  mxGuid_gt?: String
  mxGuid_gte?: String
  mxGuid_contains?: String
  mxGuid_not_contains?: String
  mxGuid_starts_with?: String
  mxGuid_not_starts_with?: String
  mxGuid_ends_with?: String
  mxGuid_not_ends_with?: String
  members_every?: MxMemberWhereInput
  members_some?: MxMemberWhereInput
  members_none?: MxMemberWhereInput
}

export interface StoryDataCreateWithoutPublicStoryInput {
  title: String
  body: Json
  coverImage?: Json
  payments?: PaymentCreateManyWithoutStoryDataInput
  draftStory?: StoryCreateOneWithoutDraftDataInput
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

export interface StoryCreateOneWithoutDraftDataInput {
  create?: StoryCreateWithoutDraftDataInput
  connect?: StoryWhereUniqueInput
}

export interface UserUpdateInput {
  email?: String
  emailNormalized?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
  teams?: TeamMemberUpdateManyWithoutUserInput
}

export interface StoryCreateWithoutDraftDataInput {
  isPublished?: Boolean
  account: AccountCreateOneWithoutStoriesInput
  publicData?: StoryDataCreateOneWithoutPublicStoryInput
}

export interface TeamUpsertWithoutInvitesInput {
  update: TeamUpdateWithoutInvitesDataInput
  create: TeamCreateWithoutInvitesInput
}

export interface StoryDataCreateOneWithoutPaymentsInput {
  create?: StoryDataCreateWithoutPaymentsInput
  connect?: StoryDataWhereUniqueInput
}

export interface TeamWhereUniqueInput {
  id?: ID_Input
}

export interface StoryDataCreateWithoutPaymentsInput {
  title: String
  body: Json
  coverImage?: Json
  draftStory?: StoryCreateOneWithoutDraftDataInput
  publicStory?: StoryCreateOneWithoutPublicDataInput
}

export interface AccountWhereUniqueInput {
  id?: ID_Input
}

export interface PeerCategoryCreateManyWithoutPeerInput {
  create?: PeerCategoryCreateWithoutPeerInput[] | PeerCategoryCreateWithoutPeerInput
  connect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
}

export interface PeerWhereUniqueInput {
  id?: ID_Input
}

export interface PeerCategoryCreateWithoutPeerInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  category: CategoryCreateOneWithoutPeersInput
}

export interface PeerCategoryWhereUniqueInput {
  id?: ID_Input
}

export interface CategoryCreateOneWithoutPeersInput {
  create?: CategoryCreateWithoutPeersInput
  connect?: CategoryWhereUniqueInput
}

export interface StoryDataWhereUniqueInput {
  id?: ID_Input
}

export interface CategoryCreateWithoutPeersInput {
  name: String
  nameNormalized?: String
  color: String
  account: AccountCreateOneWithoutCategoriesInput
}

export interface MxUserWhereUniqueInput {
  id?: ID_Input
}

export interface TeamMemberCreateInput {
  role?: TeamMemberRole
  team: TeamCreateOneWithoutMembersInput
  user: UserCreateOneWithoutTeamsInput
}

export interface TeamInviteWhereUniqueInput {
  id?: ID_Input
}

export interface AccountCreateInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryCreateManyWithoutAccountInput
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  peers?: PeerCreateManyWithoutAccountInput
  stories?: StoryCreateManyWithoutAccountInput
}

export interface CategoryWhereUniqueInput {
  id?: ID_Input
}

export interface PaymentCreateInput {
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  peer?: PeerCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
  storyData?: StoryDataCreateOneWithoutPaymentsInput
}

export interface TeamUpdateOneWithoutInvitesInput {
  create?: TeamCreateWithoutInvitesInput
  connect?: TeamWhereUniqueInput
  delete?: Boolean
  update?: TeamUpdateWithoutInvitesDataInput
  upsert?: TeamUpsertWithoutInvitesInput
}

export interface PeerCreateInput {
  name: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account: AccountCreateOneWithoutPeersInput
  payments?: PaymentCreateManyWithoutPeerInput
  category?: CategoryCreateOneInput
  categories?: PeerCategoryCreateManyWithoutPeerInput
}

export interface MxMemberUpdateInput {
  mxGuid?: String
  institutionCode?: String
  user?: MxUserUpdateOneWithoutMembersInput
  onboarding?: OnboardingUpdateOneWithoutMemberInput
}

export interface CommentCreateInput {
  body: Json
  payment: PaymentCreateOneWithoutCommentsInput
  user?: UserCreateOneInput
}

export interface OnboardingUpsertWithoutMemberInput {
  update: OnboardingUpdateWithoutMemberDataInput
  create: OnboardingCreateWithoutMemberInput
}

export interface PaymentCreateOneWithoutCommentsInput {
  create?: PaymentCreateWithoutCommentsInput
  connect?: PaymentWhereUniqueInput
}

export interface OnboardingUpdateOneWithoutMemberInput {
  create?: OnboardingCreateWithoutMemberInput
  connect?: OnboardingWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: OnboardingUpdateWithoutMemberDataInput
  upsert?: OnboardingUpsertWithoutMemberInput
}

export interface PaymentCreateWithoutCommentsInput {
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  peer?: PeerCreateOneWithoutPaymentsInput
  category?: CategoryCreateOneInput
  storyData?: StoryDataCreateOneWithoutPaymentsInput
}

export interface MxMemberUpdateWithWhereUniqueWithoutUserInput {
  where: MxMemberWhereUniqueInput
  data: MxMemberUpdateWithoutUserDataInput
}

export interface PeerCategoryCreateInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  peer: PeerCreateOneWithoutCategoriesInput
  category: CategoryCreateOneWithoutPeersInput
}

export interface MxUserUpdateInput {
  mxGuid?: String
  members?: MxMemberUpdateManyWithoutUserInput
}

export interface StoryCreateInput {
  isPublished?: Boolean
  account: AccountCreateOneWithoutStoriesInput
  draftData: StoryDataCreateOneWithoutDraftStoryInput
  publicData?: StoryDataCreateOneWithoutPublicStoryInput
}

export interface MxUserUpsertWithoutMembersInput {
  update: MxUserUpdateWithoutMembersDataInput
  create: MxUserCreateWithoutMembersInput
}

export interface StoryDataCreateInput {
  title: String
  body: Json
  coverImage?: Json
  payments?: PaymentCreateManyWithoutStoryDataInput
  draftStory?: StoryCreateOneWithoutDraftDataInput
  publicStory?: StoryCreateOneWithoutPublicDataInput
}

export interface MxUserUpdateOneWithoutMembersInput {
  create?: MxUserCreateWithoutMembersInput
  connect?: MxUserWhereUniqueInput
  delete?: Boolean
  update?: MxUserUpdateWithoutMembersDataInput
  upsert?: MxUserUpsertWithoutMembersInput
}

export interface OnboardingCreateInput {
  step: String
  institution: Json
  credentials: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
  user: UserCreateOneInput
  member?: MxMemberCreateOneWithoutOnboardingInput
}

export interface MxMemberUpdateOneWithoutOnboardingInput {
  create?: MxMemberCreateWithoutOnboardingInput
  connect?: MxMemberWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: MxMemberUpdateWithoutOnboardingDataInput
  upsert?: MxMemberUpsertWithoutOnboardingInput
}

export interface MxMemberCreateOneWithoutOnboardingInput {
  create?: MxMemberCreateWithoutOnboardingInput
  connect?: MxMemberWhereUniqueInput
}

export interface StoryDataUpdateInput {
  title?: String
  body?: Json
  coverImage?: Json
  payments?: PaymentUpdateManyWithoutStoryDataInput
  draftStory?: StoryUpdateOneWithoutDraftDataInput
  publicStory?: StoryUpdateOneWithoutPublicDataInput
}

export interface MxMemberCreateWithoutOnboardingInput {
  mxGuid: String
  institutionCode: String
  user: MxUserCreateOneWithoutMembersInput
}

export interface PeerCategoryUpdateInput {
  count?: Int
  total?: Float
  revenue?: Float
  spendings?: Float
  peer?: PeerUpdateOneWithoutCategoriesInput
  category?: CategoryUpdateOneWithoutPeersInput
}

export interface MxUserCreateOneWithoutMembersInput {
  create?: MxUserCreateWithoutMembersInput
  connect?: MxUserWhereUniqueInput
}

export interface PaymentUpdateWithoutCommentsDataInput {
  postedOn?: DateTime
  amount?: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  peer?: PeerUpdateOneWithoutPaymentsInput
  category?: CategoryUpdateOneInput
  storyData?: StoryDataUpdateOneWithoutPaymentsInput
}

export interface MxUserCreateWithoutMembersInput {
  mxGuid: String
}

export interface CommentUpdateInput {
  body?: Json
  payment?: PaymentUpdateOneWithoutCommentsInput
  user?: UserUpdateOneInput
}

export interface MxUserCreateInput {
  mxGuid: String
  members?: MxMemberCreateManyWithoutUserInput
}

export interface PaymentUpdateInput {
  postedOn?: DateTime
  amount?: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  peer?: PeerUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
  storyData?: StoryDataUpdateOneWithoutPaymentsInput
}

export interface PeerCategoryUpdateManyWithoutPeerInput {
  create?: PeerCategoryCreateWithoutPeerInput[] | PeerCategoryCreateWithoutPeerInput
  connect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  disconnect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  delete?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  update?: PeerCategoryUpdateWithWhereUniqueWithoutPeerInput[] | PeerCategoryUpdateWithWhereUniqueWithoutPeerInput
  upsert?: PeerCategoryUpsertWithWhereUniqueWithoutPeerInput[] | PeerCategoryUpsertWithWhereUniqueWithoutPeerInput
}

export interface TeamMemberUpdateInput {
  role?: TeamMemberRole
  team?: TeamUpdateOneWithoutMembersInput
  user?: UserUpdateOneWithoutTeamsInput
}

export interface MxMemberCreateWithoutUserInput {
  mxGuid: String
  institutionCode: String
  onboarding?: OnboardingCreateOneWithoutMemberInput
}

export interface CategoryUpsertWithWhereUniqueWithoutAccountInput {
  where: CategoryWhereUniqueInput
  update: CategoryUpdateWithoutAccountDataInput
  create: CategoryCreateWithoutAccountInput
}

export interface OnboardingCreateOneWithoutMemberInput {
  create?: OnboardingCreateWithoutMemberInput
  connect?: OnboardingWhereUniqueInput
}

export interface PeerUpsertWithoutCategoriesInput {
  update: PeerUpdateWithoutCategoriesDataInput
  create: PeerCreateWithoutCategoriesInput
}

export interface OnboardingCreateWithoutMemberInput {
  step: String
  institution: Json
  credentials: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
  user: UserCreateOneInput
}

export interface PaymentUpsertWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutAccountDataInput
  create: PaymentCreateWithoutAccountInput
}

export interface MxMemberCreateInput {
  mxGuid: String
  institutionCode: String
  user: MxUserCreateOneWithoutMembersInput
  onboarding?: OnboardingCreateOneWithoutMemberInput
}

export interface CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput
  create: CategoryCreateInput
}

export interface TeamInviteCreateInput {
  email: String
  role: TeamMemberRole
  note?: String
  team: TeamCreateOneWithoutInvitesInput
  inviter: UserCreateOneInput
}

export interface PeerUpsertWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput
  update: PeerUpdateWithoutAccountDataInput
  create: PeerCreateWithoutAccountInput
}

export interface TeamCreateOneWithoutInvitesInput {
  create?: TeamCreateWithoutInvitesInput
  connect?: TeamWhereUniqueInput
}

export interface CategoryUpsertWithoutPeersInput {
  update: CategoryUpdateWithoutPeersDataInput
  create: CategoryCreateWithoutPeersInput
}

export interface TeamCreateWithoutInvitesInput {
  name: String
  nameNormalized?: String
  accounts?: AccountCreateManyWithoutTeamInput
  members?: TeamMemberCreateManyWithoutTeamInput
}

export interface CategoryUpdateOneWithoutPeersInput {
  create?: CategoryCreateWithoutPeersInput
  connect?: CategoryWhereUniqueInput
  delete?: Boolean
  update?: CategoryUpdateWithoutPeersDataInput
  upsert?: CategoryUpsertWithoutPeersInput
}

export interface TeamUpdateInput {
  name?: String
  nameNormalized?: String
  accounts?: AccountUpdateManyWithoutTeamInput
  members?: TeamMemberUpdateManyWithoutTeamInput
  invites?: TeamInviteUpdateManyWithoutTeamInput
}

export interface PeerCategoryUpdateWithWhereUniqueWithoutPeerInput {
  where: PeerCategoryWhereUniqueInput
  data: PeerCategoryUpdateWithoutPeerDataInput
}

export interface AccountUpdateManyWithoutTeamInput {
  create?: AccountCreateWithoutTeamInput[] | AccountCreateWithoutTeamInput
  connect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  disconnect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  delete?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
  update?: AccountUpdateWithWhereUniqueWithoutTeamInput[] | AccountUpdateWithWhereUniqueWithoutTeamInput
  upsert?: AccountUpsertWithWhereUniqueWithoutTeamInput[] | AccountUpsertWithWhereUniqueWithoutTeamInput
}

export interface AccountCreateManyWithoutTeamInput {
  create?: AccountCreateWithoutTeamInput[] | AccountCreateWithoutTeamInput
  connect?: AccountWhereUniqueInput[] | AccountWhereUniqueInput
}

export interface PaymentUpsertWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutPeerDataInput
  create: PaymentCreateWithoutPeerInput
}

export interface CategoryCreateManyWithoutAccountInput {
  create?: CategoryCreateWithoutAccountInput[] | CategoryCreateWithoutAccountInput
  connect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
}

export interface StoryDataUpsertWithoutPaymentsInput {
  update: StoryDataUpdateWithoutPaymentsDataInput
  create: StoryDataCreateWithoutPaymentsInput
}

export interface PeerCategoryCreateManyWithoutCategoryInput {
  create?: PeerCategoryCreateWithoutCategoryInput[] | PeerCategoryCreateWithoutCategoryInput
  connect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
}

export interface CategoryUpdateManyWithoutAccountInput {
  create?: CategoryCreateWithoutAccountInput[] | CategoryCreateWithoutAccountInput
  connect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  disconnect?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  delete?: CategoryWhereUniqueInput[] | CategoryWhereUniqueInput
  update?: CategoryUpdateWithWhereUniqueWithoutAccountInput[] | CategoryUpdateWithWhereUniqueWithoutAccountInput
  upsert?: CategoryUpsertWithWhereUniqueWithoutAccountInput[] | CategoryUpsertWithWhereUniqueWithoutAccountInput
}

export interface PeerCreateOneWithoutCategoriesInput {
  create?: PeerCreateWithoutCategoriesInput
  connect?: PeerWhereUniqueInput
}

export interface CategoryUpdateWithWhereUniqueWithoutAccountInput {
  where: CategoryWhereUniqueInput
  data: CategoryUpdateWithoutAccountDataInput
}

export interface AccountCreateOneWithoutPeersInput {
  create?: AccountCreateWithoutPeersInput
  connect?: AccountWhereUniqueInput
}

export interface CategoryUpdateWithoutAccountDataInput {
  name?: String
  nameNormalized?: String
  color?: String
  peers?: PeerCategoryUpdateManyWithoutCategoryInput
}

export interface PaymentCreateManyWithoutAccountInput {
  create?: PaymentCreateWithoutAccountInput[] | PaymentCreateWithoutAccountInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
}

export interface PeerCategoryUpdateManyWithoutCategoryInput {
  create?: PeerCategoryCreateWithoutCategoryInput[] | PeerCategoryCreateWithoutCategoryInput
  connect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  disconnect?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  delete?: PeerCategoryWhereUniqueInput[] | PeerCategoryWhereUniqueInput
  update?: PeerCategoryUpdateWithWhereUniqueWithoutCategoryInput[] | PeerCategoryUpdateWithWhereUniqueWithoutCategoryInput
  upsert?: PeerCategoryUpsertWithWhereUniqueWithoutCategoryInput[] | PeerCategoryUpsertWithWhereUniqueWithoutCategoryInput
}

export interface PeerCreateOneWithoutPaymentsInput {
  create?: PeerCreateWithoutPaymentsInput
  connect?: PeerWhereUniqueInput
}

export interface PeerCategoryUpdateWithWhereUniqueWithoutCategoryInput {
  where: PeerCategoryWhereUniqueInput
  data: PeerCategoryUpdateWithoutCategoryDataInput
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
}

export interface PeerCategoryUpdateWithoutCategoryDataInput {
  count?: Int
  total?: Float
  revenue?: Float
  spendings?: Float
  peer?: PeerUpdateOneWithoutCategoriesInput
}

export interface AccountCreateOneWithoutCategoriesInput {
  create?: AccountCreateWithoutCategoriesInput
  connect?: AccountWhereUniqueInput
}

export interface PeerUpdateOneWithoutCategoriesInput {
  create?: PeerCreateWithoutCategoriesInput
  connect?: PeerWhereUniqueInput
  delete?: Boolean
  update?: PeerUpdateWithoutCategoriesDataInput
  upsert?: PeerUpsertWithoutCategoriesInput
}

export interface TeamCreateOneWithoutAccountsInput {
  create?: TeamCreateWithoutAccountsInput
  connect?: TeamWhereUniqueInput
}

export interface PeerUpdateWithoutCategoriesDataInput {
  name?: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account?: AccountUpdateOneWithoutPeersInput
  payments?: PaymentUpdateManyWithoutPeerInput
  category?: CategoryUpdateOneInput
}

export interface TeamMemberCreateManyWithoutTeamInput {
  create?: TeamMemberCreateWithoutTeamInput[] | TeamMemberCreateWithoutTeamInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
}

export interface AccountUpdateOneWithoutPeersInput {
  create?: AccountCreateWithoutPeersInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutPeersDataInput
  upsert?: AccountUpsertWithoutPeersInput
}

export interface UserCreateOneWithoutTeamsInput {
  create?: UserCreateWithoutTeamsInput
  connect?: UserWhereUniqueInput
}

export interface AccountUpdateWithoutPeersDataInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryUpdateManyWithoutAccountInput
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  stories?: StoryUpdateManyWithoutAccountInput
}

export interface TeamInviteCreateManyWithoutTeamInput {
  create?: TeamInviteCreateWithoutTeamInput[] | TeamInviteCreateWithoutTeamInput
  connect?: TeamInviteWhereUniqueInput[] | TeamInviteWhereUniqueInput
}

export interface PaymentUpdateManyWithoutAccountInput {
  create?: PaymentCreateWithoutAccountInput[] | PaymentCreateWithoutAccountInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  disconnect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  delete?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  update?: PaymentUpdateWithWhereUniqueWithoutAccountInput[] | PaymentUpdateWithWhereUniqueWithoutAccountInput
  upsert?: PaymentUpsertWithWhereUniqueWithoutAccountInput[] | PaymentUpsertWithWhereUniqueWithoutAccountInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface PaymentUpdateWithWhereUniqueWithoutAccountInput {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutAccountDataInput
}

export interface TeamMemberCreateManyWithoutUserInput {
  create?: TeamMemberCreateWithoutUserInput[] | TeamMemberCreateWithoutUserInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
}

export interface PaymentUpdateWithoutAccountDataInput {
  postedOn?: DateTime
  amount?: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData?: Json
  peer?: PeerUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
  storyData?: StoryDataUpdateOneWithoutPaymentsInput
}

export interface TeamCreateOneWithoutMembersInput {
  create?: TeamCreateWithoutMembersInput
  connect?: TeamWhereUniqueInput
}

export interface PeerUpdateOneWithoutPaymentsInput {
  create?: PeerCreateWithoutPaymentsInput
  connect?: PeerWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: PeerUpdateWithoutPaymentsDataInput
  upsert?: PeerUpsertWithoutPaymentsInput
}

export interface PeerCreateManyWithoutAccountInput {
  create?: PeerCreateWithoutAccountInput[] | PeerCreateWithoutAccountInput
  connect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
}

export interface PeerUpdateWithoutPaymentsDataInput {
  name?: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account?: AccountUpdateOneWithoutPeersInput
  category?: CategoryUpdateOneInput
  categories?: PeerCategoryUpdateManyWithoutPeerInput
}

export interface PaymentCreateManyWithoutPeerInput {
  create?: PaymentCreateWithoutPeerInput[] | PaymentCreateWithoutPeerInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
}

export interface CategoryUpdateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: CategoryUpdateDataInput
  upsert?: CategoryUpsertNestedInput
}

export interface AccountCreateOneWithoutPaymentsInput {
  create?: AccountCreateWithoutPaymentsInput
  connect?: AccountWhereUniqueInput
}

export interface CategoryUpdateDataInput {
  name?: String
  nameNormalized?: String
  color?: String
  account?: AccountUpdateOneWithoutCategoriesInput
  peers?: PeerCategoryUpdateManyWithoutCategoryInput
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

export interface AccountUpdateOneWithoutCategoriesInput {
  create?: AccountCreateWithoutCategoriesInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutCategoriesDataInput
  upsert?: AccountUpsertWithoutCategoriesInput
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
  team?: TeamWhereInput
  user?: UserWhereInput
}

export interface AccountUpdateWithoutCategoriesDataInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  peers?: PeerUpdateManyWithoutAccountInput
  stories?: StoryUpdateManyWithoutAccountInput
}

export interface StoryDataSubscriptionWhereInput {
  AND?: StoryDataSubscriptionWhereInput[] | StoryDataSubscriptionWhereInput
  OR?: StoryDataSubscriptionWhereInput[] | StoryDataSubscriptionWhereInput
  NOT?: StoryDataSubscriptionWhereInput[] | StoryDataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: StoryDataWhereInput
}

export interface TeamUpdateOneWithoutAccountsInput {
  create?: TeamCreateWithoutAccountsInput
  connect?: TeamWhereUniqueInput
  delete?: Boolean
  update?: TeamUpdateWithoutAccountsDataInput
  upsert?: TeamUpsertWithoutAccountsInput
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

export interface TeamUpdateWithoutAccountsDataInput {
  name?: String
  nameNormalized?: String
  members?: TeamMemberUpdateManyWithoutTeamInput
  invites?: TeamInviteUpdateManyWithoutTeamInput
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
  nameNormalized?: String
  nameNormalized_not?: String
  nameNormalized_in?: String[] | String
  nameNormalized_not_in?: String[] | String
  nameNormalized_lt?: String
  nameNormalized_lte?: String
  nameNormalized_gt?: String
  nameNormalized_gte?: String
  nameNormalized_contains?: String
  nameNormalized_not_contains?: String
  nameNormalized_starts_with?: String
  nameNormalized_not_starts_with?: String
  nameNormalized_ends_with?: String
  nameNormalized_not_ends_with?: String
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
  paymentCount?: Int
  paymentCount_not?: Int
  paymentCount_in?: Int[] | Int
  paymentCount_not_in?: Int[] | Int
  paymentCount_lt?: Int
  paymentCount_lte?: Int
  paymentCount_gt?: Int
  paymentCount_gte?: Int
  account?: AccountWhereInput
  payments_every?: PaymentWhereInput
  payments_some?: PaymentWhereInput
  payments_none?: PaymentWhereInput
  category?: CategoryWhereInput
  categories_every?: PeerCategoryWhereInput
  categories_some?: PeerCategoryWhereInput
  categories_none?: PeerCategoryWhereInput
}

export interface TeamMemberUpdateManyWithoutTeamInput {
  create?: TeamMemberCreateWithoutTeamInput[] | TeamMemberCreateWithoutTeamInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  disconnect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  delete?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput[] | TeamMemberUpdateWithWhereUniqueWithoutTeamInput
  upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput[] | TeamMemberUpsertWithWhereUniqueWithoutTeamInput
}

export interface MxMemberWhereInput {
  AND?: MxMemberWhereInput[] | MxMemberWhereInput
  OR?: MxMemberWhereInput[] | MxMemberWhereInput
  NOT?: MxMemberWhereInput[] | MxMemberWhereInput
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
  mxGuid?: String
  mxGuid_not?: String
  mxGuid_in?: String[] | String
  mxGuid_not_in?: String[] | String
  mxGuid_lt?: String
  mxGuid_lte?: String
  mxGuid_gt?: String
  mxGuid_gte?: String
  mxGuid_contains?: String
  mxGuid_not_contains?: String
  mxGuid_starts_with?: String
  mxGuid_not_starts_with?: String
  mxGuid_ends_with?: String
  mxGuid_not_ends_with?: String
  institutionCode?: String
  institutionCode_not?: String
  institutionCode_in?: String[] | String
  institutionCode_not_in?: String[] | String
  institutionCode_lt?: String
  institutionCode_lte?: String
  institutionCode_gt?: String
  institutionCode_gte?: String
  institutionCode_contains?: String
  institutionCode_not_contains?: String
  institutionCode_starts_with?: String
  institutionCode_not_starts_with?: String
  institutionCode_ends_with?: String
  institutionCode_not_ends_with?: String
  user?: MxUserWhereInput
  onboarding?: OnboardingWhereInput
}

export interface TeamMemberUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput
  data: TeamMemberUpdateWithoutTeamDataInput
}

export interface CategoryUpdateInput {
  name?: String
  nameNormalized?: String
  color?: String
  account?: AccountUpdateOneWithoutCategoriesInput
  peers?: PeerCategoryUpdateManyWithoutCategoryInput
}

export interface TeamMemberUpdateWithoutTeamDataInput {
  role?: TeamMemberRole
  user?: UserUpdateOneWithoutTeamsInput
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
  nameNormalized?: String
  nameNormalized_not?: String
  nameNormalized_in?: String[] | String
  nameNormalized_not_in?: String[] | String
  nameNormalized_lt?: String
  nameNormalized_lte?: String
  nameNormalized_gt?: String
  nameNormalized_gte?: String
  nameNormalized_contains?: String
  nameNormalized_not_contains?: String
  nameNormalized_starts_with?: String
  nameNormalized_not_starts_with?: String
  nameNormalized_ends_with?: String
  nameNormalized_not_ends_with?: String
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
  categories_every?: CategoryWhereInput
  categories_some?: CategoryWhereInput
  categories_none?: CategoryWhereInput
  payments_every?: PaymentWhereInput
  payments_some?: PaymentWhereInput
  payments_none?: PaymentWhereInput
  team?: TeamWhereInput
  peers_every?: PeerWhereInput
  peers_some?: PeerWhereInput
  peers_none?: PeerWhereInput
  stories_every?: StoryWhereInput
  stories_some?: StoryWhereInput
  stories_none?: StoryWhereInput
}

export interface UserUpdateOneWithoutTeamsInput {
  create?: UserCreateWithoutTeamsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutTeamsDataInput
  upsert?: UserUpsertWithoutTeamsInput
}

export interface PaymentWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateWithoutTeamsDataInput {
  email?: String
  emailNormalized?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
}

export interface StoryWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpsertWithoutTeamsInput {
  update: UserUpdateWithoutTeamsDataInput
  create: UserCreateWithoutTeamsInput
}

export interface MxMemberWhereUniqueInput {
  id?: ID_Input
}

export interface TeamMemberUpsertWithWhereUniqueWithoutTeamInput {
  where: TeamMemberWhereUniqueInput
  update: TeamMemberUpdateWithoutTeamDataInput
  create: TeamMemberCreateWithoutTeamInput
}

export interface TeamUpdateWithoutInvitesDataInput {
  name?: String
  nameNormalized?: String
  accounts?: AccountUpdateManyWithoutTeamInput
  members?: TeamMemberUpdateManyWithoutTeamInput
}

export interface TeamInviteUpdateManyWithoutTeamInput {
  create?: TeamInviteCreateWithoutTeamInput[] | TeamInviteCreateWithoutTeamInput
  connect?: TeamInviteWhereUniqueInput[] | TeamInviteWhereUniqueInput
  disconnect?: TeamInviteWhereUniqueInput[] | TeamInviteWhereUniqueInput
  delete?: TeamInviteWhereUniqueInput[] | TeamInviteWhereUniqueInput
  update?: TeamInviteUpdateWithWhereUniqueWithoutTeamInput[] | TeamInviteUpdateWithWhereUniqueWithoutTeamInput
  upsert?: TeamInviteUpsertWithWhereUniqueWithoutTeamInput[] | TeamInviteUpsertWithWhereUniqueWithoutTeamInput
}

export interface MxMemberUpsertWithWhereUniqueWithoutUserInput {
  where: MxMemberWhereUniqueInput
  update: MxMemberUpdateWithoutUserDataInput
  create: MxMemberCreateWithoutUserInput
}

export interface TeamInviteUpdateWithWhereUniqueWithoutTeamInput {
  where: TeamInviteWhereUniqueInput
  data: TeamInviteUpdateWithoutTeamDataInput
}

export interface MxMemberUpdateWithoutUserDataInput {
  mxGuid?: String
  institutionCode?: String
  onboarding?: OnboardingUpdateOneWithoutMemberInput
}

export interface TeamInviteUpdateWithoutTeamDataInput {
  email?: String
  role?: TeamMemberRole
  note?: String
  inviter?: UserUpdateOneInput
}

export interface MxMemberUpsertWithoutOnboardingInput {
  update: MxMemberUpdateWithoutOnboardingDataInput
  create: MxMemberCreateWithoutOnboardingInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface MxMemberUpdateWithoutOnboardingDataInput {
  mxGuid?: String
  institutionCode?: String
  user?: MxUserUpdateOneWithoutMembersInput
}

export interface UserUpdateDataInput {
  email?: String
  emailNormalized?: String
  firstName?: String
  lastName?: String
  passwordHash?: String
  teams?: TeamMemberUpdateManyWithoutUserInput
}

export interface StoryUpdateInput {
  isPublished?: Boolean
  account?: AccountUpdateOneWithoutStoriesInput
  draftData?: StoryDataUpdateOneWithoutDraftStoryInput
  publicData?: StoryDataUpdateOneWithoutPublicStoryInput
}

export interface TeamMemberUpdateManyWithoutUserInput {
  create?: TeamMemberCreateWithoutUserInput[] | TeamMemberCreateWithoutUserInput
  connect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  disconnect?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  delete?: TeamMemberWhereUniqueInput[] | TeamMemberWhereUniqueInput
  update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput[] | TeamMemberUpdateWithWhereUniqueWithoutUserInput
  upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput[] | TeamMemberUpsertWithWhereUniqueWithoutUserInput
}

export interface PaymentUpdateOneWithoutCommentsInput {
  create?: PaymentCreateWithoutCommentsInput
  connect?: PaymentWhereUniqueInput
  delete?: Boolean
  update?: PaymentUpdateWithoutCommentsDataInput
  upsert?: PaymentUpsertWithoutCommentsInput
}

export interface TeamMemberUpdateWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput
  data: TeamMemberUpdateWithoutUserDataInput
}

export interface AccountUpdateInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryUpdateManyWithoutAccountInput
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  peers?: PeerUpdateManyWithoutAccountInput
  stories?: StoryUpdateManyWithoutAccountInput
}

export interface TeamMemberUpdateWithoutUserDataInput {
  role?: TeamMemberRole
  team?: TeamUpdateOneWithoutMembersInput
}

export interface PeerCategoryUpsertWithWhereUniqueWithoutCategoryInput {
  where: PeerCategoryWhereUniqueInput
  update: PeerCategoryUpdateWithoutCategoryDataInput
  create: PeerCategoryCreateWithoutCategoryInput
}

export interface TeamUpdateOneWithoutMembersInput {
  create?: TeamCreateWithoutMembersInput
  connect?: TeamWhereUniqueInput
  delete?: Boolean
  update?: TeamUpdateWithoutMembersDataInput
  upsert?: TeamUpsertWithoutMembersInput
}

export interface PeerUpsertWithoutPaymentsInput {
  update: PeerUpdateWithoutPaymentsDataInput
  create: PeerCreateWithoutPaymentsInput
}

export interface TeamUpdateWithoutMembersDataInput {
  name?: String
  nameNormalized?: String
  accounts?: AccountUpdateManyWithoutTeamInput
  invites?: TeamInviteUpdateManyWithoutTeamInput
}

export interface PeerCategoryUpsertWithWhereUniqueWithoutPeerInput {
  where: PeerCategoryWhereUniqueInput
  update: PeerCategoryUpdateWithoutPeerDataInput
  create: PeerCategoryCreateWithoutPeerInput
}

export interface TeamUpsertWithoutMembersInput {
  update: TeamUpdateWithoutMembersDataInput
  create: TeamCreateWithoutMembersInput
}

export interface PeerCategoryUpdateWithoutPeerDataInput {
  count?: Int
  total?: Float
  revenue?: Float
  spendings?: Float
  category?: CategoryUpdateOneWithoutPeersInput
}

export interface TeamMemberUpsertWithWhereUniqueWithoutUserInput {
  where: TeamMemberWhereUniqueInput
  update: TeamMemberUpdateWithoutUserDataInput
  create: TeamMemberCreateWithoutUserInput
}

export interface AccountCreateWithoutTeamInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryCreateManyWithoutAccountInput
  payments?: PaymentCreateManyWithoutAccountInput
  peers?: PeerCreateManyWithoutAccountInput
  stories?: StoryCreateManyWithoutAccountInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface PeerCategoryCreateWithoutCategoryInput {
  count: Int
  total: Float
  revenue: Float
  spendings: Float
  peer: PeerCreateOneWithoutCategoriesInput
}

export interface TeamInviteUpsertWithWhereUniqueWithoutTeamInput {
  where: TeamInviteWhereUniqueInput
  update: TeamInviteUpdateWithoutTeamDataInput
  create: TeamInviteCreateWithoutTeamInput
}

export interface AccountCreateWithoutPeersInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryCreateManyWithoutAccountInput
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  stories?: StoryCreateManyWithoutAccountInput
}

export interface TeamUpsertWithoutAccountsInput {
  update: TeamUpdateWithoutAccountsDataInput
  create: TeamCreateWithoutAccountsInput
}

export interface PeerCreateWithoutPaymentsInput {
  name: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account: AccountCreateOneWithoutPeersInput
  category?: CategoryCreateOneInput
  categories?: PeerCategoryCreateManyWithoutPeerInput
}

export interface PeerUpdateManyWithoutAccountInput {
  create?: PeerCreateWithoutAccountInput[] | PeerCreateWithoutAccountInput
  connect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  disconnect?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  delete?: PeerWhereUniqueInput[] | PeerWhereUniqueInput
  update?: PeerUpdateWithWhereUniqueWithoutAccountInput[] | PeerUpdateWithWhereUniqueWithoutAccountInput
  upsert?: PeerUpsertWithWhereUniqueWithoutAccountInput[] | PeerUpsertWithWhereUniqueWithoutAccountInput
}

export interface AccountCreateWithoutCategoriesInput {
  name: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  payments?: PaymentCreateManyWithoutAccountInput
  team: TeamCreateOneWithoutAccountsInput
  peers?: PeerCreateManyWithoutAccountInput
  stories?: StoryCreateManyWithoutAccountInput
}

export interface PeerUpdateWithWhereUniqueWithoutAccountInput {
  where: PeerWhereUniqueInput
  data: PeerUpdateWithoutAccountDataInput
}

export interface TeamMemberCreateWithoutTeamInput {
  role?: TeamMemberRole
  user: UserCreateOneWithoutTeamsInput
}

export interface PeerUpdateWithoutAccountDataInput {
  name?: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  payments?: PaymentUpdateManyWithoutPeerInput
  category?: CategoryUpdateOneInput
  categories?: PeerCategoryUpdateManyWithoutPeerInput
}

export interface TeamInviteCreateWithoutTeamInput {
  email: String
  role: TeamMemberRole
  note?: String
  inviter: UserCreateOneInput
}

export interface PaymentUpdateManyWithoutPeerInput {
  create?: PaymentCreateWithoutPeerInput[] | PaymentCreateWithoutPeerInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  disconnect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  delete?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  update?: PaymentUpdateWithWhereUniqueWithoutPeerInput[] | PaymentUpdateWithWhereUniqueWithoutPeerInput
  upsert?: PaymentUpsertWithWhereUniqueWithoutPeerInput[] | PaymentUpsertWithWhereUniqueWithoutPeerInput
}

export interface TeamMemberCreateWithoutUserInput {
  role?: TeamMemberRole
  team: TeamCreateOneWithoutMembersInput
}

export interface PaymentUpdateWithWhereUniqueWithoutPeerInput {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutPeerDataInput
}

export interface PeerCreateWithoutAccountInput {
  name: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  payments?: PaymentCreateManyWithoutPeerInput
  category?: CategoryCreateOneInput
  categories?: PeerCategoryCreateManyWithoutPeerInput
}

export interface PaymentUpdateWithoutPeerDataInput {
  postedOn?: DateTime
  amount?: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
  storyData?: StoryDataUpdateOneWithoutPaymentsInput
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

export interface AccountUpdateOneWithoutPaymentsInput {
  create?: AccountCreateWithoutPaymentsInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutPaymentsDataInput
  upsert?: AccountUpsertWithoutPaymentsInput
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
  emailNormalized?: String
  emailNormalized_not?: String
  emailNormalized_in?: String[] | String
  emailNormalized_not_in?: String[] | String
  emailNormalized_lt?: String
  emailNormalized_lte?: String
  emailNormalized_gt?: String
  emailNormalized_gte?: String
  emailNormalized_contains?: String
  emailNormalized_not_contains?: String
  emailNormalized_starts_with?: String
  emailNormalized_not_starts_with?: String
  emailNormalized_ends_with?: String
  emailNormalized_not_ends_with?: String
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

export interface AccountUpdateWithoutPaymentsDataInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  peers?: PeerUpdateManyWithoutAccountInput
  stories?: StoryUpdateManyWithoutAccountInput
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
  postedOn?: DateTime
  postedOn_not?: DateTime
  postedOn_in?: DateTime[] | DateTime
  postedOn_not_in?: DateTime[] | DateTime
  postedOn_lt?: DateTime
  postedOn_lte?: DateTime
  postedOn_gt?: DateTime
  postedOn_gte?: DateTime
  amount?: Float
  amount_not?: Float
  amount_in?: Float[] | Float
  amount_not_in?: Float[] | Float
  amount_lt?: Float
  amount_lte?: Float
  amount_gt?: Float
  amount_gte?: Float
  amountAbs?: Float
  amountAbs_not?: Float
  amountAbs_in?: Float[] | Float
  amountAbs_not_in?: Float[] | Float
  amountAbs_lt?: Float
  amountAbs_lte?: Float
  amountAbs_gt?: Float
  amountAbs_gte?: Float
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
  peerNameNormalized?: String
  peerNameNormalized_not?: String
  peerNameNormalized_in?: String[] | String
  peerNameNormalized_not_in?: String[] | String
  peerNameNormalized_lt?: String
  peerNameNormalized_lte?: String
  peerNameNormalized_gt?: String
  peerNameNormalized_gte?: String
  peerNameNormalized_contains?: String
  peerNameNormalized_not_contains?: String
  peerNameNormalized_starts_with?: String
  peerNameNormalized_not_starts_with?: String
  peerNameNormalized_ends_with?: String
  peerNameNormalized_not_ends_with?: String
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
  descriptionNormalized?: String
  descriptionNormalized_not?: String
  descriptionNormalized_in?: String[] | String
  descriptionNormalized_not_in?: String[] | String
  descriptionNormalized_lt?: String
  descriptionNormalized_lte?: String
  descriptionNormalized_gt?: String
  descriptionNormalized_gte?: String
  descriptionNormalized_contains?: String
  descriptionNormalized_not_contains?: String
  descriptionNormalized_starts_with?: String
  descriptionNormalized_not_starts_with?: String
  descriptionNormalized_ends_with?: String
  descriptionNormalized_not_ends_with?: String
  account?: AccountWhereInput
  peer?: PeerWhereInput
  comments_every?: CommentWhereInput
  comments_some?: CommentWhereInput
  comments_none?: CommentWhereInput
  category?: CategoryWhereInput
  storyData?: StoryDataWhereInput
}

export interface StoryUpdateManyWithoutAccountInput {
  create?: StoryCreateWithoutAccountInput[] | StoryCreateWithoutAccountInput
  connect?: StoryWhereUniqueInput[] | StoryWhereUniqueInput
  disconnect?: StoryWhereUniqueInput[] | StoryWhereUniqueInput
  delete?: StoryWhereUniqueInput[] | StoryWhereUniqueInput
  update?: StoryUpdateWithWhereUniqueWithoutAccountInput[] | StoryUpdateWithWhereUniqueWithoutAccountInput
  upsert?: StoryUpsertWithWhereUniqueWithoutAccountInput[] | StoryUpsertWithWhereUniqueWithoutAccountInput
}

export interface PeerCategoryWhereInput {
  AND?: PeerCategoryWhereInput[] | PeerCategoryWhereInput
  OR?: PeerCategoryWhereInput[] | PeerCategoryWhereInput
  NOT?: PeerCategoryWhereInput[] | PeerCategoryWhereInput
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
  count?: Int
  count_not?: Int
  count_in?: Int[] | Int
  count_not_in?: Int[] | Int
  count_lt?: Int
  count_lte?: Int
  count_gt?: Int
  count_gte?: Int
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
  peer?: PeerWhereInput
  category?: CategoryWhereInput
}

export interface StoryUpdateWithWhereUniqueWithoutAccountInput {
  where: StoryWhereUniqueInput
  data: StoryUpdateWithoutAccountDataInput
}

export interface TeamMemberWhereUniqueInput {
  id?: ID_Input
}

export interface StoryUpdateWithoutAccountDataInput {
  isPublished?: Boolean
  draftData?: StoryDataUpdateOneWithoutDraftStoryInput
  publicData?: StoryDataUpdateOneWithoutPublicStoryInput
}

export interface OnboardingWhereUniqueInput {
  id?: ID_Input
}

export interface StoryDataUpdateOneWithoutDraftStoryInput {
  create?: StoryDataCreateWithoutDraftStoryInput
  connect?: StoryDataWhereUniqueInput
  delete?: Boolean
  update?: StoryDataUpdateWithoutDraftStoryDataInput
  upsert?: StoryDataUpsertWithoutDraftStoryInput
}

export interface TeamInviteUpdateInput {
  email?: String
  role?: TeamMemberRole
  note?: String
  team?: TeamUpdateOneWithoutInvitesInput
  inviter?: UserUpdateOneInput
}

export interface StoryDataUpdateWithoutDraftStoryDataInput {
  title?: String
  body?: Json
  coverImage?: Json
  payments?: PaymentUpdateManyWithoutStoryDataInput
  publicStory?: StoryUpdateOneWithoutPublicDataInput
}

export interface MxMemberUpdateManyWithoutUserInput {
  create?: MxMemberCreateWithoutUserInput[] | MxMemberCreateWithoutUserInput
  connect?: MxMemberWhereUniqueInput[] | MxMemberWhereUniqueInput
  disconnect?: MxMemberWhereUniqueInput[] | MxMemberWhereUniqueInput
  delete?: MxMemberWhereUniqueInput[] | MxMemberWhereUniqueInput
  update?: MxMemberUpdateWithWhereUniqueWithoutUserInput[] | MxMemberUpdateWithWhereUniqueWithoutUserInput
  upsert?: MxMemberUpsertWithWhereUniqueWithoutUserInput[] | MxMemberUpsertWithWhereUniqueWithoutUserInput
}

export interface PaymentUpdateManyWithoutStoryDataInput {
  create?: PaymentCreateWithoutStoryDataInput[] | PaymentCreateWithoutStoryDataInput
  connect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  disconnect?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  delete?: PaymentWhereUniqueInput[] | PaymentWhereUniqueInput
  update?: PaymentUpdateWithWhereUniqueWithoutStoryDataInput[] | PaymentUpdateWithWhereUniqueWithoutStoryDataInput
  upsert?: PaymentUpsertWithWhereUniqueWithoutStoryDataInput[] | PaymentUpsertWithWhereUniqueWithoutStoryDataInput
}

export interface OnboardingUpdateInput {
  step?: String
  institution?: Json
  credentials?: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
  user?: UserUpdateOneInput
  member?: MxMemberUpdateOneWithoutOnboardingInput
}

export interface PaymentUpdateWithWhereUniqueWithoutStoryDataInput {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutStoryDataDataInput
}

export interface PeerUpdateInput {
  name?: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account?: AccountUpdateOneWithoutPeersInput
  payments?: PaymentUpdateManyWithoutPeerInput
  category?: CategoryUpdateOneInput
  categories?: PeerCategoryUpdateManyWithoutPeerInput
}

export interface PaymentUpdateWithoutStoryDataDataInput {
  postedOn?: DateTime
  amount?: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData?: Json
  account?: AccountUpdateOneWithoutPaymentsInput
  peer?: PeerUpdateOneWithoutPaymentsInput
  comments?: CommentUpdateManyWithoutPaymentInput
  category?: CategoryUpdateOneInput
}

export interface AccountUpsertWithoutPeersInput {
  update: AccountUpdateWithoutPeersDataInput
  create: AccountCreateWithoutPeersInput
}

export interface CommentUpdateManyWithoutPaymentInput {
  create?: CommentCreateWithoutPaymentInput[] | CommentCreateWithoutPaymentInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  update?: CommentUpdateWithWhereUniqueWithoutPaymentInput[] | CommentUpdateWithWhereUniqueWithoutPaymentInput
  upsert?: CommentUpsertWithWhereUniqueWithoutPaymentInput[] | CommentUpsertWithWhereUniqueWithoutPaymentInput
}

export interface CategoryUpdateWithoutPeersDataInput {
  name?: String
  nameNormalized?: String
  color?: String
  account?: AccountUpdateOneWithoutCategoriesInput
}

export interface CommentUpdateWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPaymentDataInput
}

export interface CategoryCreateWithoutAccountInput {
  name: String
  nameNormalized?: String
  color: String
  peers?: PeerCategoryCreateManyWithoutCategoryInput
}

export interface CommentUpdateWithoutPaymentDataInput {
  body?: Json
  user?: UserUpdateOneInput
}

export interface PaymentCreateWithoutAccountInput {
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
  peer?: PeerCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
  storyData?: StoryDataCreateOneWithoutPaymentsInput
}

export interface CommentUpsertWithWhereUniqueWithoutPaymentInput {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPaymentDataInput
  create: CommentCreateWithoutPaymentInput
}

export interface TeamCreateWithoutAccountsInput {
  name: String
  nameNormalized?: String
  members?: TeamMemberCreateManyWithoutTeamInput
  invites?: TeamInviteCreateManyWithoutTeamInput
}

export interface PaymentUpsertWithWhereUniqueWithoutStoryDataInput {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutStoryDataDataInput
  create: PaymentCreateWithoutStoryDataInput
}

export interface UserCreateInput {
  email: String
  emailNormalized?: String
  firstName: String
  lastName?: String
  passwordHash: String
  teams?: TeamMemberCreateManyWithoutUserInput
}

export interface StoryUpdateOneWithoutPublicDataInput {
  create?: StoryCreateWithoutPublicDataInput
  connect?: StoryWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: StoryUpdateWithoutPublicDataDataInput
  upsert?: StoryUpsertWithoutPublicDataInput
}

export interface PaymentCreateWithoutPeerInput {
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
  account: AccountCreateOneWithoutPaymentsInput
  comments?: CommentCreateManyWithoutPaymentInput
  category?: CategoryCreateOneInput
  storyData?: StoryDataCreateOneWithoutPaymentsInput
}

export interface StoryUpdateWithoutPublicDataDataInput {
  isPublished?: Boolean
  account?: AccountUpdateOneWithoutStoriesInput
  draftData?: StoryDataUpdateOneWithoutDraftStoryInput
}

export interface StorySubscriptionWhereInput {
  AND?: StorySubscriptionWhereInput[] | StorySubscriptionWhereInput
  OR?: StorySubscriptionWhereInput[] | StorySubscriptionWhereInput
  NOT?: StorySubscriptionWhereInput[] | StorySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: StoryWhereInput
}

export interface AccountUpdateOneWithoutStoriesInput {
  create?: AccountCreateWithoutStoriesInput
  connect?: AccountWhereUniqueInput
  delete?: Boolean
  update?: AccountUpdateWithoutStoriesDataInput
  upsert?: AccountUpsertWithoutStoriesInput
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
  nameNormalized?: String
  nameNormalized_not?: String
  nameNormalized_in?: String[] | String
  nameNormalized_not_in?: String[] | String
  nameNormalized_lt?: String
  nameNormalized_lte?: String
  nameNormalized_gt?: String
  nameNormalized_gte?: String
  nameNormalized_contains?: String
  nameNormalized_not_contains?: String
  nameNormalized_starts_with?: String
  nameNormalized_not_starts_with?: String
  nameNormalized_ends_with?: String
  nameNormalized_not_ends_with?: String
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
  account?: AccountWhereInput
  peers_every?: PeerCategoryWhereInput
  peers_some?: PeerCategoryWhereInput
  peers_none?: PeerCategoryWhereInput
}

export interface AccountUpdateWithoutStoriesDataInput {
  name?: String
  nameNormalized?: String
  balance?: Float
  revenue?: Float
  spendings?: Float
  rawData?: Json
  categories?: CategoryUpdateManyWithoutAccountInput
  payments?: PaymentUpdateManyWithoutAccountInput
  team?: TeamUpdateOneWithoutAccountsInput
  peers?: PeerUpdateManyWithoutAccountInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface AccountUpsertWithoutStoriesInput {
  update: AccountUpdateWithoutStoriesDataInput
  create: AccountCreateWithoutStoriesInput
}

export interface MxUserUpdateWithoutMembersDataInput {
  mxGuid?: String
}

export interface StoryUpsertWithoutPublicDataInput {
  update: StoryUpdateWithoutPublicDataDataInput
  create: StoryCreateWithoutPublicDataInput
}

export interface AccountUpsertWithWhereUniqueWithoutTeamInput {
  where: AccountWhereUniqueInput
  update: AccountUpdateWithoutTeamDataInput
  create: AccountCreateWithoutTeamInput
}

export interface StoryDataUpsertWithoutDraftStoryInput {
  update: StoryDataUpdateWithoutDraftStoryDataInput
  create: StoryDataCreateWithoutDraftStoryInput
}

export interface TeamCreateInput {
  name: String
  nameNormalized?: String
  accounts?: AccountCreateManyWithoutTeamInput
  members?: TeamMemberCreateManyWithoutTeamInput
  invites?: TeamInviteCreateManyWithoutTeamInput
}

export interface StoryDataUpdateOneWithoutPublicStoryInput {
  create?: StoryDataCreateWithoutPublicStoryInput
  connect?: StoryDataWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: StoryDataUpdateWithoutPublicStoryDataInput
  upsert?: StoryDataUpsertWithoutPublicStoryInput
}

export interface CategoryCreateInput {
  name: String
  nameNormalized?: String
  color: String
  account: AccountCreateOneWithoutCategoriesInput
  peers?: PeerCategoryCreateManyWithoutCategoryInput
}

export interface StoryDataUpdateWithoutPublicStoryDataInput {
  title?: String
  body?: Json
  coverImage?: Json
  payments?: PaymentUpdateManyWithoutStoryDataInput
  draftStory?: StoryUpdateOneWithoutDraftDataInput
}

export interface TeamCreateWithoutMembersInput {
  name: String
  nameNormalized?: String
  accounts?: AccountCreateManyWithoutTeamInput
  invites?: TeamInviteCreateManyWithoutTeamInput
}

export interface StoryUpdateOneWithoutDraftDataInput {
  create?: StoryCreateWithoutDraftDataInput
  connect?: StoryWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: StoryUpdateWithoutDraftDataDataInput
  upsert?: StoryUpsertWithoutDraftDataInput
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

export interface StoryUpdateWithoutDraftDataDataInput {
  isPublished?: Boolean
  account?: AccountUpdateOneWithoutStoriesInput
  publicData?: StoryDataUpdateOneWithoutPublicStoryInput
}

export interface OnboardingUpdateWithoutMemberDataInput {
  step?: String
  institution?: Json
  credentials?: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
  user?: UserUpdateOneInput
}

export interface StoryUpsertWithoutDraftDataInput {
  update: StoryUpdateWithoutDraftDataDataInput
  create: StoryCreateWithoutDraftDataInput
}

export interface AccountUpsertWithoutCategoriesInput {
  update: AccountUpdateWithoutCategoriesDataInput
  create: AccountCreateWithoutCategoriesInput
}

export interface UserCreateWithoutTeamsInput {
  email: String
  emailNormalized?: String
  firstName: String
  lastName?: String
  passwordHash: String
}

export interface StoryDataUpdateOneWithoutPaymentsInput {
  create?: StoryDataCreateWithoutPaymentsInput
  connect?: StoryDataWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: StoryDataUpdateWithoutPaymentsDataInput
  upsert?: StoryDataUpsertWithoutPaymentsInput
}

export interface AccountUpsertWithoutPaymentsInput {
  update: AccountUpdateWithoutPaymentsDataInput
  create: AccountCreateWithoutPaymentsInput
}

export interface StoryUpsertWithWhereUniqueWithoutAccountInput {
  where: StoryWhereUniqueInput
  update: StoryUpdateWithoutAccountDataInput
  create: StoryCreateWithoutAccountInput
}

export interface StoryDataUpsertWithoutPublicStoryInput {
  update: StoryDataUpdateWithoutPublicStoryDataInput
  create: StoryDataCreateWithoutPublicStoryInput
}

export interface TeamInviteSubscriptionWhereInput {
  AND?: TeamInviteSubscriptionWhereInput[] | TeamInviteSubscriptionWhereInput
  OR?: TeamInviteSubscriptionWhereInput[] | TeamInviteSubscriptionWhereInput
  NOT?: TeamInviteSubscriptionWhereInput[] | TeamInviteSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TeamInviteWhereInput
}

export interface PeerCreateWithoutCategoriesInput {
  name: String
  nameNormalized?: String
  total?: Float
  revenue?: Float
  spendings?: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
  account: AccountCreateOneWithoutPeersInput
  payments?: PaymentCreateManyWithoutPeerInput
  category?: CategoryCreateOneInput
}

export interface PaymentUpsertWithoutCommentsInput {
  update: PaymentUpdateWithoutCommentsDataInput
  create: PaymentCreateWithoutCommentsInput
}

export interface CommentWhereUniqueInput {
  id?: ID_Input
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface MxUser extends Node {
  id: ID_Output
  mxGuid: String
  members?: MxMember[]
}

export interface CategoryPreviousValues {
  id: ID_Output
  name: String
  nameNormalized?: String
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

export interface TeamInviteSubscriptionPayload {
  mutation: MutationType
  node?: TeamInvite
  updatedFields?: String[]
  previousValues?: TeamInvitePreviousValues
}

export interface CategorySubscriptionPayload {
  mutation: MutationType
  node?: Category
  updatedFields?: String[]
  previousValues?: CategoryPreviousValues
}

export interface MxMember extends Node {
  id: ID_Output
  mxGuid: String
  institutionCode: String
  user: MxUser
  onboarding?: Onboarding
}

export interface Team extends Node {
  id: ID_Output
  name: String
  nameNormalized?: String
  accounts?: Account[]
  members?: TeamMember[]
  invites?: TeamInvite[]
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

export interface BatchPayload {
  count: Long
}

export interface AggregateTeamInvite {
  count: Int
}

export interface Account extends Node {
  id: ID_Output
  name: String
  nameNormalized?: String
  balance: Float
  revenue: Float
  spendings: Float
  categories?: Category[]
  payments?: Payment[]
  team: Team
  peers?: Peer[]
  stories?: Story[]
  rawData?: Json
}

/*
 * A connection to a list of items.

 */
export interface TeamInviteConnection {
  pageInfo: PageInfo
  edges: TeamInviteEdge[]
  aggregate: AggregateTeamInvite
}

export interface Onboarding extends Node {
  id: ID_Output
  user: User
  step: String
  institution: Json
  credentials: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
  member?: MxMember
}

/*
 * An edge in a connection.

 */
export interface MxMemberEdge {
  node: MxMember
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  emailNormalized?: String
  firstName: String
  lastName?: String
  passwordHash: String
}

export interface AggregateMxUser {
  count: Int
}

export interface TeamSubscriptionPayload {
  mutation: MutationType
  node?: Team
  updatedFields?: String[]
  previousValues?: TeamPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface MxUserConnection {
  pageInfo: PageInfo
  edges: MxUserEdge[]
  aggregate: AggregateMxUser
}

export interface TeamPreviousValues {
  id: ID_Output
  name: String
  nameNormalized?: String
}

/*
 * An edge in a connection.

 */
export interface OnboardingEdge {
  node: Onboarding
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateStoryData {
  count: Int
}

export interface TeamMemberSubscriptionPayload {
  mutation: MutationType
  node?: TeamMember
  updatedFields?: String[]
  previousValues?: TeamMemberPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface StoryDataConnection {
  pageInfo: PageInfo
  edges: StoryDataEdge[]
  aggregate: AggregateStoryData
}

export interface TeamMemberPreviousValues {
  id: ID_Output
  role: TeamMemberRole
}

/*
 * An edge in a connection.

 */
export interface StoryEdge {
  node: Story
  cursor: String
}

export interface TeamInvite extends Node {
  id: ID_Output
  email: String
  role: TeamMemberRole
  note?: String
  team: Team
  inviter: User
}

export interface AggregatePeerCategory {
  count: Int
}

export interface AccountSubscriptionPayload {
  mutation: MutationType
  node?: Account
  updatedFields?: String[]
  previousValues?: AccountPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface PeerCategoryConnection {
  pageInfo: PageInfo
  edges: PeerCategoryEdge[]
  aggregate: AggregatePeerCategory
}

export interface AccountPreviousValues {
  id: ID_Output
  name: String
  nameNormalized?: String
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
  account: Account
  name: String
  nameNormalized?: String
  color: String
  peers?: PeerCategory[]
}

export interface AggregatePeer {
  count: Int
}

export interface PaymentSubscriptionPayload {
  mutation: MutationType
  node?: Payment
  updatedFields?: String[]
  previousValues?: PaymentPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface PeerConnection {
  pageInfo: PageInfo
  edges: PeerEdge[]
  aggregate: AggregatePeer
}

export interface PaymentPreviousValues {
  id: ID_Output
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  description?: String
  descriptionNormalized?: String
  rawData: Json
}

/*
 * An edge in a connection.

 */
export interface PaymentEdge {
  node: Payment
  cursor: String
}

export interface Story extends Node {
  id: ID_Output
  account: Account
  draftData: StoryData
  publicData?: StoryData
  isPublished: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateAccount {
  count: Int
}

export interface PeerSubscriptionPayload {
  mutation: MutationType
  node?: Peer
  updatedFields?: String[]
  previousValues?: PeerPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface AccountConnection {
  pageInfo: PageInfo
  edges: AccountEdge[]
  aggregate: AggregateAccount
}

export interface PeerPreviousValues {
  id: ID_Output
  name: String
  nameNormalized?: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate?: DateTime
  paymentCount?: Int
}

/*
 * An edge in a connection.

 */
export interface TeamMemberEdge {
  node: TeamMember
  cursor: String
}

export interface StoryData extends Node {
  id: ID_Output
  title: String
  body: Json
  coverImage?: Json
  payments?: Payment[]
  draftStory?: Story
  publicStory?: Story
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateTeam {
  count: Int
}

export interface CommentSubscriptionPayload {
  mutation: MutationType
  node?: Comment
  updatedFields?: String[]
  previousValues?: CommentPreviousValues
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

export interface CommentPreviousValues {
  id: ID_Output
  body: Json
}

export interface AggregateUser {
  count: Int
}

export interface TeamInvitePreviousValues {
  id: ID_Output
  email: String
  role: TeamMemberRole
  note?: String
}

/*
 * An edge in a connection.

 */
export interface TeamInviteEdge {
  node: TeamInvite
  cursor: String
}

export interface PeerCategorySubscriptionPayload {
  mutation: MutationType
  node?: PeerCategory
  updatedFields?: String[]
  previousValues?: PeerCategoryPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface MxMemberConnection {
  pageInfo: PageInfo
  edges: MxMemberEdge[]
  aggregate: AggregateMxMember
}

export interface PeerCategoryPreviousValues {
  id: ID_Output
  count: Int
  total: Float
  revenue: Float
  spendings: Float
}

export interface AggregateOnboarding {
  count: Int
}

export interface TeamMember extends Node {
  id: ID_Output
  team: Team
  user: User
  role: TeamMemberRole
}

/*
 * An edge in a connection.

 */
export interface StoryDataEdge {
  node: StoryData
  cursor: String
}

export interface StorySubscriptionPayload {
  mutation: MutationType
  node?: Story
  updatedFields?: String[]
  previousValues?: StoryPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface StoryConnection {
  pageInfo: PageInfo
  edges: StoryEdge[]
  aggregate: AggregateStory
}

export interface StoryPreviousValues {
  id: ID_Output
  isPublished: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateComment {
  count: Int
}

export interface User extends Node {
  id: ID_Output
  email: String
  emailNormalized?: String
  firstName: String
  lastName?: String
  passwordHash: String
  teams?: TeamMember[]
}

/*
 * An edge in a connection.

 */
export interface PeerEdge {
  node: Peer
  cursor: String
}

export interface StoryDataSubscriptionPayload {
  mutation: MutationType
  node?: StoryData
  updatedFields?: String[]
  previousValues?: StoryDataPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface PaymentConnection {
  pageInfo: PageInfo
  edges: PaymentEdge[]
  aggregate: AggregatePayment
}

export interface StoryDataPreviousValues {
  id: ID_Output
  title: String
  body: Json
  coverImage?: Json
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateTeamMember {
  count: Int
}

export interface Comment extends Node {
  id: ID_Output
  payment: Payment
  user?: User
  body: Json
}

/*
 * An edge in a connection.

 */
export interface TeamEdge {
  node: Team
  cursor: String
}

export interface OnboardingSubscriptionPayload {
  mutation: MutationType
  node?: Onboarding
  updatedFields?: String[]
  previousValues?: OnboardingPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface OnboardingPreviousValues {
  id: ID_Output
  step: String
  institution: Json
  credentials: Json
  accounts?: Json
  account?: Json
  categories?: Json
  mfa?: Json
  team?: Json
}

/*
 * An edge in a connection.

 */
export interface MxUserEdge {
  node: MxUser
  cursor: String
}

export interface Payment extends Node {
  id: ID_Output
  account: Account
  postedOn: DateTime
  amount: Float
  amountAbs?: Float
  peerName?: String
  peerNameNormalized?: String
  peer?: Peer
  description?: String
  descriptionNormalized?: String
  comments?: Comment[]
  category?: Category
  rawData: Json
  storyData?: StoryData
}

export interface AggregateStory {
  count: Int
}

export interface MxUserSubscriptionPayload {
  mutation: MutationType
  node?: MxUser
  updatedFields?: String[]
  previousValues?: MxUserPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface CommentConnection {
  pageInfo: PageInfo
  edges: CommentEdge[]
  aggregate: AggregateComment
}

export interface MxUserPreviousValues {
  id: ID_Output
  mxGuid: String
}

/*
 * An edge in a connection.

 */
export interface AccountEdge {
  node: Account
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface CategoryEdge {
  node: Category
  cursor: String
}

export interface PeerCategory extends Node {
  id: ID_Output
  peer: Peer
  category: Category
  count: Int
  total: Float
  revenue: Float
  spendings: Float
}

export interface MxMemberPreviousValues {
  id: ID_Output
  mxGuid: String
  institutionCode: String
}

export interface MxMemberSubscriptionPayload {
  mutation: MutationType
  node?: MxMember
  updatedFields?: String[]
  previousValues?: MxMemberPreviousValues
}

export interface Peer extends Node {
  id: ID_Output
  account: Account
  name: String
  nameNormalized?: String
  total: Float
  revenue: Float
  spendings: Float
  lastPaymentDate?: DateTime
  payments?: Payment[]
  paymentCount?: Int
  category?: Category
  categories?: PeerCategory[]
}

export interface AggregateMxMember {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface TeamMemberConnection {
  pageInfo: PageInfo
  edges: TeamMemberEdge[]
  aggregate: AggregateTeamMember
}

export interface AggregatePayment {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface PeerCategoryEdge {
  node: PeerCategory
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface OnboardingConnection {
  pageInfo: PageInfo
  edges: OnboardingEdge[]
  aggregate: AggregateOnboarding
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
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string

/*
Raw JSON value
*/
export type Json = any