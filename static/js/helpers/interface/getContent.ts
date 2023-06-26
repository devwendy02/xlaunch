import ashswap from 'assets/content/ashswap.json';
import cantina from 'assets/content/cantina-royale.json';
import global from 'assets/content/global.json';
import hatom from 'assets/content/hatom.json';
import holoride from 'assets/content/holoride.json';
import itheum from 'assets/content/itheum.json';
import { ProjectsEnum } from 'config';

export const getContent = (project: string) => {
  switch (project) {
    case ProjectsEnum.HOLORIDE:
      return holoride;
    case ProjectsEnum.ITHEUM:
      return itheum;
    case ProjectsEnum.CANTINA:
      return cantina;
    case ProjectsEnum.ASHSWAP:
      return ashswap;
    case ProjectsEnum.HATOM:
    default:
      return hatom;
  }
};

export const getGlobalContent = () => {
  return global;
};
