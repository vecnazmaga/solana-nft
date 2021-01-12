import { Client, KeyInfo, QueryJSON, ThreadID, Where } from '@textile/hub';
import { Collection, NFT, State, computeAndUpdateCollection, computeAndUpdateNft } from './scheme'
import TextileService from './TextileService';
import { RmrkEvent, RMRK, RmrkInteraction } from '../types'
import NFTUtils from './NftUtils'
import { emptyObject } from '@/utils/empty';
import Consolidator from './Consolidator';

export type RmrkType = Collection | NFT

export enum AvailableCollection {
  COLLECTION = 'collection',
  NFT = 'nft'
}

export class RmrkService extends TextileService<RmrkType> implements State {
  protected _client: Client;
  // private _url: string;
  protected _dbStore: string;
  private _name: AvailableCollection = AvailableCollection.COLLECTION;

  private constructor(keyInfo: KeyInfo, url?: string) {
    super(keyInfo)
    this._client = emptyObject<Client>();
    const defaultUrl = 'bafkqswn7uhcawhc74xne4zlhoebazbnsqa2n7k6yrqdt4sqedugmrsq';
    this._dbStore = url || defaultUrl;
  }

  public static async setup(keyInfo: KeyInfo, url?: string): Promise<RmrkService> {
    const rmrkService = new RmrkService(keyInfo, url)
    try {
      rmrkService._client = await Client.withKeyInfo(keyInfo)
    } catch(err) {
      throw new Error(`[RMRK SERVICE]: ${err.message}`)
    }

    return rmrkService
  }

  get collectioName(): string {
    return this._name
  }

  private useNFT() {
    this._name = AvailableCollection.NFT
  }

  private useCollection() {
    this._name = AvailableCollection.COLLECTION
  }

  async getNFTsForCollection(id: string): Promise<NFT[]> {
    this.useNFT();
    const query: QueryJSON = new Where('collection').eq(id)
    const nfts = await this.find<NFT>(query)
    return nfts
  }

  async getNFT(id: string): Promise<NFT> {
    this.useNFT();
    this.shouldExist(id);
    const nft = await this.getCollection<NFT>(id)
    return nft
  }

  async getNFTsForAccount(account: string): Promise<NFT[]> {
    this.useNFT();
    const query: QueryJSON = new Where('currentOwner').eq(account)
    const nfts = await this.find<NFT>(query)
    return nfts
  }

  async getCollectionListForAccount(account: string): Promise<Collection[]> {
    const query: QueryJSON = new Where('issuer').eq(account)
    const collections = await this.find<Collection>(query)
    return collections
  }

  getLastSyncedBlock(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  refresh(): Promise<State> {
    throw new Error('Method not implemented.');
  }

  public test(rmrkString: string): RMRK {
    try {
      const resolved: RMRK = NFTUtils.decodeAndConvert(rmrkString)
      return resolved
    } catch (e) {
      throw e
    }

  }

  public resolve(rmrkString: string, caller: string): Promise<RmrkType> {
    try {
      const resolved: RMRK = NFTUtils.decodeAndConvert(rmrkString)
      switch (resolved.event) {
        case RmrkEvent.MINT:
          return this.mint(resolved.view, caller)
        case RmrkEvent.MINTNFT:
          return this.mintNFT(resolved.view, caller)
        case RmrkEvent.SEND:
          return this.send(resolved.view, caller)
        case RmrkEvent.BUY:
          return this.buy(resolved.view as RmrkInteraction, caller)
        case RmrkEvent.CONSUME:
          return this.consume(resolved.view as RmrkInteraction, caller)
        case RmrkEvent.LIST:
          return this.list(resolved.view as RmrkInteraction, caller)
        case RmrkEvent.CHANGEISSUER:
          return this.changeIssuer(resolved.view as RmrkInteraction, caller)
        default:
          throw new EvalError(`Unable to evaluate following string, ${rmrkString}`)
      }
    } catch (e) {
      throw e
    }

  }

  public async deleteAllNFT(): Promise<string[]> {
    const nfts = await this.getAllNFTs();
    const ids = nfts.map(nft => nft._id);
    await this.remove(ids)
    return ids
  }

  public async deleteAllCollection(): Promise<string[]> {
    const collections = await this.getAllCollections();
    const ids = collections.map(el => el._id);
    await this.remove(ids)
    return ids
  }

  private async changeIssuer(view: RmrkInteraction, caller: string): Promise<Collection> {
    this.useCollection();

    try {
      this.shouldExist(view.id)
      const collection = await this.getCollection<Collection>(view.id)
      Consolidator.isIssuer(collection, caller)
      const updatedCollection: Collection = {
        ...collection,
        issuer: view.id
      }
      await this.update(updatedCollection)
      return collection
    } catch (e) {
      throw e
    }
  }

  async list(view: RmrkInteraction, caller: string): Promise<RmrkType> {
    if (!view.metadata) {
      throw new EvalError(`[RMRK Service] Unable to LIST ${view.id} without modifier`);
    }

    this.useNFT();
    this.shouldExist(view.id);
    const nft = await this.getCollection<NFT>(view.id)
    Consolidator.isOwner(nft, caller)
    if (view.metadata === 'cancel') {
      nft.price = undefined
    } else if (Number(view.metadata) > 0) {
      nft.price = view.metadata
    } else {
      throw new EvalError(`[RMRK Service] Bad modifier ${view.metadata} for LIST ${view.id}`);
    }
    
    await this.update(nft)
    return nft
  }

  private async consume(view: RmrkInteraction, caller: string): Promise<NFT> {
    this.useNFT();
    this.shouldExist(view.id);
    const nft = await this.getCollection<NFT>(view.id)
    Consolidator.isOwner(nft, caller)
    await this.remove(nft._id)
    return nft
  }

  buy(view: RmrkInteraction, caller: string): Promise<RmrkType> {
    throw new EvalError(`[RMRK Service] Buy does not change state ${view.id}`);
  }

  private async mint(view: object, caller: string): Promise<Collection> {
    const collection = computeAndUpdateCollection(view as Collection);
    this.useCollection();

    // Consolidator.collectionIdValid(collection, caller);
    
    const hasCollection = await this.hasCollection();
    if (!hasCollection) {
      await this.createCollection(collection)
    }
  
    const collectionAlreadyCreated = await this.exists(collection._id);

    if (collectionAlreadyCreated) {
      throw ReferenceError(`[RMRK Service] Collection already created ${collection._id}`)
    }

    await this.addToCollection(collection)
    return collection;
  }

  private async mintNFT(view: object, caller: string): Promise<NFT> {
    const item = computeAndUpdateNft(view as NFT);
    this.useCollection();
    await this.shouldExist(item.collection);
    const collection = await this.findById<Collection>(item.collection);
    Consolidator.isIssuer(collection, caller)
    this.useNFT();

    item.currentOwner = caller;

    const hasCollection = await this.hasCollection();
    if (!hasCollection) {
      await this.createCollection(item)
    }

    const nftAlreadyCreated = await this.exists(item._id);

    if (nftAlreadyCreated) {
      throw ReferenceError(`[RMRK Service] NFT already created ${item._id}`)
    }

    await this.addToCollection(item);
    return item
  }

  private async send(view: object, caller: string): Promise<NFT> {
    const item = (view as RmrkInteraction);
    this.useNFT();

    try {
      await this.shouldExist(item.id)
      const nft = await this.getCollection<NFT>(item.id)
      Consolidator.isOwner(nft, caller)
      const updatedNft: NFT = {
        ...nft,
        currentOwner: item.metadata || nft.currentOwner
      }

      await this.update(updatedNft)

      return updatedNft
    } catch (e) {
      throw e
    }
  }

  public async joinStore(): Promise<void> {
    try {
      const info = await this.getInfo()
      await this.joinFromInfo(info)
    } catch(e) {
      console.warn(`RMRK Service ${e.message}`)
      // return await this.createDB('', this._dbStore)
    }
  }

  public getAllCollections(): Promise<Collection[]> {
    this.useCollection()
    return this.findAll()
  }

  public getAllNFTs(): Promise<NFT[]> {
    this.useNFT()
    return this.findAll()
  }
}


let instance: RmrkService | null;

export const getInstance = (): RmrkService | null => {
  return instance
}

export const createInstance = async (keyInfo: KeyInfo, url?: string): Promise<RmrkService> => {
  if (!instance) {
    instance = await RmrkService.setup(keyInfo, url)
    // await instance.joinStore()
  }

  return instance
}
