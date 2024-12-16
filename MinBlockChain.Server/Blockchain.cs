namespace MinBlockChain.Server
{
    public class Blockchain
    {
        public List<Block> Chain { get; private set; }
        public List<Transaction> PendingTransactions { get; private set; }
        public int Difficulty { get; set; } = 2;
        public double MiningReward { get; set; } = 50.0;

        public Blockchain()
        {
            Chain = [CreateGenesisBlock()];
            PendingTransactions = [];
        }

        private Block CreateGenesisBlock()
        {
            return new Block(0, DateTime.Now, [], "0");
        }

        public Block GetLatestBlock()
        {
            return Chain[^1];
        }

        public void AddTransaction(Transaction transaction)
        {
            PendingTransactions.Add(transaction);
        }

        public void MinePendingTransactions(string minerAddress)
        {
            PendingTransactions.Add(new Transaction("System", minerAddress, MiningReward));
            Block block = new(Chain.Count, DateTime.Now, new List<Transaction>(PendingTransactions), GetLatestBlock().Hash);
            block.MineBlock(Difficulty);
            Chain.Add(block);
            PendingTransactions.Clear();
        }

        public bool IsChainValid()
        {
            for (int i = 1; i < Chain.Count; i++)
            {
                Block currentBlock = Chain[i];
                Block previousBlock = Chain[i - 1];

                if (currentBlock.Hash != currentBlock.CalculateHash()) return false;
                if (currentBlock.PreviousHash != previousBlock.Hash) return false;
            }
            return true;
        }
    }

}
