import React from "react";
import { useState, useEffect } from "react";
import { MetamaskContext } from "./hook/connectMetamask";
import { useContext } from "react";
import {
  Flex,
  Box,
  Text,
  Progress,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Tbody,
  Tr,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const App = () => {
  const { connectWallet,
    userBalance,
    usdcBalance,
    usdtBalance,
    usdcAllowance,
    usdtAllowance,
    tbioBalance,
    totalInvest,
    totalSupply,
    userInvestBalance,
    approve,
    deposit,
    permission,
    withdraw,
    registerToWhitelist,
    banFromWhiteList,
    allowanceUsdt } =
    useContext(MetamaskContext);

  // const [userBalance, setUserbalance] = useState(null);
  const [approveTx, setApproveTx] = useState(false);

  const [width, setWidth] = useState(0);
  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setValue(value);
  const handleResize = () => {
    setWidth(window.innerWidth);
    console.log('largeur ecran', width);
  };
  useEffect(() => {
    handleResize();
  });
  window.addEventListener("resize", handleResize);

  // smartContracts functions
  const handleClickBuy = async () => {
    console.log("handleClickBuy");
    try {
      await deposit(10000000, 1).then(() => {
        setApproveTx(false);
        console.log("handleClickBuy After");
      });
    } catch (e) {
      console.log("handleClickBuy", e.message);
    }
  };
  const handleClickApprove = async () => {
    console.log("handleClickBuy");
    try {
      await approve(10000000, 1).then(() => {
        setApproveTx(true);
        console.log("handleClickBuy After");
      });
    } catch (e) {
      console.log("handleClickBuy", e.message);
    }
  };
  // console.log("userBalance",userBalance,
  //   "usdcBalance",usdcBalance,
  //   "usdtBalance",usdtBalance,
  //   "usdcAllowance",usdcAllowance,
  //   "usdtAllowance",usdtAllowance,
  //   "tbioBalance",tbioBalance,
  //   "totalInvest",totalInvest,
  //   "totalSupply",totalSupply,
  //   "userInvestBalance",userInvestBalance)

  return (
    <>
      <div className="App">
        <button onClick={connectWallet}>connect metamask</button>
        {!approveTx ? (
          <button onClick={handleClickApprove}>Click to approve</button>
        ) : (
          <button onClick={handleClickBuy}>Click to buy</button>
          )}
          <p>UsdcBalance = {usdcBalance}</p>
      </div>
      <Box p="20px" bg="rgba(79,79,79,0.38)" borderRadius="30" m="20px">
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Tu t'apprêtes à t'embarquer dans l'aventure TerraBioDAO !
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En participant à cette prévente tu as l'occasion d'acquérir notre
          jeton au prix avantageux de 0,06$ (0,04$ si tu t'es inscits à la
          whitelist avant le 31 Mars 2022).
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Assures toi d'avoir correctement paramétré ton wallet Metamask comme
          indiqué dans ce tutoriel.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Les jetons acceptés lors de cette levée de fonds sont l'USDT, et
          l'USDC.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Avant d'effectuer ta transaction assures toi d'avoir suffisament
          d'ASTR pour payer les frais de transaction.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Tu n'en a pas ? Pas d'inquiétudes tu trouvera ici un faucet pour en
          obtenir.
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Ca y est ? tu es prêt ?
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Pour devenir un Terranaute, indique la montant que tu souhaites
          investir et valide ta transaction sur Metamask !
        </Text>
        <Text fontSize={16} fontWeight="extrabold" color="#fff">
          Bravo Terranaute, bienvenue à bord.
        </Text>
      </Box>

      <Flex
        bg="rgba(79,79,79,0.38)"
        borderRadius="30"
        m="20px"
        p="20px"
        direction="column"
      >
        <Flex
          direction={width <= 700 ? "column" : "row"}
          justifyContent="space-between"
        >
          <Text fontSize={22} fontWeight="extrabold" color="#fff">
            Nombre de $TBIO restant
          </Text>
          <Text fontSize={22} fontWeight="extrabold" color="#fff">
            {totalSupply}/15.000.000 $TBIO
          </Text>
        </Flex>
        <Box mt="10px">
          <Progress
            value={25}
            size="lg"
            borderRadius="30"
            colorScheme="teal"
            bg="#00D1EE"
          />
        </Box>
      </Flex>

      <Flex
        bg="rgba(79,79,79,0.38)"
        borderRadius="30"
        m="20px"
        direction={width <= 850 ? "column" : "row"}
      >
        <Flex p="20px" direction="column" grow="1">
          <Text fontSize={22} fontWeight="extrabold" color="#fff">
            Achetez vos $TBIO
          </Text>
          <Flex mt="15px" alignItems="baseline" direction="column">
            <Text
              fontSize={16}
              fontWeight="medium"
              color="#fff"
              mr="20px"
              mb="10px"
            >
              Choisissez votre devise :
            </Text>
            <Select placeholder="Select a stable coin">
              <option value={0}>USDC</option>
              <option value={1}>USDT</option>
            </Select>
          </Flex>
          <Flex mt="10px" maxW="98%">
            <NumberInput
              maxW="100px"
              mr="2rem"
              value={value}
              min={10}
              max={50000}
              onChange={handleChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              focusThumbOnChange={false}
              value={value}
              onChange={handleChange}
              min={10}
              max={50000}
              colorScheme="teal"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb
                fontSize="sm"
                fontWeight="bold"
                boxSize="32px"
                width="50px"
                children={value}
              />
            </Slider>
          </Flex>
        </Flex>
        <Flex p="20px" direction="column" grow="1">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            borderRadius="30"
            bg="#fff"
            border="5px"
            borderColor="rgba(79,79,79,0.38)"
            p="20px"
            mb="20px"
            justifyItems="center"
          >
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Text fontSize={20} fontWeight="medium" color="teal">
              Balance : {usdcBalance}
              Balance : {usdtBalance}
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            borderRadius="30"
            bg="#fff"
            border="5px"
            borderColor="rgba(79,79,79,0.38)"
            p="20px"
            justifyItems="center"
          >
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Text fontSize={20} fontWeight="medium" color="teal">
              Monstant investi : {userInvestBalance}
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Accordion
        defaultIndex={[0]}
        allowMultiple
        bg="rgba(79,79,79,0.38)"
        borderRadius="30"
        m="20px"
        p="20px"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={22} fontWeight="extrabold" color="#fff">
                  Liste des transactions
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Table variant="simple">
              <TableCaption>Dernières transactions effectuées</TableCaption>
              <Tbody>
                <Tr>
                  <Td color="#fff">Wallet address / Time ago</Td>
                  <Td color="#fff">From 0x... to 0x...</Td>
                  <Td isNumeric color="#fff" bg="teal" borderRadius="30px">
                    25.4
                  </Td>
                </Tr>
                <Tr>
                  <Td color="#fff">Wallet address / Time ago</Td>
                  <Td color="#fff">From 0x... to 0x...</Td>
                  <Td isNumeric color="#fff" bg="teal" borderRadius="30px">
                    30.48
                  </Td>
                </Tr>
                <Tr>
                  <Td color="#fff">Wallet address / Time ago</Td>
                  <Td color="#fff">From 0x... to 0x...</Td>
                  <Td isNumeric color="#fff" bg="teal" borderRadius="30px">
                    0.91444
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex
        borderRadius="30"
        bg="rgba(79,79,79,0.38)"
        p="20px"
        m="20px"
        direction="column"
        grow="1"
      >
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Calendrier de libération des $TBIO
        </Text>
        <Flex
          justifyItems="center"
          justify="space-around"
          alignItems="center"
          direction={width <= 950 ? "column" : "row"}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Box>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                Phase 1
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                XX/XX/XXXX
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
              {(tbioBalance/5)} 20% du balance
              </Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Box>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                Phase 2
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                XX/XX/XXXX
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
              {(tbioBalance/5)} 20% du balance
              </Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Box>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                Phase 3
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                XX/XX/XXXX
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
               {(tbioBalance/5)} 20% du balance
              </Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Box>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                Phase 4
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                XX/XX/XXXX
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
              {(tbioBalance/5)} 20% du balance
              </Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr="15px" />
            <Box>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                Phase 5
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
                XX/XX/XXXX
              </Text>
              <Text fontSize={20} fontWeight="medium" color="#fff">
              {(tbioBalance/5)} 20% du balance
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default App;

/* 
 import React from "react";
import { useState, useEffect } from "react";
import {
    // Container,
    Wrap,
    WrapItem,
    // Center,
    Flex,
    Box,
    // Button,
    Text,
    Progress,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Grid
} from '@chakra-ui/react';
import { UnlockIcon, StarIcon } from '@chakra-ui/icons';
import { ethers } from "ethers";
import { terrabioFaucetAddress, terrabioFaucetAbi } from "./contracts/TerrabioFaucet";

// import {
//   TerraBioTokenAddress,
//   TerraBioTokenAbi,
// } from "./contracts/TerraBioToken";
// import Dapp from "./Dapp";

function App() {
    //connect to metamask
    const [errorMessage, setErrorMessage] = useState(null)
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [connectButtonText, setConnectButtonText] = useState('connect Wallet')

    const [userBalance, setUserbalance] = useState(null)

    //const [currentContractVal,setCurrentContractVal] = useState(null)
    //const [provider, setProvider] = useState(null)
    //const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const [width, setWidth] = useState(0)
    const [value, setValue] = React.useState(0)
    const handleChange = (value) => setValue(value)

    const handleResize = () => {
        setWidth(window.innerWidth)
        console.log(width)
    }
    useEffect(() => {
        handleResize()
    }, [])
    window.addEventListener("resize", handleResize);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0])
                    setConnectButtonText('Wallet connected')
                })
        } else {
            setErrorMessage('install Metamask')
        }
    }
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount)
        updateEthers()
        getUserBalance(newAccount)
    }
    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setUserbalance(ethers.utils.formatEther(balance))
            })
    }
    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)

        let tempSigner = tempProvider.getSigner()

        let faucetContract = new ethers.Contract(terrabioFaucetAddress, terrabioFaucetAbi, tempSigner)
        setContract(faucetContract)
    }

    const handleClickBuyTokens = async () => {

        try {
            await contract.buyTokens()
        } catch (e) {
            console.log(e)
            setErrorMessage(e.data.message)

        }
    }

    // useEffect(()=>{
    //     const
    // })
    console.log(window.innerHeigh)
    return (
        <>

            <Box p='20px' bg="rgba(79,79,79,0.38)" borderRadius="30" m='20px'>
                <Text fontSize={22} fontWeight="extrabold" color="#fff">Tu t'apprêtes à t'embarquer dans l'aventure TerraBioDAO !</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">En participant à cette prévente tu as l'occasion d'acquérir notre jeton au prix avantageux de 0,06$ (0,04$ si tu t'es inscits à la whitelist avant le 31 Mars 2022).</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">Assures toi d'avoir correctement paramétré ton wallet Metamask comme indiqué dans ce tutoriel.</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">Les jetons acceptés lors de cette levée de fonds sont l'USDT, et l'USDC.</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">Avant d'effectuer ta transaction assures toi d'avoir suffisament d'ASTR pour payer les frais de transaction.</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">Tu n'en a pas ? Pas d'inquiétudes tu trouvera ici un faucet pour en obtenir.</Text>
                <br />
                <Text fontSize={16} fontWeight="medium" color="#fff">Ca y est ? tu es prêt ?</Text>
                <Text fontSize={16} fontWeight="medium" color="#fff">Pour devenir un Terranaute, indique la montant que tu souhaites investir et valide ta transaction sur Metamask !</Text>
                <Text fontSize={16} fontWeight="extrabold" color="#fff">Bravo Terranaute, bienvenue à bord.</Text>
            </Box>

            <Flex bg="rgba(79,79,79,0.38)" borderRadius="30" m='20px' p='20px' direction="column">
                <Flex direction={width <= 700 ? "column" : "row"} justifyContent="space-between">
                    <Text fontSize={22} fontWeight="extrabold" color="#fff">Nombre de $TBIO restant</Text>
                    <Text fontSize={22} fontWeight="extrabold" color="#fff">10.000.000/15.000.000 $TBIO</Text>
                </Flex>
                <Box mt="10px">
                    <Progress value={25} size='lg' borderRadius="30" colorScheme='teal' bg='#00D1EE' />
                </Box>
            </Flex>

            <Flex bg="rgba(79,79,79,0.38)" borderRadius="30" m='20px' direction={width <= 850 ? "column" : "row"}>
                <Flex p='20px' direction='column' grow='1'>
                    <Text fontSize={22} fontWeight="extrabold" color="#fff">Achetez vos $TBIO</Text>
                    <Flex mt='15px' alignItems='baseline' direction='column'>
                        <Text fontSize={16} fontWeight="medium" color="#fff" mr='20px' mb='10px'>Choisissez votre devise :</Text>
                        <Select placeholder='Select a stable coin'>
                            <option value='option1'>USDT</option>
                            <option value='option2'>USDC</option>
                        </Select>
                    </Flex>
                    <Flex mt='10px' maxW='98%'>
                        <NumberInput maxW='100px' mr='2rem' value={value} min={10} max={50000} onChange={handleChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={value}
                            onChange={handleChange}
                            min={10}
                            max={50000}
                            colorScheme='teal'
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' fontWeight='bold' boxSize='32px' width='50px' children={value} />
                        </Slider>
                    </Flex>
                </Flex>
                <Flex p='20px' direction='column' grow='1'>
                    <Box display="flex" flexDirection="row" alignItems="center" borderRadius="30" bg="#fff" border='5px' borderColor='rgba(79,79,79,0.38)' p='20px' mb='20px' justifyItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Text fontSize={20} fontWeight="medium" color='teal'>Balance : {userBalance}</Text>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" borderRadius="30" bg="#fff" border='5px' borderColor='rgba(79,79,79,0.38)' p='20px' justifyItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Text fontSize={20} fontWeight="medium" color='teal'>Monstant investi : {userBalance}</Text>
                    </Box>
                </Flex>
            </Flex>

            <Accordion defaultIndex={[0]} allowMultiple bg="rgba(79,79,79,0.38)" borderRadius="30" m='20px' p='20px'>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                <Text fontSize={22} fontWeight="extrabold" color="#fff">Liste des transactions</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Table variant='simple'>
                            <TableCaption>Dernières transactions effectuées</TableCaption>
                            <Tbody>
                                <Tr>
                                    <Td color='#fff'>Wallet address / Time ago</Td>
                                    <Td color='#fff'>From 0x... to 0x...</Td>
                                    <Td isNumeric color='#fff' bg='teal' borderRadius='30px'>25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td color='#fff'>Wallet address / Time ago</Td>
                                    <Td color='#fff'>From 0x... to 0x...</Td>
                                    <Td isNumeric color='#fff' bg='teal' borderRadius='30px'>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td color='#fff'>Wallet address / Time ago</Td>
                                    <Td color='#fff'>From 0x... to 0x...</Td>
                                    <Td isNumeric color='#fff' bg='teal' borderRadius='30px'>0.91444</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Flex borderRadius="30" bg="rgba(79,79,79,0.38)" p='20px' m='20px' direction='column' grow='1'>
                <Text fontSize={22} fontWeight="extrabold" color="#fff">Calendrier de libération des $TBIO</Text>
                <Flex justifyItems="center" justify='space-around' alignItems='center' direction={width <= 950 ? "column" : "row"}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Box>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>Phase 1</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>XX/XX/XXXX</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>20% du balance</Text>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Box>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>Phase 2</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>XX/XX/XXXX</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>20% du balance</Text>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Box>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>Phase 3</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>XX/XX/XXXX</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>20% du balance</Text>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Box>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>Phase 4</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>XX/XX/XXXX</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>20% du balance</Text>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <StarIcon boxSize={10} w={10} h={10} color="#ffd000" mr='15px' />
                        <Box>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>Phase 5</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>XX/XX/XXXX</Text>
                            <Text fontSize={20} fontWeight="medium" color='#fff'>20% du balance</Text>
                        </Box>
                    </Box>
                </Flex>
            </Flex>

        </>
    );
}

export default App;
*/
