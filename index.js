import './styles.css';

const inputMessage = document.getElementById("inputMessage");
const signButton = document.getElementById("signButton");
const outputMessage = document.getElementById('outputMessage');


signButton.addEventListener('click', handleClick);

async function handleClick() {
  if (typeof window.keplr !== "undefined") {
    const chainId = "cosmoshub-4";
    await window.keplr.enable(chainId);
    const offlineSigner = window.keplr.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    
    const message = inputMessage.value;

    if (message) {
      window.keplr
        .signArbitrary(
          chainId,
          accounts[0].address,
          message
        )
        .then((signature) => {
          console.log("签名结果:", signature);
          outputMessage.textContent = `签名结果：\n${signature.signature}\n地址：\n${accounts[0].address}`;
        })
        .catch((error) => {
          console.error("签名失败:", error);
          alert("签名失败，请查看控制台以获取详细信息。");
        });
    } else {
      alert("请输入要签名的字符串。");
    }
  } else {
    alert("请安装Keplr插件。");
  }
}
