export const precisions = {
  ante_lind: 4,
  lind_usdt: 4,
  btt_lind: 4,
  "888_lind": 4,
  vcoin_lind: 4,
  tnx_lind: 4,
  terc_lind: 4,
  vena_lind: 4,
  seed_lind: 4,
  cgiza_lind: 4,
  poppy_lind: 4,
  twx_lind: 4,
  up_lind: 4,
  twm_lind: 4,
  scc_lind: 4,
  dc_lind: 4,
  kaos_lind: 4,
  cdf_lind: 4,
  tsy_lind: 4,
  ace_lind: 5,
  igg_lind: 5,
  win_lind: 5,
  win_usdt: 6,
  att_lind: 5,
  twj_lind: 5,
  tone_lind: 5,
  lindaish_lind: 5,
  sct_lind: 5,
  btt_usdt: 6,
  igg_usdt: 6,
  lvh_lind: 6,
  truc_lind: 6,
  nfun_lind: 6,
  blaze_lind: 4,
  hora_lind: 6,
  mlt_lind: 6,
  live_lind: 4,
  vcoin_usdt: 5,
  poppy_usdt: 5,
  "888_usdt": 5,
  tshare_lind: 4,
  topia_lind: 3,
  dvs_lind: 2,
  bnkr_lind: 3,
  btzc_lind: 4,
};

export function fixed(value, n) {
  // return Math.floor(value * Math.pow(10, n)) / Math.pow(10, sn)
  value = value + "";
  if (n === 0) {
    value = parseInt(value);
  } else {
    if (value.lastIndexOf(".") > -1) {
      value = value.substring(0, value.lastIndexOf(".") + n + 1);
    }
  }

  return Number(value);
}
