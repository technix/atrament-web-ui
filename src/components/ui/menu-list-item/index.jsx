import { h } from 'preact';
import clsx from 'clsx';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';
import { useToggle } from 'src/hooks';

const DialogYesNo = ({ prompt, onAccept, onReject, attributes }) => (
  <div class={style.container}>
    <div class={style.prompt}>{prompt}</div>
    <button onClick={onAccept} class={clsx(style.menu_item, style.delete_item, style.small)} {...attributes}>
      <Text id='yes' />
    </button>
    <button onClick={onReject} class={clsx(style.menu_item, style.small)} {...attributes}>
      <Text id='no' />
    </button>
  </div>
);


const MenuListItem = ({
  children,
  key,
  onSelect,
  accented = false,
  isDisabled = false,
  isDeletable = false,
  onDelete = () => {},
  deletePrompt = '',
  hasConfirmation = false,
  confirmPrompt = '',
  attributes={}
}) => {
  const [ isDeleteDialog, , , showDeleteDialog, hideDeleteDialog ] = useToggle(false);
  const [ isConfirmDialog, , , showConfirmDialog, hideConfirmDialog ] = useToggle(false);

  const handleDelete = (ev) => {
    onDelete(ev);
    hideDeleteDialog();
  }

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
        class={clsx(style.menu_item, accented && style.accented, isDeletable && style.is_deletable)}
        {...attributes}
      >
        {children}
      </button>
      {(isDeletable && !isDisabled) &&
        <button
          key={key}
          onClick={showDeleteDialog}
          class={clsx(style.menu_item, style.delete_button)}
          {...attributes}
        >
          &#x2715;
        </button>}
    </div>
  );
};

export default MenuListItem;
