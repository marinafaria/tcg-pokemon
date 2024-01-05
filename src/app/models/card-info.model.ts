export interface CardInfo {
  id: string;
  name: string;
  supertype: string;
  images: {
    small: string;
    large: string;
  };
  types: string[];
}
