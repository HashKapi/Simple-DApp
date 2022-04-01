// const {abi} = require('js/contractAbi')

if(typeof web3 != "undefined"){
    // web3 = new Web3(window.web3.currentProvider)
    web3 = new Web3(window.ethereum)
    console.log('your web3', web3)
}else{
    web3 = new Web3(new Web3.providers.HttpProvider("your address"))
}



var version = web3.version

console.log('Printing out version ' + version)


var contractAddress = 'address here'
var ApprovalContract = new web3.eth.Contract(abi, contractAddress)

console.log(ApprovalContract)

$('#contract-form').submit(function (){
    event.preventDefault()
    var fromAddress = $("#fromAddress").val()
    var toAddress = $("#toAddress").val()
    var amount = $("#amount").val()

    if (web3.utils.isAddress(fromAddress) != true){
        alert('invalid ethereum from address')
        return
    }

    if (web3.utils.isAddress(toAddress) != true){
        alert("invalid ethereum to address")
        return
    }

    if (amount <= 0){
        alert("you must send more than 0 ETH")
        return
    }

    console.log('from', typeof fromAddress, fromAddress)
    console.log('to', typeof toAddress, toAddress)
    ApprovalContract.methods.deposit(toAddress).send(
        {from: fromAddress, gas: 100000, value: web3.utils.toWei(amount,'ether')},
        function(error, result){
            if(error){
                console.log('error: ' + error)
                $('#deposit-result').html('error: <b>' + error + '</b>')
            }else{
                $('#deposit-result').html('Success TX: <b>' + result + '</b>')
            }
        }
    )
})

$('#get-balance-form').submit(function() {
    event.preventDefault()

    web3.eth.getBalance(contractAddress, 
        function(error, result){
            if (error){
                console.log('error: ' + error)
            }else{
                console.log('balance: ' + result)
                $('#the-balance').html('<b>Current Balance: </b>' + web3.utils.fromWei(result))
            }
        }
    )
})

$('#approve-form').submit(function(){
    event.preventDefault()

    ApprovalContract.methods.approve().call({from: 'address'},
        function(error, result){
            if(error){
                console.log('error: ' + error)
            }else{
                console.log('result: ' + JSON.stringify(result))
                $('#approval-display').html('Transaction approved. TX: <b>' + result + '<b>')
            }
        }
    )
})

$('#approver-form').submit(function(){
    event.preventDefault()

    ApprovalContract.methods.viewApprover().call(
        function(error, result){
            if(error){
                console.log('error: ' + error)
            }else{
                console.log('result: ' + JSON.stringify(result))
                $('#approver-display').html('Transaction approved. TX: <b>' + result + '<b>')
            }
        }
    )
})