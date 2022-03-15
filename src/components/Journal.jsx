import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  chakra,
  Spacer,
  Link,
  Text,
  IconButton
} from '@chakra-ui/react';
import {
  CheckIcon,
  DeleteIcon
} from "@chakra-ui/icons"
import { v4 as uuid } from 'uuid';


const Journal = ({list}) => {
  const localStore = localStorage.getItem("Journal") ? JSON.parse(localStorage.getItem("Journal")) : [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(uuid());
  const titleRef = useRef(null);
  const notesRef = useRef(null);
  const [notesList, setNotesList] = useState(localStore);

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date()
    const entry = {
      id: id,
      date: date.toLocaleDateString(), 
      title: titleRef.current.value,
      notes: notesRef.current.value,
      category: list,
      isDone: false
    }

    setNotesList([...notesList, entry]);

    setId(uuid());
    titleRef.current.value = null;
    notesRef.current.value = null;
  }

  useEffect(() => {
    localStorage.setItem("Journal", JSON.stringify(notesList, null, 2));
  }, [notesList])

  const deleteCategory = () => {
    const newNotesList = notesList.filter(entry => entry.category !== list);
    setNotesList(newNotesList);
  }

  const ItemCard = ({ id, title, notes, date }) => {

    function markDone(entryId) {
      let newNotesList = notesList;
      let index = newNotesList.findIndex(el => el.id === entryId);
      newNotesList[index].isDone = !newNotesList[index].isDone;
      console.log(newNotesList[index].isDone);
      console.table(newNotesList);
      setNotesList(newNotesList);
      // For some reason, useEffect won't run here, but runs for deleteEntry. Next line is a workaround
      localStorage.setItem("Journal", JSON.stringify(notesList, null, 2));
    }
    function deleteEntry(entryId) {
      const newNotesList = notesList.filter((entry) => entry.id !== entryId);
      setNotesList(newNotesList);
    }

    return (
      <Flex
        direction='column'
        mx="auto"
        mt={4}
        px={8}
        py={4}
        minH='240'
        grow='1'
        shrink='0'
        basis='200'
        rounded="lg"
        shadow="xl"
        bg={useColorModeValue("white", "gray.800")}
        // _hover={{
        //   bg: useColorModeValue("gray.200", "gray.700")
        // }}
      >
        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            {title}
          </Link>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {notes}
          </chakra.p>
        </Box>
        <Spacer />
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Text
            color={useColorModeValue("brand.600", "brand.400")}
          >
            {date}
          </Text>
          <Flex>
            <IconButton
              variant='ghost'
              aria-label='Mark as Done'
              icon={<CheckIcon />}
              onClick={() => markDone(id)}
            />
            <IconButton
              variant='ghost'
              aria-label='Delete Entry'
              icon={<DeleteIcon />}
              onClick={() => deleteEntry(id)}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box 
      align='start' 
      bg={useColorModeValue("gray.200", "gray.700")} 
      rounded="lg" 
      shadow="lg" 
      p={4}
    >
      <ButtonGroup>
        <Button
          colorScheme='blue'
          onClick={onOpen}
        >
          + Add Entry
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Entry</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input bg={useColorModeValue("gray.100", "gray.800")} ref={titleRef} placeholder='Title goes here' />

                  <FormLabel>Notes</FormLabel>
                  <Textarea bg={useColorModeValue("gray.100", "gray.800")} ref={notesRef} placeholder='Notes go here' />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='ghost'
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  colorScheme='blue'
                  mr={3}
                  type='submit'
                  onClick={onClose}
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>        
        
        <Button variant='ghost' onClick={deleteCategory}>
          Delete All
        </Button>
      </ButtonGroup>

      <Flex direction='row-reverse' wrap='wrap' gap={4} justify='start'>
        {notesList.map((entry) => {
          if (entry.category === list) {
            return (
              <ItemCard 
                key={entry.id} 
                id={entry.id}
                title={entry.title} 
                notes={entry.notes} 
                date={entry.date} 
                isDone={entry.isDone}
              />
          )}
        })}
      </Flex>
    </Box>
  )
}

export default Journal