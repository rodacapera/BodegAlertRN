export interface ItemCardProps {
  titleAlert?: string;
  subtitleAlert?: string;
  titleCard: string;
  subtitleCard?: string;
  index: number;
  touchable?: boolean;
  modalVisible?: boolean;
  removeItem?: (e: number) => void;
  setModalVisible?: (e: boolean) => void;
}
