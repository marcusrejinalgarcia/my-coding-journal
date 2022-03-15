import React from 'react';
import {
  ChakraProvider,
  Flex,
  Spacer,
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
import Journal from './components/Journal';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex textAlign="center" fontSize="xl" m={4}>
        <Heading>Coding Journal</Heading>
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <Container maxW='container.xl'>
        <Tabs isLazy variant='soft-rounded' align='center' >
          <TabList>
            <Tab>To Do</Tab>
            <Tab>Daily Thoughts</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Journal list='To Do' />
            </TabPanel>
            <TabPanel>
              <Journal list='Daily Thoughts' />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

    </ChakraProvider>
  );
}

export default App;
