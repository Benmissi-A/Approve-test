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
  //const [signer, setSigner] = useState(null);
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
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    const tempSigner = tempProvider.getSigner();

    console.log("contractSigner", tempSigner);
    const UsdcContract = new ethers.Contract(UsdcAddress, UsdcAbi, tempSigner);
    setUsdcContract(UsdcContract);
    const UsdtContract = new ethers.Contract(UsdtAddress, UsdtAbi, tempSigner);
    setUsdtContract(UsdtContract);
    const PresaleContract = new ethers.Contract(
      TerrabioDAOPresaleAddress,
      TerrabioDAOPresaleAbi,
      tempSigner
    );
    setPresaleContract(PresaleContract);
  };

  // USD FUNCTIONS
  const approve = async (amount, nb) => {
    try {
      nb === 0
        ? await usdcContract.approve(TerrabioDAOPresaleAddress, amount)
        : await usdtContract.approve(TerrabioDAOPresaleAddress, amount);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.data.message);
    }
  };
  const balanceOfUsdc = async (address) => {
    const tx = await usdcContract.balanceOf(address);
    setUsdcBalance(Number(ethers.utils.formatUnits(tx.toString(), 6)));
    console.log("tx Usdc", tx);
  };
  const balanceOfUsdt = async (address) => {
    const tx = await usdtContract.balanceOf(address);
    setUsdtBalance(Number(ethers.utils.formatUnits(tx.toString(), 6)));
    console.log("tx Usdt", tx);
  };
  const allowanceUsdc = async (address) => {
    const tx = await usdcContract.allowance(address, TerrabioDAOPresaleAddress);
    setUsdcAllowance(Number(ethers.utils.formatUnits(tx.toString(), 6)));
  };
  const allowanceUsdt = async (address) => {
    const tx = await usdtContract.allowance(address, TerrabioDAOPresaleAddress);
    setUsdtAllowance(Number(ethers.utils.formatUnits(tx.toString(), 6)));
  };
  //PRESALE FUNCTIONS

  const getTbioBalance = async (address) => {
    const tx = await presaleContract.getUserBalance(address);
    setTbioBalance(Number(ethers.utils.formatUnits(tx.toString(), 18)));
  };
  const getTotalSupply = async () => {
    const tx = await presaleContract.totalSupply();
    setTotaSupply(Number(ethers.utils.formatUnits(tx.toString(), 18)));
  };
  const getUserInvestBalance = async (address) => {
    const tx = await presaleContract.getUserInvestBalance(address);
    setUserInvestBalance(Number(ethers.utils.formatUnits(tx.toString(), 6)));
  };
  const getTotalInvest = async () => {
    const tx = await presaleContract.totalInvest();
    setTotalInvest(Number(ethers.utils.formatUnits(tx.toString(), 6)));
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

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserbalance(ethers.utils.formatEther(balance));
      });
  };

  useEffect(() => {
    if (defaultAccount && usdcContract && usdtContract && presaleContract) {
      console.log("defaultAccount: ", defaultAccount);
      balanceOfUsdc(defaultAccount);
      console.log("usdc: ", usdcBalance);
      balanceOfUsdt(defaultAccount);
      console.log("usdt: ", usdtBalance);

      allowanceUsdc(defaultAccount);
      console.log("usdcAllowance: ", usdcAllowance);
      allowanceUsdt(defaultAccount);
      console.log("usdtAllowance: ", usdtAllowance);

      getTbioBalance(defaultAccount);
      console.log("tbioBalance: ", tbioBalance);

      getTotalInvest();
      console.log("totalInvest: ", totalInvest);

      getTotalSupply();
      console.log("totalSupply: ", totalSupply);
      getUserInvestBalance(defaultAccount);
     
      console.log("userInvestBalance: ", userInvestBalance);
      console.log("error", errorMessage);
      //   console.log("finish");
    }
  });

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
        allowanceUsdt,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
