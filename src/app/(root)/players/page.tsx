import PlayerCard from "@/components/playerCard/playerCard";
import { ApiService } from "@/lib/apiService";
import { User } from "@/lib/definitions";

export default async function Players() {
  const users: User[] = await ApiService.getUsers();

  return (
    <div className="flex justify-center p-24">
      <div className="grid gap-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {users.map((user: User) => (
          <div className="" key={user.id}>
            <PlayerCard user={user}></PlayerCard>
          </div>
        ))}
      </div>
    </div>
  );
}
