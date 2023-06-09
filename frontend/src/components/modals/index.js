import ModalAddig from './ModalAdding';
import ModalRemove from './ModalRemove';

const modals = {
  addChannel: ModalAddig,
  removeChannel: ModalRemove,
};

export default (modalName) => modals[modalName];
