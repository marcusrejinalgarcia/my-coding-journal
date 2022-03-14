import React from 'react';
import { Box, ButtonGroup, Button } from '@chakra-ui/react';

const Journal = () => {
  return (
    <Box>
      <ButtonGroup>
        <Button colorScheme='teal'>
          + Add Item
        </Button>
        <Button>
          Delete All
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default Journal