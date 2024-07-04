import AddFriend from "@/components/addFriend/AddFriend";
import PlayerCard from "@/components/playerCard/playerCard";
import { ApiService } from "@/lib/apiService";
import { User } from "@/lib/definitions";

export default async function Players() {
  const users: User[] = await ApiService.getUsersServer();

  return (
    <div className="grid grid-cols-1">
      <div className="py-10">
        <AddFriend></AddFriend>
      </div>
      <div className="grid gap-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user: User) => (
          <div key={user.id}>
            <PlayerCard user={user}></PlayerCard>
          </div>
        ))}
      </div>
    </div>
  );
}
