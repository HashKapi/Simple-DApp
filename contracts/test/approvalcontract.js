const ApprovalContract = artifacts.require('ApprovalContract')

contract('ApprovalContract', function(accounts){
    it('initiates contract', async function(){
        const contract = await ApprovalContract.deployed()
        const approver = await contract.approver.call()
        assert.equal(approver, 'address', 'approver does not match')
    })

    it('takes deposit', async function(){
        const contract = await ApprovalContract.deployed()
        await contract.deposit(accounts[0], {value: 1e+18, from: accounts[1]})
        assert.equal(web3.eth.getBalance(contract.address), 1e+18, 'amount did not match')
    })
})