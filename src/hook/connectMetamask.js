import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { UsdtAddress, UsdtAbi } from "../contracts/Usdt";
import { UsdcAddress, UsdcAbi } from "../contracts/Usdc";
import {
  TerrabioDAOPresaleAddress,
  TerrabioDAOPresaleAbi,
} from "../contracts/TerrabioDAOPresale";

export const MetamaskContext = createContext();

export const MetamaskContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserbalance] = useState(null);
  //const [connectButtonText, setConnectButtonText] = useState(null)
  const [signer, setSigner] = useState(null);
  const [usdcContract, setUsdcContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [presaleContract, setPresaleContract] = useState(null);
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [usdcAllowance, setUsdcAllowance] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  const [tbioBalance, setTbioBalance] = useState(null);
  const [usdtAllowance, setUsdtAllowance] = useState(null);
  const [totalInvest, setTotalInvest] = useState(null);
  const [totalSupply, setTotaSupply] = useState(null);
  const [userInvestBalance, setUserInvestBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("install Metamask");
    }
  };
  const accountChangedHandler = (newAccount) => {
    updateEthers();
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();

    console.log("contractSigner", tempSigner);
    let UsdcContract = new ethers.Contract(UsdcAddress, UsdcAbi, tempSigner);
    setUsdcContract(UsdcContract);
    let UsdtContract = new ethers.Contract(UsdtAddress, UsdtAbi, tempSigner);
    setUsdtContract(UsdtContract);
    let PresaleContract = new ethers.Contract(
      TerrabioDAOPresaleAddress,
      TerrabioDAOPresaleAbi,
      tempSigner
    );
    setPresaleContract(PresaleContract);
    setSigner(tempSigner);
  };

  // USD FUNCTIONS
  const approve = async (amount, nb) => {
    try {
      nb === 0
        ? await usdcContract.approve(TerrabioDAOPresaleAddress, amount)
        : await usdtContract.approve(TerrabioDAOPresaleAddress, amount);

      console.log(window.etherum);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.data.message);
    }
  };
  const balanceOfUsdc = async (address) => {

    setUsdcBalance(await usdcContract.balanceOf(address)) 

  };
  const balanceOfUsdt = async (address) => {
    await usdtContract.balanceOf(address);
  };
  const allowanceUsdc = async (address) => {
    await usdcContract.allowance(address);
  };
  const allowanceUsdt = async (address) => {
    await usdtContract.allowance(address);
  };
  //PRESALE FUNCTIONS

  const getTbioBalance = async (address) => {
    await presaleContract.getUserBalance(address);
  };
  const getTotalSupply = async () => {
    await presaleContract.totalSupply();
  };
  const getTotalInvest = async () => {
    await presaleContract.totalInvest();
  };
  const deposit = async (amount, nb) => {
    await presaleContract.buyTbio(amount, nb);
  };

  const permission = async () => {
    await presaleContract.permission();
  };
  const withdraw = async () => {
    await presaleContract.withdraw();
  };
  const registerToWhitelist = async (address) => {
    await presaleContract.registerToWhitelist(address);
  };
  const banFromWhiteList = async (address) => {
    await presaleContract.banFromWhiteList(address);
  };

  useEffect(() => {
    console.log("signer", signer);
    console.log(
      "UsdcContract",
      usdcContract,
      "UsdtContract",
      usdtContract,
      "PresaleContract",
      presaleContract
    );
    console.log("errorMessage", errorMessage);
  }, [signer, errorMessage, usdcContract, usdtContract, presaleContract]);

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserbalance(ethers.utils.formatEther(balance));
      });
  };

  // useEffect(()=>{
  //   balanceOfUsdc(defaultAccount)
  //   setUsdcBalance(res)
  //   console.log('usdcBalance: ',res)
  // },[usdcContract])
  // useEffect(()=>{
  //   let res = balanceOfUsdt(defaultAccount)
  //   setUsdtBalance(ethers.utils.formatUnits(res, 6))
  //   console.log('usdtBalance:',usdcBalance)
  // },[])

  return (
    <MetamaskContext.Provider
      value={{
        connectWallet,
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
        allowanceUsdt
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
