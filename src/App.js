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
  } = useContext(MetamaskContext);

  // const [userBalance, setUserbalance] = useState(null);

  const [approveTx, setApproveTx] = useState(false);
  const [currency, setCurrency] = useState(null);

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
    setCurrency(e.target.value);
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
      await deposit(tmp, 0).then(() => {
        setApproveTx(false);
      });
    } catch (e) {
      console.log("handleClickBuy error", e.message);
    }
  };
  const handleClickApprove = async () => {
    try {
      let tmp = value * 10 ** 6;
      await approve(tmp, 0);
      setApproveTx(true);
      console.log("value: ", value * 10 ** 6);
      console.log("currency: ", currency);
    } catch (e) {
      console.log("handleClickApprove error", e.message);
      console.log("erro value: ", value * 10 ** 6);
      console.log("erro currency: ", currency);
    }
  };

  const registerPeopleToWhiteList = () => {
    let txt = `0xD6E2D2486B4344feE0Fa84A63d81c053DF579dba
    0x5Bf3d6D785Ce543AcA6c8A328Fb0EA41001c08F7
    0x077446923be2139fd968c0ad4ba26d0904882feb
    0x4b3057d14f48eE508bDe856033474Dd122997951
    0x9F452488D3846d110E11C33F45Dd57f8e1Eb9aAC
    0x6dacb116f05D35Ec7F021BE39BCa4535caF490e4
    0x2b5a2077114B4702233ed33515489662CB7E937b
    0xbf12F5440Db97b1b511a31846cABC558Ef9896fC
    0xD6E2D2486B4344feE0Fa84A63d81c053DF579dba
    0x8dabaf9784bFf097de160b1B6f0feEa40683a5bD
    0x9c4337D0EfE26Fd8549a1d983EeEF837D484816e
    0x3D444e23107AE1D7D50285a2D0a9dd1f073Fef73
    0xbe83677E6110333396776F80D1D057A5c9EDa9a7
    0xe34e88707543D06d7878b1E7FBCc3Af39A0BaDAb
    0x20085710ea257BdBABA75bcb0fDEC84D59c0f131
    0xAD0e88b32993d99C1D292A435f83cDbA1EfF70B2
    0x7B5529bB9992d9c8deF937eaA917ddB720d67827
    0x4a4b0885387b455bA15B293337d46558Dacc9e0a
    0x17825D1793E41351E6854C59EAc9566a996FeDD2
    0x5b361d303c45668E2D202b4DB9A8f197c2187036
    0x11CC69AC73A83F4B3CB1420F2fAF7b09491f1d8e
    0x4530D5705C087D4E924e30E70660Dccc2799b67c
    0x834a9AB44ce5646aDA5Bf4cA554ba52662819189
    0x28B255528a4Df6858CF097B03de1F4f0b2C0893a
    0xF7ba9321f3F1d68476d5a0d54F34A6074Cc9210e
    0x79333134999d4f9862345369881a7bE06819585E
    0x628B9D82b1B029662dbDCab8b8EbFD2d77F53516
    0x725F5B2E92164c38ef25a70F0807B71a7f0e770A
    0xF3c27d40019931413d9877127FFe3d8d0B135e93
    0xB0A33A136250db0Eb256AD7C370F9eacF6f935ed
    0xB778dA36bB3effdd1C433Cc4E5d6E1A25F76Db93
    0x7f7d4955845c0b8DC281Aaa5501bb84aEbed99f6
    0x190e7EB92A4d1426DB5085492822cAf09D9f08f5
    0xA7a7aBad6FBE05D82130eE398eD0Ab4920c0521C
    0x4b5301dF2EF9330814C52F411fd213bc6f9c58cb
    0x4162DaF10e992AFBf5cE57744F95a34EfB021b3a
    0xCb21d289Fb9B276D045c2a4423913c58CA94f8F1
    0xA67d72EE89DFAB16eBa7eA86E439B0EB7d601589
    0x84d3B2d64aBCF0dBCEF52D17D18d28955ce74825
    0xF985feC8C02e22bCAD28F91D39FAafed2496e134
    0xEc1f479E78b4574fe09a17b03b45966175Fd528F
    0xe3E647B04Bb8Ef95d5079f025b88845B67ec01da
    0xd3dE1f8Aa8e9Cf7133Bb65f4555F8f09cFCB7473
    0xC1CDdcA7B9187613AAE504c1F5f24efAAB0bAb36
    0x8455D2aaCc08bB1120314F44cf17cc243B9Ef5Ba
    0xd2A94D9E74662C30609072fa51C39d3eFF34c36C
    0xa2eC56395C658FA3F10F560333300030F89e11cd
    0x16afe33Ac5a11A12C534CfaAf5685Fe0B011B6CF
    0xa236c58Ada45a8883AB1CfEB4bdF61EC9B2d2CaC
    0x25b9a5d2Fa7C07139D4ae2a2Cee429E9207922e7
    0x33261A6670B013f5B5449e1812F6FbACa311E05C
    0x9ebD134252ccC4088263339EbD2B77aA3609034A
    0x4088893B58b913131DbDdb378f094864c2D9BAf1
    0x09FBCC8B5dc73629457A03FC56803B0441DfCC73
    0xbaBD5192A2bD4b9F35e678FB2114720b384fb56C
    0xCA6af49f9dFfFd88E0F7E07989c85f8E733A3944
    0xc78A4443164039A5d8cF91b75a090001E29d66fB
    0x048aD857d9305f5F38Ff1b270A8804Ac0D90C179
    0xeb45db9d41a146fB7cD874863021bC847F21BDdD
    0x7603c40b04aE8d4A82Aedbccb5C3Cd81B6681895
    0x099E01CE3F8e67b5824dd09dD17b15923FcF67f4
    0x4cbDA39E0C5eA73499F90A5801D579e2470e9274
    0x4809a2D5DD74998582893A419f8547ac45c120F3
    0xC9193D70Bb29D584a98D685cc0D8C7693330F13d
    0xcDFbfe2E9e29a222843c6Bf1595Fb5A1E52dcf38
    0x55B4615b8E670d9f19f2d7f4Bc9953A485317B81
    0x4b45514d1350c9c93EBf6FFb23Cb14E9798719Db
    0x3d8f6610b3E8E169Cd5DC1B25AD0e42a72a021aC
    0x7F6DCEf67670A0A378cb5458D717F4Cf6ED3B54e
    0x4f7F98565BEE2420a3988FA8cB3D54B4fB7cb4BE
    0xb15061Bf522cb5a347C15D7e087144B574F282FC
    0x99436e061890EBeF417f5023Dd612DeAEdb1DC47
    0xfEb23A3Fcccdb2DA5C539d5E44450D9429CBd5F8
    0x2Ae4156EF1da493726ae4fC393b036b4D466d932
    0x305bBB5Af32EA4d56527b9Ffb3E771B26d3F6c17
    0x4Ed95E1A632ba57ab02f02c7CF948f13Ac0CeDC2
    0x374f60A5594173Cf37948F2Ba145Fc26D2359960
    0xD2a0A046Ac876C0Df70Ee76d8786e310Cb152279
    0xd62459cc8617a3014496a8A9746F838a8b5B6464
    0x0e19cd515BB28E32ff6Ae89D5cF8c05710Ec7Fd2
    0x3451438D96048D4A0472ba29712770d28c6DBe86
    0x29a05eeB79948A0939dD8f337c89F8A4126Fe428
    0x611AE5d9C7CC73CEC58D8b0dab5c999fb2b5d122
    0x29DD0fF0C60376FCFf2B8a0bF9954bD5dEb577b8
    0xB3D13aa3AC7B6634465b5f6782d576687c0730AC
    0xaa586a24f70805A835F6463D1E987681DC441513
    0x0Ea5B44bAfB8B1bA2eB9Ad25C6Ca5851e6803937
    0x4087d23Ef14ea681ce93601476d0925669e3e455
    0xB269082812f44eFF82de4279b15E0C4ecA61dFBB
    0xd859cc2009C5d3C9630A8bdf104FF1bD8Fc8142e
    0xD4Ce0bD4B23fB527198ceA337B7316D04e891d3e
    0x43BAfeF6fE7201D2EB931B65c029Cb9eB9Dbd806
    0x204831a2f5490b1992777C021036810438A0b136
    0xa6C0940Bc42463Ae16714b7C4DC5a1fb96b4EEb2
    0xb8986a02F348aF840359d9604243813747bCb38d
    0x387dE1Ce9a61b802Aa49655D52DA595dCD96e9B1
    0x38A8255F0dC077C540cc09F139ceECF53B759966
    0x6b47c506ef06e1Be9193728a1100D7bf7Ed16f11
    0x2B2734918380c16c3eC8B09eF577cD65Aa07dcC4
    0xeb63Dd6b8231eB9A4902B4aF0827d9FaB0F172fE
    0xBD7E9d48169Dee88F2Ed991f343F41E13a188ec2
    0xf6DF1294A410a0Bc2EA0101253c7C417bFD3d519
    0x394d3039BC07BA137a94AfAA4569E96c126516aB
    0x70c700f6A659f82526E066BCd868Dab7C72A7D89
    0xBD8b6Ef86290b3C6dC6232F3355131E0ba5478FA
    0xecAF401a100ff4e390075a5D45f7dB021F90a0E4
    0xb03f15cb54ceb60DD2e2c228826f0B1DEe99937c
    0x1C21b7379709881e06A38fa0120a7DB435FFe9D4
    0x294B2F23a13fE00592214D236CF8b81D344C020d
    0x556a58AD178529242ADEbCCc9A22c6ceE6827378
    0xD317824DFb580Bdad27bD86EA427747Bce97C269
    0xa5FF0e7BF95ddB46416049a84FA81073E2B83D5e
    0x6D98F52E2DA17c50E90823D260FbC1a5AF396252
    0x918cc494FA3b1de7B288c680F6eAA2bb45D78960
    0xAb6B85fE246E865E5aB9BcAd75d1c3E9727bF935
    0x524C85C952633331BBafe1b0F6523Fa3255C24e5
    0x1EB03d2570436FB4339599Bb6B5Ad758296eD368
    0xf6453d96C8e5B6Db73dD36b9331Ce6A0B5d57BaB
    0x8D7910D1ac37c92a7cF6Fa07F63f43C9E1359CEB
    0xD8a06F1a4f1A8087e294355b5c58cA63967fd01f
    0x1EB3DB1fAF299ee0fb8d95B70A25D770A9e334c6
    0xE134fab0c7CFb477a677890fC09F284B4115D745
    0x3a225c8Dc77946E49D54fa5686C3986dbB8E15bc
    0xE7738165a4ED04Cc1F7F39d94073CeC83682E13d
    0xB1253D4A4aCeC578693A800438688D4108b14943
    0x3195f13DA738B756E8B0c388ac268540eb00205E
    0xe837A37c0BEcE73934149E6494d05C0319fa87f6
    0x8e8c3a68b51B042fbaE20B0d1243cC791EA18A63
    0xE724dC55004CbB99C846aD9F55fC045960AFEe22
    0x513153e3c4E3e87d9eC058918C486DbA620e7A9A
    0x40f58E6C27c05Da9304994a2Cd204B6FF117A963
    0x53188c1D9518A5AFf7CD632B31C46CC3aadDF77A
    0x4b8823C9Aa957A346C2F0F7f07E78d60074cd113
    0x4098f3d281311d4EeB507ff765A219529dbD1850
    0x3134cdAF49b270586eDe04Af16eEA6fa90030763
    0xac84DAC16EE68C0Dea81A5eB2D997b31E5a4bE5b
    0xF3222c684a8cED4d0DE7DF7c259d6F52ab422ca9
    0x8d4f99c1a8144ad3Ec57c3E6455aB8c0a8Eb4093
    0xF0e348519082C47dF737Abff1c0F66b91eB81b4e
    0x1e5506b0b09b918b8A3f16092B670f9D5b18AeD2
    0xCb252De8E86cD4c305307Cc0ED95D8D94795b3Cf
    0x505A8B44391ba86B720EB1d20cF8f131d1A8c70D
    0xff9cbCa3552aa57EaD6d035373805391d1a7327f
    0x8420174C78b97BED9Df35BeB6285C79eB3FcB5BF
    0xDA39C325ff5774c86f2e76B1BC5348a5BC9286C9
    0x521B22B0e7A909162E3AA81a73a8229156359d1B
    0xc1E39ac0399Bf041d3e4833D4C772574ECC6F39d
    0x90af702B27a9Ca849D894e4F9Cb49BD72Cdd1Cb9
    0xa3a23A209dDE11B33185b999b5a17580d683eBAB
    0xe92DB136678e18151aC7CfBb00aECbe2a319c5c3
    0x9E6B280880d50496FeB6683617888b39792c1611
    0xeb10CC00959Ff88b2Db0BC61e7aB0aE594C02f75
    0x54bda2a01E641974F0dF5991fA0B4c3A82BF8503
    0x41f2ef4AEC6b2D637fB9937C2B4Da80Ea295DeD3
    0x870d2Fc17f2Fcec42E902714Ac308043b859164E
    0x04e63d100C1da4E9f763bAc3C539936200490fF5
    0xc84C76E6BA27E870C1E5230A94c5f16353449eC9
    0x79Fe18376e2E0e29709EAE0561A9Ff6E117BA2c0
    0xf4F1D7552c65308fDD45446AabA72D1FA4C23129
    0x5fA3625cb9af380A8f3259d23ac8791b639F52C0
    0x07ca1ecb62B9E892457d2c80c1783cbdD4D437c5
    0xc98F96e31c785c2B114837434a520Acd8AB04ffe
    0x7865c809776080430748A66b06674e460478FC1B
    0x660275F6B791198BBED347413c059D728bCBD1Ce
    0xBBbA246E4AFF80dfDc47678D2cC75a6aC1a55A80
    0xa77eD448e7a50E499F4D9Dc3B5d7B9be0cA0b6d2
    0x67dC690efA7CBfcBE86bc32EF4c1fFDb7C667046
    0xB210f60980066132A8Aa072Fc02bc13C060dA73A
    0xEc57d50E22a038Aa5e9D7C0C52437069ea91EfA6
    0xCbA050c07b5476A90e2904E745d089D319D64Ef5
    0x4cFCaB5e17c01cab66A1a0341093aE8190416b1A
    0x14bF71b109bB9B0E31634bd0ad735794C3c2B0AB
    0x4Ee9B3A7036ab42938A1d09bDc6B4BAe319e43c6
    0x2A6339998D7DE47c5559a039befb4bC1B0692A60
    0x5fC708A60EDfcFc8F6845836Fc18FE848bE0E043
    0xEc0C8cFA4f3Ef57F4e117f9872889742CB6fF388
    0xb290E503017D0471e6749d5e7fb54657Cd5BFb4D
    0xAE50cc24E5A8Ac6e8F1897AC9Eaa5b760805EE89`.split(`\n`)
    txt.map(e =>{ 
      registerToWhitelist(e)
      console.log(e)
    })
    return txt
  }
 

  // const handleClickRegisterToWhitelist = async (address) => {
  //   console.log("handleClickRegisterToWhitelist");
  //   try {
  //     await registerToWhitelist(address).then(() => {
  //       setApproveTx(true);
  //       console.log("handleClickRegisterToWhitelist After");
  //     });
  //   } catch (e) {
  //     console.log("handleClickRegisterToWhitelist", e.message);
  //   }
  // };

  return (
    <>
      <div className="App">
        <button onClick={connectWallet}>connect metamask</button>
        <button onClick={registerPeopleToWhiteList}>Register people to withelist</button>
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
        {/*  <button onClick={handleClickRegisterToWhitelist(defaultAccount)}>Click to registerToWhitelist</button>
         <button onClick={withdraw}>Click to withdraw</button> */}
        <button onClick={banFromWhiteList}>Click to banFromWhiteList</button>
      </div>

      <Box p="20px" bg="rgba(79,79,79,0.38)" borderRadius="30" m="20px">
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Tu t'apprêtes à t'embarquer dans l'aventure TerraBioDAO !
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En participant à cette prévente tu as l'occasion d'acquérir notre
          jeton au prix avantageux de 0,06$ (0,04$ si tu t'es inscrit à la
          whitelist avant le 31 Mars 2022).
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Assure-toi d'avoir correctement paramétré ton wallet Metamask{" "}
          <Link
            fontSize={16}
            fontWeight="bold"
            color="teal"
            href="https://terrabiodao.gitbook.io/terrabiodao/mainnet/presale"
            target="_blank"
          >
            comme indiqué dans ce tutoriel.
          </Link>
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Les jetons acceptés lors de cette levée de fonds sont l'USDT, et
          l'USDC.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Avant d'effectuer ta transaction assure-toi d'avoir suffisament d'ASTR
          pour payer les frais de transaction.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Tu n'en a pas ? Pas d'inquiétudes{" "}
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
          de procéder à la transaction.
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
          En utilisant un wallet non-custodial, vous êtes le seul responsable de
          vos cryptos monnaies. Toute erreur peut entrainer la perte
          irrémédiable de votre argent.
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
            Assurez-vous d'être sur le réseau Astar.
          </Link>

          <OrderedList>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">
              Cliquez sur <i>"approuver la transaction"</i>
            </ListItem>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">
              Une fois votre première opération effectuée, appuyez sur{" "}
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
              ? ` ${Number(currency) === 0 && "Approuver du $ USDC"}${
                Number(currency) === 1 && "Approuver du $ USDT"
                } ${!currency && "Choisissez un stable"}`
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
          Calendrier de libération des $TBIO
        </Text>
        <Text fontSize={18} fontWeight="medium" color="#fff" mb="15px">
          Retrouvez ci-dessous le calendrier de libération de vos jetons $TBIO.
          Une fois le jeton émis, vous recevrez automatiquement le montant
          indiqué à chaque échéance. Pour rappel, un vesting de 5 mois est
          appliqué pour garantir la croissance du $TBIO. Votre montant vous sera
          automatiquement crédité sur votre wallet Metamask. :)
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
