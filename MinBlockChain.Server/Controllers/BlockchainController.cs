using Microsoft.AspNetCore.Mvc;
using MinBlockChain.Server;

[ApiController]
[Route("api/[controller]")]
public class BlockchainController : ControllerBase
{
    private static readonly Blockchain _blockchain = new();

    [HttpGet("chain")]
    public IActionResult GetBlockchain()
    {
        return Ok(_blockchain.Chain);
    }

    [HttpPost("transactions")]
    public IActionResult AddTransaction([FromBody] Transaction transaction)
    {
        _blockchain.AddTransaction(transaction);
        return Ok("Transaction ajoutée !");
    }

    [HttpPost("mine")]
    public IActionResult MineBlock([FromBody] string minerAddress)
    {
        _blockchain.MinePendingTransactions(minerAddress);
        return Ok("Bloc miné !");
    }

    [HttpGet("valid")]
    public IActionResult IsChainValid()
    {
        return Ok(_blockchain.IsChainValid());
    }
}
