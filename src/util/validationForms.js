import i18n from "../i18n";

const t = (key) => i18n.t("IframeMainView.advancedOptions." + key)

export function validateHeightWidth(value) {
  let error;
  if (/\D/i.test(value)) {
    error = `${t('Only digits')}`;
  } else if (!/\w{2}/i.test(value)) {
    error = `${t('Too short')}`;
  } else if (/\w{5}/i.test(value)) {
    error = `${t('Too hight')}`;
  } else if (/^0/i.test(value)) {
    error = `${t("Zero can't been first")}`;
  }
  return error;
}

export function validateHashtag(value) {
  let error;
  if (/\s/i.test(value)) {
    error = `${t("No whitespace")}`;
  }
  return error;
}