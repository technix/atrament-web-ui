import { h } from 'preact';
import clsx from 'clsx';
import { useCallback } from 'preact/hooks';
import { Text, useTranslator } from '@eo-locale/preact';
import { defaultSettings } from 'src/constants';
import { useAtrament } from 'src/atrament/hooks';
import MenuListItem from 'src/components/ui/menu-list-item';

const SettingsDefaults = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const restoreDefaultSettings = useCallback(() => {
    Object.entries(defaultSettings).forEach(([name, value]) => {
      atrament.settings.set(name, value);
    })
    atrament.settings.save();
  }, [ atrament ]);

  return (
    <div class={clsx('atrament-settings-defaults')}>
        <MenuListItem
          key={'restore-defaults'}
          onSelect={restoreDefaultSettings}
          isDisabled={false}
          isDeletable={false}
          deletePrompt={''}
          hasConfirmation={true}
          confirmPrompt={translator.translate('settings.confirm-restore-defaults')}
        >
          <Text id={'settings.restore-defaults'} />
        </MenuListItem>
    </div>
  );
};

export default SettingsDefaults;
