import {
  year1977,
  aden,
  amaro,
  ashby,
  brannan,
  brooklyn,
  charmes,
  clarendon,
  crema,
  dogpatch,
  earlybird,
  gingham,
  ginza,
  hefe,
  helena,
  hudson,
  inkwell,
  kelvin,
  juno,
  lark,
  lofi,
  ludwig,
  maven,
  perpetua,
  mayfair,
  moon,
  nashville,
  reyes,
  rise,
  sierra,
  skyline,
  slumber,
  stinson,
  sutro,
  toaster,
  valencia,
  vesper,
  walden,
  willow,
  xpro2,
  type Preset,
} from 'instagram-filters'

type Filter = {
  name: string
  filter: () => Preset
}

export const filters: Filter[] = [
  { name: '1977', filter: year1977 },
  { name: 'aden', filter: aden },
  { name: 'amaro', filter: amaro },
  { name: 'ashby', filter: ashby },
  { name: 'brannan', filter: brannan },
  { name: 'brooklyn', filter: brooklyn },
  { name: 'charmes', filter: charmes },
  { name: 'clarendon', filter: clarendon },
  { name: 'crema', filter: crema },
  { name: 'dogpatch', filter: dogpatch },
  { name: 'earlybird', filter: earlybird },
  { name: 'gingham', filter: gingham },
  { name: 'ginza', filter: ginza },
  { name: 'hefe', filter: hefe },
  { name: 'helena', filter: helena },
  { name: 'hudson', filter: hudson },
  { name: 'inkwell', filter: inkwell },
  { name: 'kelvin', filter: kelvin },
  { name: 'juno', filter: juno },
  { name: 'lark', filter: lark },
  { name: 'lofi', filter: lofi },
  { name: 'ludwig', filter: ludwig },
  { name: 'maven', filter: maven },
  { name: 'mayfair', filter: mayfair },
  { name: 'moon', filter: moon },
  { name: 'nashville', filter: nashville },
  { name: 'perpetua', filter: perpetua },
  // { name: 'poprocket', filter:  },
  { name: 'reyes', filter: reyes },
  { name: 'rise', filter: rise },
  { name: 'sierra', filter: sierra },
  { name: 'skyline', filter: skyline },
  { name: 'slumber', filter: slumber },
  { name: 'stinson', filter: stinson },
  { name: 'sutro', filter: sutro },
  { name: 'toaster', filter: toaster },
  { name: 'valencia', filter: valencia },
  { name: 'vesper', filter: vesper },
  { name: 'walden', filter: walden },
  { name: 'willow', filter: willow },
  { name: 'xpro-ii', filter: xpro2 },
]
