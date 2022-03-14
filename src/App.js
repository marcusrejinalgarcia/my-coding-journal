import React from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Container,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Journal from './components/Journal';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Heading>Coding Journal</Heading>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <Container>
        <Tabs variant='soft-rounded' align='center' >
          <TabList>
            <Tab>To Do</Tab>
            <Tab>Daily Thoughts</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              To Do
              <Journal />
            </TabPanel>
            <TabPanel>
              Daily Thoughts
              <Journal />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

    </ChakraProvider>
  );
}

export default App;
