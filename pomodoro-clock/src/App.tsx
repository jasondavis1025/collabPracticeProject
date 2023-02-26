import { MantineProvider, Text } from '@mantine/core';
import Timer from './Components/Timer';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Timer />
    </MantineProvider>
  );
  
}