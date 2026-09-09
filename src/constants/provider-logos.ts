import type { ImageSourcePropType } from 'react-native';

const ELECTRICITY = {
  aedc: require('../../assets/images/discos/aedc.png'),
  bedc: require('../../assets/images/discos/bedc.png'),
  eedc: require('../../assets/images/discos/eedc.png'),
  ekedc: require('../../assets/images/discos/ekedc.png'),
  ibedc: require('../../assets/images/discos/ibedc.png'),
  ikedc: require('../../assets/images/discos/ikedc.png'),
  jedc: require('../../assets/images/discos/jedc.png'),
  kaedco: require('../../assets/images/discos/kaedco.png'),
  kedco: require('../../assets/images/discos/kedco.webp'),
  phedc: require('../../assets/images/discos/phedc.png'),
  yedc: require('../../assets/images/discos/yedc.png'),
} satisfies Record<string, ImageSourcePropType>;

const NETWORK = {
  mtn: require('../../assets/images/providers/mtn.png'),
  airtel: require('../../assets/images/providers/airtel.svg'),
  glo: require('../../assets/images/providers/glo.svg'),
  '9mobile': require('../../assets/images/providers/9mobile.svg'),
} satisfies Record<string, ImageSourcePropType>;

const TV = {
  dstv: require('../../assets/images/providers/dstv.png'),
  gotv: require('../../assets/images/providers/gotv.png'),
  startimes: require('../../assets/images/providers/startimes.png'),
} satisfies Record<string, ImageSourcePropType>;

export const EXAM_PROVIDER_LOGOS: Record<string, ImageSourcePropType> = {
  WAEC: require('../../assets/images/providers/waec.png'),
  JAMB: require('../../assets/images/providers/jamb.png'),
  NECO: require('../../assets/images/providers/neco.png'),
};

const DATA: Record<string, ImageSourcePropType> = {
  'mtn-data': NETWORK.mtn,
  'airtel-data': NETWORK.airtel,
  'glo-data': NETWORK.glo,
  '9mobile-data': NETWORK['9mobile'],
};

export const PROVIDER_LOGOS: Record<string, ImageSourcePropType> = {
  ...ELECTRICITY,
  ...NETWORK,
  ...TV,
  ...DATA,
};

export const ELECTRICITY_PROVIDER_LOGOS = ELECTRICITY;