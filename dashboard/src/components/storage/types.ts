// Copyright 2017-2020 @polkadot/app-storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { StorageEntryBase } from '@polkadot/api/types';

export type StorageEntryPromise = StorageEntryBase<'promise', any>;

interface Base {
  isConst: boolean;
}

interface IdQuery extends Base {
  id: number;
}

export interface PartialModuleQuery extends Base {
  key: StorageEntryPromise;
  params: any;
}

export type StorageModuleQuery = PartialModuleQuery & IdQuery;

export interface PartialRawQuery extends Base {
  key: Uint8Array;
}

export type StorageRawQuery = PartialRawQuery & IdQuery;

export interface PartialConstQuery extends Base {
  key: any;
}

export type ConstQuery = PartialConstQuery & IdQuery;

export type QueryTypes = StorageModuleQuery | StorageRawQuery | ConstQuery;

export type ParitalQueryTypes = PartialModuleQuery | PartialRawQuery | PartialConstQuery;

