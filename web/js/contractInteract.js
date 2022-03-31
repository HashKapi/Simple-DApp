// const {abi} = require('js/contractAbi')

if(typeof web3 != "undefined"){
    web3 = new Web3(web3.currentProvider)
}else{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
}



var version = web3.version

console.log('Printing out version ' + version)


var contractAddress = '0x9537d614c3365Cc88b24326f600C79e9ABcd51a0'
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

    ApprovalContract.methods.approve().call({from: '0xa8Ab4262dD72071d67D2BfeDCA3a95Bf45E9Aa24'},
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























// // change this to the ACTUAL contract address that you created on truffle migrate
// var contractAddress = "0xa588738615d8aA08628c77d86C88EF26aBd7FC6a";
// if ( typeof web3 != 'undefined' ) {
//   web3 = new Web3(web3.currentProvider);
//   $('#fromAddress').val('0xf17f52151EbEF6C7334FAD080c5704D77216b732');
// } else { // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
//   //web3.setProvider(new web3.providers.HttpProvider("http://localhost:9545"));
//   $('#fromAddress').val(web.eth.accounts[0]);
// }
// //var Web3 = require('web3');
// //var web3 = new Web3();

// var version = web3.version;
// console.log("Using web3 version: " + version);



// var ApprovalContract = new web3.eth.Contract(abi,contractAddress);

// // script to show the contract
// console.log(ApprovalContract);

// //make sure that addresses are legit
// $('#contract-form').submit(function() {
//   event.preventDefault();
//   var fromAddress = $('#fromAddress').val();
//   var toAddress = $('#toAddress').val();
//   var amount = $('#amount').val();
//   if (web3.utils.isAddress(fromAddress) != true) {
//     alert('You did not enter a correct ethereum address for the sender address.');
//     return;
//   }
//   if (web3.utils.isAddress(toAddress) != true) {
//     alert('You did not enter a correct ethereum address for the recipient address.');
//     return;
//    }
//   // make sure the ETH is > 0
//   if (amount == 0){
//     alert('You must send more than 0 ETH');
//     return;
//    }
// // all is good, let's call our contract deposit
// ApprovalContract.methods.deposit(toAddress).send({from: fromAddress, gas: 100000, value:  web3.utils.toWei(amount, 'ether')},
//     function(error, result) {
//       if (error) {
//         console.log('error: ' + error);
//         $('#deposit-result').html('<b>Error: </b>' + error);
//       }
//       else {
//       $('#deposit-result').html('Success TX: <b>' + result + '</b>');
//       }
//     });
// });


// $('#get-balance-form').submit(function() {
// event.preventDefault();

// web3.eth.getBalance(contractAddress,
//     function(error, result) {
//       if (error) {
//         console.log('error: ' + error);
//       }
//       else {
//         console.log('balance: ' + result);
//         $('#the-balance').html('<b>Current Balance: </b>' + web3.utils.fromWei(result));
//       }
//     });
//   });

// //  });
//   $('#approve-form').submit(function() {
//     event.preventDefault();

//     ApprovalContract.methods.approve().call({from: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef', gas: 100000},
//         function(error, result) {
//           if (error) {
//             console.log('error: ' + error);
//           }
//           else {
//             console.log('result: ' + JSON.stringify(result));
//             $('#approval-display').html('Transaction Approved. TX: <b>' + result + '</b>');
//           }
//         });
//   });
//   $('#approver-form').submit(function() {
//     event.preventDefault();

//     ApprovalContract.methods.viewApprover().call(
//         function(error, result) {
//           if (error) {
//             console.log('error: ' + error);
//           }
//           else {
//             console.log('result: ' + JSON.stringify(result));
//             $('#approver-display').html('Approver Address: <b>' + result + '</b>');
//           }
//         });
//   });