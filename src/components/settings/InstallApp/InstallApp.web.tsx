import React from 'react';
import { Button } from 'react-native-paper';

export default function InstallApp() {
  return (
    <Button onPress={() => window.dispatchEvent(new Event('trailpack:install'))}>
      Install app
    </Button>
  );
}
