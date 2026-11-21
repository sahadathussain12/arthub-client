"use client";

export default function ManageUsersTable({ users, onRoleChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-purple-500/20 text-xs uppercase text-gray-400">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10 text-sm">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-white/[0.02]">
              <td className="py-3.5 px-4 font-medium">{u.name || "Unnamed"}</td>
              <td className="py-3.5 px-4 text-gray-400">{u.email}</td>
              <td className="py-3.5 px-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 uppercase">
                  {u.role || "user"}
                </span>
              </td>
              <td className="py-3.5 px-4 text-right">
                <select
                  value={u.role || "user"}
                  onChange={(e) => onRoleChange(u._id, e.target.value)}
                  className="bg-[#080714] border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}