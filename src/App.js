import React from "react";
import { useState, useEffect } from "react";
import { MetamaskContext } from "./hook/connectMetamask";
import { useContext } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
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
  Divider,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const App = () => {
  const {
    connectWallet,
    defaultAccount,
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
    approveTx,
  } = useContext(MetamaskContext);

  // const [userBalance, setUserbalance] = useState(null);

  const [currency, setCurrency] = useState("x");

  const [width, setWidth] = useState(0);
  const [value, setValue] = useState(0);
  const handleChangeValue = (value) => setValue(value);
  const handleResize = () => {
    setWidth(window.innerWidth);
    console.log("largeur ecran", width);
  };
  useEffect(() => {
    handleResize();
  });
  window.addEventListener("resize", handleResize);

  const handleCurrencyChange = (e) => {
    setCurrency(Number(e.target.value));
  };

  useEffect(() => {
    console.log("currency", currency);
    console.log("value", value);
    console.log("value", value * 10 ** 6);
  }, [currency, value]);

  // smartContracts functions
  const handleClickBuy = async () => {
    try {
      let tmp = value * 10 ** 6;
      await deposit(tmp, currency).then(() => {});
    } catch (e) {
      console.log("handleClickBuy error", e.message);
    }
  };
  const handleClickApprove = async () => {
    try {
      let tmp = value * 10 ** 6;
      await approve(tmp, currency);

      console.log("value: ", value * 10 ** 6);
      console.log("currency: ", currency);
    } catch (e) {
      console.log("handleClickApprove error", e.message);
      console.log("erro value: ", value * 10 ** 6);
      console.log("erro currency: ", currency);
    }
  };

  const handleClickRegisterToWhitelist = async (address) => {
    console.log("handleClickRegisterToWhitelist");
    try {
      await registerToWhitelist(
        0x5bf3d6d785ce543aca6c8a328fb0ea41001c08f7
      ).then(() => {
        console.log("handleClickRegisterToWhitelist After");
      });
    } catch (e) {
      console.log("handleClickRegisterToWhitelist", e.message);
    }
  };

  //   const registerPeopleToWhiteList = () => {
  //     let txt = `
  //     0x5Bf3d6D785Ce543AcA6c8A328Fb0EA41001c08F7
  // `.split(`\n`)
  //     txt.map(async e =>{
  //       console.log(e)
  //       await registerToWhitelist(e)
  //       console.log(e)
  //     })
  //     return txt
  //   }

  return (
    <>
      <div className="App">
        <button onClick={connectWallet}>connect metamask</button>
        {!approveTx ? (
          <button onClick={!approveTx ? handleClickApprove : handleClickBuy}>
            {" "}
            {!approveTx ? "Click to approve" : "Click to buy"}
          </button>
        ) : (
          <button onClick={handleClickBuy}>Click to buy</button>
        )}
        <p>UsdcBalance = {usdcBalance}</p>
        <p>userBalance = {userBalance}</p>
        <p>usdcAllowance = {usdcAllowance}</p>
        <p>usdtAllowance = {usdtAllowance}</p>
        <p>totalInvest = {totalInvest}</p>
        <button onClick={permission}>Click to permission</button>
        {/*    <button onClick={handleClickRegisterToWhitelist}>Click to registerToWhitelist</button>
           <button onClick={withdraw}>Click to withdraw</button> 
        <button onClick={banFromWhiteList}>Click to banFromWhiteList</button>
        <button onClick={registerPeopleToWhiteList}>Register people to withelist</button>*/}
      </div>

      <Box p="20px" bg="rgba(79,79,79,0.38)" borderRadius="30" m="20px">
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Tu t'appr??tes ?? t'embarquer dans l'aventure TerraBioDAO !
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En participant ?? cette pr??vente tu as l'occasion d'acqu??rir notre
          jeton au prix avantageux de 0,06$ (0,04$ si tu t'es inscrit ?? la
          whitelist avant le 31 Mars 2022).
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Assure-toi d'avoir correctement param??tr?? ton wallet Metamask{" "}
          <Link
            fontSize={16}
            fontWeight="bold"
            color="teal"
            href="https://terrabiodao.gitbook.io/terrabiodao/mainnet/presale"
            target="_blank"
          >
            comme indiqu?? dans ce tutoriel.
          </Link>
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Les jetons accept??s lors de cette lev??e de fonds sont l'USDT, et
          l'USDC.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Avant d'effectuer ta transaction assure-toi d'avoir suffisament d'ASTR
          pour payer les frais de transaction.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Tu n'en a pas ? Pas d'inqui??tudes{" "}
          <Link
            fontSize={16}
            fontWeight="bold"
            color="teal"
            href="https://portal.astar.network/#/balance/wallet"
            target="_blank"
          >
            tu trouveras ici un faucet pour en obtenir.
          </Link>
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Pour devenir un Terranaute, il suffit de connecter ton Metamask avant
          de proc??der ?? la transaction.
        </Text>
        <Button
          mt="20px"
          mb="20px"
          colorScheme="teal"
          variant="solid"
          onClick={connectWallet}
        >
          <Image
            src="https://terrabiodao.org/wp-content/uploads/2022/03/metamask.svg"
            boxSize="30px"
            mr="10px"
          />{" "}
          connect Wallet
        </Button>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En utilisant un wallet non-custodial, vous ??tes le seul responsable de
          vos cryptos monnaies. Toute erreur peut entrainer la perte
          irr??m??diable de votre argent.
        </Text>
        <Text fontSize={16} fontWeight="extrabold" color="#fff">
          La Team terrabioDAO vous remercie par avance de votre soutien !
        </Text>
      </Box>

      <Flex
        bg="rgba(79,79,79,0.38)"
        borderRadius="30"
        m="20px"
        p="20px"
        direction={width <= 850 ? "column" : "row"}
        alignItems="center"
        grow="1"
      >
        <Flex direction="column" grow="1" w="100%" p="15px">
          <Flex pt="20px" pb="20px">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={20} fontWeight="medium" color="#fff" pr="10px">
                Balance USDC : {usdcBalance}
              </Text>
              <Image
                src="https://terrabiodao.org/logo/usd-coin-usdc-logo.svg"
                boxSize="30px"
                objectFit="cover"
                alt="USDC"
              />
            </Box>
          </Flex>
          <Flex pt="20px" pb="20px">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={20} fontWeight="medium" color="#fff" pr="10px">
                Balance USDT : {usdtBalance}
              </Text>
              <Image
                src="https://terrabiodao.org/logo/tether-usdt-logo.svg"
                boxSize="30px"
                objectFit="cover"
                alt="USDT"
              />
            </Box>
          </Flex>

          <Flex pt="20px" pb="20px" grow="1">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={20} fontWeight="medium" color="#fff" mr="15px">
                Balance $TBIO : {tbioBalance}
              </Text>
              <Image
                src="https://terrabiodao.org/logo/tbio-logo.svg"
                boxSize="30px"
                objectFit="cover"
                alt="TBIO"
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          grow="1"
          w="100%"
          p="20px"
          borderRadius="30"
          bg="rgba(79,79,79,0.38)"
        >
          <Text fontSize={22} fontWeight="extrabold" color="#fff">
            Achetez vos $TBIO
          </Text>
          <Link
            fontSize={16}
            fontWeight="bold"
            color="teal"
            href="https://terrabiodao.gitbook.io/terrabiodao/mainnet/presale"
            target="_blank"
          >
            Assurez-vous d'??tre sur le r??seau Astar.
          </Link>

          <OrderedList>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">
              Cliquez sur <i>"approuver la transaction"</i>
            </ListItem>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">
              Une fois votre premi??re op??ration effectu??e, appuyez sur{" "}
              <i>"acheter du $TBIO"</i>
            </ListItem>
          </OrderedList>

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
            <Select
              onChange={handleCurrencyChange}
              placeholder="Select a stable coin"
            >
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
              max={50000 - userInvestBalance}
              onChange={handleChangeValue}
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
              onChange={handleChangeValue}
              min={10}
              max={50000 - userInvestBalance}
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
          <Button
            onClick={!approveTx ? handleClickApprove : handleClickBuy}
            mt="15px"
          >
            {!approveTx
              ? currency === 0
                ? "Approuver du $ USDC"
                : currency === 1
                ? "Approuver du $ USDT"
                : currency == "x" && "Choisissez un stable"
              : "Acheter du $TBIO "}
          </Button>
        </Flex>
      </Flex>

      <Flex
        borderRadius="30"
        bg="rgba(79,79,79,0.38)"
        p="20px"
        m="20px"
        direction="column"
        grow="1"
        jutsify="start"
      >
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Calendrier de lib??ration des $TBIO
        </Text>
        <Text fontSize={18} fontWeight="medium" color="#fff" mb="15px">
          Retrouvez ci-dessous le calendrier de lib??ration de vos jetons $TBIO.
          Une fois le jeton ??mis, vous recevrez automatiquement le montant
          indiqu?? ?? chaque ??ch??ance. Pour rappel, un vesting de 5 mois est
          appliqu?? pour garantir la croissance du $TBIO. Votre montant vous sera
          automatiquement cr??dit?? sur votre wallet Metamask. :)
        </Text>

        <Flex alignItems="start" direction="column">
          <Box
            borderRadius="30"
            bg="rgba(79,79,79,0.38)"
            p="20px"
            display="flex"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Text fontSize={15} fontWeight="medium" color="#fff">
              Montant disponible le 1er mois : {tbioBalance / 5}
            </Text>
            <Image
              src="https://terrabiodao.org/logo/tbio-logo.svg"
              ml="10px"
              boxSize="30px"
              objectFit="cover"
              alt="TBIO"
            />
          </Box>

          <Divider orientation="horizontal" mt="10px" mb="10px" />

          <Box
            borderRadius="30"
            bg="rgba(79,79,79,0.38)"
            p="20px"
            display="flex"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Text fontSize={15} fontWeight="medium" color="#fff">
              Montant disponible le 2eme mois : {tbioBalance / 5}
            </Text>
            <Image
              src="https://terrabiodao.org/logo/tbio-logo.svg"
              ml="10px"
              boxSize="30px"
              objectFit="cover"
              alt="TBIO"
            />
          </Box>

          <Divider orientation="horizontal" mt="10px" mb="10px" />

          <Box
            borderRadius="30"
            bg="rgba(79,79,79,0.38)"
            p="20px"
            display="flex"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Text fontSize={15} fontWeight="medium" color="#fff">
              Montant disponible le 3eme mois : {tbioBalance / 5}
            </Text>
            <Image
              src="https://terrabiodao.org/logo/tbio-logo.svg"
              ml="10px"
              boxSize="30px"
              objectFit="cover"
              alt="TBIO"
            />
          </Box>

          <Divider orientation="horizontal" mt="10px" mb="10px" />

          <Box
            borderRadius="30"
            bg="rgba(79,79,79,0.38)"
            p="20px"
            display="flex"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Text fontSize={15} fontWeight="medium" color="#fff">
              Montant disponible le 4eme mois : {tbioBalance / 5}
            </Text>
            <Image
              src="https://terrabiodao.org/logo/tbio-logo.svg"
              ml="10px"
              boxSize="30px"
              objectFit="cover"
              alt="TBIO"
            />
          </Box>

          <Divider orientation="horizontal" mt="10px" mb="10px" />

          <Box
            borderRadius="30"
            bg="rgba(79,79,79,0.38)"
            p="20px"
            display="flex"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Text fontSize={15} fontWeight="medium" color="#fff">
              Montant disponible le 5eme mois : {tbioBalance / 5}
            </Text>
            <Image
              src="https://terrabiodao.org/logo/tbio-logo.svg"
              ml="10px"
              boxSize="30px"
              objectFit="cover"
              alt="TBIO"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
