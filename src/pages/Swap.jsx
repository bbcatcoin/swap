import { useState, useEffect } from "react"
import { Widget } from "@kyberswap/widgets"
import { init, useWallets, useConnectWallet } from "@web3-onboard/react"
import injectedModule from "@web3-onboard/injected-wallets"
import { ethers } from "ethers"
import walletConnectModule from "@web3-onboard/walletconnect"
import { Button } from "@mui/material";
const injected = injectedModule()
const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'aa967df559416cc835486e6bc0e6eaad',
  requiredChains: [56],
  dappUrl: 'https://www.catcoin.today'
}

// initialize the module with options
const walletConnect = walletConnectModule(wcInitOptions)

// can also initialize with no options...

// initialize Onboard
init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://ethereum.kyberengineering.io"
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon",
      rpcUrl: "https://polygon.kyberengineering.io"
    }
  ]
})

function Swap() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any")
  }

  const connectedWallets = useWallets()

  const [chainId, setChainId] = useState(56)

  useEffect(() => {
    ethersProvider?.getNetwork().then(res => setChainId(res.chainId))
  }, [ethersProvider])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets, wallet])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets") || "[]"
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        const walletConnected = await connect({
          autoSelect: previouslyConnectedWallets[0]
        })
      }
      setWalletFromLocalStorage()
    }
  }, [connect])

  const lightTheme = {
    text: "#222222",
    subText: "#5E5E5E",
    primary: "#FFFFFF",
    dialog: "#FBFBFB",
    secondary: "#F5F5F5",
    interactive: "#E2E2E2",
    stroke: "#505050",
    accent: "#28E0B9",
    success: "#189470",
    warning: "#FF9901",
    error: "#FF537B",
    fontFamily: "Work Sans",
    borderRadius: "16px",
    buttonRadius: "999px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
  }

  const darkTheme = {
    text: "#FFFFFF",
    subText: "#A9A9A9",
    primary: "#1C1C1C",
    dialog: "#313131",
    secondary: "#0F0F0F",
    interactive: "#292929",
    stroke: "#505050",
    accent: "#28E0B9",
    success: "#189470",
    warning: "#FF9901",
    error: "#FF537B",
    fontFamily: "Work Sans",
    borderRadius: "16px",
    buttonRadius: "999px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
  }

  const [theme, setTheme] = useState(darkTheme)
  const [enableRoute, setEnableRoute] = useState(true)
  const [enableDexes, setEnableDexes] = useState("")
const MY_TOKEN_LIST = [
      {
      "name": "BNB",
      "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "symbol": "BNB",
      "decimals": 18,
      "chainId": 56,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
    },
      {
      "name": "Tether USD",
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "symbol": "USDT",
      "decimals": 18,
      "chainId": 56,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
    },
    {
      "name": "BBCat",
      "address": "0xcb3e4688c4cd90022f74f5c70a775172ecab4d52",
      "symbol": "CAT",
      "decimals": 9,
      "chainId": 56,
      "logoURI": "https://github.com/dex-guru/assets/blob/main/tokens/56/0xcB3E4688C4cd90022F74f5C70A775172eCaB4D52.png?raw=true"
    },
  ]


  const [feeSetting, setFeeSetting] = useState({
    feeAmount: 0,
    feeReceiver: "",
    chargeFeeBy: "currency_in",
    isInBps: true
  })

  const [showRate, setShowRate] = useState(true)
  const [showDetail, setShowDetail] = useState(true)

  return (
  
   <div className="App">
   
      
     <Widget
       client="widget-react-demo"
       theme={theme}
       tokenList={MY_TOKEN_LIST}
       provider={ethersProvider}
       defaultTokenOut='0xcb3e4688c4cd90022f74f5c70a775172ecab4d52'
       feeSetting={
         feeSetting.feeAmount && feeSetting.feeReceiver
           ? feeSetting
           : undefined
       }
       enableRoute={enableRoute}
       enableDexes={enableDexes}
       showDetail={showDetail}
       showRate={showRate}
       title={<div><Button
         variant="outlined"  onClick={() => (wallet ? disconnect(wallet) : connect())} className="button">
            {!wallet ? "Connect Wallet" : "Disconnect"}</Button></div>}
     />
   </div>
  )
}

export default Swap
