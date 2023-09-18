import React, {useEffect, useState} from "react";
import api from "./services/api"
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

  export default function fgetInfo() {

    const [cToken, setPesq] = useState({ cToken: "" });
    const [lista, setLista] = useState([]);
    useEffect(() => {
  
      axios.get('/tkn/${cToken}').then(({data}) => {
        setLista(data);
      });
      console.log();

    }, []);
  
    const handlingcCnab = (e) => {
      setPesq(e.target.value);
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
          Consulta Autenticação Bancária
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
                  <FormLabel htmlFor="titulo">Número do Título: </FormLabel>
                  <Input
                    id="titulo"
                    onChange={(e) => {
                      handlingcCnab(e);
                    }}
                  />
                </Box>
              </HStack>

              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="matricula">Matrícula ou CPF: </FormLabel>
                  <Input
                    id="matricula"
                    onChange={(e) => {
                      handlingcCnab(e);
                    }}
                  />
                </Box>
              </HStack>
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="matricula">Nome do Italo: </FormLabel>
                  <Input
                    id="matricula"
                    onChange={(e) => {
                      handlingcCnab(e);
                    }}
                  />
                </Box>
              </HStack>

              <HStack justify="center">
                <Button
                  onClick={fgetInfo}
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
                <li>Token: {lista["ZBP_TKNRET"]}</li>
                <li>Chave:  {lista["ZBP_CHAVE"]}</li> 
                <li>Matricula: {lista["ZBP_MAT"]}</li>
                <li>Usuário: {lista["ZBP_USER"]}</li>
                <li>Observação: {lista["ZBP_OBS"]}</li>
                <li>Data Proc: {lista["ZBP_DATPRC"]}</li>
                <li>Arquivo: {lista["ZBP_ARQUIV"]}</li>        
                
              </ul>
            </FormControl>
          </Center>
        </Flex>
      </Box>
    </>
  )
}
