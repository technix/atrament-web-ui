import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';

const DialogYesNo = ({ prompt, onAccept, onReject, attributes}) => (
  <div class={style.container}>
    <div class={style.prompt}>{prompt}</div>
    <button onClick={onAccept} class={`${style.menu_item} ${style.delete_item} ${style.small}`} {...attributes}>
      <Text id='yes' />
    </button>
    <button onClick={onReject} class={`${style.menu_item} ${style.small}`} {...attributes}>
      <Text id='no' />
    </button>
  </div>
);


const MenuListItem = ({
  children,
  key,
  onSelect,
  isDisabled = false,
  isDeletable = false,
  onDelete = ()=>{},
  deletePrompt = '',
  hasConfirmation = false,
  confirmPrompt = '',
  attributes={}
}) => {
  const [ isDeleteDialog, displayDeleteDialog ] = useState(false);
  const [ isConfirmDialog, displayConfirmDialog ] = useState(false);
  
  const showDeleteDialog = () => displayDeleteDialog(true);
  const hideDeleteDialog = () => displayDeleteDialog(false);
  const handleDelete = (ev) => {
    onDelete(ev);
    hideDeleteDialog();
  }

  const showConfirmDialog = () => displayConfirmDialog(true);
  const hideConfirmDialog = () => displayConfirmDialog(false);
  const handleConfirm = (ev) => {
    onSelect(ev);
    hideConfirmDialog();
  }

  if (isConfirmDialog) {
    return (<DialogYesNo prompt={confirmPrompt} onAccept={handleConfirm} onReject={hideConfirmDialog} attributes={attributes} />);
  } else if (isDeleteDialog) {
    return (<DialogYesNo prompt={deletePrompt} onAccept={handleDelete} onReject={hideDeleteDialog} attributes={attributes} />);
  }

  return (
    <div class={style.container}>
      <button
        key={key}
        onClick={hasConfirmation ? showConfirmDialog : onSelect}
        disabled={isDisabled}
        class={`${style.menu_item} ${isDeletable && style.is_deletable}`}
        {...attributes}
      >
        {children}
      </button>
      {(isDeletable && !isDisabled) && 
        <button
          key={key}
          onClick={showDeleteDialog}
          class={`${style.menu_item} ${style.delete_button}`}
          {...attributes}
        >
          &#x2715;
        </button>}
    </div>
  );
};

export default MenuListItem;
