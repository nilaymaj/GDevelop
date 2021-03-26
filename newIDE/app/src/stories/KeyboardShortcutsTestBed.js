// @flow
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  getShortcutDisplayName,
  getShortcutMetadataFromEvent,
  useKeyboardShortcuts,
} from '../KeyboardShortcuts';

type Props = {||};

const KeyboardShortcutsTestBed = (props: Props) => {
  const [commandName, setCommandName] = React.useState('');
  const [shortcutString, setShortcutString] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  useKeyboardShortcuts(commandName => setCommandName(commandName));

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      const metadata = getShortcutMetadataFromEvent(e);
      // if (e.type === 'keyup') return;
      setIsValid(metadata.isValid);
      setShortcutString(metadata.shortcutString);
    };
    document.addEventListener('keyup', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('keyup', handler);
    };
  }, []);

  return (
    <>
      <Typography>
        Shortcut string: {shortcutString || 'Press a shortcut...'}
      </Typography>
      <Typography>Command called: {commandName || ''}</Typography>
      <Typography>
        Shortcut displayed as:{' '}
        {shortcutString
          ? getShortcutDisplayName(shortcutString)
          : 'Press a shortcut combination...'}
      </Typography>
      <Typography>Is the shortcut valid: {isValid ? 'Yes' : 'No'}</Typography>
    </>
  );
};

export default KeyboardShortcutsTestBed;
