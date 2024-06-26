// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _extai from "./ext/ai";
export type $AccountλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "provider": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "providerAccountId": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "access_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "expires_at": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "id_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "refresh_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "scope": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "session_state": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "token_type": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "type": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "<accounts[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<accounts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Account = $.ObjectType<"default::Account", $AccountλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {provider: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },providerAccountId: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {providerAccountId: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Account = $.makeType<$Account>(_.spec, "dd120515-1490-11ef-916b-d14c682c1a73", _.syntax.literal);

const Account: $.$expr_PathNode<$.TypeSet<$Account, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Account, $.Cardinality.Many), null);

export type $GitHubUserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "avatar_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "githubId": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, true, false, false, false>;
  "html_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "login": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<user[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $GitHubUser = $.ObjectType<"default::GitHubUser", $GitHubUserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {githubId: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $GitHubUser = $.makeType<$GitHubUser>(_.spec, "dd1b1c02-1490-11ef-b03f-a18d187efd52", _.syntax.literal);

const GitHubUser: $.$expr_PathNode<$.TypeSet<$GitHubUser, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($GitHubUser, $.Cardinality.Many), null);

export type $GravitasλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "score": $.PropertyDesc<_std.$float64, $.Cardinality.AtMostOne, false, false, false, false>;
  "<gravitas_scores[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<gravitas[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<gravitas": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<gravitas_scores": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Gravitas = $.ObjectType<"default::Gravitas", $GravitasλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Gravitas = $.makeType<$Gravitas>(_.spec, "dd1d7dba-1490-11ef-95e9-41290da1c8e1", _.syntax.literal);

const Gravitas: $.$expr_PathNode<$.TypeSet<$Gravitas, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Gravitas, $.Cardinality.Many), null);

export type $IssueλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<$GitHubUser, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "gravitas": $.LinkDesc<$Gravitas, $.Cardinality.AtMostOne, {}, false, true,  false, false>;
  "labels": $.LinkDesc<$Label, $.Cardinality.Many, {}, false, false,  false, false>;
  "reactions": $.LinkDesc<$Reaction, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "active_lock_reason": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "assignee": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "author_association": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "body": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "closed_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "comments": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "githubId": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, true, false, false, false>;
  "html_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "locked": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "milestone": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "number": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "performed_via_github_app": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "repository_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "state": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "state_reason": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "timeline_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "updated_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "repo": $.LinkDesc<$Repo, $.Cardinality.One, {}, false, false,  false, false>;
  "gravitas_scores": $.LinkDesc<$Gravitas, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issues[is Repo]": $.LinkDesc<$Repo, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issues": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Issue = $.ObjectType<"default::Issue", $IssueλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {githubId: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Issue = $.makeType<$Issue>(_.spec, "dd255978-1490-11ef-a3ed-f5e1e5550ace", _.syntax.literal);

const Issue: $.$expr_PathNode<$.TypeSet<$Issue, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Issue, $.Cardinality.Many), null);

export type $LabelλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "repoId": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "color": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "default": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<labels[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<labels": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Label = $.ObjectType<"default::Label", $LabelλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },repoId: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Label = $.makeType<$Label>(_.spec, "dd1f6b07-1490-11ef-87b7-a5c3784c47ef", _.syntax.literal);

const Label: $.$expr_PathNode<$.TypeSet<$Label, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Label, $.Cardinality.Many), null);

export type $LanguageλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, true, false, false, false>;
  "<languages[is Repo]": $.LinkDesc<$Repo, $.Cardinality.Many, {}, false, false,  false, false>;
  "<languages": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Language = $.ObjectType<"default::Language", $LanguageλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Language = $.makeType<$Language>(_.spec, "dd2b6bd7-1490-11ef-ad88-1d8f32c3b9c7", _.syntax.literal);

const Language: $.$expr_PathNode<$.TypeSet<$Language, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Language, $.Cardinality.Many), null);

export type $OpenAIGPT_4oλShape = $.typeutil.flatten<_extai.$TextGenerationModelλShape & {
}>;
type $OpenAIGPT_4o = $.ObjectType<"default::OpenAIGPT_4o", $OpenAIGPT_4oλShape, null, [
  ..._extai.$TextGenerationModel['__exclusives__'],
]>;
const $OpenAIGPT_4o = $.makeType<$OpenAIGPT_4o>(_.spec, "6533afc4-16ea-11ef-b61a-aff2e14954bb", _.syntax.literal);

const OpenAIGPT_4o: $.$expr_PathNode<$.TypeSet<$OpenAIGPT_4o, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($OpenAIGPT_4o, $.Cardinality.Many), null);

export type $OwnerλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "avatar_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "githubId": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, true, false, false, false>;
  "html_url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<owner[is RepoRequest]": $.LinkDesc<$RepoRequest, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is Repo]": $.LinkDesc<$Repo, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Owner = $.ObjectType<"default::Owner", $OwnerλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {githubId: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Owner = $.makeType<$Owner>(_.spec, "dd2d3f6f-1490-11ef-842e-a17bcc24070e", _.syntax.literal);

const Owner: $.$expr_PathNode<$.TypeSet<$Owner, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Owner, $.Cardinality.Many), null);

export type $ReactionλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "confused": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "eyes": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "heart": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "hooray": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "laugh": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "minusOne": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "plusOne": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "rocket": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "total_count": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<reactions[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<reactions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Reaction = $.ObjectType<"default::Reaction", $ReactionλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Reaction = $.makeType<$Reaction>(_.spec, "dd22d199-1490-11ef-8973-0767095a418a", _.syntax.literal);

const Reaction: $.$expr_PathNode<$.TypeSet<$Reaction, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Reaction, $.Cardinality.Many), null);

export type $RepoλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "languages": $.LinkDesc<$Language, $.Cardinality.Many, {}, false, false,  false, false>;
  "owner": $.LinkDesc<$Owner, $.Cardinality.One, {}, false, false,  false, false>;
  "topics": $.LinkDesc<$Topic, $.Cardinality.Many, {}, false, false,  false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "forksCount": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "fullName": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "githubId": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, true, false, false, false>;
  "hasIssues": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "homepage": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "issueCommentUrl": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "issuesUrl": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "language": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "openIssuesCount": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "pushedAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "stargazersCount": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "subscribersCount": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "updatedAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "url": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "visibility": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "watchersCount": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "issues": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, true,  false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<repo[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<repo": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Repo = $.ObjectType<"default::Repo", $RepoλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {githubId: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Repo = $.makeType<$Repo>(_.spec, "dd31b37c-1490-11ef-baf3-f7da8c4434b5", _.syntax.literal);

const Repo: $.$expr_PathNode<$.TypeSet<$Repo, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Repo, $.Cardinality.Many), null);

export type $RepoRequestλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "user": $.LinkDesc<$User, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "votes": $.LinkDesc<$Vote, $.Cardinality.Many, {}, false, true,  false, false>;
  "owner": $.LinkDesc<$Owner, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "<repo_request[is Vote]": $.LinkDesc<$Vote, $.Cardinality.Many, {}, false, false,  false, false>;
  "<repo_request": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $RepoRequest = $.ObjectType<"default::RepoRequest", $RepoRequestλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $RepoRequest = $.makeType<$RepoRequest>(_.spec, "452c34ea-17b4-11ef-893e-9bccc7dc0fc4", _.syntax.literal);

const RepoRequest: $.$expr_PathNode<$.TypeSet<$RepoRequest, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($RepoRequest, $.Cardinality.Many), null);

export type $SenatePresenceλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, true, false,  false, false>;
  "updatedAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
}>;
type $SenatePresence = $.ObjectType<"default::SenatePresence", $SenatePresenceλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {user: {__element__: $User, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $SenatePresence = $.makeType<$SenatePresence>(_.spec, "8f385120-1802-11ef-8bb5-8fe0c79cebcd", _.syntax.literal);

const SenatePresence: $.$expr_PathNode<$.TypeSet<$SenatePresence, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SenatePresence, $.Cardinality.Many), null);

export type $SessionλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "expires": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "sessionToken": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "<sessions[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<sessions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Session = $.ObjectType<"default::Session", $SessionλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {sessionToken: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Session = $.makeType<$Session>(_.spec, "dd37eb8a-1490-11ef-9ffd-939979d8ea3b", _.syntax.literal);

const Session: $.$expr_PathNode<$.TypeSet<$Session, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Session, $.Cardinality.Many), null);

export type $TopicλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "<topics[is Repo]": $.LinkDesc<$Repo, $.Cardinality.Many, {}, false, false,  false, false>;
  "<topics": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Topic = $.ObjectType<"default::Topic", $TopicλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Topic = $.makeType<$Topic>(_.spec, "dd2f6b47-1490-11ef-93b0-e54d9ae88bb9", _.syntax.literal);

const Topic: $.$expr_PathNode<$.TypeSet<$Topic, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Topic, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "emailVerified": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "image": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "accounts": $.LinkDesc<$Account, $.Cardinality.Many, {}, false, true,  false, false>;
  "sessions": $.LinkDesc<$Session, $.Cardinality.Many, {}, false, true,  false, false>;
  "votes": $.LinkDesc<$Vote, $.Cardinality.Many, {}, false, true,  false, false>;
  "<user[is Account]": $.LinkDesc<$Account, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Session]": $.LinkDesc<$Session, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is RepoRequest]": $.LinkDesc<$RepoRequest, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Vote]": $.LinkDesc<$Vote, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is SenatePresence]": $.LinkDesc<$SenatePresence, $.Cardinality.AtMostOne, {}, true, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {email: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $User = $.makeType<$User>(_.spec, "dd168196-1490-11ef-ab40-5d1f4c82288f", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $VerificationTokenλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "identifier": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "token": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "expires": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
}>;
type $VerificationToken = $.ObjectType<"default::VerificationToken", $VerificationTokenλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {identifier: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },token: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {token: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $VerificationToken = $.makeType<$VerificationToken>(_.spec, "dd3cde09-1490-11ef-9331-e5658a1927af", _.syntax.literal);

const VerificationToken: $.$expr_PathNode<$.TypeSet<$VerificationToken, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($VerificationToken, $.Cardinality.Many), null);

export type $VoteλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "repo_request": $.LinkDesc<$RepoRequest, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "<votes[is RepoRequest]": $.LinkDesc<$RepoRequest, $.Cardinality.Many, {}, false, false,  false, false>;
  "<votes[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<votes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Vote = $.ObjectType<"default::Vote", $VoteλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Vote = $.makeType<$Vote>(_.spec, "b58266ff-17b4-11ef-aac4-6f7af97632bb", _.syntax.literal);

const Vote: $.$expr_PathNode<$.TypeSet<$Vote, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Vote, $.Cardinality.Many), null);



export { $Account, Account, $GitHubUser, GitHubUser, $Gravitas, Gravitas, $Issue, Issue, $Label, Label, $Language, Language, $OpenAIGPT_4o, OpenAIGPT_4o, $Owner, Owner, $Reaction, Reaction, $Repo, Repo, $RepoRequest, RepoRequest, $SenatePresence, SenatePresence, $Session, Session, $Topic, Topic, $User, User, $VerificationToken, VerificationToken, $Vote, Vote };

type __defaultExports = {
  "Account": typeof Account;
  "GitHubUser": typeof GitHubUser;
  "Gravitas": typeof Gravitas;
  "Issue": typeof Issue;
  "Label": typeof Label;
  "Language": typeof Language;
  "OpenAIGPT_4o": typeof OpenAIGPT_4o;
  "Owner": typeof Owner;
  "Reaction": typeof Reaction;
  "Repo": typeof Repo;
  "RepoRequest": typeof RepoRequest;
  "SenatePresence": typeof SenatePresence;
  "Session": typeof Session;
  "Topic": typeof Topic;
  "User": typeof User;
  "VerificationToken": typeof VerificationToken;
  "Vote": typeof Vote
};
const __defaultExports: __defaultExports = {
  "Account": Account,
  "GitHubUser": GitHubUser,
  "Gravitas": Gravitas,
  "Issue": Issue,
  "Label": Label,
  "Language": Language,
  "OpenAIGPT_4o": OpenAIGPT_4o,
  "Owner": Owner,
  "Reaction": Reaction,
  "Repo": Repo,
  "RepoRequest": RepoRequest,
  "SenatePresence": SenatePresence,
  "Session": Session,
  "Topic": Topic,
  "User": User,
  "VerificationToken": VerificationToken,
  "Vote": Vote
};
export default __defaultExports;
