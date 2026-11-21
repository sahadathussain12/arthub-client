"use client";

export default function TransactionsTable({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-purple-500/20 text-xs uppercase text-gray-400">
            <th className="py-3 px-4">Transaction ID</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">User / Artist Email</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10 text-sm">
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-white/[0.02]">
              <td className="py-3.5 px-4 font-mono text-xs text-gray-400">
                {tx.transactionId || tx._id}
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    tx.type === "subscription"
                      ? "bg-pink-500/20 text-pink-300"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  {tx.type || "purchase"}
                </span>
              </td>
              <td className="py-3.5 px-4 text-gray-300">
                {tx.buyerEmail || tx.userEmail || tx.email || "N/A"}
              </td>
              <td className="py-3.5 px-4 font-semibold text-green-400">
                ${tx.price || tx.amount || 0}
              </td>
              <td className="py-3.5 px-4 text-right text-xs text-gray-400">
                {tx.date || tx.createdAt
                  ? new Date(tx.date || tx.createdAt).toLocaleDateString()
                  : "Recent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}