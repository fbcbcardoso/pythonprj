import React, {useState} from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";

export default function Lista() {
  const [ZBP_TKNRET, setCnab] = useState({ ZBP_TKNRET: "" });
  const [informacoes, setInformacoes] = useState([]);

  const getInformacoes = () => {
   // axios.get(`http://localhost:3005/tkn/${ZBP_TKNRET}`).then((response) => {
  axios.get(`https://viacep.com.br/ws/${ZBP_TKNRET}/json/`).then((response) => {
    setInformacoes(response.data);
    })
  };
  
  const handlingcCnab = (e) => {
    setCnab(e.target.value);
  };

  

  return (
    <>
      <Box h="100vh">
        <Center
          as="header"
          h={150}
          bg="blue.700"
          color="white"
          fontWeight="bold"
          fontSize="4xl"
          pb="8"
        >
          Sistema de consulta de localidades
        </Center>
        <Flex
          align="center"
          justify="center"
          bg="blackAlpha.200"
          h="calc(100vh - 150px)"
        >
          <Center
            w="100%"
            maxW={840}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="titulo">Digite o seu CEP: </FormLabel>
                  <Input
                    id="titulo"
                    onChange={(e) => {
                      handlingcCnab(e);
                    }}
                  />
                </Box>
              </HStack>

              <HStack justify="center">
                <Button
                  onClick={getInformacoes}
                  w={240}
                  p="6"
                  type="submit"
                  bg="blue.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "teal.800" }}
                >
                  Pesquisar
                </Button>
              </HStack>
              
              <ul>
                <li>cep: {informacoes["cep"]}</li>
                <li>logradouro:  {informacoes["logradouro"]}</li> 
                <li>complemento: {informacoes["complemento"]}</li>
                <li>ibge: {informacoes["ibge"]}</li>
                <li>localidade: {informacoes["localidade"]}</li>
                <li>bairro: {informacoes["bairro"]}</li>
                <li>uf: {informacoes["uf"]}</li>        
                
              </ul>
            </FormControl>
          </Center>
        </Flex>
      </Box>
    </>
  );
}
