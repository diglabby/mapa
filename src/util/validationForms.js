import i18n from "../i18n";

const t = (key) => i18n.t("IframeMainView.advancedOptions.errors." + key)

export function validateHeightWidth(value) {
  let error;
  if (/\D/i.test(value)) {
    error = `${t('digits')}`;
  } else if (!/\w{2}/i.test(value)) {
    error = `${t('short')}`;
  } else if (/\w{5}/i.test(value)) {
    error = `${t('hight')}`;
  } else if (/^0/i.test(value)) {
    error = `${t("zero")}`;
  }
  return error;
}

export function validateHashtag(value) {
  let error;
  if (/\s/i.test(value)) {
    error = `${t("whitespace")}`;
  }
  return error;
}