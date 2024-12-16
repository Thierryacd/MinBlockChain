namespace MinBlockChain.Server
{
    public class Transaction(string sender, string receiver, double amount)
    {
        public string Sender { get; set; } = sender;
        public string Receiver { get; set; } = receiver;
        public double Amount { get; set; } = amount;
    }

}
