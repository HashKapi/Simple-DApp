const ApprovalContract = artifacts.require('ApprovalContract')

contract('ApprovalContract', function(accounts){
    it('initiates contract', async function(){
        const contract = await ApprovalContract.deployed()
        const approver = await contract.approver.call()
        assert.equal(approver, '0xa588738615d8aA08628c77d86C88EF26aBd7FC6a', 'approver does not match')
    })
})