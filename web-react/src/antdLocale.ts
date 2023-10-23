import { mergeLocale } from "antd-mobile/es/utils/merge-locale";
import { base } from "antd-mobile/es/locales/base";

const ptBR = mergeLocale(base, {
  ImageUploader: {
    uploading: "Enviando...",
  },
});

export default ptBR;
