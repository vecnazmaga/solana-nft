import i18n from '@/i18n';
import { Column, Row, SimpleRankingsNFT } from './types';
import formatBalance from '@/utils/formatBalance';
import store from '@/store';
import { sanitizeIpfsUrl, fetchCollectionMetadata } from '@/components/rmrk/utils';

export const columns: Column[] = [
  { field: 'id', label: i18n.t('spotlight.id') },
  { field: 'rank', label: i18n.t('spotlight.score'), numeric: true },
  { field: 'unique', label: i18n.t('spotlight.unique'), numeric: true },
  { field: 'averagePrice', label: 'Floor price', numeric: true},
  // { field: 'uniqueCollectors', label: i18n.t('spotlight.collectors'), numeric: true },
  { field: 'collectors', label: i18n.t('spotlight.collectors'), numeric: true },
  { field: 'sold', label: i18n.t('spotlight.sold'), numeric: true },
  { field: 'total', label: i18n.t('spotlight.total'), numeric: true }
];

export const nftFn = (a: any): Row => {
  const sold = a.nfts.nodes.reduce(soldFn, 0);
  const unique = a.nfts.nodes.reduce(uniqueFn, new Set()).size;
  const uniqueCollectors = a.nfts.nodes.reduce(uniqueCollectorFn, new Set()).size;
  const total = a.nfts.totalCount;
  const averagePrice = a.nfts.nodes.filter(onlyOwned).reduce(sumFn, 0) / (a.nfts.nodes.length || 1)
  // const metaImage = fetchMetadataImage(a); DO NOT!

  // console.log(a.nfts.nodes.reduce(soldFn, new Set()));
  // console.log(a.nfts.nodes.filter(onlyEvents));
  return {
    id: a.id,
    name: a.name,
    image: '', // NOPE
    metadata: a.metadata,
    total,
    sold,
    unique,
    uniqueCollectors,
    averagePrice,
    collectors: 0, // a.nfts.nodes.reduce(uniqueCollectorFn, new Set()),
    rank: sold * (unique / total)
  };
};

const fetchMetadataImage = async (collection: any) => {
  // console.log(collection)
  const meta = await fetchCollectionMetadata(collection)
  const image = sanitizeIpfsUrl(meta.image || '')
  return image
}

const formatNumber = (val: SimpleRankingsNFT) =>
  Number(
    formatBalance(
      val.price,
      store.getters.getChainProperties.tokenDecimals,
      false,
      true
    )
  );
const sumFn = (acc: number, val: SimpleRankingsNFT) => acc + formatNumber(val);
const soldFn = (acc: number, val: SimpleRankingsNFT) => val.issuer !== val.currentOwner ? acc + 1 : acc;
const uniqueFn = (acc: Set<string>, val: SimpleRankingsNFT) => acc.add(val.metadata);
const uniqueCollectorFn = (acc: Set<string>, val: SimpleRankingsNFT) => val.issuer !== val.currentOwner ? acc.add(val.currentOwner) : acc
const onlyOwned = ({ issuer, currentOwner }: SimpleRankingsNFT) => issuer === currentOwner;
const onlyEvents = ({events}: SimpleRankingsNFT) => events
// const flootPrice = (nfts: SimpleRankingsNFT) => Math.min(nfts)

//   get collectionFloorPrice() {
//     return Math.min(
//       ...this.nfts
//         .map(nft => Number(nft.price))
//         .filter(price => price > 0)
//     );
//   }
