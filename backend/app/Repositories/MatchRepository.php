<?php 

namespace App\Repositories;

use App\Models\Matchs;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class MatchRepository {

    protected $modelMatch;

    public function __construct(Matchs $modelMatch)
    {
        $this->modelMatch = $modelMatch;
    }

    public function getAllMatch(){

        return $this->modelMatch::select('matchs.id', 'home_team_id', 'home_team.name as name_home_team', 'away_team_id', 'away_team.name as name_away_team', 'home_score', 'away_score')
            ->leftJoin('teams as home_team', 'matchs.home_team_id', '=', 'home_team.id')
            ->leftJoin('teams as away_team', 'matchs.away_team_id', '=', 'away_team.id')
            ->where('home_score', null)->where('away_score', null)
            ->get();;
    }

    public function sendResultMatch(int $id_match, int $homeScore, int $awayScore){

        try {
            DB::beginTransaction();
            $match = $this->modelMatch::findOrFail($id_match);

            $match->update([
                'home_score' => $homeScore,
                'away_score' => $awayScore,
                'played_at'  => now(),
            ]);

            // Actualizar tabla team campos goal_for y goals_against
            $homeTeam = Team::findOrFail($match->home_team_id);

            $homeTeam->goals_for += $homeScore;
            $homeTeam->goals_against += $awayScore;
            $homeTeam->save();

            $awayTeam = Team::findOrFail($match->away_team_id);

            $awayTeam->goals_for += $awayScore;
            $awayTeam->goals_against += $homeScore;
            $awayTeam->save();

            DB::commit();
            return $match;

        }catch (\Exception $e){
            DB::rollBack();
            throw $e;
        }
    }


}


?>