import MatchesTable from "@/components/matchesTable/MatchesTable";
import { ApiService } from "@/lib/apiService";

const Matches = async () => {
  const matches = await ApiService.getMatches();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-12 lg:gap-14">
      <div className="col-span-12 w-full lg:col-span-5">
        <MatchesTable matches={matches}></MatchesTable>
      </div>
      <div className="col-span-7 grid h-full w-full justify-center gap-4">
        Results
      </div>
    </div>
  );
};

export default Matches;
