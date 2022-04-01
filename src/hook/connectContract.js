// import { createContext, useState, useContext, useEffect } from "react";
// import { ethers } from "ethers";
// import { UsdtAddress, UsdtAbi } from "../contracts/Usdt";
// import { UsdcAddress, UsdcAbi } from "../contracts/Usdc";
// import {
//   TerrabioDAOPresaleAddress,
//   TerrabioDAOPresaleAbi,
// } from "../contracts/TerrabioDAOPresale";
// import { MetamaskContext } from "./connectMetamask";

// export const ContractContext = createContext(null);

// export const ContractContextProvider = ({ children }) => {
//   const { signer } = useContext(MetamaskContext);
//   const [usdcContract, setUsdcContract] = useState(null);
//   const [usdtContract, setUsdtContract] = useState(null);
//   const [presaleContract, setPresaleContract] = useState(null);

//   useEffect(() => {
//     // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//     console.log("contractSigner", signer)
//     // let tempSigner = tempProvider.getSigner();
//     if (signer) {
//         console.log("contractSigner", signer)
//       let UsdcContract = new ethers.Contract(UsdcAddress, UsdcAbi, signer);
//       setUsdcContract(UsdcContract);
//       let UsdtContract = new ethers.Contract(UsdtAddress, UsdtAbi, signer);
//       setUsdtContract(UsdtContract);
//       let PresaleContract = new ethers.Contract(
//         TerrabioDAOPresaleAddress,
//         TerrabioDAOPresaleAbi,
//         signer
//       );
//       setPresaleContract(PresaleContract);

//       console.log(
//           'UsdcContract',
//           usdcContract,
//           'UsdtContract',
//           usdtContract,
//           'PresaleContract',
//           presaleContract,
          

//       )
//     }
//   }, [signer]);
// //   const approve = async (amount, nb) => {
// //     try {
// //       nb === 0
// //         ? await usdcContract.approve(TerrabioDAOPresaleAddress, amount)
// //         : await usdtContract.approve(TerrabioDAOPresaleAddress, amount);

// //       console.log(window.etherum);
// //     } catch (e) {
// //       console.log(e);
// //       //setErrorMessage(e.data.message)
// //     }
// //   };
// //   const deposit = async (amount, nb) => {
// //     try {
// //       await presaleContract.deposit(amount, nb);
// //     } catch (e) {
// //       console.log(e);
// //       //setErrorMessage(e.data.message)
// //     }
// //   };
//   return (
//     <ContractContext.Provider
//       value={{ }}
//     ></ContractContext.Provider>
//   );
// };
