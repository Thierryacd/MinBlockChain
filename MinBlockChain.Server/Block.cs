namespace MinBlockChain.Server
{
    using System.Security.Cryptography;
    using System.Text;

    public class Block
    {
        public int Index { get; set; }
        public DateTime Timestamp { get; set; }
        public List<Transaction> Transactions { get; set; }
        public string PreviousHash { get; set; }
        public string Hash { get; private set; }
        public int Nonce { get; private set; }

        public Block(int index, DateTime timestamp, List<Transaction> transactions, string previousHash)
        {
            Index = index;
            Timestamp = timestamp;
            Transactions = transactions;
            PreviousHash = previousHash;
            Hash = CalculateHash();
        }

        public string CalculateHash()
        {
            string rawData = Index + Timestamp.ToString() + PreviousHash + Nonce + string.Join("", Transactions.Select(t => t.Sender + t.Receiver + t.Amount));
            /*
            byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(rawData));
            return Convert.ToBase64String(bytes);
            */
            string hash = SHA256Custom.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            return hash;
        }

        public void MineBlock(int difficulty)
        {
            string target = new('0', difficulty);
            while (!Hash.StartsWith(target))
            {
                Nonce++;
                Hash = CalculateHash();
            }
        }
    }

}
