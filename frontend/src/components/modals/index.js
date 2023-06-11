import ModalAddig from './ModalAdding';
import ModalRemove from './ModalRemove';
import ModalRename from './ModalRename';

const modals = {
  addChannel: ModalAddig,
  removeChannel: ModalRemove,
  renameChannel: ModalRename,
};

export default (modalName) => modals[modalName];
