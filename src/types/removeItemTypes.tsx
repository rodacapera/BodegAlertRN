export interface ItemCardProps {
  title: string;
  subtitle?: string;
  index: number;
  touchable?: boolean;
  modalVisible: boolean;
  removeItem?: (e: number) => void;
  setModalVisible?: (e: boolean) => void;
}
